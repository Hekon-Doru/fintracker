export type GoalStatus = 'active' | 'completed' | 'cancelled';

export interface Goal {
  id: number;
  user_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  target_date?: string | null; // Alias for deadline
  description?: string | null; // Additional field
  status: GoalStatus;
  created_at: string;
  updated_at: string;
  progress_percentage: number;
}

export interface CreateGoalData {
  name: string;
  target_amount: number;
  current_amount?: number;
  deadline?: string;
  target_date?: string; // Alias for deadline
  description?: string; // Additional field
  status?: GoalStatus;
}

export interface UpdateGoalData {
  name?: string;
  target_amount?: number;
  current_amount?: number;
  deadline?: string;
  target_date?: string; // Alias for deadline
  description?: string; // Additional field
  status?: GoalStatus;
}

// Type aliases for form compatibility
export type CreateGoalRequest = CreateGoalData;
