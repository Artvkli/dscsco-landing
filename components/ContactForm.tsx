"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import {
  BRANCH_OPTIONS,
  EMPTY_LEAD,
  LEAD_FIELDS,
  OPTIONAL_FIELDS,
  validateLead,
  type LeadErrors,
  type LeadField,
  type LeadInput,
} from "@/lib/validation";
import { AlertIcon, ArrowIcon, CheckIcon, ChevronDownIcon } from "./icons";

type FormDict = Dictionary["form"];
type Status = "idle" | "submitting" | "success" | "error";

/**
 * Short consultation form.
 * Step 1 (always visible): name, company, phone — enough for a specialist to call back.
 * Optional details (collapsed): email, country, number of branches, message.
 */
export default function ContactForm({ f, locale }: { f: FormDict; locale: Locale }) {
  const [values, setValues] = useState<LeadInput>(EMPTY_LEAD);
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverErrors, setServerErrors] = useState<LeadErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [more, setMore] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const detailsId = useId();

  const errors: LeadErrors = tried ? { ...serverErrors, ...validateLead(values) } : {};
  const hasErrors = Object.keys(errors).length > 0;

  const update = (field: LeadField) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (serverErrors[field]) setServerErrors((s) => ({ ...s, [field]: undefined }));
  };

  const focusFirstError = (errs: LeadErrors) => {
    const first = LEAD_FIELDS.find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#f-${first}`)?.focus();
  };

  const showErrors = (errs: LeadErrors) => {
    setTried(true);
    if (OPTIONAL_FIELDS.some((k) => errs[k])) setMore(true); // reveal the optional panel if an error is inside it
    requestAnimationFrame(() => focusFirstError(errs));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const errs = validateLead(values);
    if (Object.keys(errs).length) return showErrors(errs);

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, locale, website: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: LeadErrors };

      if (res.ok && data.ok) {
        setStatus("success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (res.status === 422 && data.errors) {
        setServerErrors(data.errors);
        setStatus("idle");
        showErrors(data.errors);
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues(EMPTY_LEAD);
    setTried(false);
    setServerErrors({});
    setMore(false);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="success" role="status">
        <span className="success-ico"><CheckIcon size={36} sw={2.2} /></span>
        <h3 ref={successRef} tabIndex={-1}>{f.okT}</h3>
        <p className="lead">{f.okD}</p>
        <button type="button" className="btn btn-dark" onClick={reset}>{f.again}</button>
      </div>
    );
  }

  const fieldProps = (k: LeadField) => ({
    id: `f-${k}`,
    name: k,
    value: values[k],
    onChange: update(k),
    className: "field",
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });

  const errorText = (k: LeadField) =>
    errors[k] ? (
      <p className="err" id={`e-${k}`}>
        <AlertIcon size={15} />
        {f.e[errors[k]!]}
      </p>
    ) : null;

  const label = (k: LeadField, text: string, required: boolean) => (
    <label className="lbl" htmlFor={`f-${k}`}>
      {text}{" "}
      {required ? <span className="req" aria-hidden="true">*</span> : <span className="opt">({f.optional})</span>}
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label={f.title}>
      <div aria-live="assertive">
        {tried && hasErrors && (
          <div className="alertbox" role="alert">
            <AlertIcon size={18} sw={2} />
            {f.fix}
          </div>
        )}
        {status === "error" && (
          <div className="alertbox" role="alert">
            <AlertIcon size={18} sw={2} />
            {f.sendError}
          </div>
        )}
      </div>

      {/* Honeypot (hidden from people and assistive tech; bots tend to fill it). */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">{f.honeypot}</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="form-grid">
        {/* Step 1 — required */}
        <div className="full">
          {label("name", f.name, true)}
          <input {...fieldProps("name")} type="text" autoComplete="name" placeholder={f.ph.name} required maxLength={120} />
          {errorText("name")}
        </div>

        <div>
          {label("company", f.company, true)}
          <input {...fieldProps("company")} type="text" autoComplete="organization" placeholder={f.ph.company} required maxLength={160} />
          {errorText("company")}
        </div>

        <div>
          {label("phone", f.phone, true)}
          <input {...fieldProps("phone")} className="field ltrin" type="tel" inputMode="tel" autoComplete="tel" placeholder="+98 21 0000 0000" required maxLength={32} dir="ltr" />
          {errorText("phone")}
        </div>

        {/* Optional details */}
        <div className="full">
          <button type="button" className="more-btn" aria-expanded={more} aria-controls={detailsId} onClick={() => setMore((m) => !m)}>
            <span>
              <span className="more-t">{f.more}</span>
              <span className="more-h">{f.moreHint}</span>
            </span>
            <ChevronDownIcon size={18} className="more-chev" />
          </button>
        </div>

        <div id={detailsId} className="full more-panel" hidden={!more}>
          <div className="form-grid">
            <div>
              {label("email", f.email, false)}
              <input {...fieldProps("email")} className="field ltrin" type="email" inputMode="email" autoComplete="email" placeholder="name@company.com" maxLength={254} dir="ltr" />
              {errorText("email")}
            </div>

            <div>
              {label("country", f.country, false)}
              <input {...fieldProps("country")} type="text" autoComplete="country-name" placeholder={f.ph.country} maxLength={80} />
              {errorText("country")}
            </div>

            <div className="full">
              {label("branches", f.branches, false)}
              <div className="selwrap">
                <select {...fieldProps("branches")}>
                  <option value="">{f.select}</option>
                  {BRANCH_OPTIONS.map((v, i) => (
                    <option key={v} value={v}>{f.opts[i]}</option>
                  ))}
                </select>
                <ChevronDownIcon size={16} />
              </div>
              {errorText("branches")}
            </div>

            <div className="full">
              {label("message", f.message, false)}
              <textarea {...fieldProps("message")} rows={3} placeholder={f.ph.message} maxLength={3000} />
              {errorText("message")}
            </div>
          </div>
        </div>

        <div className="full form-foot">
          <span className="hint">
            <span className="req" aria-hidden="true">*</span> {f.req}
          </span>
          <button type="submit" className="btn btn-primary" disabled={status === "submitting"} aria-busy={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <span className="spinner" aria-hidden="true" />
                {f.sending}
              </>
            ) : (
              <>
                {f.submit}
                <ArrowIcon />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
