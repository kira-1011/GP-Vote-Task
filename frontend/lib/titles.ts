import axiosInstance from "./axiosInstance";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Title, ErrorResponse } from "@/types"; // Ensure ErrorResponse is defined in your types

interface CreateTitleInput {
  title: string;
}

/**
 * Fetches the list of titles for the authenticated user.
 * @returns A promise that resolves to an array of Title objects.
 * @throws An error if the request fails.
 */
export const getTitles = async (): Promise<Title[]> => {
  try {
    const response: AxiosResponse<Title[]> = await axiosInstance.get("/title");
    return response.data;
  } catch (error: unknown) {
    // Handle Axios errors specifically
    if (axios.isAxiosError<ErrorResponse>(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error(
        "Error fetching titles:",
        axiosError.response?.data || axiosError.message
      );
      throw axiosError.response?.data || new Error("Failed to fetch titles.");
    } else {
      // Handle unexpected errors
      console.error("Unexpected error fetching titles:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

/**
 * Adds a new title.
 * @param data - The title data to be added.
 * @returns A promise that resolves to the newly created Title object.
 * @throws An error if the request fails.
 */
export const addTitle = async (data: CreateTitleInput): Promise<Title> => {
  try {
    const response: AxiosResponse<Title> = await axiosInstance.post(
      "/title",
      data
    );
    return response.data;
  } catch (error: unknown) {
    // Handle Axios errors specifically
    if (axios.isAxiosError<ErrorResponse>(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error(
        "Error adding title:",
        axiosError.response?.data || axiosError.message
      );
      throw axiosError.response?.data || new Error("Failed to add title.");
    } else {
      // Handle unexpected errors
      console.error("Unexpected error adding title:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

/**
 * Deletes a title by its ID.
 * @param id - The ID of the title to be deleted.
 * @returns A promise that resolves to the deleted Title object.
 * @throws An error if the request fails.
 */
export const deleteTitle = async (id: string): Promise<Title> => {
  try {
    const response: AxiosResponse<Title> = await axiosInstance.delete(
      `/title/${id}`
    );
    return response.data;
  } catch (error: unknown) {
    // Handle Axios errors specifically
    if (axios.isAxiosError<ErrorResponse>(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error(
        "Error deleting title:",
        axiosError.response?.data || axiosError.message
      );
      throw axiosError.response?.data || new Error("Failed to delete title.");
    } else {
      // Handle unexpected errors
      console.error("Unexpected error deleting title:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};
