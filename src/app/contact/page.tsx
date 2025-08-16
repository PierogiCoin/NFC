// src/app/contact/page.tsx
'use client';

import React from 'react';

type Status = '' | 'loading' | 'success' | 'error';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  // honeypot
  company: string;
};

const MESSAGE_MAX = 1200;

const initialData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
  company: '',
};

export default function ContactPage() {
  const [formData, setFormData] = React.useState<FormData>(initialData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<Status>('');
  const [notice, setNotice] = React.useState('');

  // ===== Draft autosave (localStorage) =====
  React.useEffect(() => {
    const saved = localStorage.getItem('contact-draft');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);
  React.useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('contact-draft', JSON.stringify(formData));
    }, 400);
    return () => clearTimeout(id);
  }, [formData]);

  // ===== Validation =====
  const validate = (data: FormData) => {
    const e: Record<string, string> = {};
    if (!data.name.trim()) e.name = 'Podaj imię i nazwisko.';
    if (!data.email.trim()) e.email = 'Podaj adres e-mail.';
    else if (!/^\S+@\S+\.[\w-]{2,}$/.test(data.email)) e.email = 'Wpisz poprawny adres e-mail.';
    if (data.phone && !/^[+()\d\s-]{7,}$/.test(data.phone)) e.phone = 'Wpisz poprawny numer telefonu (opcjonalnie).';
    if (!data.subject.trim()) e.subject = 'Wybierz temat wiadomości.';
    const msg = data.message.trim();
    if (!msg || msg.length < 10) e.message = 'Wiadomość powinna mieć min. 10 znaków.';
    if (msg.length > MESSAGE_MAX) e.message = `Limit znaków: ${MESSAGE_MAX}.`;
    if (!data.consent) e.consent = 'Zaznacz zgodę na kontakt.';
    return e;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [id]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // honeypot: if filled, silently succeed
    if (formData.company) {
      setStatus('success');
      setNotice('Dziękujemy! (anty-spam)');
      setTimeout(() => {
        setStatus('');
        setNotice('');
      }, 3000);
      return;
    }

    const v = validate(formData);
    setErrors(v);
    if (Object.keys(v).length) {
      setStatus('error');
      setNotice('Sprawdź pola formularza.');
      return;
    }

    try {
      setStatus('loading');
      setNotice('Wysyłanie wiadomości…');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(j?.message || 'Błąd serwera.');
      }

      setStatus('success');
      setNotice('Wiadomość została wysłana! Dziękujemy za kontakt.');
      setFormData(initialData);
      setErrors({});
      localStorage.removeItem('contact-draft');
      setTimeout(() => {
        setStatus('');
        setNotice('');
      }, 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Coś poszło nie tak. Spróbuj ponownie.';
      setStatus('error');
      setNotice(message);
    }
  };

  const chars = formData.message.trim().length;
  const left = Math.max(0, MESSAGE_MAX - chars);

  const subjectOptions = ['Zapisy na trening', 'Pytanie o grafik', 'Współpraca / sponsoring', 'Inne'];

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* dekor tła */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950" />
        <div className="absolute inset-0 [background:radial-gradient(40rem_20rem_at_50%_-6rem,rgba(139,92,246,0.12),transparent)]" />
      </div>

      {/* nagłówek */}
      <div className="text-center pt-6 pb-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300">
            Skontaktuj się z nami
          </span>
        </h1>
        <p className="mt-3 text-white/80 max-w-2xl mx-auto">
          Masz pytania o zajęcia, grafik lub zapisy? Napisz do nas — odpowiemy szybko i konkretnie.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 mt-4">
        {/* Dane kontaktowe */}
        <aside className="lg:col-span-2 rounded-3xl p-[2px] bg-gradient-to-tr from-indigo-500 via-violet-600 to-fuchsia-600">
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white">Dane kontaktowe</h2>
            <ul className="mt-4 space-y-2 text-white/85">
              <li>
                <span className="font-semibold text-white">Adres:</span> Ul. Przykładowa 123, 00-001 Miasto
              </li>
              <li>
                <span className="font-semibold text-white">Telefon:</span>{' '}
                <a className="text-violet-300 hover:text-violet-200" href="tel:+48123456789">
                  +48 123 456 789
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Email:</span>{' '}
                <a className="text-violet-300 hover:text-violet-200" href="mailto:kontakt@klubmma.pl">
                  kontakt@klubmma.pl
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Godziny:</span> Pon–Pt 8:00–22:00, Sob 9:00–18:00
              </li>
            </ul>

            <div className="mt-6 rounded-xl overflow-hidden border border-white/10">
              <div className="relative w-full h-64">
                <iframe
                  title="Mapa dojazdu"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.420658425126!2d17.03168851571618!3d51.10788527957271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fe9c2b4792f43%3A0x4081c37b60586940!2sRynek%2C%20Wroc%C5%82aw!5e0!3m2!1spl!2spl!4v1678912345678!5m2!1spl!2spl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://wa.me/48123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 font-semibold text-white shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {/* WhatsApp icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 2a10 10 0 00-8.94 14.56L2 22l5.6-1.48A10 10 0 1012 2zm0 2a8 8 0 016.77 12.21l-.23.34.9 3.36-3.34-.9-.34.23A8 8 0 1112 4z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="https://m.me/twojklub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 font-semibold text-white shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                {/* Messenger icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 2C6.48 2 2 6 2 11.33c0 2.82 1.42 5.34 3.73 6.98V22l3.4-1.86c.9.25 1.86.39 2.87.39 5.52 0 10-4 10-9.33C22 6 17.52 2 12 2zm4.36 9.64l-2.3-1.22-2.37 1.22-2.27-1.22-3.49 3.49 2.3-3.49 2.37 1.22 2.27-1.22 3.49 3.49-2.3-3.49z" />
                </svg>
                Messenger
              </a>
            </div>
          </div>
        </aside>

        {/* Formularz */}
        <div className="lg:col-span-3 rounded-3xl p-[2px] bg-gradient-to-tr from-indigo-500 via-violet-600 to-fuchsia-600">
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white">Formularz kontaktowy</h2>

            {/* live region */}
            <div aria-live="polite" role="status" className="sr-only" id="form-status">
              {status && notice}
            </div>

            <form onSubmit={onSubmit} noValidate className="mt-5 space-y-5">
              {/* honeypot */}
              <input
                type="text"
                id="company"
                autoComplete="off"
                value={formData.company}
                onChange={onChange}
                className="hidden"
                tabIndex={-1}
                aria-hidden="true"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white">
                    Imię i nazwisko
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={onChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-300"
                    placeholder="Jan Kowalski"
                  />
                  {errors.name && (
                    <p id="err-name" className="mt-1 text-sm text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-300"
                    placeholder="twoj@email.pl"
                  />
                  {errors.email && (
                    <p id="err-email" className="mt-1 text-sm text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white">
                    Telefon (opcjonalnie)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={onChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-300"
                    placeholder="+48 600 000 000"
                  />
                  {errors.phone && (
                    <p id="err-phone" className="mt-1 text-sm text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-white">
                    Temat
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={onChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'err-subject' : undefined}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-300"
                  >
                    <option value="">— wybierz —</option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p id="err-subject" className="mt-1 text-sm text-red-400">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white">
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  rows={6}
                  maxLength={MESSAGE_MAX}
                  value={formData.message}
                  onChange={onChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'err-message' : 'msg-help'}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-300 resize-y"
                  placeholder="Napisz, w czym możemy pomóc…"
                />
                <div className="mt-1 flex items-center justify-between text-xs">
                  <p id="msg-help" className="text-white/50">
                    Min. 10 znaków • Maks. {MESSAGE_MAX}
                  </p>
                  <p className={classNames('tabular-nums', left < 30 && 'text-fuchsia-300', left === 0 && 'text-red-400')}>
                    {left} znaków
                  </p>
                </div>
                {errors.message && (
                  <p id="err-message" className="mt-1 text-sm text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={onChange}
                  aria-invalid={!!errors.consent}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-black/40 text-violet-400 focus:ring-violet-300"
                />
                <label htmlFor="consent" className="text-sm text-white/85">
                  Wyrażam zgodę na kontakt w sprawie zapytania. Dane wykorzystamy wyłącznie do odpowiedzi.
                </label>
              </div>
              {errors.consent && <p className="-mt-2 text-sm text-red-400">{errors.consent}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center w-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={status === 'loading'}
                  aria-describedby="form-status"
                >
                  {status === 'loading' && (
                    <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  )}
                  {status === 'loading' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData(initialData);
                    setErrors({});
                    localStorage.removeItem('contact-draft');
                  }}
                  className="inline-flex items-center justify-center w-full rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white/90 shadow-sm transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-500"
                >
                  Wyczyść formularz
                </button>
              </div>

              {status && notice && (
                <div
                  className={`mt-4 rounded-lg px-4 py-3 text-center font-medium shadow-md ${
                    status === 'success'
                      ? 'bg-emerald-600 text-white'
                      : status === 'error'
                      ? 'bg-red-600 text-white'
                      : 'bg-black/40 text-white'
                  }`}
                  role="alert"
                  aria-live="polite"
                >
                  {notice}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* helper: tailwind-safe classNames */
function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}
