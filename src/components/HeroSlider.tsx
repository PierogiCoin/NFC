// src/components/HeroSlider.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination, Keyboard, A11y, Parallax } from 'swiper/modules';
import type SwiperCore from 'swiper';

// Styles Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';

/**
 * Slajdy – obrazy wczytywane z folderu /public/images/hero
 * Upewnij się, że w /public/images/hero znajdują się pliki:
 * - mma-1.png
 * - boxing-1.png
 * - women-1.png
 * - kettlebell-1.png
 * Możesz podmieniać nazwy/ścieżki wedle uznania – ważne, by były w /public.
 */
const slides = [
  {
    src: '/images/hero/mma-1.png',
    alt: 'Intensywny trening MMA',
    title: 'Opanuj Sztuki Walki',
    subtitle: 'Rozwijaj siłę, technikę i dyscyplinę w MMA.',
    link: '/mma',
    tag: 'MMA',
  },
  {
    src: '/images/hero/boxing-1.png',
    alt: 'Dynamiczny trening bokserski',
    title: 'Poczuj Moc Boksu',
    subtitle: 'Doskonal ciosy i pracę nóg z najlepszymi trenerami.',
    link: '/boxing',
    tag: 'Boks',
  },
  {
    src: '/images/hero/women-1.png',
    alt: 'Zajęcia dla kobiet – trening funkcjonalny',
    title: 'Siła Kobiet w Akcji',
    subtitle: 'Specjalne zajęcia – buduj pewność siebie, kondycję i technikę.',
    link: '/womens-section',
    tag: 'Sekcja Kobieca',
  },
  {
    src: '/images/hero/kettlebell-1.png',
    alt: 'Trening z kettlebell',
    title: 'Kettlebell: Funkcjonalna Siła',
    subtitle: 'Zwiększ wytrzymałość i mobilność z treningami kettlebell.',
    link: '/kettlebell',
    tag: 'Kettlebell',
  },
];

export default function HeroSlider() {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [reduced, setReduced] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // Szanuj preferencje dostępności (prefers-reduced-motion)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => {
      setReduced(mq.matches);
      if (mq.matches) setIsPlaying(false);
    };
    set();
    mq.addEventListener?.('change', set);
    return () => mq.removeEventListener?.('change', set);
  }, []);

  // Przełączanie autoplay
  const togglePlay = () => {
    if (!swiper) return;
    if (isPlaying) {
      swiper.autoplay?.stop();
      setIsPlaying(false);
    } else {
      swiper.autoplay?.start();
      setIsPlaying(true);
    }
  };

  return (
    <section
      className="relative w-full h-[520px] md:h-[640px] lg:h-[740px] overflow-hidden"
      onMouseEnter={() => swiper?.autoplay?.stop()}
      onMouseLeave={() => !reduced && isPlaying && swiper?.autoplay?.start()}
      role="region"
      aria-roledescription="carousel"
      aria-label="Najważniejsze sekcje klubu — slider"
    >
      {/* Dekoracyjna niebieska poświata */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-blue-900/30 via-indigo-700/20 to-cyan-600/20 blur-[70px] pointer-events-none" />

      <div className="relative h-full rounded-[28px] border border-white/10 bg-neutral-950/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination, Keyboard, A11y, Parallax]}
          effect="fade"
          loop
          parallax
          autoplay={
            reduced
              ? false
              : {
                  delay: 5000,
                  disableOnInteraction: false,
                }
          }
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
          onBeforeInit={(s) => {
            // Przed inicjalizacją przypnij elementy nawigacji
            // (ważne w React, gdy używamy refów)
            // @ts-expect-error – Swiper typuje to szerzej
            s.params.navigation = {
              ...(s.params.navigation || {}),
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            };
          }}
          onSwiper={(s) => {
            setSwiper(s);
            // Po zmontowaniu przypnij ponownie i zainicjalizuj nawigację
            // @ts-expect-error – dostęp do wewn. pól nawigacji
            s.params.navigation.prevEl = prevRef.current;
            // @ts-expect-error
            s.params.navigation.nextEl = nextRef.current;
            s.navigation.init();
            s.navigation.update();
          }}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} aria-roledescription="slide">
              <div className="relative w-full h-full">
                {/* Tło slajdu */}
                <div
                  className="absolute inset-0"
                  data-swiper-parallax="-20%"
                  aria-hidden="true"
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    sizes="100vw"
                    placeholder="empty"
                    className="object-cover"
                  />
                  {/* Cine-vignette + gradient dla czytelności, odcienie niebieskiego */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-900/50 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 [background:radial-gradient(110%_70%_at_50%_100%,rgba(12,17,29,0.85),transparent)]" />
                </div>

                {/* Treść slajdu */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10" data-swiper-parallax="-8%">
                  <div className="mx-auto max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur">
                      <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" aria-hidden />
                      {slide.tag}
                    </div>
                    <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
                      {slide.title}
                    </h2>
                    <p className="mx-auto mt-3 max-w-3xl text-base sm:text-lg text-white/85">
                      {slide.subtitle}
                    </p>
                    <div className="mt-8 flex items-center justify-center">
                      <Link href={slide.link} className="group">
                        <span className="sr-only">Przejdź do: {slide.title}</span>
                        <button
                          className="relative inline-flex items-center gap-2 rounded-full bg-cyan-400 px-7 py-3 text-lg font-bold text-black transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/50"
                        >
                          Dowiedz się więcej!
                          <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                          <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-300/0 via-white/40 to-cyan-300/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom nav */}
          <button
            ref={prevRef}
            aria-label="Poprzedni slajd"
            className="swiper-button-prev-custom absolute top-1/2 left-4 md:left-6 -translate-y-1/2 grid place-items-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-black/45 text-white shadow-lg ring-1 ring-white/10 backdrop-blur transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 touch-manipulation"
          >
            <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button
            ref={nextRef}
            aria-label="Następny slajd"
            className="swiper-button-next-custom absolute top-1/2 right-4 md:right-6 -translate-y-1/2 grid place-items-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-black/45 text-white shadow-lg ring-1 ring-white/10 backdrop-blur transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 touch-manipulation"
          >
            <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>

          {/* Pagination */}
          <div
            className="swiper-pagination-custom absolute bottom-5 left-1/2 z-20 -translate-x-1/2"
            aria-live="polite"
            aria-atomic="true"
          />
        </Swiper>

        {/* Przyciski sterujące (pauza/odtwarzanie) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-black/50 text-white ring-1 ring-white/10 backdrop-blur transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            aria-label={isPlaying ? 'Wstrzymaj automatyczne przewijanie' : 'Wznów automatyczne przewijanie'}
          >
            {isPlaying ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Global styles do upiększenia paginacji Swipera (bez zewnętrznego CSS) */}
      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 10px; height: 10px; margin: 0 5px; border-radius: 9999px;
          background: rgba(255,255,255,0.45); opacity: 1; transition: transform .25s ease, background-color .25s ease, box-shadow .25s ease;
        }
        .swiper-pagination-custom .swiper-pagination-bullet:hover { background: rgba(255,255,255,0.8); }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #22d3ee; /* cyan-400 */
          transform: scale(1.25);
          box-shadow: 0 0 0 6px rgba(34, 211, 238, 0.15);
        }
      `}</style>
    </section>
  );
}