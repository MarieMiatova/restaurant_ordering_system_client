import { apiClient } from '../axios-instance';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../entities/user/model/types';

export const authApi = {
  login: (data: LoginRequest) => {
    return apiClient.post<LoginResponse>('/login', data);
  },

  register: (data: RegisterRequest) => {
    return apiClient.post<RegisterResponse>('/register', data);
  },
};
