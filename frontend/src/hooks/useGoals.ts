import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { goalService } from '../services';
import type { CreateGoalData, UpdateGoalData } from '../types';

export const useGoals = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['goals'],
    queryFn: () => goalService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateGoalData) => goalService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateGoalData }) =>
      goalService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => goalService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const contributeMutation = useMutation({
    mutationFn: ({ id, amount }: { id: number; amount: number }) =>
      goalService.contribute(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: ({ id, amount }: { id: number; amount: number }) =>
      goalService.withdraw(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    goals: query.data,
    data: query.data, // Alias for easier destructuring
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createGoal: createMutation.mutateAsync,
    updateGoal: updateMutation.mutateAsync,
    deleteGoal: deleteMutation.mutateAsync,
    contributeToGoal: contributeMutation.mutateAsync,
    withdrawFromGoal: withdrawMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export const useGoal = (id: number) => {
  const query = useQuery({
    queryKey: ['goal', id],
    queryFn: () => goalService.getById(id),
    enabled: !!id,
  });

  return {
    goal: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
