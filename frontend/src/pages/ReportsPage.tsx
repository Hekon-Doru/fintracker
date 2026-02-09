import React, { useState } from 'react';
import { useIncomeExpenseReport, useSpendingTrends, useExportReport } from '../hooks/useReports';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatCurrency } from '../utils';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowDownTrayIcon, ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

const ReportsPage: React.FC = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const [filters, setFilters] = useState({
    start_date: firstDayOfMonth.toISOString().split('T')[0],
    end_date: today.toISOString().split('T')[0],
    account_id: '',
    category_id: '',
  });

  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');

  const { data: incomeExpenseData, isLoading: isLoadingIncomeExpense } = useIncomeExpenseReport(
    filters.start_date,
    filters.end_date,
    filters.account_id ? Number(filters.account_id) : undefined,
    filters.category_id ? Number(filters.category_id) : undefined
  );

  const { data: trendsData, isLoading: isLoadingTrends } = useSpendingTrends(
    filters.start_date,
    filters.end_date,
    'monthly'
  );

  const { exportReport } = useExportReport();

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleExport = async () => {
    try {
      await exportReport(filters.start_date, filters.end_date, exportFormat);
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  const setQuickDateRange = (range: 'week' | 'month' | 'quarter' | 'year') => {
    const end = new Date();
    const start = new Date();

    switch (range) {
      case 'week':
        start.setDate(end.getDate() - 7);
        break;
      case 'month':
        start.setMonth(end.getMonth() - 1);
        break;
      case 'quarter':
        start.setMonth(end.getMonth() - 3);
        break;
      case 'year':
        start.setFullYear(end.getFullYear() - 1);
        break;
    }

    setFilters((prev) => ({
      ...prev,
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0],
    }));
  };

  // Prepare chart data
  const categorySpendingData = incomeExpenseData?.expense_by_category?.map((item) => ({
    name: item.category_name,
    value: item.amount,
  })) || [];

  const incomeVsExpenseData = incomeExpenseData ? [
    { name: 'Income', value: incomeExpenseData.total_income },
    { name: 'Expenses', value: incomeExpenseData.total_expense },
  ] : [];

  const isLoading = isLoadingIncomeExpense || isLoadingTrends;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'csv' | 'pdf')}
            className="w-24"
          >
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </Select>
          <Button
            variant="secondary"
            onClick={handleExport}
            leftIcon={<ArrowDownTrayIcon className="w-5 h-5" />}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Date Range & Filters
          </h3>

          {/* Quick Date Range Buttons */}
          <div className="flex gap-2 mb-4">
            <Button variant="ghost" size="small" onClick={() => setQuickDateRange('week')}>
              Last Week
            </Button>
            <Button variant="ghost" size="small" onClick={() => setQuickDateRange('month')}>
              Last Month
            </Button>
            <Button variant="ghost" size="small" onClick={() => setQuickDateRange('quarter')}>
              Last Quarter
            </Button>
            <Button variant="ghost" size="small" onClick={() => setQuickDateRange('year')}>
              Last Year
            </Button>
          </div>

          {/* Custom Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              type="date"
              label="Start Date"
              value={filters.start_date}
              onChange={(e) => handleFilterChange('start_date', e.target.value)}
            />
            <Input
              type="date"
              label="End Date"
              value={filters.end_date}
              onChange={(e) => handleFilterChange('end_date', e.target.value)}
            />
          </div>
        </div>
      </Card>

      {isLoading ? (
        <LoadingSpinner size="large" centered />
      ) : (
        <>
          {/* Summary Cards */}
          {incomeExpenseData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card variant="elevated">
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Income</h3>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(incomeExpenseData.total_income)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {incomeExpenseData.income_by_category.reduce((sum, cat) => sum + cat.transaction_count, 0)} transactions
                  </p>
                </div>
              </Card>

              <Card variant="elevated">
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Expenses</h3>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(incomeExpenseData.total_expense)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {incomeExpenseData.expense_by_category.reduce((sum, cat) => sum + cat.transaction_count, 0)} transactions
                  </p>
                </div>
              </Card>

              <Card variant="elevated">
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Net Income</h3>
                  <p className={`text-3xl font-bold ${
                    incomeExpenseData.net_income >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatCurrency(incomeExpenseData.net_income)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Income - Expenses
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Income vs Expenses Pie Chart */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ChartBarIcon className="w-5 h-5" />
                  Income vs Expenses
                </h3>
                {incomeVsExpenseData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={incomeVsExpenseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {incomeVsExpenseData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#EF4444'} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                    No data available for this period
                  </p>
                )}
              </div>
            </Card>

            {/* Spending by Category */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Spending by Category
                </h3>
                {categorySpendingData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categorySpendingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="value" fill="#3B82F6">
                        {categorySpendingData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                    No spending data available
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Trends Chart */}
          {trendsData && trendsData.length > 0 && (
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Spending Trends
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} name="Income" />
                    <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
                    <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={2} name="Net Income" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {/* Category Breakdown Table */}
          {incomeExpenseData?.expense_by_category && incomeExpenseData.expense_by_category.length > 0 && (
            <Card className="mt-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Category Breakdown
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Transactions
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          % of Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {incomeExpenseData.expense_by_category.map((item, index) => {
                        const percentage = (item.amount / incomeExpenseData.total_expense) * 100;
                        return (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                              {item.category_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                              {formatCurrency(item.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600 dark:text-gray-400">
                              {item.transaction_count}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600 dark:text-gray-400">
                              {percentage.toFixed(1)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default ReportsPage;
