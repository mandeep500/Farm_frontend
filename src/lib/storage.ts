import { APP_CONFIG } from "./constants";
import { User } from "../types/auth.types";

export const storage = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(APP_CONFIG.storageKeys.token);
    } catch {
      return null;
    }
  },

  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(APP_CONFIG.storageKeys.token, token);
    } catch (e) {
      console.warn("Unable to save token to localStorage", e);
    }
  },

  removeToken: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(APP_CONFIG.storageKeys.token);
    } catch (e) {
      console.warn("Unable to remove token from localStorage", e);
    }
  },

  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(APP_CONFIG.storageKeys.user);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: User): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(APP_CONFIG.storageKeys.user, JSON.stringify(user));
    } catch (e) {
      console.warn("Unable to save user to localStorage", e);
    }
  },

  removeUser: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(APP_CONFIG.storageKeys.user);
    } catch (e) {
      console.warn("Unable to remove user from localStorage", e);
    }
  },

  clearAuth: (): void => {
    storage.removeToken();
    storage.removeUser();
  },
};

