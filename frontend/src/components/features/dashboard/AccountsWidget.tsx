import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from '../../common';
import { formatCurrency } from '../../../utils';
import type { Account } from '../../../types';

interface AccountsWidgetProps {
  accounts: Account[];
  isLoading?: boolean;
}

const AccountsWidget: React.FC<AccountsWidgetProps> = ({ accounts, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </Card>
    );
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Accounts Overview
        </h3>
        <Link
          to="/accounts"
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          View all
        </Link>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(totalBalance)}
        </p>
      </div>

      <div className="space-y-3">
        {accounts.slice(0, 3).map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <span className="text-xl">
                  {account.type === 'savings' ? '💰' : 
                   account.type === 'checking' ? '🏦' : '💳'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {account.name}
                </p>
                <Badge
                  variant={account.is_active ? 'success' : 'secondary'}
                  size="sm"
                >
                  {account.type}
                </Badge>
              </div>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(account.balance)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AccountsWidget;
