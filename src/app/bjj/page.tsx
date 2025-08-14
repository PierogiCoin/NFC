'use client';

import Image from 'next/image';
import TrainerCard from '@/components/TrainerCard';

const trainers = [
  {
    name: 'Jan "Professor" Kowalski',
    specialty: 'Head Coach – BJJ',
    bio: 'Czarny pas BJJ, ponad 10 lat doświadczenia, medalista ME. Specjalizacja: gra z gardy, presja z góry, taktyka startowa.',
    imageUrl: '/images/trainers/jan-kowalski.jpg',
  },
  {
    name: 'Anna Nowak',
    specialty: 'Instruktorka – BJJ / No-Gi',
    bio: 'Czarny pas, prowadzi zajęcia dla początkujących i sekcję kobiet. Kładzie nacisk na technikę i bezpieczeństwo.',
    imageUrl: '/images/trainers/anna-nowak.jpg',
  },
  {
    name: 'Piotr Zieliński',
    specialty: 'Asystent trenera – Sparingi',
    bio: 'Brązowy pas, odpowiedzialny za przygotowanie sparingowe i schematy przejść pozycji.',
    imageUrl: '/images/trainers/piotr-zielinski.jpg',
  },
];

const benefits = [
  {
    title: 'Technika ponad siłę',
    desc: 'BJJ uczy wykorzystywać dźwignie, kontrolę i timing – sprawdzi się dla każdej budowy ciała.',
    icon: '🌀',
  },
  { title: 'Kondycja i mobilność', desc: 'Trening całego ciała, poprawa wydolności i zakresu ruchu.', icon: '🏋️‍♂️' },
  { title: 'Samoobrona', desc: 'Praktyczne umiejętności w parterze, skuteczne w realnych sytuacjach.', icon: '🛡️' },
];

const timetable: { day: string; items: string[] }[] = [
  { day: 'Poniedziałek', items: ['18:00–19:15 BJJ – podstawy', '19:30–21:00 BJJ – zaawansowani'] },
  { day: 'Wtorek', items: ['18:30–19:45 No-Gi – technika', '20:00–21:00 Sparingi (opcjonalnie)'] },
  { day: 'Środa', items: ['18:00–19:15 BJJ – sekcja kobiet', '19:30–21:00 BJJ – drille i sytuacje'] },
  { day: 'Czwartek', items: ['18:30–19:45 No-Gi – przejścia i poddania', '20:00–21:00 Sparingi (opcjonalnie)'] },
  { day: 'Piątek', items: ['18:00–19:30 BJJ – mix poziomów + open mat'] },
];

