import { useQuery } from '@tanstack/react-query';
import { reportService } from '../services';

export const useIncomeExpenseReport = (startDate: string, endDate: string, accountId?: number, categoryId?: number) => {
  const query = useQuery({
    queryKey: ['report', 'income-expense', startDate, endDate, accountId, categoryId],
    queryFn: () => reportService.getIncomeExpense(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });

  return {
    report: query.data,
    data: query.data, // Alias for easier destructuring
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useCategoryReport = (startDate: string, endDate: string) => {
  const query = useQuery({
    queryKey: ['report', 'by-category', startDate, endDate],
    queryFn: () => reportService.getByCategory(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });

  return {
    categoryData: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useTrendsReport = (
  startDate: string,
  endDate: string,
  interval: string = 'daily'
) => {
  const query = useQuery({
    queryKey: ['report', 'trends', startDate, endDate, interval],
    queryFn: () => reportService.getTrends(startDate, endDate, interval),
    enabled: !!startDate && !!endDate,
  });

  return {
    trends: query.data,
    data: query.data, // Alias for easier destructuring
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

// Hook for spending trends (used in ReportsPage)
export const useSpendingTrends = (
  startDate: string,
  endDate: string,
  interval: 'daily' | 'weekly' | 'monthly' = 'daily'
) => {
  const query = useQuery({
    queryKey: ['report', 'spending-trends', startDate, endDate, interval],
    queryFn: () => reportService.getTrends(startDate, endDate, interval),
    enabled: !!startDate && !!endDate,
  });

  return {
    trends: query.data,
    data: query.data, // Alias for easier destructuring
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

// Hook for exporting reports (used in ReportsPage)
export const useExportReport = () => {
  const exportToFile = async (startDate: string, endDate: string, format: 'csv' | 'pdf' = 'csv') => {
    try {
      const blob = await reportService.export(format, {
        start_date: startDate,
        end_date: endDate,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${startDate}-${endDate}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  };

  return {
    exportReport: exportToFile,
  };
};
