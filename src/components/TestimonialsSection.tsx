// src/components/TestimonialsSection.tsx
import React from 'react';
import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Nigdy nie myślałam, że sporty walki są dla mnie, ale sekcja kobieca w tym klubie zmieniła moje życie! Czuję się silniejsza, pewniejsza siebie i mam niesamowite wsparcie. Trenerzy są fantastyczni!",
      author: "Anna K. (Sekcja Kobieca)",
      avatar: "https://placehold.co/80x80/FFD700/000000?text=AK",
    },
    {
      id: 2,
      quote: "Trenuję MMA od roku i widzę ogromne postępy. Profesjonalne podejście, świetna atmosfera i bardzo zróżnicowane treningi. Polecam każdemu, kto chce się rozwijać!",
      author: "Michał P. (MMA)",
      avatar: "https://placehold.co/80x80/FFD700/000000?text=MP",
    },
    {
      id: 3,
      quote: "Treningi z kettlebell to rewelacja! Poprawiłem siłę i wytrzymałość, a zajęcia są zawsze pełne energii. Klub ma super sprzęt i wykwalifikowanych instruktorów.",
      author: "Krzysztof W. (Kettlebell)",
      avatar: "https://placehold.co/80x80/FFD700/000000?text=KW",
    },
    {
      id: 4,
      quote: "Zawsze chciałam spróbować boksu i ten klub to strzał w dziesiątkę. Od podstaw uczą techniki, dbają o bezpieczeństwo i motywują do działania. Polecam wszystkim kobietom!",
      author: "Ewa J. (Boks)",
      avatar: "https://placehold.co/80x80/FFD700/000000?text=EJ",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-8 md:p-12 rounded-3xl overflow-hidden text-white shadow-2xl">
      {/* Layered noise texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "url('/noise.png')" }}
      />
      <div className="relative z-10 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 leading-tight drop-shadow-2xl text-yellow-400 tracking-tight">
          Co mówią o nas nasi klubowicze?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative group rounded-2xl p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-yellow-600 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center shadow-inner border border-white/10 transition-all duration-500 group-hover:shadow-yellow-400/30">
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover rounded-full border-4 border-yellow-400 shadow-md"
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {/* Decorative quote icon */}
                <svg
                  className="w-8 h-8 text-yellow-400 mb-3"
                  fill="none"
                  viewBox="0 0 32 32"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    d="M12 21c0-5.523 4.477-10 10-10V7c-7.18 0-13 5.82-13 13h3Zm10 0c0-2.761-2.239-5-5-5v-3c4.418 0 8 3.582 8 8h-3Z"
                    opacity="0.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-base md:text-lg italic mb-4 text-gray-200 leading-relaxed font-medium tracking-normal">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="font-bold text-yellow-300 text-lg tracking-wide mt-2">
                  - {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;