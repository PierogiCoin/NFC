'use client';
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-14 px-6 md:px-12 mt-16 rounded-t-3xl shadow-inner border-t border-slate-800/60">
      {/* Dekoracje tła */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_60%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-20 h-44 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.18),transparent_60%)]" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Kolumna: hasło + mini opis */}
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Pozostań w kontakcie
          </h2>
          <p className="text-slate-300/90 leading-relaxed">
            Dołącz do naszej społeczności – bądź na bieżąco z treningami, wydarzeniami i nowościami w klubie.
          </p>
        </div>

        {/* Kolumna: linki szybkie */}
        <nav className="grid grid-cols-2 gap-y-2 gap-x-8 text-sm md:text-[15px]">
          <a href="/" className="text-slate-300/90 hover:text-sky-300 transition">Strona główna</a>
          <a href="/bjj" className="text-slate-300/90 hover:text-sky-300 transition">BJJ</a>
          <a href="/mma" className="text-slate-300/90 hover:text-sky-300 transition">KickBoxing</a>
          <a href="/kobiety" className="text-slate-300/90 hover:text-sky-300 transition">Sekcja Kobiet</a>
          <a href="/kettlebell" className="text-slate-300/90 hover:text-sky-300 transition">Kettlebell</a>
          <a href="/blog" className="text-slate-300/90 hover:text-sky-300 transition">Blog</a>
          <a href="/grafik" className="text-slate-300/90 hover:text-sky-300 transition">Grafik</a>
          <a href="/kontakt" className="text-slate-300/90 hover:text-sky-300 transition">Kontakt</a>
        </nav>

        {/* Kolumna: social + newsletter (opcjonalnie) */}
        <div className="flex flex-col items-center md:items-end gap-5">
          <div className="flex space-x-5 md:space-x-4">
            {[
              { href: '#', label: 'Facebook', svg: (
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              )},
              { href: '#', label: 'Instagram', svg: (
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.002 3.714.051 1.05.05 1.799.217 2.428.465.66.254 1.216.598 1.772 1.153a4.904 4.904 0 0 1 1.153 1.772c.247.629.415 1.178.465 2.428.049.93.051 1.286.051 3.714s-.002 2.784-.051 3.714c-.05.93-.217 1.679-.465 2.428a4.904 4.904 0 0 1-1.153 1.772c-.555.555-1.109.899-1.772 1.153-.64.247-1.37.413-2.428.465-.93.049-1.286.051-3.714.051s-2.784-.002-3.714-.051c-1.05-.05-1.799-.217-2.428-.465a4.904 4.904 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.247-.629-.415-1.178-.465-2.428C2.002 14.315 2 13.96 2 12s.002-2.315.051-3.714c.05-.93.217-1.679.465-2.428a4.904 4.904 0 0 1 1.153-1.772A4.904 4.904 0 0 1 5.45 2.525c.629-.247 1.178-.415 2.428-.465C8.315 2.002 8.66 2 12 2zm0 2.16c-3.15 0-3.53.016-4.76.071-1.02.043-1.64.19-2.07.355a2.68 2.68 0 0 0-1.01.628 2.68 2.68 0 0 0-.628 1.01c-.165.43-.312 1.05-.355 2.07-.055 1.23-.071 1.61-.071 4.76s.016 3.53.071 4.76c.043 1.02.19 1.64.355 2.07a2.68 2.68 0 0 0 .628 1.01 2.68 2.68 0 0 0 1.01.628c.43.165 1.05.312 2.07.355 1.23.055 1.61.071 4.76.071s3.53-.016 4.76-.071c1.02-.043 1.64-.19 2.07-.355a2.68 2.68 0 0 0 1.01-.628 2.68 2.68 0 0 0 .628-1.01c.165-.43.312-1.05.355-2.07.055-1.23.071-1.61.071-4.76s-.016-3.53-.071-4.76c-.043-1.02-.19-1.64-.355-2.07a2.68 2.68 0 0 0-.628-1.01 2.68 2.68 0 0 0-1.01-.628c-.43-.165-1.05-.312-2.07-.355C15.53 4.176 15.15 4.16 12 4.16zm0 3.824A4.016 4.016 0 1 0 16.016 12 4.016 4.016 0 0 0 12 7.984zm0 2.16a1.856 1.856 0 1 1 0 3.712 1.856 1.856 0 0 1 0-3.712z" clipRule="evenodd" />
              )}
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group bg-slate-800/70 rounded-full p-3 ring-1 ring-inset ring-slate-700 transition-all hover:ring-sky-400/60 hover:bg-slate-800/90 hover:scale-110 shadow-lg hover:shadow-sky-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                aria-label={item.label}
              >
                <svg className="w-7 h-7 text-white transition-colors group-hover:text-sky-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {item.svg}
                </svg>
              </a>
            ))}
          </div>

          {/* Mini newsletter – opcjonalny (zostaw jak nie chcesz używać) */}
          <form className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter" className="sr-only">E-mail</label>
            <div className="flex gap-2">
              <input
                id="newsletter"
                type="email"
                inputMode="email"
                placeholder="Twój e-mail"
                className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-slate-100 placeholder-slate-400 ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <button className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2.5 font-semibold text-white shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
                Zapisz
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400">Raz w miesiącu – zero spamu.</p>
          </form>
        </div>
      </div>

      <hr className="border-slate-800/60 my-8" />

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-gray-400 text-xs md:text-sm opacity-80">
          &copy; {year} Klub MMA &amp; Boks. Wszelkie prawa zastrzeżone.
        </p>
        <div className="text-xs md:text-sm text-slate-400/90 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href="/regulamin" className="hover:text-sky-300 transition">Regulamin</a>
          <span className="opacity-30">•</span>
          <a href="/polityka-prywatnosci" className="hover:text-sky-300 transition">Polityka prywatności</a>
          <span className="opacity-30">•</span>
          <a href="/kontakt" className="hover:text-sky-300 transition">Kontakt</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
