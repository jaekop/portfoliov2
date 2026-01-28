import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !message.trim() ||
    !emailRegex.test(email)
  ) {
    return NextResponse.json(
      { message: "Please provide a valid name, email, and message." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({
      message: "Resend key missing. Message queued locally.",
      mocked: true,
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toAddress = process.env.CONTACT_TO || "hello@example.com";

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [toAddress],
      reply_to: email,
      subject: `New message from ${name}`,
      text: message,
    });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send message." },
      { status: 500 }
    );
  }
}
