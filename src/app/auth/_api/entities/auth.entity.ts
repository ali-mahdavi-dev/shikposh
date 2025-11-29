// Request interfaces (camelCase - for sending to backend)
export interface SendOtpRequest {
  phone: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface RegisterRequest {
  phone: string;
  firstName: string;
  lastName: string;
  email?: string;
  avatarIdentifier?: string;
}

export interface LoginRequest {
  phone: string;
}

// Backend response interfaces (snake_case - received from backend)
export interface SendOtpResponseBackend {
  success: boolean;
  message?: string;
  expires_in?: number;
}

export interface VerifyOtpResponseBackend {
  success: boolean;
  token?: string;
  refresh_token?: string;
  user?: UserBackend;
  message?: string;
  user_exists?: boolean; // Indicates if user already exists in system
}

export interface RegisterResponseBackend {
  success: boolean;
  message?: string;
  token?: string;
  refresh_token?: string;
  user?: UserBackend;
}

export interface LoginResponseBackend {
  success: boolean;
  token?: string;
  refresh_token?: string;
  message?: string;
}

export interface UserBackend {
  id: string | number;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  avatar?: string;
  is_admin?: boolean;
  is_superuser?: boolean;
}

export interface AuthTokenResponseBackend {
  access: string;
  user?: UserBackend;
}

// Frontend entity interfaces (snake_case - matching backend responses)
export interface SendOtpResponse {
  success: boolean;
  message?: string;
  expires_in?: number;
}

export interface VerifyOtpResponse {
  success: boolean;
  token?: string;
  refresh_token?: string;
  user?: User;
  message?: string;
  user_exists?: boolean; // Indicates if user already exists in system
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  token?: string;
  refresh_token?: string;
  user?: User;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  refresh_token?: string;
  message?: string;
}

export interface User {
  id: string | number;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  avatar?: string;
  is_admin?: boolean;
  is_superuser?: boolean;
}

export interface AuthTokenResponse {
  access: string;
  user?: User;
}