export default function BjjPage() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* TŁO: gradient bazowy + blobsy */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950" />
        <div className="absolute inset-0 [background:radial-gradient(40rem_20rem_at_50%_-6rem,rgba(250,204,21,0.10),transparent)]" />
        {/* blob: złoto-czerwony akcent */}
        <div className="absolute -left-24 top-1/2 size-[28rem] -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-700 opacity-20 blur-3xl [animation:blob-float_24s_ease-in-out_infinite]" />
        <div className="absolute -right-20 -top-10 size-[22rem] rounded-full bg-gradient-to-tr from-sky-400 via-cyan-400 to-blue-500 opacity-15 blur-3xl [animation:blob-float-rev_28s_ease-in-out_infinite]" />
      </div>

      {/* HERO */}
      <div className="relative mt-4 overflow-hidden rounded-3xl border border-white/10 ring-1 ring-white/5">
        <div className="relative h-[46vh] min-h-[340px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1581009137042-c552e4856971?q=80&w=2000&auto=format&fit=crop"
            alt="Trening Brazilian Jiu-Jitsu – walka w parterze"
            fill
            className="object-cover"
            priority
          />
          {/* maska i przyciemnienie */}
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_10%,rgba(0,0,0,0.55),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/10" />

          <div className="relative z-10 grid h-full place-items-center px-6 text-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-200 via-sky-200 to-indigo-200 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x drop-shadow-[0_1px_0_rgba(0,0,0,.35)]">
                  Brazilian Jiu-Jitsu
                </span>
              </h1>
              <p className="mx-auto mt-3 max-w-3xl text-white/90 text-base md:text-lg">
                BJJ – sztuka walki oparta na dźwigniach, kontroli i taktyce. Naucz się wygrywać techniką, a nie siłą.
              </p>

              {/* mini-metryka sekcji */}
              <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-white/80">
                <li className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">Gi &amp; No-Gi</li>
                <li className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">Poziomy: od 0 do pro</li>
                <li className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">Bezpieczeństwo i technika</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFITY */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="group rounded-2xl p-[2px] bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-700 shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-transform will-change-transform hover:scale-[1.02]"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
              <div className="mb-3 grid size-12 place-items-center rounded-full bg-black/30 text-3xl ring-1 ring-white/10 shadow-inner">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{b.title}</h3>
              <p className="mt-1 text-white/85">{b.desc}</p>
              {/* dolna kreska akcentowa */}
              <span className="mt-4 block h-[2px] w-16 mx-auto bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {/* O TRENINGACH */}
      <div className="mt-12 rounded-3xl p-[2px] bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-700">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-xl md:px-10 md:py-10">
          <h2 className="text-3xl font-extrabold text-white">O treningach</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <ul className="space-y-3 text-white/85">
              <li>• <strong>Poziomy:</strong> początkujący, średnio-zaawansowani, zaawansowani, sekcja kobiet.</li>
              <li>• <strong>No-Gi:</strong> zajęcia bez kimon – nacisk na kontrolę i szybkie przejścia.</li>
              <li>• <strong>Sprzęt:</strong> kimono (Gi), pas, ochraniacz na zęby; na No-Gi: rashguard i spodenki.</li>
              <li>• <strong>Bezpieczeństwo:</strong> uczymy tapowania, asekuracji i pracy z partnerem.</li>
            </ul>
            <div className="text-white/85">
              <p>
                Każdy trening łączy <em>drille techniczne</em>, <em>pozycje sytuacyjne</em> i krótkie <em>sparingi kontrolowane</em>.
                Dzięki temu szybciej utrwalisz schematy i zrozumiesz strategię walki.
              </p>
              <p className="mt-3">
                Nowe osoby zapraszamy na blok „Podstawy” – pierwsza wizyta to krótkie wprowadzenie do zasad BJJ.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GRAFIK */}
      <div className="mt-12">
        <h2 className="mb-4 text-3xl font-extrabold text-white">Grafik tygodniowy</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {timetable.map((row) => (
            <div key={row.day} className="rounded-2xl p-[2px] bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-700">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <p className="mb-2 font-semibold text-sky-300">{row.day}</p>
                <ul className="space-y-2 text-white/85">
                  {row.items.map((it) => (
                    <li key={it} className="relative pl-4">
                      <span aria-hidden className="absolute left-0 top-2 size-1.5 rounded-full bg-cyan-400" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENERZY */}
      <div className="mt-12">
        <h2 className="mb-6 text-3xl font-extrabold text-white">Nasi trenerzy</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t) => (
            <TrainerCard key={t.name} {...t} />
          ))}
        </div>
        <p className="mt-3 text-sm text-white/60">
          Jeśli nie masz jeszcze zdjęć trenerów, wgraj je do <code>/public/images/trainers/</code>. Do tego czasu wyświetlą się estetyczne placeholdery.
        </p>
      </div>

      {/* GALERIA */}
      <div className="mt-12">
        <h2 className="mb-6 text-3xl font-extrabold text-white">Galeria</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <div className="relative h-40 w-full">
                <Image
                  src={`https://images.unsplash.com/photo-1581009137042-c552e4856971?q=80&w=${900 + n * 7}&auto=format&fit=crop`}
                  alt={`BJJ – trening ${n}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105 will-change-transform"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 rounded-3xl p-[2px] bg-gradient-to-tr from-blue-700 to-cyan-500">
        <div className="rounded-3xl border border-white/10 bg-black/40 px-6 py-10 text-center backdrop-blur-xl">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">Dołącz do sekcji BJJ</h3>
          <p className="mt-2 text-white/85">
            Pierwszy trening wprowadzający – bez zobowiązań. Zabierz strój sportowy lub kimono, jeśli masz.
          </p>
          <a
            href="/kontakt"
            className="mt-5 inline-flex items-center rounded-full bg-sky-400 px-6 py-3 text-base font-semibold text-black shadow-sm transition hover:bg-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-300"
          >
            Zapisz się na trening
          </a>
        </div>
      </div>
    </section>
  );
}
