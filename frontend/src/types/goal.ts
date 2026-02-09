export type GoalStatus = 'active' | 'completed' | 'cancelled';

export interface Goal {
  id: number;
  user_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
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
  status?: GoalStatus;
}

export interface UpdateGoalData {
  name?: string;
  target_amount?: number;
  current_amount?: number;
  deadline?: string;
  status?: GoalStatus;
}
