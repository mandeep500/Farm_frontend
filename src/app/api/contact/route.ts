import { NextRequest, NextResponse } from "next/server";

const TARGET_EMAIL = "mandeepsekhon0052@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Full Name, Email Address, and Message are required.",
        },
        { status: 400 }
      );
    }

    const ticketId = `SF-${Math.floor(100000 + Math.random() * 900000)}`;

    // Prepare email payload for FormSubmit
    const emailPayload = {
      name,
      email,
      phone: phone || "Not provided",
      message,
      ticketId,
      submittedAt: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      _subject: `🌾 New Sekhon Farm Inquiry from ${name} [${ticketId}]`,
      _replyto: email,
      _template: "table",
      _captcha: "false",
    };

    let emailSent = false;

    // 1. Send via FormSubmit service directly to Mandeep's Gmail
    try {
      const formSubmitRes = await fetch(
        `https://formsubmit.co/ajax/${TARGET_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(emailPayload),
        }
      );

      if (formSubmitRes.ok) {
        emailSent = true;
      }
    } catch (emailErr) {
      console.warn("FormSubmit delivery warning:", emailErr);
    }

    // 2. Also try backend DB persistence if backend is reachable
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      await fetch(`${backendUrl.replace(/\/$/, "")}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      }).catch(() => {});
    } catch {
      // Backend is optional
    }

    return NextResponse.json(
      {
        success: true,
        message: `Thank you, ${name}! Your inquiry has been sent directly to ${TARGET_EMAIL}. Our agricultural team will be in touch within 24 hours.`,
        data: {
          received: true,
          ticketId,
          emailSent,
          targetEmail: TARGET_EMAIL,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to process contact inquiry.",
      },
      { status: 500 }
    );
  }
}

