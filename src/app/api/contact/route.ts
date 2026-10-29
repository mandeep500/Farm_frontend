import { NextRequest, NextResponse } from "next/server";

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

    // 4. Forward inquiry directly to Node.js / Express backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    const endpoint = `${backendUrl.replace(/\/$/, "")}/contact`;

    try {
      const backendRes = await fetch(endpoint, {
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

      const backendData = await backendRes.json();

      if (backendRes.ok) {
        return NextResponse.json({
          success: true,
          message:
            backendData.message ||
            `Thank you, ${name}! Your inquiry has been sent directly to our team. We will get back to you within 24 hours.`,
          data: backendData.data,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            message: backendData.message || "Failed to deliver contact inquiry.",
          },
          { status: backendRes.status }
        );
      }
    } catch (fetchErr: any) {
      console.error("[Contact Route] Failed to connect to backend server:", fetchErr.message);
      return NextResponse.json(
        {
          success: false,
          message: "Backend service unreachable. Please ensure the backend server is running.",
        },
        { status: 503 }
      );
    }
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
