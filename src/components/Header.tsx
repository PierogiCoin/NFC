// src/components/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Strona Główna' },
  { href: '/mma', label: 'MMA' },
  { href: '/bjj', label: 'BJJ' },
  { href: '/womens-section', label: 'Sekcja Kobieca' },
  { href: '/kettlebell', label: 'Kettlebell' },
  { href: '/calendar', label: 'Kalendarz' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Kontakt' },
];

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const Header: React.FC = () => {
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [progress, setProgress] = React.useState(0); // 0..1

  // Scroll effects
  React.useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY || 0;
      setScrolled(sy > 8);

      const doc = document.documentElement;
      const h = doc.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, sy / h)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC to close
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : (pathname?.startsWith(href) ?? false);

  return (
    <header
      className={classNames(
        'sticky top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300',
        scrolled
          ? // glass + neon after scroll
            'bg-[linear-gradient(180deg,rgba(10,18,36,.72),rgba(10,18,36,.48))] backdrop-blur-xl shadow-[0_8px_28px_rgba(0,255,255,.12)] ring-1 ring-white/10'
          : 'bg-transparent'
      )}
    >
      {/* Scroll progress (top) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[3px] w-full bg-transparent"
      >
        <div
          style={{ width: `${progress * 100}%` }}
          className="h-[3px] transition-[width] duration-150 will-change-[width]
                     bg-[linear-gradient(90deg,#22d3ee,#3b82f6,#8b5cf6)]"
        />
      </div>

      {/* Subtelna linia akcentowa */}
      <div
        className={classNames(
          'pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity',
          scrolled ? 'opacity-100 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-800' : 'opacity-0'
        )}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 mb-4 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link href="/" className="group relative inline-flex items-center gap-3 px-3 py-2 sm:px-4">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500 text-black shadow-md ring-1 ring-white/20">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M6 8h12M4 12h16M6 16h12" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="absolute inset-0 -z-10 rounded-xl blur-md bg-cyan-400/30" aria-hidden />
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-md">
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Klub</span>
              <span className="text-white"> MMA &amp; Boks</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 pr-2 sm:pr-3">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={classNames(
                    'group relative rounded-full px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
                    active ? 'text-cyan-300' : 'text-white/90 hover:text-white'
                  )}
                >
                  {/* Active pill background */}
                  <span
                    aria-hidden
                    className={classNames(
                      'absolute inset-0 -z-10 rounded-full bg-white/5 ring-1 ring-white/10 opacity-0 transition-opacity',
                      active ? 'opacity-100' : 'group-hover:opacity-100'
                    )}
                  />
                  {label}
                  {/* underline shimmer */}
                  <span
                    className={classNames(
                      'pointer-events-none absolute inset-x-2 -bottom-0.5 h-0.5 origin-left bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 transition-transform duration-200',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </Link>
              );
            })}
            {/* Primary CTA with gradient ring */}
            <Link
              href="/contact"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:from-cyan-300 hover:to-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-300"
            >
              Zapisz się
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={open}
            aria-controls="mobile-menu-panel"
            data-state={open ? 'open' : 'closed'}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden mr-2 inline-flex items-center justify-center rounded-lg p-2 text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <svg
              className={classNames('h-6 w-6 transition-transform', open && 'rotate-90')}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          className={classNames(
            'md:hidden fixed inset-x-3 top-3 z-[70] rounded-2xl bg-[linear-gradient(180deg,rgba(10,18,36,.96),rgba(5,10,20,.94))] ring-1 ring-white/10 shadow-2xl transition-[opacity,transform] origin-top',
            open ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'
          )}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold text-white/80">Menu</span>
            <button
              type="button"
              aria-label="Zamknij menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col px-2 pb-3">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={classNames(
                    'relative mx-2 my-1 rounded-xl px-4 py-3 text-base font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
                    active ? 'bg-white/10 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300"
                    >
                      aktywna
                    </span>
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mx-3 my-3 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-center text-base font-semibold text-black shadow-sm transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-300"
            >
              Zapisz się
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </nav>
        </div>

        {/* Backdrop for mobile */}
        <div
          aria-hidden
          className={classNames(
            'fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden transition-opacity',
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          onClick={() => setOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
