import apiClient from './api';

// TypeScript interfaces for API requests and responses
export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    fullName: string;
    email: string;
    token: string;
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

const authService = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/users/register', data);
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify({
          userId: response.data.data.userId,
          fullName: response.data.data.fullName,
          email: response.data.data.email,
        }));
      }
      
      return response.data;
    } catch (error) {
      throw (error as { response?: { data?: ErrorResponse } }).response?.data || { 
        success: false, 
        message: 'Network error. Please try again.' 
      };
    }
  },
  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/users/login', data);
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify({
          userId: response.data.data.userId,
          fullName: response.data.data.fullName,
          email: response.data.data.email,
        }));
      }
      
      return response.data;
    } catch (error) {
      throw (error as { response?: { data?: ErrorResponse } }).response?.data || { 
        success: false, 
        message: 'Network error. Please try again.' 
      };
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};

export default authService;

