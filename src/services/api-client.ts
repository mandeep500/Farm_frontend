import { storage } from "../lib/storage";
import { ApiResponse } from "../types/api.types";

export class ApiError extends Error {
  public statusCode: number;
  public errors?: Record<string, string[] | string>;

  constructor(
    message: string,
    statusCode: number = 500,
    errors?: Record<string, string[] | string>
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { timeoutMs = 8000, ...customConfig } = options;

  const token = storage.getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(customConfig.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`;
      throw new ApiError(message, response.status, data?.errors);
    }

    return {
      success: true,
      data: data?.data !== undefined ? data.data : (data as T),
      message: data?.message,
    };
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new ApiError(
        "Request timeout. The server took too long to respond.",
        408
      );
    }

    if (error instanceof ApiError) {
      throw error;
    }

    // Network error or fetch failed
    throw new ApiError(
      error.message || "Network connection error. Please try again.",
      0
    );
  }
}

