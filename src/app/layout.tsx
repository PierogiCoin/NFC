// src/app/layout.tsx
import './globals.css';
import { Outfit } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SPONSORS = [
  { src: '/sponsors/logo1.png', alt: 'Sponsor 1', href: '#' },
  { src: '/sponsors/logo2.png', alt: 'Sponsor 2', href: '#' },
  { src: '/sponsors/logo3.png', alt: 'Sponsor 3', href: '#' },
];

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata = {
  title:
    'Klub MMA & Boks – Treningi, Sekcja Kobieca, Kettlebell, Kalendarz, Blog',
  description:
    'Oficjalna strona klubu sportów walki. MMA, Boks, Sekcja Kobieca i Kettlebell. Sprawdź grafik, zapisz się na trening i przeczytaj najnowsze wpisy na blogu.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="h-full">
      <body
        className={`min-h-dvh bg-neutral-950 text-neutral-100 antialiased ${outfit.className}`}
      >
        {/* Skip link dla dostępności */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-yellow-400 focus:px-3 focus:py-2 focus:text-black"
        >
          Przejdź do treści
        </a>

        {/* Tła dekoracyjne (lekki glow + subtelny gradient) */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950" />
          <div className="absolute inset-0 [background:radial-gradient(40rem_20rem_at_50%_-4rem,rgba(234,179,8,0.08),transparent)]" />
        </div>

        <Header />

        {/* Floating sponsors rail (visible on lg+) */}
        <aside
          aria-label="Sponsorzy – pasek boczny"
          className="pointer-events-none fixed inset-y-24 left-2 right-2 z-40 hidden lg:block"
        >
          <div className="relative h-full">
            {/* Left: logos stack */}
            <div className="pointer-events-auto absolute left-0 top-1/3 -translate-y-1/2 space-y-3">
              {SPONSORS.slice(0, 3).map((s) => (
                <a
                  key={`rail-left-${s.src}`}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-white/10 bg-white/10 p-2 shadow-lg ring-1 ring-white/10 backdrop-blur-md transition hover:scale-[1.02] hover:border-cyan-300/40 hover:shadow-cyan-400/10"
                  aria-label={`Przejdź do sponsora: ${s.alt}`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition [background:radial-gradient(24rem_12rem_at_0%_0%,rgba(34,211,238,.25),transparent)]"
                  />
                  <img
                    src={s.src}
                    alt={s.alt}
                    width={96}
                    height={40}
                    loading="lazy"
                    className="h-10 w-auto grayscale contrast-125 transition duration-500 group-hover:grayscale-0"
                  />
                </a>
              ))}
            </div>

            {/* Right: CTA Become a sponsor */}
            <div className="pointer-events-auto absolute right-0 top-1/3 -translate-y-1/2">
              <a
                href="/sponsor"
                className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold text-white
                           shadow-lg ring-1 ring-white/20 backdrop-blur-md
                           hover:bg-white/15 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition"
              >
                <span className="relative">
                  Zostań sponsorem
                  <span
                    aria-hidden
                    className="absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-30 bg-cyan-400/40 transition"
                  />
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 12a.75.75 0 01.75-.75h14.19l-3.22-3.22a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H3.75A.75.75 0 013 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </aside>

        {/* Główna zawartość */}
        <main id="main" className="py-8 md:py-12">
          {children}
        </main>

        {/* Sponsorzy – nowa sekcja z efektem WOW */}
        <section
          aria-label="Nasi sponsorzy"
          className="relative border-t border-white/10 bg-neutral-900/80 backdrop-blur-md"
        >
          {/* dekor: miękki glow + siateczka */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/30 to-neutral-900/70" />
            <div className="absolute inset-0 [background:radial-gradient(40rem_20rem_at_50%_-6rem,rgba(234,179,8,.06),transparent)]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:18px_18px]" />
          </div>

          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                  Wspierają nas
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300">
                    Nasi Sponsorzy
                  </span>
                </h2>
                <p className="mt-2 text-neutral-300 max-w-2xl">
                  Dzięki partnerom rozwijamy klub, szkolimy młodzież i tworzymy
                  wydarzenia. Dziękujemy!
                </p>
              </div>

              <div className="shrink-0 flex gap-3">
                <a
                  href="/sponsor"
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black shadow hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
                >
                  Zostań sponsorem
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l6 6a.75.75 0 01-1.06 1.06L13.5 6.56V20a.75.75 0 01-1.5 0V6.56l-5.47 4.47a.75.75 0 11-1.06-1.06l6-6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="mailto:kontakt@twojklub.pl?subject=Wsp%C3%B3%C5%82praca%20sponsoring"
                  className="rounded-full border border-white/15 bg-neutral-900/60 px-5 py-3 text-sm text-neutral-200 hover:bg-neutral-800"
                >
                  kontakt@twojklub.pl
                </a>
              </div>
            </div>

            {/* Rząd 1 – marquee w lewo */}
            <div className="mt-8 sponsors-edge-mask overflow-hidden">
              <ul
                className="group flex items-center gap-6 md:gap-10 will-change-transform sponsors-animate"
                style={{ animation: 'sponsors-marquee-left 28s linear infinite' }}
                role="list"
                aria-label="Logotypy sponsorów – rząd 1"
              >
                {[...SPONSORS, ...SPONSORS].map((s, i) => (
                  <li key={`row1-${s.src}-${i}`} className="snap-start">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group/logo block rounded-2xl border border-white/10 bg-white/95 p-2 shadow
                                 transition-transform duration-300 hover:-translate-y-0.5"
                      aria-label={`Przejdź do sponsora: ${s.alt}`}
                    >
                      {/* efekt shine */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1 w-10 skew-x-12 bg-white/40 blur-md
                                   opacity-0 group-hover/logo:opacity-100"
                        style={{ animation: 'sponsors-shine 1200ms ease-out 1' }}
                      />
                      <img
                        src={s.src}
                        alt={s.alt}
                        width={180}
                        height={72}
                        loading="lazy"
                        className="h-16 w-auto grayscale contrast-125 transition duration-500 group-hover/logo:grayscale-0"
                      />
                      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 group-hover/logo:ring-black/10" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rząd 2 – marquee w prawo */}
            <div className="mt-4 sponsors-edge-mask overflow-hidden">
              <ul
                className="group flex items-center gap-6 md:gap-10 will-change-transform sponsors-animate"
                style={{ animation: 'sponsors-marquee-right 32s linear infinite' }}
                role="list"
                aria-label="Logotypy sponsorów – rząd 2"
              >
                {[...SPONSORS.slice().reverse(), ...SPONSORS.slice().reverse()].map(
                  (s, i) => (
                    <li key={`row2-${s.src}-${i}`} className="snap-start">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group/logo block rounded-2xl border border-white/10 bg-white/95 p-2 shadow
                                   transition-transform duration-300 hover:-translate-y-0.5"
                        aria-label={`Przejdź do sponsora: ${s.alt}`}
                      >
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 -left-1 w-10 skew-x-12 bg-white/40 blur-md
                                     opacity-0 group-hover/logo:opacity-100"
                          style={{ animation: 'sponsors-shine 1200ms ease-out 1' }}
                        />
                        <img
                          src={s.src}
                          alt={s.alt}
                          width={180}
                          height={72}
                          loading="lazy"
                          className="h-16 w-auto grayscale contrast-125 transition duration-500 group-hover/logo:grayscale-0"
                        />
                        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 group-hover/logo:ring-black/10" />
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Korzyści + CTA */}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6 shadow-sm hover:shadow-md transition">
                <h3 className="font-semibold text-neutral-100">Widoczność marki</h3>
                <p className="mt-1 text-neutral-300 text-sm">
                  Logo na stronie, w social media i na materiałach klubowych.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6 shadow-sm hover:shadow-md transition">
                <h3 className="font-semibold text-neutral-100">Lokalna społeczność</h3>
                <p className="mt-1 text-neutral-300 text-sm">
                  Docierasz do rodziców, młodzieży i pasjonatów sportu.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6 shadow-sm hover:shadow-md transition">
                <h3 className="font-semibold text-neutral-100">Wspólne akcje</h3>
                <p className="mt-1 text-neutral-300 text-sm">
                  Eventy, konkursy, treningi otwarte – razem z Twoją marką.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 text-sm text-neutral-300">
              <a
                href="/sponsor"
                className="inline-flex items-center gap-2 rounded-md bg-neutral-800 px-4 py-2 hover:bg-neutral-700"
              >
                Szczegóły współpracy
              </a>
              <span className="opacity-60">lub</span>
              <a
                href="mailto:kontakt@twojklub.pl?subject=Wsp%C3%B3%C5%82praca%20sponsoring"
                className="underline decoration-yellow-400 underline-offset-4 hover:text-yellow-300"
              >
                napisz do nas: kontakt@twojklub.pl
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </body>
    </html>
  );
}
