import React, { useState } from 'react';
import { useBudgets } from '../hooks/useBudgets';
import { useCategories } from '../hooks/useCategories';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Modal from '../components/common/Modal';
import Alert from '../components/common/Alert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import Badge from '../components/common/Badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { budgetSchema } from '../schemas/budget';
import { Budget, BudgetPeriod, CreateBudgetData } from '../types';
import { formatCurrency, calculateBudgetPercentage } from '../utils';
import { PlusIcon, PencilIcon, TrashIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const BudgetsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const { 
    data: budgets, 
    isLoading, 
    error,
    createBudget,
    updateBudget,
    deleteBudget,
    toggleBudgetActive,
  } = useBudgets();
  const { data: categories } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateBudgetData>({
    resolver: zodResolver(budgetSchema),
  });

  const handleOpenModal = (budget?: Budget) => {
    if (budget) {
      setEditingBudget(budget);
      reset({
        category_id: budget.category_id || undefined,
        amount: budget.amount,
        period: budget.period,
        start_date: budget.start_date.split('T')[0],
        end_date: budget.end_date ? budget.end_date.split('T')[0] : undefined,
        is_active: budget.is_active,
      });
    } else {
      setEditingBudget(null);
      reset({
        amount: 0,
        period: 'monthly' as BudgetPeriod,
        start_date: new Date().toISOString().split('T')[0],
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
    reset();
  };

  const onSubmit = async (data: CreateBudgetData) => {
    try {
      if (editingBudget) {
        await updateBudget({ id: editingBudget.id, data });
      } else {
        await createBudget(data);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await deleteBudget(id);
      } catch (error) {
        console.error('Error deleting budget:', error);
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await toggleBudgetActive(id);
    } catch (error) {
      console.error('Error toggling budget status:', error);
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    if (percentage < 100) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusVariant = (percentage: number): 'success' | 'warning' | 'danger' | 'secondary' => {
    if (percentage < 50) return 'success';
    if (percentage < 80) return 'warning';
    return 'danger';
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <LoadingSpinner size="large" centered />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budgets</h1>
        <Button
          variant="primary"
          onClick={() => handleOpenModal()}
          leftIcon={<PlusIcon className="w-5 h-5" />}
        >
          Add Budget
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-6">
          Failed to load budgets. Please try again.
        </Alert>
      )}

      {/* Budgets List */}
      {!budgets || budgets.length === 0 ? (
        <EmptyState
          icon={<ChartBarIcon className="w-12 h-12" />}
          title="No budgets found"
          description="Get started by creating your first budget"
          action={
            <Button variant="primary" onClick={() => handleOpenModal()}>
              Add Budget
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = calculateBudgetPercentage(budget.spent, budget.amount);
            const remaining = budget.amount - budget.spent;

            return (
              <Card key={budget.id} variant="outlined">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    {/* Budget Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {budget.category?.name || 'Uncategorized'}
                        </h3>
                        <Badge variant={budget.is_active ? 'success' : 'secondary'} size="small">
                          {budget.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="info" size="small">
                          {budget.period}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(budget.start_date).toLocaleDateString()} 
                        {budget.end_date && ` - ${new Date(budget.end_date).toLocaleDateString()}`}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="small"
                        onClick={() => handleToggleActive(budget.id)}
                      >
                        {budget.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <button
                        onClick={() => handleOpenModal(budget)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(budget.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Budget Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Spent: {formatCurrency(budget.spent)}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Budget: {formatCurrency(budget.amount)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(percentage)} transition-all duration-300`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {percentage.toFixed(1)}% used
                      </span>
                      <Badge variant={getStatusVariant(percentage)} size="small">
                        {remaining >= 0 ? formatCurrency(remaining) : formatCurrency(Math.abs(remaining))} 
                        {remaining >= 0 ? ' remaining' : ' over budget'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingBudget ? 'Edit Budget' : 'Create Budget'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            label="Category"
            {...register('category_id', { valueAsNumber: true })}
            error={errors.category_id?.message}
          >
            <option value="">Select a category</option>
            {categories?.filter(c => c.type === 'expense').map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </Select>

          <Input
            type="number"
            label="Budget Amount"
            step="0.01"
            placeholder="0.00"
            {...register('amount', { valueAsNumber: true })}
            error={errors.amount?.message}
          />

          <Select
            label="Period"
            {...register('period')}
            error={errors.period?.message}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Select>

          <Input
            type="date"
            label="Start Date"
            {...register('start_date')}
            error={errors.start_date?.message}
          />

          <Input
            type="date"
            label="End Date (optional)"
            {...register('end_date')}
            error={errors.end_date?.message}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              {...register('is_active')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700 dark:text-gray-300">
              Budget is active
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              {editingBudget ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BudgetsPage;
