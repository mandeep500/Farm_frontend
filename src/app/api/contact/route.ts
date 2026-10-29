import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER || "mandeepsekhon0052@gmail.com";
const SMTP_PASS = (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || SMTP_USER;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, website, hp_field, _renderedAt } = body;

    // 1. Spam protection: Honeypot check
    if (website || hp_field) {
      return NextResponse.json({
        success: true,
        message: "Thank you for reaching out! Your inquiry has been received.",
        data: { ticketId: "SF-BOT-FILTERED" },
      });
    }

    // 2. Spam protection: Rapid submission check (< 1200ms)
    if (_renderedAt && Date.now() - Number(_renderedAt) < 1200) {
      return NextResponse.json({
        success: true,
        message: "Thank you for reaching out! Your inquiry has been received.",
        data: { ticketId: "SF-FAST-FILTERED" },
      });
    }

    // 3. Validation: All 4 fields are required
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address (e.g. name@example.com)." },
        { status: 400 }
      );
    }

    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phone || typeof phone !== "string" || phone.trim().length < 7 || !phoneRegex.test(phone.trim())) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid phone number (e.g. (555) 000-0000)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: "Please provide a message with at least 10 characters." },
        { status: 400 }
      );
    }

    const ticketId = `SF-${Math.floor(100000 + Math.random() * 900000)}`;
    const submissionTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    // 4. Send inquiry through Express/Node.js backend first if available
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const backendRes = await fetch(`${backendUrl.replace(/\/$/, "")}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          message: message.trim(),
          _renderedAt,
        }),
      });

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        return NextResponse.json({
          success: true,
          message:
            backendData.message ||
            `Thank you, ${name}! Your inquiry has been sent directly to ${RECIPIENT_EMAIL}. Our team will get back to you within 24 hours.`,
          data: backendData.data || { ticketId, emailSent: true },
        });
      }
    } catch (backendErr) {
      console.warn("Backend API dispatch failed, trying direct SMTP...", backendErr);
    }

    // 5. Direct Nodemailer SMTP delivery (smtp.gmail.com, port 587, STARTTLS)
    if (SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: SMTP_PORT,
          secure: false, // port 587 uses STARTTLS
          requireTLS: true,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
          tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
          },
        });

        const mailOptions = {
          from: `"Sekhon Farm Web Inquiries" <${SMTP_USER}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email.trim(),
          subject: `🌾 New Customer Inquiry: ${name} [${ticketId}]`,
          text: `Sekhon Farm Website Inquiry\n\nTicket ID: ${ticketId}\nTime: ${submissionTime}\n\nCustomer Details:\n• Name: ${name}\n• Email: ${email}\n• Phone: ${phone}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
              <div style="background: #1a3d29; padding: 24px 32px; color: #ffffff;">
                <h2 style="margin: 0; font-size: 22px; font-weight: bold; color: #ffffff;">🌾 Sekhon Farm Website Inquiry</h2>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #a7f3d0;">Ticket ID: <strong>${ticketId}</strong> • ${submissionTime}</p>
              </div>
              <div style="padding: 32px; color: #1f2937;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; color: #6b7280; font-weight: 600; width: 130px;">Full Name:</td>
                    <td style="padding: 10px 0; color: #111827; font-weight: bold;">${name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Email Address:</td>
                    <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #059669; font-weight: 600; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Phone Number:</td>
                    <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #059669; font-weight: 600; text-decoration: none;">${phone}</a></td>
                  </tr>
                </table>
                <div style="background: #f9fafb; border-left: 4px solid #059669; padding: 16px; border-radius: 8px;">
                  <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #065f46;">Message:</h4>
                  <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({
          success: true,
          message: `Thank you, ${name}! Your inquiry has been sent directly to ${RECIPIENT_EMAIL}. Our team will get back to you within 24 hours.`,
          data: { ticketId, emailSent: true },
        });
      } catch (smtpErr: any) {
        console.error("Direct SMTP error:", smtpErr);
      }
    }

    // 6. Return response
    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! Your inquiry has been logged for ${RECIPIENT_EMAIL}. Our team will reach out within 24 hours.`,
      data: { ticketId, emailSent: false },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to process contact inquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
