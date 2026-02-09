import React, { useState } from 'react';
import { useGoals } from '../hooks/useGoals';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Alert from '../components/common/Alert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import Badge from '../components/common/Badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { goalSchema } from '../schemas/goal';
import { z } from 'zod';
import { Goal, CreateGoalData } from '../types';
import { formatCurrency, calculateGoalProgress } from '../utils';
import { PlusIcon, PencilIcon, TrashIcon, TrophyIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const contributionSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
});

type ContributionFormData = z.infer<typeof contributionSchema>;

const GoalsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [contributionModal, setContributionModal] = useState<{ goal: Goal; type: 'contribute' | 'withdraw' } | null>(null);

  const { 
    data: goals, 
    isLoading, 
    error,
    createGoal,
    updateGoal,
    deleteGoal,
    contributeToGoal,
    withdrawFromGoal,
  } = useGoals();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateGoalData>({
    resolver: zodResolver(goalSchema),
  });

  const {
    register: registerContribution,
    handleSubmit: handleSubmitContribution,
    reset: resetContribution,
    formState: { errors: contributionErrors, isSubmitting: isContributing },
  } = useForm<ContributionFormData>({
    resolver: zodResolver(contributionSchema),
  });

  const handleOpenModal = (goal?: Goal) => {
    if (goal) {
      setEditingGoal(goal);
      reset({
        name: goal.name,
        target_amount: goal.target_amount,
        current_amount: goal.current_amount,
        target_date: goal.target_date ? goal.target_date.split('T')[0] : undefined,
        description: goal.description || '',
      });
    } else {
      setEditingGoal(null);
      reset({
        name: '',
        target_amount: 0,
        current_amount: 0,
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
    reset();
  };

  const handleOpenContributionModal = (goal: Goal, type: 'contribute' | 'withdraw') => {
    setContributionModal({ goal, type });
    resetContribution({ amount: 0 });
  };

  const handleCloseContributionModal = () => {
    setContributionModal(null);
    resetContribution();
  };

  const onSubmit = async (data: CreateGoalData) => {
    try {
      if (editingGoal) {
        await updateGoal({ id: editingGoal.id, data });
      } else {
        await createGoal(data);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const onContributionSubmit = async (data: ContributionFormData) => {
    if (!contributionModal) return;

    try {
      if (contributionModal.type === 'contribute') {
        await contributeToGoal({ id: contributionModal.goal.id, amount: data.amount });
      } else {
        await withdrawFromGoal({ id: contributionModal.goal.id, amount: data.amount });
      }
      handleCloseContributionModal();
    } catch (error) {
      console.error('Error processing transaction:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal(id);
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusVariant = (goal: Goal): 'success' | 'warning' | 'danger' | 'secondary' => {
    const progress = calculateGoalProgress(goal.current_amount, goal.target_amount);
    if (progress >= 100) return 'success';
    
    if (goal.target_date) {
      const daysRemaining = Math.ceil((new Date(goal.target_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      if (daysRemaining < 0) return 'danger';
      if (daysRemaining < 30) return 'warning';
    }
    
    return 'secondary';
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Goals</h1>
        <Button
          variant="primary"
          onClick={() => handleOpenModal()}
          leftIcon={<PlusIcon className="w-5 h-5" />}
        >
          Add Goal
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-6">
          Failed to load goals. Please try again.
        </Alert>
      )}

      {/* Goals Grid */}
      {!goals || goals.length === 0 ? (
        <EmptyState
          icon={<TrophyIcon className="w-12 h-12" />}
          title="No goals found"
          description="Set your first financial goal to start saving"
          action={
            <Button variant="primary" onClick={() => handleOpenModal()}>
              Add Goal
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const progress = calculateGoalProgress(goal.current_amount, goal.target_amount);
            const remaining = goal.target_amount - goal.current_amount;
            const daysRemaining = goal.target_date
              ? Math.ceil((new Date(goal.target_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
              : null;

            return (
              <Card key={goal.id} variant="outlined" className="hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Goal Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {goal.name}
                      </h3>
                      {goal.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {goal.description}
                        </p>
                      )}
                    </div>
                    <Badge variant={getStatusVariant(goal)} size="small">
                      {progress >= 100 ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(progress)} transition-all duration-300`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Amounts */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Current</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(goal.current_amount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Target</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(goal.target_amount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Remaining</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {formatCurrency(Math.max(0, remaining))}
                      </span>
                    </div>
                  </div>

                  {/* Target Date */}
                  {goal.target_date && (
                    <div className="mb-4 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Target Date</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {new Date(goal.target_date).toLocaleDateString()}
                        </span>
                      </div>
                      {daysRemaining !== null && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {daysRemaining > 0 ? `${daysRemaining} days remaining` : 
                           daysRemaining === 0 ? 'Due today' : 
                           `${Math.abs(daysRemaining)} days overdue`}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="success"
                      size="small"
                      onClick={() => handleOpenContributionModal(goal, 'contribute')}
                      leftIcon={<ArrowUpIcon className="w-4 h-4" />}
                      className="flex-1"
                      disabled={progress >= 100}
                    >
                      Add
                    </Button>
                    <Button
                      variant="warning"
                      size="small"
                      onClick={() => handleOpenContributionModal(goal, 'withdraw')}
                      leftIcon={<ArrowDownIcon className="w-4 h-4" />}
                      className="flex-1"
                      disabled={goal.current_amount === 0}
                    >
                      Withdraw
                    </Button>
                    <button
                      onClick={() => handleOpenModal(goal)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
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
        title={editingGoal ? 'Edit Goal' : 'Create Goal'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            label="Goal Name"
            placeholder="e.g., Emergency Fund, Vacation"
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            type="number"
            label="Target Amount"
            step="0.01"
            placeholder="0.00"
            {...register('target_amount', { valueAsNumber: true })}
            error={errors.target_amount?.message}
          />

          <Input
            type="number"
            label="Current Amount"
            step="0.01"
            placeholder="0.00"
            {...register('current_amount', { valueAsNumber: true })}
            error={errors.current_amount?.message}
          />

          <Input
            type="date"
            label="Target Date (optional)"
            {...register('target_date')}
            error={errors.target_date?.message}
          />

          <Input
            type="text"
            label="Description (optional)"
            placeholder="Describe your goal..."
            {...register('description')}
            error={errors.description?.message}
          />

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
              {editingGoal ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Contribution/Withdrawal Modal */}
      {contributionModal && (
        <Modal
          isOpen={true}
          onClose={handleCloseContributionModal}
          title={contributionModal.type === 'contribute' ? 'Add Funds' : 'Withdraw Funds'}
        >
          <form onSubmit={handleSubmitContribution(onContributionSubmit)} className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Goal</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {contributionModal.goal.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Current: {formatCurrency(contributionModal.goal.current_amount)}
              </p>
            </div>

            <Input
              type="number"
              label="Amount"
              step="0.01"
              placeholder="0.00"
              {...registerContribution('amount', { valueAsNumber: true })}
              error={contributionErrors.amount?.message}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCloseContributionModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={contributionModal.type === 'contribute' ? 'success' : 'warning'}
                isLoading={isContributing}
              >
                {contributionModal.type === 'contribute' ? 'Add Funds' : 'Withdraw'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default GoalsPage;
