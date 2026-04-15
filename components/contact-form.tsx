"use client";

import { sendEmail } from "@/actions/sendEmail";
import MagneticButton from "@/components/magnetic-button";
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
    <MagneticButton>
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "inline-flex items-center justify-center gap-3 px-5 py-3 text-sm font-bold transition-all duration-200",
          "bg-[var(--accent)] text-[var(--background)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}>
        {pending ? "Sending..." : "Send message"}
        <BsArrowRight
          className="text-xs"
          aria-hidden="true"
        />
      </button>
    </MagneticButton>
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
      aria-label="Contact form"
      className="space-y-6 border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-6">
      <div>
        <label
          htmlFor="senderEmail"
          className="block font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          &gt; Email
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
          aria-describedby={
            state.fieldErrors?.senderEmail ? "senderEmail-error" : undefined
          }
          className={cn(
            "mt-2 h-12 w-full border-b-brutal bg-transparent px-0 font-mono text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition-colors",
            "border-[var(--line-strong)] focus:border-[var(--accent)]",
            state.fieldErrors?.senderEmail &&
              "border-[var(--error)] focus:border-[var(--error)]",
          )}
          placeholder="name@example.com"
        />
        {state.fieldErrors?.senderEmail ? (
          <p
            id="senderEmail-error"
            className="mt-2 font-mono text-xs text-[var(--error)]">
            [ERR] {state.fieldErrors.senderEmail}
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
          className="block font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          &gt; Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={MESSAGE_MAX_LENGTH}
          rows={7}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
          className={cn(
            "mt-2 w-full border-b-brutal bg-transparent px-0 py-3 font-mono text-sm leading-7 text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition-colors",
            "border-[var(--line-strong)] focus:border-[var(--accent)]",
            state.fieldErrors?.message &&
              "border-[var(--error)] focus:border-[var(--error)]",
          )}
          placeholder="Tell me a little about the role, project, or reason for reaching out."
        />
        {state.fieldErrors?.message ? (
          <p
            id="message-error"
            className="mt-2 font-mono text-xs text-[var(--error)]">
            [ERR] {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 border-t-brutal border-[var(--line-strong)] pt-4">
        <p
          className={cn(
            "font-mono text-xs leading-7",
            state.status === "error"
              ? "text-[var(--error)]"
              : state.status === "success"
                ? "text-[var(--accent)]"
                : "text-[var(--muted)]",
          )}
          aria-live="polite">
          {state.status === "success"
            ? "[OK] " + state.message
            : state.status === "error"
              ? "[ERR] " + state.message
              : "// Your message goes directly to my inbox."}
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
