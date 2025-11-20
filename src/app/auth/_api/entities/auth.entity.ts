export interface SendOtpRequest {
  phone: string;
  type: 'login' | 'register';
}

export interface SendOtpResponse {
  success: boolean;
  message?: string;
  expiresIn?: number;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
  type: 'login' | 'register';
}

export interface VerifyOtpResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
  userExists?: boolean; // Indicates if user already exists in system
}

export interface RegisterRequest {
  phone: string;
  firstName: string;
  lastName: string;
  email?: string;
  avatarIdentifier?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}

export interface LoginRequest {
  phone: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
}

export interface User {
  id: string | number;
  user_name?: string;
  userName?: string;
  first_name?: string;
  firstName?: string;
  last_name?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface AuthTokenResponse {
  access: string;
  user?: User;
}
