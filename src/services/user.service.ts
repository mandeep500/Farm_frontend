import { apiClient, ApiError } from "./api-client";
import { storage } from "../lib/storage";
import { UpdateProfilePayload, UserProfileResponse } from "../types/user.types";
import { User } from "../types/auth.types";

export const userService = {
  async getProfile(): Promise<User> {
    try {
      const response = await apiClient<UserProfileResponse>("/user/profile");
      if (response.data?.user) {
        storage.setUser(response.data.user);
        return response.data.user;
      }
      throw new ApiError("Failed to fetch user profile", 500);
    } catch (err: any) {
      if (err.statusCode === 0) {
        const currentUser = storage.getUser();
        if (currentUser) return currentUser;
        throw new ApiError("No active profile found", 404);
      }
      throw err;
    }
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<User> {
    try {
      const response = await apiClient<UserProfileResponse>("/user/profile", {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (response.data?.user) {
        storage.setUser(response.data.user);
        return response.data.user;
      }
      throw new ApiError("Failed to update profile", 500);
    } catch (err: any) {
      if (err.statusCode === 0) {
        await new Promise((resolve) => setTimeout(resolve, 700));
        const currentUser = storage.getUser();
        const updatedUser: User = {
          id: currentUser?.id || "usr_demo",
          email: currentUser?.email || "harman@sekhonfarm.com",
          name: payload.name,
          phone: payload.phone,
          role: currentUser?.role || "FARM_PATRON",
          status: currentUser?.status || "ACTIVE",
          memberSince: currentUser?.memberSince || new Date().toISOString(),
          lastLogin: currentUser?.lastLogin || new Date().toISOString(),
          bio: payload.bio,
        };

        storage.setUser(updatedUser);
        return updatedUser;
      }
      throw err;
    }
  },
};

