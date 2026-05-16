import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginRequest, RegisterRequest, LoginResponse, RegisterResponse, AuthState } from './types';
import { authApi } from '../../../shared/api/auth';

const TOKEN_KEY = 'auth_access_token';

const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

const setStoredToken = (token: string | null): void => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }
};

const initialState: AuthState & { token: string | null } = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: getStoredToken(),
};

export const login = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Login failed');
    }
  }
);

export const register = createAsyncThunk<RegisterResponse, RegisterRequest, { rejectValue: string }>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Registration failed');
    }
  }
);

export const checkAuth = createAsyncThunk<User | null, void, { rejectValue: string }>(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    const token = getStoredToken();
    if (!token) {
      return null;
    }
    
    try {
      // Here we could decode JWT or validate with backend
      // For now, we'll just return a basic user object
      // In production, you should validate the token with your backend
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        username: payload.sub || payload.username || 'user',
        role: payload.role || 'user',
      };
    } catch (error) {
      setStoredToken(null);
      return null;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      setStoredToken(null);
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        setStoredToken(action.payload.access_token);
        
        // Decode token to get user info
        try {
          const payload = JSON.parse(atob(action.payload.access_token.split('.')[1]));
          state.user = {
            username: payload.sub || payload.username || 'user',
            role: payload.role || 'user',
          };
        } catch {
          state.user = { username: 'user' };
        }
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        // After registration, user should login
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
