export interface ErrorResponse {
  message: string;
  messages?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface User {
  uuid: string;
  username: string;
  email: string;
}

export interface RegisterResponse {
  user: User;
}

export interface Title {
  uuid: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
