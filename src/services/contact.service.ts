import { ContactPayload, ContactResponse } from "../types/contact.types";
import { ApiResponse } from "../types/api.types";

export const contactService = {
  async submitContact(
    payload: ContactPayload & { website?: string; hp_field?: string; _renderedAt?: number }
  ): Promise<ApiResponse<ContactResponse>> {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    // 1. Try Express/Node.js backend first
    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, "")}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        return {
          success: true,
          message: data.message || "Thank you! Your message has been sent successfully.",
          data: data.data,
        };
      } else if (!res.ok && data.message) {
        throw new Error(data.message);
      }
    } catch (backendErr: any) {
      // If server returned a business error (e.g. rate limit or validation), rethrow it
      if (backendErr.message && !backendErr.message.includes("fetch")) {
        throw backendErr;
      }
      console.warn("[ContactService] Backend direct connection attempt failed, trying local API route...", backendErr.message);
    }

    // 2. Fallback to Next.js API route
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        return {
          success: true,
          message: data.message || "Thank you! Your message has been sent successfully.",
          data: data.data,
        };
      } else {
        throw new Error(data.message || "Failed to deliver message. Please try again.");
      }
    } catch (apiErr: any) {
      throw new Error(apiErr.message || "Unable to send inquiry. Please check your connection and try again.");
    }
  },
};
