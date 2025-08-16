// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
  // honeypot
  company?: string;
};

// Prosty limiter (lokalny, nieprodukcyjny przy wielu instancjach)
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 min
const MAX_HITS = 10;

// ——— Helpers ———
function getClientIp(req: Request): string {
  const xfwd = req.headers.get('x-forwarded-for');
  if (xfwd && xfwd.length > 0) {
    const first = xfwd.split(',')[0]?.trim();
    if (first) return first;
  }
  const xreal = req.headers.get('x-real-ip');
  if (xreal) return xreal;
  const cf = req.headers.get('cf-connecting-ip');
  if (cf) return cf;
  const fly = req.headers.get('fly-client-ip');
  if (fly) return fly;
  return '0.0.0.0';
}

function isPayload(u: unknown): u is Payload {
  if (typeof u !== 'object' || u === null) return false;
  const o = u as Record<string, unknown>;
  const isStr = (v: unknown) => typeof v === 'string';
  const isBool = (v: unknown) => typeof v === 'boolean';
  return (
    isStr(o.name) &&
    isStr(o.email) &&
    isStr(o.subject) &&
    isStr(o.message) &&
    isBool(o.consent) &&
    (o.phone === undefined || isStr(o.phone)) &&
    (o.company === undefined || isStr(o.company))
  );
}

// ——— Route ———
export async function POST(req: Request) {
  const ip = getClientIp(req);

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

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ message: 'Nieprawidłowy format danych.' }, { status: 400 });
  }

  if (!isPayload(raw)) {
    return NextResponse.json({ message: 'Nieprawidłowy kształt danych.' }, { status: 400 });
  }

  const body: Payload = raw;

  // honeypot
  if (body.company && body.company.trim() !== '') {
    // udajemy sukces (bot się nie zorientuje)
    return NextResponse.json({ ok: true });
  }

  // walidacja serwerowa
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

  // TODO: integracja (SMTP / webhook / CRM)
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
