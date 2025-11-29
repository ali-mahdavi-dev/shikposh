import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Load initial state from localStorage
const loadInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }

  // Load user and tokens from localStorage
  const userStr = localStorage.getItem('auth_user');
  const token = localStorage.getItem('auth_token');
  const refreshToken = localStorage.getItem('auth_refresh_token');

  if (userStr && token) {
    try {
      const user = JSON.parse(userStr);
      return {
        user,
        token,
        refreshToken: refreshToken || null,
        isAuthenticated: true,
        isLoading: false,
      };
    } catch {
      // If parsing fails, clear invalid data
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_refresh_token');
    }
  }

  return {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token?: string; refreshToken?: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token || null;
      state.refreshToken = action.payload.refreshToken || null;
      state.isAuthenticated = true;
      state.isLoading = false;

      console.log('action.payload', action.payload);
      console.log('state.token', action.payload.token);
      // Persist user and tokens to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
        if (action.payload.token) {
          localStorage.setItem('auth_token', action.payload.token);
        }
        if (action.payload.refreshToken) {
          localStorage.setItem('auth_refresh_token', action.payload.refreshToken);
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_refresh_token');
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(state.user));
        }
      }
    },
  },
});

export const { setCredentials, logout, setLoading, updateUser } = authSlice.actions;
export default authSlice.reducer;
