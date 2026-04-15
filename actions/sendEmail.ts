"use server";

import { contactConfig } from "@/lib/content";
import type { ContactFormState } from "@/lib/types";
import {
  EMAIL_MAX_LENGTH,
  getErrorMessage,
  MESSAGE_MAX_LENGTH,
  validateEmail,
  validateString,
} from "@/lib/utils";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(key) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length === 0) {
    rateLimitMap.delete(key);
  }

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(key, recent);
    return true;
  }

  recent.push(now);
  rateLimitMap.set(key, recent);
  return false;
}

function getContactRuntimeConfig() {
  const isProduction = process.env.NODE_ENV === "production";
  const from =
    process.env.PORTFOLIO_CONTACT_FROM ??
    "Portfolio Contact <onboarding@resend.dev>";
  const to = process.env.PORTFOLIO_CONTACT_TO ?? contactConfig.email;

  if (isProduction) {
    if (!process.env.RESEND_API_KEY) {
      return {
        error: "Email delivery is not configured for production.",
      };
    }

    if (
      !process.env.PORTFOLIO_CONTACT_FROM ||
      !process.env.PORTFOLIO_CONTACT_TO
    ) {
      return {
        error: "Portfolio contact email settings are incomplete.",
      };
    }
  }

  return { from, to };
}

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(senderEmail: string, message: string): string {
  const safeEmail = escapeHtml(senderEmail);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>New portfolio enquiry</title>
  </head>
  <body style="margin:0;padding:40px 24px;background:#f2eee6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#151a19;">
    <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #d5d0c6;border-radius:24px;padding:32px;">
      <p style="margin:0;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#5d635f;">Portfolio enquiry</p>
      <h1 style="margin:16px 0 0 0;font-size:28px;font-weight:600;line-height:1.15;color:#151a19;">New message from the portfolio contact form</h1>
      <p style="margin:16px 0 0 0;font-size:15px;line-height:1.6;color:#47504b;">Sender: <strong>${safeEmail}</strong></p>
      <hr style="margin:24px 0;border:none;border-top:1px solid #d5d0c6;">
      <p style="margin:0;font-size:15px;line-height:1.75;color:#151a19;">${safeMessage}</p>
    </div>
  </body>
</html>`;
}

function buildEmailText(senderEmail: string, message: string): string {
  return `New message from the portfolio contact form\n\nSender: ${senderEmail}\n\n---\n\n${message}`;
}

export async function sendEmail(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    const senderEmail = formData.get("senderEmail");
    const message = formData.get("message");
    const honeypot = formData.get("company");

    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      return {
        status: "success",
        message: "Thanks. Your message has been queued.",
      };
    }

    const fieldErrors: ContactFormState["fieldErrors"] = {};

    if (!validateEmail(senderEmail)) {
      fieldErrors.senderEmail = "Please enter a valid email address.";
    }

    if (!validateString(message, MESSAGE_MAX_LENGTH)) {
      fieldErrors.message =
        "Please enter a message before sending. Keep it under 2000 characters.";
    }

    if (fieldErrors.senderEmail || fieldErrors.message) {
      return {
        status: "error",
        message: "Please fix the highlighted fields and try again.",
        fieldErrors,
      };
    }

    const safeSenderEmail =
      typeof senderEmail === "string" ? senderEmail.trim() : "";
    const safeMessage = typeof message === "string" ? message.trim() : "";

    if (safeSenderEmail.length > EMAIL_MAX_LENGTH) {
      return {
        status: "error",
        message: "Email address is too long.",
        fieldErrors: { senderEmail: "Email address exceeds maximum length." },
      };
    }

    if (safeMessage.length > MESSAGE_MAX_LENGTH) {
      return {
        status: "error",
        message: "Message is too long.",
        fieldErrors: { message: "Message exceeds maximum length." },
      };
    }

    if (isRateLimited(safeSenderEmail)) {
      return {
        status: "error",
        message: "Too many messages sent. Please try again later.",
      };
    }

    const runtimeConfig = getContactRuntimeConfig();

    if ("error" in runtimeConfig) {
      return {
        status: "error",
        message: runtimeConfig.error,
      };
    }

    const resend = getResendClient();

    if (!resend) {
      return {
        status: "error",
        message:
          "Email delivery is not configured in this environment. You can still reach me directly by email.",
      };
    }

    const result = await resend.emails.send({
      from: runtimeConfig.from,
      to: runtimeConfig.to,
      subject: "New portfolio enquiry",
      replyTo: safeSenderEmail,
      html: buildEmailHtml(safeSenderEmail, safeMessage),
      text: buildEmailText(safeSenderEmail, safeMessage),
    });

    if (result.error) {
      console.error("[sendEmail] Resend returned error:", result.error);
      return {
        status: "error",
        message: result.error.message ?? "Email delivery failed.",
      };
    }

    return {
      status: "success",
      message: "Thanks for reaching out. Your message has been sent.",
    };
  } catch (error: unknown) {
    console.error(
      "[sendEmail] Unhandled error:",
      error instanceof Error ? error.stack : error,
    );
    return {
      status: "error",
      message: getErrorMessage(error),
    };
  }
}
