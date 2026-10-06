"use client";

import { useRef, useState } from "react";
import { Modal } from "@/components/ui/modal";
import {
  EMAIL_RE,
  Field,
  FormStage,
  SendError,
  SubmitButton,
  Success,
  inputClass,
  submitOnModEnter,
  useSend,
} from "./form-kit";

type Errors = { email?: string; message?: string };

export function GeneralContactModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const { status, send } = useSend("/api/contact");
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!email.trim()) next.email = "Doplň e-mail, ať ti mám kam odpovědět.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Tenhle e-mail nevypadá úplně správně.";
    if (!message.trim()) next.message = "Zpráva je zatím prázdná.";
    setErrors(next);

    if (next.email) return emailRef.current?.focus();
    if (next.message) return messageRef.current?.focus();
    send({ email: email.trim(), service: "Obecný dotaz", message: message.trim() });
  }

  return (
    <Modal
      title="Napiš mi"
      description="Ať už máš otázku, nebo chceš jen tak pozdravit."
      onClose={onClose}
      initialFocus={emailRef}
    >
      <FormStage
        done={status === "sent"}
        success={
          <Success title="Odesláno." onClose={onClose}>
            Díky za zprávu. Ozvu se ti co nejdřív na{" "}
            <span className="font-medium text-white break-all">{email.trim()}</span>.
          </Success>
        }
      >
        <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 pt-6 sm:px-7 sm:pb-7">
          <Field id="general-email" label="Tvůj e-mail" error={errors.email}>
            <input
              id="general-email"
              ref={emailRef}
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((x) => ({ ...x, email: undefined }));
              }}
              placeholder="tvuj@email.cz"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "general-email-error" : undefined}
              className={inputClass}
            />
          </Field>

          <Field id="general-message" label="Zpráva" error={errors.message} className="mt-5">
            <textarea
              id="general-message"
              ref={messageRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((x) => ({ ...x, message: undefined }));
              }}
              onKeyDown={submitOnModEnter}
              placeholder="Co mi chceš napsat?"
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "general-message-error" : undefined}
              className={`${inputClass} max-h-72 min-h-36 resize-none leading-relaxed [field-sizing:content]`}
            />
          </Field>

          <SendError show={status === "error"} />

          <SubmitButton sending={status === "sending"}>Odeslat zprávu</SubmitButton>
        </form>
      </FormStage>
    </Modal>
  );
}
