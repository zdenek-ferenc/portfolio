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
  inputShellClass,
  useSend,
} from "./form-kit";

// "https://www.mojefirma.cz/kontakt" -> "mojefirma.cz"
export function prettyDomain(url: string) {
  return url
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#]/)[0];
}

type Errors = { url?: string; email?: string };

export function AuditModal({
  initialUrl = "",
  onClose,
}: {
  initialUrl?: string;
  onClose: () => void;
}) {
  // Prefix https:// je vykreslený vedle pole, v hodnotě ho nechceme dvakrát
  const [url, setUrl] = useState(initialUrl.replace(/^https?:\/\//i, ""));
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const { status, send } = useSend("/api/audit");
  const urlRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const domain = prettyDomain(url);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!domain || !domain.includes(".")) next.url = "Doplň adresu webu, třeba mojefirma.cz.";
    if (!email.trim()) next.email = "Doplň e-mail, kam ti pošlu výsledek.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Tenhle e-mail nevypadá úplně správně.";
    setErrors(next);

    if (next.url) return urlRef.current?.focus();
    if (next.email) return emailRef.current?.focus();
    send({ email: email.trim(), url: url.trim() });
  }

  return (
    <Modal
      title="Audit webu zdarma"
      description="Projdu design i rychlost a pošlu ti, co bych zlepšil jako první. Bez závazků."
      onClose={onClose}
      // Adresa už je vyplněná z karty, takže stačí doplnit e-mail
      initialFocus={initialUrl ? emailRef : urlRef}
    >
      <FormStage
        done={status === "sent"}
        success={
          <Success title="Mám to." onClose={onClose}>
            Projdu <span className="font-medium text-white">{domain}</span> a výsledek ti pošlu na{" "}
            <span className="font-medium text-white break-all">{email.trim()}</span>.
          </Success>
        }
      >
        <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 pt-6 sm:px-7 sm:pb-7">
          <Field id="audit-url" label="Web k auditu" error={errors.url}>
            <div className={inputShellClass}>
              <span aria-hidden className="select-none text-base text-neutral-500 sm:text-[15px]">
                https://
              </span>
              <input
                id="audit-url"
                ref={urlRef}
                type="text"
                inputMode="url"
                autoComplete="url"
                spellCheck={false}
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value.replace(/^https?:\/\//i, ""));
                  if (errors.url) setErrors((x) => ({ ...x, url: undefined }));
                }}
                placeholder="mojefirma.cz"
                aria-invalid={!!errors.url}
                aria-describedby={errors.url ? "audit-url-error" : undefined}
                className="min-w-0 flex-1 bg-transparent py-3 pl-0.5 text-base text-white caret-accent outline-none placeholder:text-neutral-500 sm:text-[15px]"
              />
            </div>
          </Field>

          <Field id="audit-email" label="Kam poslat výsledek" error={errors.email} className="mt-5">
            <input
              id="audit-email"
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
              aria-describedby={errors.email ? "audit-email-error" : undefined}
              className={inputClass}
            />
          </Field>

          <SendError show={status === "error"} />

          <SubmitButton sending={status === "sending"}>Chci audit zdarma</SubmitButton>
        </form>
      </FormStage>
    </Modal>
  );
}
