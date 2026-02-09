import { useQuery } from '@tanstack/react-query';
import { reportService } from '../services';

export const useIncomeExpenseReport = (startDate: string, endDate: string) => {
  const query = useQuery({
    queryKey: ['report', 'income-expense', startDate, endDate],
    queryFn: () => reportService.getIncomeExpense(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });

  return {
    report: query.data,
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
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
