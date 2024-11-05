import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types";

/**
 * Logs in a user with the provided credentials.
 * @param data - The login credentials.
 * @returns A promise that resolves to the login response containing the JWT token.
 * @throws An AxiosError with ErrorResponse if the request fails.
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
      "/auth/login",
      data
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Login Error:", error);

    throw error;
  }
};

/**
 * Registers a new user with the provided details.
 * @param data - The registration details.
 * @returns A promise that resolves to the registration response containing the user data.
 * @throws An AxiosError with ErrorResponse if the request fails.
 */
export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axiosInstance.post(
      "/auth/register",
      data
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Register Error:", error);

    throw error;
  }
};
