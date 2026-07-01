import { NextResponse } from "next/server";

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();
    const { name, email, subject, message } = body;

    const errors: string[] = [];
    if (!name?.trim()) errors.push("Name is required");
    if (!email?.trim()) errors.push("Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push("Invalid email format");
    if (!subject?.trim()) errors.push("Subject is required");
    if (!message?.trim()) errors.push("Message is required");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Server email configuration is incomplete. Please email directly at olanrewajulanlehin5@gmail.com" },
        { status: 500 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const fromAddress = process.env.RESEND_FROM || "onboarding@resend.dev";
    const toAddress = "olanrewajulanlehin5@gmail.com";

    await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
    });

    await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: `Re: ${subject}`,
      text: `Hi ${name},\n\nThank you for reaching out to Olanrewaju Lanlehin. Your message has been received and Olanrewaju will be in touch with you shortly.\n\n— Olanrewaju Lanlehin, Project Manager`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email directly at olanrewajulanlehin5@gmail.com" },
      { status: 500 }
    );
  }
}
