import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services';

export const useDashboard = () => {
  const query = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardService.getData(),
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  return {
    dashboardData: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
