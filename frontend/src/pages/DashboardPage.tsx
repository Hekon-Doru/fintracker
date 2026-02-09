import React from 'react';
import {
  AccountsWidget,
  RecentTransactionsWidget,
  BudgetStatusWidget,
  SpendingChartWidget,
} from '../components/features/dashboard';
import { useAccounts, useTransactions, useBudgets, useDashboard } from '../hooks';

const DashboardPage: React.FC = () => {
  const { accounts, isLoading: accountsLoading } = useAccounts();
  const { transactions, isLoading: transactionsLoading } = useTransactions({
    page: 1,
    per_page: 5,
  });
  const { budgets, isLoading: budgetsLoading } = useBudgets();
  const { dashboardData, isLoading: dashboardLoading } = useDashboard();

  // Transform dashboard spending data for chart
  const spendingData = dashboardData?.spending_by_category?.map((item: any) => ({
    name: item.category?.name || 'Uncategorized',
    amount: item.total,
  })) || [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accounts Widget */}
        <AccountsWidget
          accounts={accounts || []}
          isLoading={accountsLoading}
        />

        {/* Recent Transactions Widget */}
        <RecentTransactionsWidget
          transactions={transactions?.data || []}
          isLoading={transactionsLoading}
        />

        {/* Budget Status Widget */}
        <BudgetStatusWidget
          budgets={budgets || []}
          isLoading={budgetsLoading}
        />

        {/* Spending Chart Widget */}
        <SpendingChartWidget
          data={spendingData}
          isLoading={dashboardLoading}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
