
import Image from 'next/image';
import TrainerCard from '@/components/TrainerCard';

const trainers = [
  {
    name: 'Kacper Nowicki',
    specialty: 'Kettlebell – Hardstyle / SFG',
    bio: 'Instruktor z wieloletnim doświadczeniem. Specjalizacja: swing, goblet squat, Turkish get‑up, snatch. Bezpieczeństwo i technika ponad wszystko.',
    imageUrl: '/images/trainers/kacper-nowicki.jpg',
  },
  {
    name: 'Marta Wróbel',
    specialty: 'Siła funkcjonalna / Mobilność',
    bio: 'Łączy treningi kettlebell z mobilnością i stabilizacją. Buduje siłę bez utraty zakresu ruchu.',
    imageUrl: '/images/trainers/marta-wrobel.jpg',
  },
];

const benefits = [
  { title: 'Siła funkcjonalna', desc: 'Ćwicz całe ciało jednocześnie: core, chwyt, biodra i plecy.', icon: '💪' },
  { title: 'Kondycja i spalanie', desc: 'Krótko i intensywnie – EMOM, kompleksy i interwały.', icon: '⏱️' },
  { title: 'Mobilność i zdrowe plecy', desc: 'Ruchy balistyczne i kontrolowane poprawiają zakres i stabilność.', icon: '🧘‍♀️' },
];

const timetable: { day: string; items: string[] }[] = [
  { day: 'Poniedziałek', items: ['17:30–18:20 Kettlebell – podstawy', '18:30–19:20 Kettlebell – siła i technika'] },
  { day: 'Środa', items: ['17:30–18:20 Kondycja – EMOM/Kompleksy', '18:30–19:30 Turkish Get‑Up & mobilność'] },
  { day: 'Piątek', items: ['17:00–18:00 Open KB – praktyka i progresje'] },
];

export default function KettlebellPage() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* dekoracyjne tło */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950" />
        <div className="absolute inset-0 [background:radial-gradient(40rem_20rem_at_50%_-6rem,rgba(234,179,8,0.10),transparent)]" />
      </div>

      {/* HERO */}
      <div className="relative mt-4 rounded-3xl overflow-hidden border border-white/10">
        <div className="relative h-[46vh] min-h-[340px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1599050751795-5cda7344e45e?q=80&w=2000&auto=format&fit=crop"
            alt="Trening kettlebell – swing w klubie"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20" />
          <div className="relative z-10 h-full grid place-items-center text-center px-6">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">Kettlebell</h1>
              <p className="mx-auto mt-3 max-w-3xl text-white/85 text-base md:text-lg">
                Treningi z odważnikami kulowymi: siła, kondycja i mobilność w jednym. Uczymy techniki Hardstyle tak,
                by było **skutecznie i bezpiecznie**.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFITY */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-2xl p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-yellow-600 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center">
              <div className="text-4xl mb-3">{b.icon}</div>
              <h3 className="text-xl font-bold text-white">{b.title}</h3>
              <p className="mt-1 text-white/80">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* O TRENINGACH */}
      <div className="mt-12 rounded-3xl p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-yellow-600">
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-8 md:px-10 md:py-10">
          <h2 className="text-3xl font-extrabold text-white">O treningach</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <ul className="space-y-3 text-white/85">
              <li>• <strong>Podstawy:</strong> nauka swingu, martwego ciągu z KB, goblet squat, press.</li>
              <li>• <strong>Technika i siła:</strong> progresje do clean & press, snatch, Turkish get‑up.</li>
              <li>• <strong>Kondycja:</strong> EMOM, kompleksy KB, interwały – krótko i skutecznie.</li>
              <li>• <strong>Sprzęt:</strong> odważniki 8–32 kg; dobieramy ciężar do poziomu i celu.</li>
            </ul>
            <div className="text-white/85">
              <p>
                Uczymy poprawnego oddechu, pracy bioder i stabilizacji tułowia. Dzięki temu budujesz **realną siłę** i
                chronisz kręgosłup. Każde zajęcia łączą naukę techniki z krótkim blokiem kondycyjnym.
              </p>
              <p className="mt-3">Pierwszy raz? Przyjdź na blok „Podstawy” – wprowadzimy Cię krok po kroku.</p>
            </div>
          </div>
        </div>
      </div>

      {/* GRAFIK */}
      <div className="mt-12">
        <h2 className="text-3xl font-extrabold text-white mb-4">Grafik zajęć</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timetable.map((row) => (
            <div key={row.day} className="rounded-2xl p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-yellow-600">
              <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5">
                <p className="text-yellow-300 font-semibold mb-2">{row.day}</p>
                <ul className="space-y-2 text-white/85">
                  {row.items.map((it) => (
                    <li key={it}>• {it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENERZY */}
      <div className="mt-12">
        <h2 className="text-3xl font-extrabold text-white mb-6">Nasi trenerzy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trainers.map((t) => (
            <TrainerCard key={t.name} {...t} />
          ))}
        </div>
        <p className="mt-3 text-sm text-white/60">Zdjęcia dodaj do <code>/public/images/trainers/</code>. Do czasu wgrania użyjemy eleganckich placeholderów.</p>
      </div>

      {/* GALERIA */}
      <div className="mt-12">
        <h2 className="text-3xl font-extrabold text-white mb-6">Galeria</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <div className="relative h-40 w-full">
                <Image
                  src={`https://images.unsplash.com/photo-1599050751795-5cda7344e45e?q=80&w=${800 + n * 5}&auto=format&fit=crop`}
                  alt={`Kettlebell – trening ${n}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 rounded-3xl p-[2px] bg-gradient-to-tr from-red-600 to-yellow-500">
        <div className="rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-10 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">Dołącz do sekcji Kettlebell</h3>
          <p className="mt-2 text-white/80">Pierwszy trening wprowadzający – bez zobowiązań. Nauczymy Cię techniki od podstaw.</p>
          <a
            href="/kontakt"
            className="mt-5 inline-flex items-center rounded-full bg-yellow-400 px-6 py-3 text-base font-semibold text-black shadow-sm transition hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-300"
          >
            Zapisz się na trening
          </a>
        </div>
      </div>
    </section>
  );
}