export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactResponse {
  received: boolean;
  ticketId?: string;
  message: string;
}

