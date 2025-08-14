// src/components/HeroSlider.tsx
'use client'; // Ten komponent używa stanu (useState) i efektów (useEffect)

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const images = [
  {
    src: "https://placehold.co/1200x600/333333/FFFFFF?text=Trening+MMA",
    alt: "Intensywny trening MMA",
    title: "Opanuj Sztuki Walki",
    subtitle: "Rozwijaj siłę, technikę i dyscyplinę w MMA.",
    link: "/mma"
  },
  {
    src: "https://placehold.co/1200x600/444444/FFFFFF?text=Boks+w+Akcji",
    alt: "Dynamiczny trening bokserski",
    title: "Poczuj Moc Boksu",
    subtitle: "Doskonal ciosy i pracę nóg z najlepszymi trenerami.",
    link: "/boxing"
  },
  {
    src: "https://placehold.co/1200x600/555555/FFFFFF?text=Sekcja+Kobiet",
    alt: "Zajęcia dla kobiet",
    title: "Siła Kobiet w Akcji",
    subtitle: "Specjalne zajęcia dla kobiet – buduj pewność siebie.",
    link: "/womens-section"
  },
  {
    src: "https://placehold.co/1200x600/666666/FFFFFF?text=Kettlebell+Trening",
    alt: "Trening z kettlebell",
    title: "Kettlebell: Funkcjonalna Siła",
    subtitle: "Zwiększ wytrzymałość i mobilność z treningami kettlebell.",
    link: "/kettlebell"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatyczne przełączanie slajdów
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Zmienia slajd co 5 sekund
    return () => clearInterval(timer);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl shadow-2xl">
      {/* Obrazy slajdów */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x600/CCCCCC/000000?text=Brak+obrazu'; }}
          />
          {/* Nakładka z gradientem i tekstem */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end items-center p-8 text-white text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg animate-fadeInUp">
              {image.title}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto opacity-90 animate-fadeInUp delay-200">
              {image.subtitle}
            </p>
            <Link href={image.link} className="inline-block group animate-fadeInUp delay-400">
              <button
                className="bg-yellow-400 text-red-900 font-bold py-3 px-10 rounded-full text-lg md:text-xl shadow-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 ease-in-out
                           flex items-center justify-center space-x-3"
              >
                <span>Dowiedz się więcej!</span>
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </Link>
          </div>
        </div>
      ))}

      {/* Przyciski nawigacji (strzałki) */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Poprzedni slajd"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Następny slajd"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>

      {/* Kropki nawigacyjne */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-yellow-400 w-6' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Przejdź do slajdu ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;