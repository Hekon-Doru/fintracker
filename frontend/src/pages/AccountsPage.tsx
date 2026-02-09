import React, { useState } from 'react';
import { useAccounts } from '../hooks/useAccounts';
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
import { accountSchema } from '../schemas/account';
import { Account, AccountType, CreateAccountData } from '../types';
import { formatCurrency } from '../utils';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  BanknotesIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  WalletIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const AccountsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const { 
    data: accounts, 
    isLoading, 
    error,
    createAccount,
    updateAccount,
    deleteAccount,
    toggleAccountActive,
  } = useAccounts();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountData>({
    resolver: zodResolver(accountSchema),
  });

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case 'checking':
        return <BuildingLibraryIcon className="w-6 h-6" />;
      case 'savings':
        return <BanknotesIcon className="w-6 h-6" />;
      case 'credit':
        return <CreditCardIcon className="w-6 h-6" />;
      case 'cash':
        return <WalletIcon className="w-6 h-6" />;
      case 'investment':
        return <ChartBarIcon className="w-6 h-6" />;
      default:
        return <BanknotesIcon className="w-6 h-6" />;
    }
  };

  const getAccountColor = (type: AccountType) => {
    switch (type) {
      case 'checking':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400';
      case 'savings':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400';
      case 'credit':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400';
      case 'cash':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400';
      case 'investment':
        return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  const totalBalance = accounts?.reduce((sum, account) => sum + account.balance, 0) || 0;
  const activeAccounts = accounts?.filter(a => a.is_active).length || 0;

  const handleOpenModal = (account?: Account) => {
    if (account) {
      setEditingAccount(account);
      reset({
        name: account.name,
        type: account.type,
        balance: account.balance,
        currency: account.currency,
        is_active: account.is_active,
      });
    } else {
      setEditingAccount(null);
      reset({
        name: '',
        type: 'checking' as AccountType,
        balance: 0,
        currency: 'USD',
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
    reset();
  };

  const onSubmit = async (data: CreateAccountData) => {
    try {
      if (editingAccount) {
        await updateAccount({ id: editingAccount.id, data });
      } else {
        await createAccount(data);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving account:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
      try {
        await deleteAccount(id);
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await toggleAccountActive(id);
    } catch (error) {
      console.error('Error toggling account status:', error);
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Accounts</h1>
        <Button
          variant="primary"
          onClick={() => handleOpenModal()}
          leftIcon={<PlusIcon className="w-5 h-5" />}
        >
          Add Account
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card variant="elevated">
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalBalance)}
            </p>
          </div>
        </Card>
        <Card variant="elevated">
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active Accounts</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {activeAccounts} / {accounts?.length || 0}
            </p>
          </div>
        </Card>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-6">
          Failed to load accounts. Please try again.
        </Alert>
      )}

      {/* Accounts Grid */}
      {!accounts || accounts.length === 0 ? (
        <EmptyState
          icon={<BanknotesIcon className="w-12 h-12" />}
          title="No accounts found"
          description="Get started by adding your first account"
          action={
            <Button variant="primary" onClick={() => handleOpenModal()}>
              Add Account
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <Card key={account.id} variant="outlined" className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Account Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${getAccountColor(account.type)}`}>
                      {getAccountIcon(account.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {account.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {account.type}
                      </p>
                    </div>
                  </div>
                  <Badge variant={account.is_active ? 'success' : 'secondary'} size="small">
                    {account.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                {/* Balance */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Balance</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(account.balance)}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {account.currency}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => handleToggleActive(account.id)}
                    className="flex-1"
                  >
                    {account.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <button
                    onClick={() => handleOpenModal(account)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAccount ? 'Edit Account' : 'Add Account'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            label="Account Name"
            placeholder="e.g., Main Checking"
            {...register('name')}
            error={errors.name?.message}
          />

          <Select
            label="Account Type"
            {...register('type')}
            error={errors.type?.message}
          >
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
            <option value="credit">Credit Card</option>
            <option value="cash">Cash</option>
            <option value="investment">Investment</option>
          </Select>

          <Input
            type="number"
            label="Initial Balance"
            step="0.01"
            placeholder="0.00"
            {...register('balance', { valueAsNumber: true })}
            error={errors.balance?.message}
          />

          <Input
            type="text"
            label="Currency"
            placeholder="USD"
            {...register('currency')}
            error={errors.currency?.message}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              {...register('is_active')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700 dark:text-gray-300">
              Account is active
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
              {editingAccount ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AccountsPage;
