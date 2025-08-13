// src/lib/mailer.ts
import { EmailTemplate } from "@/app/assets/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendMemoryEmailParams {
  email: string;
  name: string;
  eventName?: string;
  message?: string;
  imageUrl: string;
  downloadLink?: string;
}

export async function sendMemoryEmail({
  email,
  name,
  eventName = "Our Event",
  message = "Thank you for joining us! Here's your memory.",
  imageUrl,
  downloadLink = imageUrl, // Default to imageUrl if not provided
}: SendMemoryEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not defined");
    }

    const { data, error } = await resend.emails.send({
      from: "Memory Wall <memories@yourdomain.com>",
      to: email,
      subject: `Your Memory from ${eventName}`,
      react: EmailTemplate({
        name,
        eventName,
        imageUrl,
        message,
        downloadLink,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully:", data?.id);
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Example usage:
/*
await sendMemoryEmail({
  email: "user@example.com",
  userName: "John Doe",
  eventName: "Summer Festival 2024",
  photoUrl: "https://example.com/photo.jpg",
  message: "Thanks for joining us! Here's your memory.",
});
*/