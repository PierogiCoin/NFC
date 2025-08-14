// src/app/page.tsx
'use client'; // Ten komponent używa stanu (useState) i obsługi zdarzeń (onClick)

import React, { useState } from 'react';

function FAQRow({ index, question, answer }: { index: number; question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`faq-${index}`}
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5"
      >
        <span className="font-semibold text-blue-100">{question}</span>
        <span className={`transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div id={`faq-${index}`} className={`${open ? 'block' : 'hidden'} px-5 pb-5 text-white/85`}>
        {answer}
      </div>
    </div>
  );
}
import Link from 'next/link'; // Importujemy Link do nawigacji
import SectionCard from '@/components/SectionCard'; // Importujemy komponenty
import FacebookSection from '@/components/FacebookSection'; // Importujemy komponent FacebookSection
import TestimonialsSection from '@/components/TestimonialsSection'; // Importujemy sekcję Testimoniali
import HeroSlider from '@/components/HeroSlider'; // Importujemy nowy komponent HeroSlider


// Komponent strony głównej
export default function HomePage() {
  // Stan activeSection jest używany tylko do symulacji kliknięć w tym przykładzie.
  // W prawdziwej aplikacji Next.js App Router, nawigacja odbywa się poprzez Linki.
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24"> {/* Szerokość kontenera + większe odstępy */}
      {/* Sekcja Hero - teraz używa komponentu HeroSlider */}
      <HeroSlider />

      <section className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-blue-100 drop-shadow-[0_0_10px_rgba(30,64,175,0.35)]">Wybierz swoją ścieżkę</h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Zajęcia dla początkujących i zaawansowanych. Sprawdź, która sekcja pasuje do Ciebie.
        </p>
      </section>

      {/* Siatka Wyróżnionych Sekcji - Ulepszony design */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <SectionCard
          title="KickBoxing"
          description="Opanuj sztuki walki od podstaw. Treningi dla każdego poziomu zaawansowania."
          imageUrl="/images/mma-trening.png"
          onClick={() => setActiveSection('mma')}
          linkHref="/mma"
        />
        <SectionCard
          title="BJJ"
          description="Rozwijaj siłę ciosu, szybkość i technikę. Zajęcia grupowe i indywidualne."
          imageUrl="/images/bjj-trening.png"
          onClick={() => setActiveSection('boxing')}
          linkHref="/bjj"
        />
        <SectionCard
          title="Sekcja Kobiet – CrossFit"
          description="Specjalnie zaprojektowane treningi dla kobiet w komfortowej atmosferze."
          imageUrl="/images/sekcja-kobiet.png"
          onClick={() => setActiveSection('womens-section')}
          linkHref="/kobiety"
        />
        <SectionCard
          title="Kettlebell"
          description="Buduj siłę funkcjonalną i wytrzymałość z treningami kettlebell."
          imageUrl="/images/kettlebell-trening.png"
          onClick={() => setActiveSection('kettlebell')}
          linkHref="/kettlebell"
        />
        <SectionCard
          title="Nasz Blog"
          description="Czytaj najnowsze artykuły, porady treningowe i relacje z wydarzeń."
          imageUrl="/images/blog-klubu.png"
          onClick={() => setActiveSection('blog')}
          linkHref="/blog"
        />
      </section>

      {/* Jak zacząć – 3 kroki */}
      <section className="relative mt-8 md:mt-12">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-blue-50">Jak zacząć?</h2>
        <p className="mt-2 text-center text-white/80">Zero stresu – prowadzimy od pierwszego kontaktu aż do pierwszego treningu.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              t: '1. Umów się na pierwszy trening',
              d: 'Wybierz sekcję i termin – pomożemy dobrać poziom.',
              ico: '📅',
            },
            {
              t: '2. Przyjdź 10 min wcześniej',
              d: 'Odbierz karnet, poznaj trenera i ekipę, złap atmosferę klubu.',
              ico: '👋',
            },
            {
              t: '3. Trenuj regularnie',
              d: 'Dajemy plan, wsparcie i feedback, żebyś widział/a postępy.',
              ico: '🔥',
            },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl p-[2px] bg-gradient-to-tr from-blue-900 via-indigo-800 to-cyan-700">
              <div className="rounded-2xl bg-black/40 backdrop-blur border border-white/10 p-6 h-full">
                <div className="text-3xl">{s.ico}</div>
                <h3 className="mt-3 font-semibold text-blue-100">{s.t}</h3>
                <p className="mt-1 text-white/80">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="/kontakt" className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-500 transition">Zapisz się na próbny</a>
        </div>
      </section>

      {/* Cennik – prosto i jasno */}
      <section className="relative mt-10 md:mt-16">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-blue-50">Cennik</h2>
        <p className="mt-2 text-center text-white/80">Proste pakiety – bez haczyków. Zniżki dla uczniów i studentów.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Start', price: '129 zł/mies.', perks: ['2 treningi tygodniowo', 'Dostęp do kalendarza', 'Opieka trenera'] },
            { name: 'Aktywny', price: '179 zł/mies.', perks: ['3–4 treningi tygodniowo', 'Konsultacje raz/mies.', 'Zniżki na seminaria'] },
            { name: 'Pro', price: '229 zł/mies.', perks: ['Nielimitowane wejścia', 'Plan pod zawody', 'Indywidualne wskazówki'] },
          ].map((p, i) => (
            <div key={p.name} className="rounded-3xl p-[2px] bg-gradient-to-tr from-blue-900 via-indigo-800 to-cyan-700">
              <div className="rounded-3xl bg-neutral-900/80 border border-white/10 p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold text-blue-100">{p.name}</h3>
                <p className="mt-2 text-3xl font-extrabold text-white">{p.price}</p>
                <ul className="mt-4 space-y-2 text-white/85">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <a href="/kontakt" className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-500 transition">Wybieram</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ – najczęstsze pytania */}
      <section className="relative mt-10 md:mt-16">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-blue-50">FAQ</h2>
        <div className="mt-6 max-w-3xl mx-auto divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/30 backdrop-blur">
          {[ 
            { q: 'Czy pierwszy trening jest darmowy?', a: 'Tak! Pierwszy trening próbny jest bezpłatny – wystarczy zapisać się przez formularz.' },
            { q: 'Czy muszę mieć własny sprzęt?', a: 'Na start wystarczy strój sportowy. Sprzęt treningowy zapewniamy na miejscu.' },
            { q: 'Czy dam radę jeśli nigdy nie trenowałem/am?', a: 'Oczywiście. Mamy grupy początkujące i trenujemy w bezpiecznym tempie.' },
          ].map((item, idx) => (
            <FAQRow key={item.q} index={idx} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>

      {/* Sekcja Testimoniali */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        <div className="rounded-3xl p-8 bg-gradient-to-tr from-blue-900 via-indigo-800 to-cyan-700 shadow-lg shadow-black/30">
          <p className="text-white text-lg leading-relaxed">"Świetna atmosfera i profesjonalni trenerzy! Polecam każdemu, kto chce zacząć swoją przygodę ze sportem."</p>
          <p className="mt-4 font-bold text-cyan-300">Anna Kowalska</p>
        </div>
        <div className="rounded-3xl p-8 bg-gradient-to-tr from-blue-900 via-indigo-800 to-cyan-700 shadow-lg shadow-black/30">
          <p className="text-white text-lg leading-relaxed">"Treningi na najwyższym poziomie, a efekty widoczne już po kilku tygodniach. Klub z prawdziwą pasją."</p>
          <p className="mt-4 font-bold text-cyan-300">Michał Nowak</p>
        </div>
        <div className="rounded-3xl p-8 bg-gradient-to-tr from-blue-900 via-indigo-800 to-cyan-700 shadow-lg shadow-black/30">
          <p className="text-white text-lg leading-relaxed">"Idealne miejsce dla kobiet, które chcą trenować w komfortowej i wspierającej atmosferze."</p>
          <p className="mt-4 font-bold text-cyan-300">Karolina Wiśniewska</p>
        </div>
      </section>

      {/* Sekcja Facebooka */}
      <FacebookSection />
    </div>
  );
}