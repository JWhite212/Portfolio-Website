"use server";

import ContactFormEmail from "@/email/contact-form-email";
import { contactConfig } from "@/lib/content";
import type { ContactFormState } from "@/lib/types";
import {
  EMAIL_MAX_LENGTH,
  getErrorMessage,
  MESSAGE_MAX_LENGTH,
  validateEmail,
  validateString,
} from "@/lib/utils";
import React from "react";
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
      react: React.createElement(ContactFormEmail, {
        message: safeMessage,
        senderEmail: safeSenderEmail,
      }),
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
