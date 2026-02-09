import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services';
import type { CategoryType, CreateCategoryData, UpdateCategoryData } from '../types';

export const useCategories = (type?: CategoryType) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['categories', type],
    queryFn: () => categoryService.getAll(type),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryData) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryData }) =>
      categoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });

  return {
    categories: query.data,
    data: query.data, // Alias for easier destructuring
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createCategory: createMutation.mutateAsync,
    updateCategory: updateMutation.mutateAsync,
    deleteCategory: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export const useCategory = (id: number) => {
  const query = useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
  });

  return {
    category: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
