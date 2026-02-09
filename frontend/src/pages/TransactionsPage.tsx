import React, { useState, useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useAccounts } from '../hooks/useAccounts';
import { useCategories } from '../hooks/useCategories';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Modal from '../components/common/Modal';
import Alert from '../components/common/Alert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '../schemas/transaction';
import { Transaction, TransactionType, CreateTransactionData } from '../types';
import { formatCurrency, formatDate } from '../utils';
import { PlusIcon, PencilIcon, TrashIcon, FunnelIcon } from '@heroicons/react/24/outline';

const TransactionsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState<{
    type?: string;
    account_id?: number;
    category_id?: number;
    date_from?: string;
    date_to?: string;
    search?: string;
  }>({});
  const [showFilters, setShowFilters] = useState(false);

  // Fetch data with filters
  const { 
    data: transactions, 
    isLoading, 
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions(filters as any); // API will handle filtering
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionData>({
    resolver: zodResolver(transactionSchema),
  });

  // Filter transactions based on search
  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    
    const items = Array.isArray(transactions) ? transactions : transactions.data || [];
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return items.filter(
        (t) =>
          t.description?.toLowerCase().includes(search) ||
          t.notes?.toLowerCase().includes(search)
      );
    }
    
    return items;
  }, [transactions, filters.search]);

  const handleOpenModal = (transaction?: Transaction) => {
    if (transaction) {
      setEditingTransaction(transaction);
      reset({
        account_id: transaction.account_id,
        category_id: transaction.category_id,
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description || '',
        transaction_date: transaction.transaction_date.split('T')[0],
        notes: transaction.notes || '',
      });
    } else {
      setEditingTransaction(null);
      reset({
        type: 'expense' as TransactionType,
        amount: 0,
        description: '',
        transaction_date: new Date().toISOString().split('T')[0],
        notes: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
    reset();
  };

  const onSubmit = async (data: CreateTransactionData) => {
    try {
      if (editingTransaction) {
        await updateTransaction({ id: editingTransaction.id, data });
      } else {
        await createTransaction(data);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'income':
        return '↗';
      case 'expense':
        return '↙';
      case 'transfer':
        return '↔';
      default:
        return '•';
    }
  };

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case 'income':
        return 'text-green-600 dark:text-green-400';
      case 'expense':
        return 'text-red-600 dark:text-red-400';
      case 'transfer':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <div className="flex gap-2">
          <Button
            variant={showFilters ? 'secondary' : 'ghost'}
            onClick={() => setShowFilters(!showFilters)}
            leftIcon={<FunnelIcon className="w-5 h-5" />}
          >
            Filters
          </Button>
          <Button
            variant="primary"
            onClick={() => handleOpenModal()}
            leftIcon={<PlusIcon className="w-5 h-5" />}
          >
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="mb-6">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
              <Button variant="ghost" size="small" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                type="text"
                label="Search"
                placeholder="Search description or notes..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <Select
                label="Type"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="transfer">Transfer</option>
              </Select>
              <Select
                label="Account"
                value={filters.account_id}
                onChange={(e) => handleFilterChange('account_id', e.target.value)}
              >
                <option value="">All Accounts</option>
                {accounts?.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </Select>
              <Select
                label="Category"
                value={filters.category_id}
                onChange={(e) => handleFilterChange('category_id', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <Input
                type="date"
                label="From Date"
                value={filters.date_from}
                onChange={(e) => handleFilterChange('date_from', e.target.value)}
              />
              <Input
                type="date"
                label="To Date"
                value={filters.date_to}
                onChange={(e) => handleFilterChange('date_to', e.target.value)}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-6">
          Failed to load transactions. Please try again.
        </Alert>
      )}

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <EmptyState
          icon={<PlusIcon className="w-12 h-12" />}
          title="No transactions found"
          description="Get started by adding your first transaction"
          action={
            <Button variant="primary" onClick={() => handleOpenModal()}>
              Add Transaction
            </Button>
          }
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatDate(transaction.transaction_date, 'short')}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className={getTransactionColor(transaction.type)}>
                          {getTransactionIcon(transaction.type)}
                        </span>
                        <div>
                          <div className="text-gray-900 dark:text-gray-100">
                            {transaction.description || 'No description'}
                          </div>
                          {transaction.notes && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {transaction.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {transaction.category?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {transaction.account?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                      <span className={getTransactionColor(transaction.type)}>
                        {transaction.type === 'income' ? '+' : transaction.type === 'expense' ? '-' : ''}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(transaction)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            label="Type"
            {...register('type')}
            error={errors.type?.message}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="transfer">Transfer</option>
          </Select>

          <Select
            label="Account"
            {...register('account_id', { valueAsNumber: true })}
            error={errors.account_id?.message}
          >
            <option value="">Select an account</option>
            {accounts?.filter(a => a.is_active).map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({formatCurrency(account.balance)})
              </option>
            ))}
          </Select>

          <Select
            label="Category"
            {...register('category_id', { valueAsNumber: true })}
            error={errors.category_id?.message}
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </Select>

          <Input
            type="number"
            label="Amount"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            error={errors.amount?.message}
          />

          <Input
            type="text"
            label="Description"
            {...register('description')}
            error={errors.description?.message}
          />

          <Input
            type="date"
            label="Transaction Date"
            {...register('transaction_date')}
            error={errors.transaction_date?.message}
          />

          <Input
            type="text"
            label="Notes (optional)"
            {...register('notes')}
            error={errors.notes?.message}
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
              {editingTransaction ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TransactionsPage;
