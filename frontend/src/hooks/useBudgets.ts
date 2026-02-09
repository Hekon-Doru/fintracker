import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { budgetService } from '../services';
import type { CreateBudgetData, UpdateBudgetData } from '../types';

export const useBudgets = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['budgets'],
    queryFn: () => budgetService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateBudgetData) => budgetService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBudgetData }) =>
      budgetService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => budgetService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: (id: number) => budgetService.toggleActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    budgets: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createBudget: createMutation.mutateAsync,
    updateBudget: updateMutation.mutateAsync,
    deleteBudget: deleteMutation.mutateAsync,
    toggleBudgetActive: toggleActiveMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export const useBudget = (id: number) => {
  const query = useQuery({
    queryKey: ['budget', id],
    queryFn: () => budgetService.getById(id),
    enabled: !!id,
  });

  return {
    budget: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
