"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WomenCrossfitPage() {
  const benefits = [
    {
      title: "Kondycja",
      desc: "Cardio, interwały i fun – bez nudy!",
      icon: "💖",
      grad: "from-pink-400 via-rose-400 to-fuchsia-500",
    },
    {
      title: "Siła",
      desc: "Silne ciało = pewność siebie na co dzień.",
      icon: "💪",
      grad: "from-fuchsia-500 via-pink-500 to-rose-500",
    },
    {
      title: "Mobilność",
      desc: "Zdrowe biodra, barki i kręgosłup – zero sztywności.",
      icon: "🧘‍♀️",
      grad: "from-rose-400 via-pink-400 to-fuchsia-400",
    },
    {
      title: "Wspólnota",
      desc: "Ćwiczymy razem, wspieramy się i świętujemy postępy!",
      icon: "👭",
      grad: "from-pink-300 via-rose-400 to-pink-500",
    },
  ];

  const affirmations = [
    "Jestem silna.",
    "Moje ciało potrafi więcej, niż myślę.",
    "Każdy trening przybliża mnie do celu.",
  ];

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-12 text-white overflow-hidden">
      {/* Animowane blobsy w tle */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -left-24 top-1/2 size-[28rem] -translate-y-1/2 rounded-full bg-gradient-to-tr from-pink-400 via-rose-400 to-fuchsia-500 opacity-25 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -right-20 -top-10 size-[24rem] rounded-full bg-gradient-to-tr from-fuchsia-400 via-pink-300 to-rose-400 opacity-25 blur-3xl"
        />
      </div>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-fuchsia-500/10 backdrop-blur-xl"
      >
        <div className="relative grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="bg-gradient-to-r from-pink-200 via-rose-200 to-fuchsia-200 bg-clip-text text-transparent bg-[length:200%_200%]"
              >
                Sekcja Kobiet – CrossFit
              </motion.span>
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Siła, energia i fun w kobiecym gronie. Trenuj skutecznie, bezpiecznie i z uśmiechem – zaczynamy tam, gdzie jesteś.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center rounded-full bg-pink-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-300"
              >
                Dołącz do nas!
              </Link>
              <a
                href="#grafik"
                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white/90 backdrop-blur transition hover:bg-white/20"
              >
                Zobacz grafik
              </a>
            </div>
          </div>

          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl p-[3px] bg-gradient-to-tr from-pink-400 via-rose-400 to-fuchsia-500 shadow-2xl"
            >
              <div className="overflow-hidden rounded-[14px] border border-white/10 bg-white/10">
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80"
                  alt="Kobiety trenujące CrossFit – energia i wsparcie"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* BENEFITY */}
      <section className="mt-12">
        <h2 className="text-center text-3xl font-extrabold">
          <span className="bg-gradient-to-r from-pink-200 via-rose-200 to-fuchsia-200 bg-clip-text text-transparent">
            Dlaczego pokochasz te zajęcia?
          </span>
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, idx) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, rotate: 1 }}
              className={`group rounded-2xl p-[2px] bg-gradient-to-tr ${b.grad} shadow-lg transition-transform`}
            >
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur-xl">
                <div
                  className={`mx-auto mb-3 grid size-12 place-items-center rounded-full bg-gradient-to-tr ${b.grad} text-2xl shadow-lg ring-2 ring-white/20`}
                >
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm text-white/85">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GRAFIK */}
      <motion.section
        id="grafik"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12"
      >
        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h3 className="text-2xl font-extrabold">Plan zajęć</h3>
            <Link
              href="/calendar"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/20"
            >
              Pełny kalendarz →
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              ["Poniedziałek", "18:00 – 19:00", "Trening ogólny + core"],
              ["Środa", "18:00 – 19:00", "Technika + siła"],
              ["Sobota", "9:00 – 10:00", "Mobilność + rozciąganie"],
            ].map(([day, time, desc], i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-gradient-to-tr from-pink-400/25 via-rose-400/25 to-fuchsia-400/25 p-4 ring-1 ring-white/10"
              >
                <p className="text-sm text-white/70">{day}</p>
                <p className="text-lg font-semibold">{time}</p>
                <p className="text-sm text-white/80">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* MOTYWACYJNY PASEK */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-rose-500/35 via-pink-500/35 to-fuchsia-500/35 p-6 text-center backdrop-blur-xl"
      >
        <ul className="flex flex-col items-center justify-center gap-2 text-base sm:flex-row sm:gap-6">
          {affirmations.map((a, i) => (
            <li key={i} className="font-semibold text-white/95">
              {a}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* CTA KOŃCOWE */}
      <section className="mt-12 text-center">
        <p className="text-white/85">
          Nie musisz być gotowa – zacznij, a gotowość przyjdzie w trakcie 💗
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/kontakt"
            className="inline-flex items-center rounded-full bg-pink-500 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-300"
          >
            Zapisz się na pierwszy trening
          </Link>
          <a
            href="tel:+48123456789"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white/90 backdrop-blur transition hover:bg-white/20"
          >
            Zadzwoń: 123 456 789
          </a>
        </div>
      </section>
    </main>
  );
}
