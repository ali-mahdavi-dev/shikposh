import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Load initial state from localStorage
const loadInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }

  const token = localStorage.getItem('auth_token');
  const userStr = localStorage.getItem('auth_user');

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      return {
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      };
    } catch {
      // If parsing fails, clear invalid data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.token);
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
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
