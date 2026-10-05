"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "@/components/ui/modal";
import { type Service, services } from "./data";
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

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Výběr služby jako řada přepínačů: vše je vidět najednou, žádný rozbalovací seznam
function ServicePicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[13px] font-medium text-neutral-300">Služba</legend>
      <div className="flex flex-wrap gap-2">
        {services.map((s) => {
          const Icon = s.icon;
          const active = s.id === value;
          return (
            <label key={s.id} className="relative cursor-pointer">
              <input
                type="radio"
                name="service"
                value={s.id}
                checked={active}
                onChange={() => onChange(s.id)}
                className="peer sr-only"
              />
              {active && (
                <motion.span
                  layoutId="service-pill"
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
              <span
                className={`relative flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-white/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface ${
                  active
                    ? "border-transparent text-neutral-950"
                    : "border-white/[0.09] text-neutral-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon className="size-3.5" />
                {s.title}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

type Errors = { email?: string; message?: string };

export function ContactModal({ service: initialService, onClose }: { service: Service; onClose: () => void }) {
  const [serviceId, setServiceId] = useState(initialService.id);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const { status, send } = useSend("/api/contact");
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const service = services.find((s) => s.id === serviceId) ?? initialService;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!email.trim()) next.email = "Doplň e-mail, ať ti mám kam odpovědět.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Tenhle e-mail nevypadá úplně správně.";
    if (!message.trim()) next.message = "Napiš mi aspoň pár vět, ať vím, o co jde.";
    setErrors(next);

    if (next.email) return emailRef.current?.focus();
    if (next.message) return messageRef.current?.focus();
    send({
      email: email.trim(),
      service: service.title,
      message: message.trim(),
      currentUrl: service.needsUrl && currentUrl.trim() ? currentUrl.trim() : undefined,
    });
  }

  return (
    <Modal
      title="S čím ti můžu pomoct?"
      description="Napiš mi pár vět o projektu a ozvu se ti do 24 hodin."
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
          <ServicePicker value={serviceId} onChange={setServiceId} />

          <Field id="contact-email" label="Tvůj e-mail" error={errors.email} className="mt-5">
            <input
              id="contact-email"
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
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={inputClass}
            />
          </Field>

          {/* Redesign a optimalizace dávají smysl jen s odkazem na stávající web */}
          <AnimatePresence initial={false}>
            {service.needsUrl && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="-mx-1.5 overflow-hidden px-1.5"
              >
                <Field id="contact-url" label="Současný web" hint="nepovinné" className="pt-5">
                  <input
                    id="contact-url"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    spellCheck={false}
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    placeholder="mojefirma.cz"
                    className={inputClass}
                  />
                </Field>
              </motion.div>
            )}
          </AnimatePresence>

          <Field id="contact-message" label="Co potřebuješ" error={errors.message} className="mt-5">
            <textarea
              id="contact-message"
              ref={messageRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((x) => ({ ...x, message: undefined }));
              }}
              onKeyDown={submitOnModEnter}
              placeholder="Pár vět o projektu, termínu nebo rozpočtu…"
              rows={4}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={`${inputClass} max-h-60 min-h-28 resize-none leading-relaxed [field-sizing:content]`}
            />
          </Field>

          <SendError show={status === "error"} />

          <SubmitButton sending={status === "sending"}>Odeslat poptávku</SubmitButton>
        </form>
      </FormStage>
    </Modal>
  );
}
