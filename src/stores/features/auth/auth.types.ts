export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar?: string;
  is_admin?: boolean;
  is_superuser?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

