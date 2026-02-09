export type CategoryType = 'income' | 'expense';

export interface Category {
  id: number;
  user_id: number | null;
  name: string;
  type: CategoryType;
  icon: string | null;
  color: string | null;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  children?: Category[];
}

export interface CreateCategoryData {
  name: string;
  type: CategoryType;
  icon?: string;
  color?: string;
  parent_id?: number;
}

export interface UpdateCategoryData {
  name?: string;
  type?: CategoryType;
  icon?: string;
  color?: string;
  parent_id?: number;
}
