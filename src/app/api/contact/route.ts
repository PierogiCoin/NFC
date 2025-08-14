import { NextResponse } from 'next/server';

type Payload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
  company?: string; // honeypot
};

// 💡 prościutki limiter (nie do produkcji na wielu instancjach)
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 min
const MAX_HITS = 10;

export async function POST(req: Request) {
  const ip =
    (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() ||
    (req as any).ip ||
    '0.0.0.0';

  // rate limit
  const now = Date.now();
  const entry = hits.get(ip) ?? { count: 0, ts: now };
  if (now - entry.ts > WINDOW_MS) {
    entry.count = 0;
    entry.ts = now;
  }
  entry.count += 1;
  hits.set(ip, entry);
  if (entry.count > MAX_HITS) {
    return NextResponse.json({ message: 'Zbyt wiele prób. Spróbuj za chwilę.' }, { status: 429 });
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Nieprawidłowy format danych.' }, { status: 400 });
  }

  // honeypot
  if (body.company && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  // server-side validation
  const errors: Record<string, string> = {};
  if (!body.name || !body.name.trim()) errors.name = 'Wymagane';
  if (!body.email || !/^\S+@\S+\.[\w-]{2,}$/.test(body.email)) errors.email = 'Nieprawidłowy e-mail';
  if (body.phone && !/^[+()\d\s-]{7,}$/.test(body.phone)) errors.phone = 'Nieprawidłowy telefon';
  if (!body.subject || !body.subject.trim()) errors.subject = 'Wymagany temat';
  if (!body.message || body.message.trim().length < 10) errors.message = 'Zbyt krótka wiadomość';
  if (body.message && body.message.length > 1200) errors.message = 'Zbyt długa wiadomość';
  if (!body.consent) errors.consent = 'Brak zgody';

  if (Object.keys(errors).length) {
    return NextResponse.json({ message: 'Błędne dane', errors }, { status: 422 });
  }

  // TODO: wyślij e-mail / zapisz do CRM.
  // Przykład (opcjonalnie): nodemailer — tylko jeśli chcesz
  // const transporter = nodemailer.createTransport({/* SMTP z ENV */})
  // await transporter.sendMail({ from, to, subject: `Kontakt: ${body.subject}`, text: ... })

  // Na razie log i OK
  console.log('[CONTACT]', {
    when: new Date().toISOString(),
    ip,
    name: body.name,
    email: body.email,
    phone: body.phone,
    subject: body.subject,
    len: body.message.length,
  });

  return NextResponse.json({ ok: true });
}
