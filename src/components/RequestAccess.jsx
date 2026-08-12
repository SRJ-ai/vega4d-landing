import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { animate } from 'animejs';
import { ArrowUpRight, CheckCircle, Calendar, WhatsappLogo, EnvelopeSimple } from '@phosphor-icons/react';
import { MagneticCta } from './primitives/MagneticCta';
import { SectionHead } from './primitives/SectionHead';
import { access, brand } from '../data/site';

const EMPTY = { firstName: '', lastName: '', email: '', message: '', trap: '' };

/**
 * The one place on the page that writes data.
 *
 * Validation runs on blur and again on submit. A failed submit keeps every value, so
 * nothing is retyped. anime.js nudges the offending field, which is feedback the visitor
 * needs to find the problem in a four-field form.
 */
export function RequestAccess() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | failed
  const [failure, setFailure] = useState('');
  const formRef = useRef(null);
  const reduce = useReducedMotion();

  const set = (key) => (event) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateField = (key, value) => {
    if (key === 'firstName' && !value.trim()) return 'Enter your first name.';
    if (key === 'lastName' && !value.trim()) return 'Enter your last name.';
    if (key === 'email') {
      if (!value.trim()) return 'Enter your work email.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
        return 'That email address is missing a domain.';
      }
    }
    if (key === 'message' && value.trim().length < 12) {
      return 'A sentence or two about the task, please.';
    }
    return undefined;
  };

  const blur = (key) => () => {
    const message = validateField(key, values[key]);
    setErrors((prev) => ({ ...prev, [key]: message }));
  };

  const nudge = (key) => {
    if (reduce || !formRef.current) return;
    const field = formRef.current.querySelector(`[name="${key}"]`);
    if (field) animate(field, { translateX: [0, -5, 4, -2, 0], duration: 380, ease: 'outQuad' });
  };

  const submit = async (event) => {
    event.preventDefault();

    const next = {};
    ['firstName', 'lastName', 'email', 'message'].forEach((key) => {
      const message = validateField(key, values[key]);
      if (message) next[key] = message;
    });
    setErrors(next);

    const firstBad = Object.keys(next)[0];
    if (firstBad) {
      nudge(firstBad);
      return;
    }

    // Bots fill hidden inputs. A human never sees this one, so a value means discard.
    if (values.trap) {
      setStatus('done');
      return;
    }

    setStatus('sending');
    setFailure('');

    // The database client is 400 kB of the bundle and only this submit needs it, so it
    // loads on demand rather than on first paint.
    const { supabase, isSupabaseConfigured } = await import('../lib/supabase');

    if (!isSupabaseConfigured) {
      setStatus('failed');
      setFailure(
        'This site is not connected to its database yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then try again.',
      );
      return;
    }

    const { error } = await supabase.from('contacts').insert({
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });

    if (error) {
      setStatus('failed');
      setFailure(error.message || 'The request did not reach us. Try again in a moment.');
      return;
    }

    setStatus('done');
  };

  return (
    <section id="access" className="u-rule">
      <div className="u-shell grid gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-5">
          <SectionHead title={access.heading} body={access.body} />

          <ul className="mt-10 border-t border-[var(--line-100)]">
            {access.expect.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 border-b border-[var(--line-100)] py-4 text-[0.9375rem] text-[var(--text-200)]"
              >
                <ArrowUpRight
                  size={15}
                  weight="bold"
                  color="var(--signal)"
                  className="mt-1 shrink-0"
                />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          {status === 'done' ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="u-bezel bg-[var(--ink-100)] p-8 sm:p-12"
              role="status"
            >
              <CheckCircle size={28} weight="light" color="var(--live)" />
              <h3 className="u-display mt-6 text-[clamp(1.5rem,2.6vw,2.25rem)]">
                {access.success.title}
              </h3>
              <p className="u-measure mt-4 text-[var(--text-200)]">{access.success.body}</p>
            </motion.div>
          ) : (
            <form
              ref={formRef}
              onSubmit={submit}
              noValidate
              className="u-bezel bg-[var(--ink-100)] p-6 sm:p-9"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  name="firstName"
                  spec={access.fields.firstName}
                  value={values.firstName}
                  error={errors.firstName}
                  onChange={set('firstName')}
                  onBlur={blur('firstName')}
                  autoComplete="given-name"
                />
                <Field
                  name="lastName"
                  spec={access.fields.lastName}
                  value={values.lastName}
                  error={errors.lastName}
                  onChange={set('lastName')}
                  onBlur={blur('lastName')}
                  autoComplete="family-name"
                />
              </div>

              <div className="mt-6">
                <Field
                  name="email"
                  type="email"
                  spec={access.fields.email}
                  value={values.email}
                  error={errors.email}
                  onChange={set('email')}
                  onBlur={blur('email')}
                  autoComplete="email"
                />
              </div>

              <div className="mt-6">
                <Field
                  name="message"
                  as="textarea"
                  spec={access.fields.message}
                  value={values.message}
                  error={errors.message}
                  onChange={set('message')}
                  onBlur={blur('message')}
                />
              </div>

              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company-size">Company size</label>
                <input
                  id="company-size"
                  name="trap"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.trap}
                  onChange={set('trap')}
                />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticCta type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending' : brand.primaryCta}
                </MagneticCta>

                {status === 'sending' ? (
                  <span className="u-mono text-[11px] tracking-[0.12em] text-[var(--text-300)] uppercase">
                    Writing to the queue
                  </span>
                ) : null}
              </div>

              <div className="mt-10 border-t border-[var(--line-100)] pt-6">
                <p className="u-mono mb-4 text-[10px] tracking-[0.16em] text-[var(--text-300)] uppercase">
                  Or connect with us directly
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="https://cal.com/vega4d" target="_blank" rel="noopener noreferrer" className="u-btn u-btn--ghost !py-2.5 !text-[11px] !normal-case no-underline">
                    <Calendar size={16} weight="duotone" />
                    cal.com/vega4d
                  </a>
                  <a href="https://wa.me/918309210440" target="_blank" rel="noopener noreferrer" className="u-btn u-btn--ghost !py-2.5 !text-[11px] !normal-case no-underline">
                    <WhatsappLogo size={16} weight="duotone" />
                    WhatsApp
                  </a>
                  <a href="mailto:vega4d.marketing@gmail.com" className="u-btn u-btn--ghost !py-2.5 !text-[11px] !normal-case no-underline">
                    <EnvelopeSimple size={16} weight="duotone" />
                    vega4d.marketing@gmail.com
                  </a>
                </div>
              </div>

              <div aria-live="polite" className="mt-4">
                {status === 'failed' ? (
                  <p className="u-mono text-[12px] text-[var(--signal-deep)]">{failure}</p>
                ) : null}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  spec,
  value,
  error,
  onChange,
  onBlur,
  type = 'text',
  as = 'input',
  autoComplete,
}) {
  const id = `field-${name}`;
  const helpId = spec.help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="u-mono text-[10px] tracking-[0.16em] text-[var(--text-200)] uppercase">
        {spec.label}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          className="u-field resize-y"
          placeholder={spec.placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className="u-field"
          placeholder={spec.placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
        />
      )}

      {spec.help ? (
        <p id={helpId} className="u-mono text-[11px] text-[var(--text-300)]">
          {spec.help}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="u-mono text-[11px] text-[var(--signal-deep)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
