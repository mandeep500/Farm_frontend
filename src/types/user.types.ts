import { User } from "./auth.types";

export interface UpdateProfilePayload {
  name: string;
  phone: string;
  bio?: string;
}

export interface UserProfileResponse {
  user: User;
}

