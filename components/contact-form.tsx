"use client";

import { sendEmail } from "@/actions/sendEmail";
import type { ContactFormState } from "@/lib/types";
import { EMAIL_MAX_LENGTH, MESSAGE_MAX_LENGTH, cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { BsArrowRight } from "react-icons/bs";

const initialState: ContactFormState = {
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-medium transition-all duration-200",
        "bg-[var(--accent-strong)] text-white hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
        "disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70",
      )}>
      {pending ? "Sending..." : "Send message"}
      <BsArrowRight className="text-xs" />
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_16px_40px_rgba(15,20,18,0.05)]">
      <div>
        <label
          htmlFor="senderEmail"
          className="block text-sm font-medium text-[var(--foreground)]">
          Email
        </label>
        <input
          id="senderEmail"
          type="email"
          name="senderEmail"
          autoComplete="email"
          inputMode="email"
          maxLength={EMAIL_MAX_LENGTH}
          required
          aria-invalid={Boolean(state.fieldErrors?.senderEmail)}
          className={cn(
            "mt-2 h-12 w-full rounded-2xl border bg-white px-4 text-sm text-[var(--foreground)] outline-none transition-colors",
            "border-[var(--line)] focus:border-[var(--accent)]",
            state.fieldErrors?.senderEmail &&
              "border-[#b54747] focus:border-[#b54747]",
          )}
          placeholder="name@example.com"
        />
        {state.fieldErrors?.senderEmail ? (
          <p className="mt-2 text-sm text-[#b54747]">
            {state.fieldErrors.senderEmail}
          </p>
        ) : null}
      </div>

      <div
        className="hidden"
        aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[var(--foreground)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={MESSAGE_MAX_LENGTH}
          rows={7}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          className={cn(
            "mt-2 w-full rounded-[1.5rem] border bg-white px-4 py-3 text-sm leading-7 text-[var(--foreground)] outline-none transition-colors",
            "border-[var(--line)] focus:border-[var(--accent)]",
            state.fieldErrors?.message &&
              "border-[#b54747] focus:border-[#b54747]",
          )}
          placeholder="Tell me a little about the role, project, or reason for reaching out."
        />
        {state.fieldErrors?.message ? (
          <p className="mt-2 text-sm text-[#b54747]">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
        <p
          className={cn(
            "text-sm leading-7",
            state.status === "error"
              ? "text-[#9d3b3b]"
              : state.status === "success"
                ? "text-[var(--accent-strong)]"
                : "text-[var(--muted)]",
          )}
          aria-live="polite">
          {state.message ?? "Your message goes directly to my inbox."}
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
