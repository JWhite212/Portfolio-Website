"use server";

import ContactFormEmail from "@/email/contact-form-email";
import { contactConfig } from "@/lib/content";
import type { ContactFormState } from "@/lib/types";
import {
  getErrorMessage,
  MESSAGE_MAX_LENGTH,
  validateEmail,
  validateString,
} from "@/lib/utils";
import React from "react";
import { Resend } from "resend";

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

  const safeSenderEmail =
    typeof senderEmail === "string" ? senderEmail.trim() : "";
  const safeMessage = typeof message === "string" ? message.trim() : "";

  try {
    await resend.emails.send({
      from: runtimeConfig.from,
      to: runtimeConfig.to,
      subject: "New portfolio enquiry",
      reply_to: safeSenderEmail,
      react: React.createElement(ContactFormEmail, {
        message: safeMessage,
        senderEmail: safeSenderEmail,
      }),
    });

    return {
      status: "success",
      message: "Thanks for reaching out. Your message has been sent.",
    };
  } catch (error: unknown) {
    return {
      status: "error",
      message: getErrorMessage(error),
    };
  }
}
