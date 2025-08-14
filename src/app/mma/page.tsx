// src/app/mma/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import TrainerCard from '@/components/TrainerCard';

const benefits = [
  {
    title: 'Kondycja',
    desc: 'Popraw swoją wytrzymałość i szybkość.',
    icon: '🏃‍♂️',
    gradient: 'bg-gradient-to-tr from-sky-500 via-blue-500 to-indigo-600',
  },
  {
    title: 'Siła',
    desc: 'Buduj siłę mięśniową całego ciała.',
    icon: '💪',
    gradient: 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500',
  },
  {
    title: 'Technika',
    desc: 'Opanuj precyzyjne techniki kopnięć i ciosów.',
    icon: '🥊',
    gradient: 'bg-gradient-to-tr from-indigo-600 via-blue-500 to-sky-400',
  },
];

const SectionPage = ({
  title = 'KickBoxing',
  description = 'Odkryj intensywność i precyzję KickBoxingu – sportu, który łączy techniki bokserskie i kopnięcia, zapewniając pełen rozwój ciała i umysłu.',
  imageUrl = 'https://placehold.co/1600x900/000000/FFFFFF?text=KickBoxing',
}) => {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
        <Image src={imageUrl} alt={title} fill className="object-cover" priority unoptimized />
        {/* sportowy overlay: gradient + subtelny radial */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 [background:radial-gradient(40rem_20rem_at_50%_-6rem,rgba(37,99,235,0.25),transparent)]" />
        <div className="absolute inset-0 [background:radial-gradient(28rem_14rem_at_10%_85%,rgba(56,189,248,0.22),transparent)]" />
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400">
            {title}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90">{description}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`rounded-2xl p-[2px] ${b.gradient} shadow-[0_10px_30px_rgba(0,0,0,.35)] hover:scale-105 transition-transform`}
            >
              <div className="rounded-2xl bg-white/10 backdrop-blur px-6 py-6 text-white">
                <div className="text-4xl mb-4" aria-label={b.title}>{b.icon}</div>
                <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                <p className="text-white/85">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300">
          Nasi Trenerzy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TrainerCard name="Jan Kowalski" specialty="KickBoxing, Boks" bio="Doświadczony trener z sukcesami na arenie krajowej i międzynarodowej." imageUrl="https://placehold.co/300x300/000000/FFFFFF?text=Trener1" />
          <TrainerCard name="Anna Nowak" specialty="KickBoxing, Sekcja Kobieca" bio="Pasjonatka sportów walki i treningów funkcjonalnych." imageUrl="https://placehold.co/300x300/000000/FFFFFF?text=Trener2" />
          <TrainerCard name="Piotr Zieliński" specialty="Boks, Trening Siłowy" bio="Były zawodnik, teraz dzieli się swoim doświadczeniem." imageUrl="https://placehold.co/300x300/000000/FFFFFF?text=Trener3" />
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300">
          Galeria
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="overflow-hidden rounded-lg shadow-md border border-white/10 bg-black/30">
              <Image
                src={`https://placehold.co/600x400/0b1220/FFFFFF?text=Trening+${n}`}
                alt={`Trening ${n}`}
                width={600}
                height={400}
                className="object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      {/* Plan tygodnia (skrót) */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300">
          Plan tygodnia (skrót)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { day: 'Poniedziałek', slots: ['18:00 – Technika', '19:00 – Sparingi (średnio‑zaaw.)'] },
            { day: 'Środa', slots: ['18:00 – Kondycja/Work', '19:00 – Technika + Tarczowanie'] },
            { day: 'Piątek', slots: ['18:00 – Technika', '19:00 – Sparingi (open)'] },
          ].map((d) => (
            <div key={d.day} className="rounded-2xl p-[2px] bg-gradient-to-tr from-blue-900 via-indigo-800 to-cyan-700">
              <div className="rounded-2xl bg-black/40 backdrop-blur border border-white/10 p-6 h-full">
                <h3 className="text-blue-100 font-semibold">{d.day}</h3>
                <ul className="mt-3 space-y-2 text-white/85">
                  {d.slots.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-white/70">Pełny grafik znajdziesz w zakładce <a href="/kalendarz" className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4">Kalendarz</a>.</p>
      </section>

      {/* Jak zacząć? – 3 kroki */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-100 drop-shadow-[0_0_10px_rgba(30,64,175,0.35)]">
          Jak zacząć?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: 'Umów próbny trening', d: 'Wybierz termin i poziom grupy – pomożemy dopasować.', ico: '📅' },
            { t: 'Przyjdź 10 minut wcześniej', d: 'Odbiór karnetu, szybkie wprowadzenie, poznanie trenera.', ico: '👋' },
            { t: 'Trenuj regularnie', d: 'Dajemy plan, wsparcie i feedback – progres gwarantowany.', ico: '🔥' },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl p-[2px] bg-gradient-to-tr from-blue-900 via-indigo-800 to-cyan-700">
              <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 h-full text-white">
                <div className="text-3xl">{s.ico}</div>
                <h3 className="mt-3 font-semibold text-blue-100">{s.t}</h3>
                <p className="mt-1 text-white/85">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="/kontakt" className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-500 transition">
            Zapisz się na próbny
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 text-center text-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950 via-indigo-900 to-cyan-900" />
          <div className="absolute inset-0 [background:radial-gradient(40rem_20rem_at_50%_-6rem,rgba(37,99,235,0.28),transparent)]" />
          <div className="absolute inset-0 [background:radial-gradient(28rem_14rem_at_10%_85%,rgba(56,189,248,0.22),transparent)]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Dołącz do nas już dziś!</h2>
        <p className="mb-6 text-white/90">Rozpocznij swoją przygodę z KickBoxingiem i odkryj swój potencjał.</p>
        <a
          href="/kontakt"
          className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600/90 text-white font-semibold shadow-lg ring-1 ring-white/15 hover:bg-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label="Skontaktuj się"
        >
          Skontaktuj się
        </a>
      </section>

      {/* FAQ – krótkie odpowiedzi */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-100">FAQ</h2>
        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur divide-y divide-white/10">
          {[ 
            { q: 'Czy mogę zacząć bez doświadczenia?', a: 'Tak. Mamy grupy początkujące – trener dostosuje intensywność.' },
            { q: 'Czy potrzebny jest własny sprzęt?', a: 'Na start wystarczy strój sportowy. Ochraniacze i tarcze są na miejscu.' },
            { q: 'Czy są sparingi dla początkujących?', a: 'Są opcjonalne. Najpierw uczysz się podstaw, potem wchodzisz w bezpieczne sparingi.' },
          ].map((item) => (
            <details key={item.q} className="group open:bg-white/[.04]">
              <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
                <span className="font-semibold text-blue-100">{item.q}</span>
                <span className="transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-5 pb-5 text-white/85">{item.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default function KickBoxingPage() {
  return (
    <SectionPage
      title="KickBoxing"
      description="KickBoxing – dynamiczny sport łączący techniki boksu i kopnięcia, rozwijający kondycję, siłę oraz koordynację ruchową."
      imageUrl="https://placehold.co/1600x900/000000/FFFFFF?text=KickBoxing+Trening"
    />
  );
}