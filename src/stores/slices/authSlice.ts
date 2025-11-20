import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
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

  // Tokens are now in httpOnly cookies, only load user from localStorage
  const userStr = localStorage.getItem('auth_user');

  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return {
        user,
        token: null, // Token is in httpOnly cookie
        isAuthenticated: true,
        isLoading: false,
      };
    } catch {
      // If parsing fails, clear invalid data
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
    setCredentials: (state, action: PayloadAction<{ user: User; token?: string }>) => {
      state.user = action.payload.user;
      state.token = null; // Token is now in httpOnly cookie
      state.isAuthenticated = true;
      state.isLoading = false;

      // Only persist user to localStorage, token is in httpOnly cookie
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      // Clear localStorage (cookies will be cleared by backend on logout)
      if (typeof window !== 'undefined') {
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
