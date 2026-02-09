export type AccountType = 'checking' | 'savings' | 'credit' | 'cash' | 'investment';

export interface Account {
  id: number;
  user_id: number;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateAccountData {
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  is_active?: boolean;
}

export interface UpdateAccountData {
  name?: string;
  type?: AccountType;
  balance?: number;
  currency?: string;
  is_active?: boolean;
}

// Type aliases for form compatibility
export type CreateAccountRequest = CreateAccountData;
