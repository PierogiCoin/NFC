// src/components/FacebookSection.tsx
'use client';

import React, { useState } from 'react';

const PAGE_URL = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || 'https://www.facebook.com/TwojKlub'; // możesz nadpisać przez env

const FacebookSection = () => {
  const [copied, setCopied] = useState(false);

  const iframeSrc = (() => {
    const u = new URL('https://www.facebook.com/plugins/page.php');
    u.searchParams.set('href', PAGE_URL);
    u.searchParams.set('tabs', 'timeline');
    u.searchParams.set('width', '500'); // plugin wymaga liczby; szerokość i tak dopasujemy CSS-em
    u.searchParams.set('height', '600');
    u.searchParams.set('small_header', 'false');
    u.searchParams.set('adapt_container_width', 'true');
    u.searchParams.set('hide_cover', 'false');
    u.searchParams.set('show_facepile', 'true');
    return u.toString();
  })();

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(PAGE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* tło: deep blue + radiale */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-900/80 to-blue-950" />
        <div className="absolute inset-0 [background:radial-gradient(40rem_20rem_at_50%_-6rem,rgba(37,99,235,0.35),transparent)]" />
        <div className="absolute inset-0 [background:radial-gradient(28rem_14rem_at_10%_85%,rgba(56,189,248,0.25),transparent)]" />
      </div>

      <div className="rounded-3xl p-[2px] bg-gradient-to-tr from-blue-900 via-indigo-800 to-cyan-700 shadow-[0_20px_60px_rgba(0,0,0,.45)]">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="px-6 py-8 md:px-10 md:py-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                  Nasze aktualności na Facebooku
                </span>
              </h2>

              {/* status + opis */}
              <div className="mt-3 flex items-center justify-center gap-2 text-white/80">
                <span className="relative inline-flex items-center gap-2">
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400/60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
                  </span>
                  <span className="text-sm">Live feed</span>
                </span>
              </div>

              <p className="mt-3 text-base md:text-lg text-white/80">
                Bądź na bieżąco z wydarzeniami, zdjęciami i ogłoszeniami klubu. Poniżej znajdziesz nasz feed — a jednym kliknięciem przejdziesz na profil.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <a
                  href={PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Przejdź do naszego profilu na Facebooku (otworzy się w nowej karcie)"
                  className="rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Otwórz nasz profil
                </a>
                <button
                  onClick={copyLink}
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-live="polite"
                >
                  {copied ? 'Skopiowano!' : 'Skopiuj link'}
                </button>
              </div>
            </div>

            {/* Feed — osadzony, responsywny kontener (jeśli chcesz, podmień PAGE_URL powyżej) */}
            <div className="mt-8 md:mt-10 rounded-2xl border border-white/10 bg-black/30 p-3">
              <div className="relative w-full overflow-hidden rounded-xl">
                {/* Iframe w responsywnym wrapperze */}
                <div className="relative w-full" style={{ height: 600 }}>
                  <iframe
                    title="Facebook Page Feed"
                    src={iframeSrc}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder={0}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Fallback / instrukcja gdyby ktoś chciał Graph API zamiast iframa */}
              <p className="mt-4 text-center text-xs text-white/55">
                Jeśli wolisz pobierać posty przez Graph API i wyświetlać je natywnie, mogę podpiąć endpoint i ładny layout kart postów.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacebookSection;