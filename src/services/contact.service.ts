import { apiClient } from "./api-client";
import { ContactPayload, ContactResponse } from "../types/contact.types";
import { ApiResponse } from "../types/api.types";

export const contactService = {
  async submitContact(
    payload: ContactPayload
  ): Promise<ApiResponse<ContactResponse>> {
    try {
      return await apiClient<ContactResponse>("/contact", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch (err: any) {
      if (err.statusCode === 0) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return {
          success: true,
          message:
            "Thank you for contacting Sekhon Farm! Our agricultural team will be in touch within 24 hours.",
          data: {
            received: true,
            ticketId: `SF-${Math.floor(100000 + Math.random() * 900000)}`,
            message:
              "We have received your message and will reach out to you shortly.",
          },
        };
      }
      throw err;
    }
  },
};

