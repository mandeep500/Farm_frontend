import { apiClient, ApiError } from "./api-client";
import { storage } from "../lib/storage";
import {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  User,
} from "../types/auth.types";
import { ApiResponse } from "../types/api.types";

const DEMO_USER: User = {
  id: "usr_sekhon_01",
  name: "Harman Sekhon",
  email: "harman@sekhonfarm.com",
  phone: "+1 (555) 735-4661",
  role: "FARM_PATRON",
  status: "ACTIVE",
  memberSince: "2023-04-12T10:00:00.000Z",
  lastLogin: new Date().toISOString(),
  bio: "Passionate about organic farming, heirloom grain varieties, and regenerative agriculture.",
};

const MOCK_REGISTERED_EMAILS = new Set([
  "exists@sekhonfarm.com",
  "demo@sekhonfarm.com",
  "harman@sekhonfarm.com",
]);

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const response = await apiClient<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.data) {
        storage.setToken(response.data.token);
        storage.setUser(response.data.user);
        return response.data;
      }
      throw new ApiError("Invalid response from server", 500);
    } catch (err: any) {
      // If backend is not yet running (e.g. offline/network code 0), provide seamless API-ready mock fallback
      if (err.statusCode === 0) {
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Allow demo user or any existing mock user
        const storedUser = storage.getUser();
        const user: User =
          storedUser && storedUser.email.toLowerCase() === payload.email.toLowerCase()
            ? { ...storedUser, lastLogin: new Date().toISOString() }
            : {
                ...DEMO_USER,
                email: payload.email,
                lastLogin: new Date().toISOString(),
              };

        const mockResponse: AuthResponse = {
          user,
          token: `mock_jwt_sekhon_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        };

        storage.setToken(mockResponse.token);
        storage.setUser(mockResponse.user);
        return mockResponse;
      }
      throw err;
    }
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      const response = await apiClient<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.data) {
        storage.setToken(response.data.token);
        storage.setUser(response.data.user);
        return response.data;
      }
      throw new ApiError("Invalid response from server", 500);
    } catch (err: any) {
      if (err.statusCode === 0) {
        await new Promise((resolve) => setTimeout(resolve, 900));

        // Requirement 29: Support backend error "Account already exists. Please login."
        if (
          payload.email.toLowerCase() === "exists@sekhonfarm.com" ||
          MOCK_REGISTERED_EMAILS.has(payload.email.toLowerCase())
        ) {
          throw new ApiError(
            "Account already exists. Please login.",
            409,
            { email: "An account with this email is already registered." }
          );
        }

        const newUser: User = {
          id: `usr_${Date.now()}`,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          role: "FARM_PATRON",
          status: "ACTIVE",
          memberSince: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          bio: "Welcome to Sekhon Farm community!",
        };

        const mockResponse: AuthResponse = {
          user: newUser,
          token: `mock_jwt_sekhon_${Date.now()}`,
        };

        storage.setToken(mockResponse.token);
        storage.setUser(mockResponse.user);
        MOCK_REGISTERED_EMAILS.add(payload.email.toLowerCase());

        return mockResponse;
      }
      throw err;
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient("/auth/logout", {
        method: "POST",
      }).catch(() => {});
    } finally {
      storage.clearAuth();
    }
  },

  async forgotPassword(
    payload: ForgotPasswordPayload
  ): Promise<ApiResponse<{ sent: boolean }>> {
    try {
      const response = await apiClient<{ sent: boolean }>(
        "/auth/forgot-password",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      return response;
    } catch (err: any) {
      if (err.statusCode === 0) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return {
          success: true,
          message: "Password reset instructions have been sent to your email.",
          data: { sent: true },
        };
      }
      throw err;
    }
  },

  async resetPassword(
    payload: ResetPasswordPayload
  ): Promise<ApiResponse<{ reset: boolean }>> {
    try {
      const response = await apiClient<{ reset: boolean }>(
        "/auth/reset-password",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      return response;
    } catch (err: any) {
      if (err.statusCode === 0) {
        await new Promise((resolve) => setTimeout(resolve, 900));
        return {
          success: true,
          message:
            "Your password has been successfully reset. Please log in with your new credentials.",
          data: { reset: true },
        };
      }
      throw err;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    const token = storage.getToken();
    if (!token) return null;

    try {
      const response = await apiClient<{ user: User }>("/auth/me");
      if (response.data?.user) {
        storage.setUser(response.data.user);
        return response.data.user;
      }
      return null;
    } catch (err: any) {
      if (err.statusCode === 0) {
        // Fallback to local stored user
        return storage.getUser() || DEMO_USER;
      }
      if (err.statusCode === 401) {
        storage.clearAuth();
        return null;
      }
      return storage.getUser();
    }
  },
};

