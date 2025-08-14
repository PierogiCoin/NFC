// src/app/shop/page.tsx
'use client'; // This component uses state (useState) and event handlers (onClick)

import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard'; // Import the component

export default function ShopPage() {
  const products = [
    {
      id: 1,
      name: "Koszulka Klubowa Premium",
      price: "79.99 PLN",
      imageUrl: "https://placehold.co/300x300/000000/FFFFFF?text=Koszulka",
      description: "Wysokiej jakości koszulka z logo klubu, idealna na trening i na co dzień. Dostępna w różnych rozmiarach."
    },
    {
      id: 2,
      name: "Rękawice Bokserskie Pro (12 oz)",
      price: "249.99 PLN",
      imageUrl: "https://placehold.co/300x300/000000/FFFFFF?text=Rękawice",
      description: "Profesjonalne rękawice bokserskie zapewniające doskonałą ochronę i komfort. Idealne do sparingów i treningów na worku."
    },
    {
      id: 3,
      name: "Odważnik Kettlebell 16kg",
      price: "159.99 PLN",
      imageUrl: "https://placehold.co/300x300/000000/FFFFFF?text=Kettlebell",
      description: "Solidny odważnik kettlebell o wadze 16 kg, idealny do treningów siłowych i funkcjonalnych. Ergonomiczny uchwyt."
    },
    {
      id: 4,
      name: "Ochraniacze na piszczele",
      price: "120.00 PLN",
      imageUrl: "https://placehold.co/300x300/000000/FFFFFF?text=Ochraniacze",
      description: "Wytrzymałe ochraniacze na piszczele i stopę, niezbędne podczas treningów MMA i Muay Thai. Zapewniają maksymalną ochronę."
    },
    {
      id: 5,
      name: "Bandaże bokserskie (komplet)",
      price: "35.00 PLN",
      imageUrl: "https://placehold.co/300x300/000000/FFFFFF?text=Bandaże",
      description: "Elastyczne bandaże bokserskie, chroniące dłonie i nadgarstki. Dostępne w różnych kolorach."
    },
    {
      id: 6,
      name: "Bidon sportowy klubowy",
      price: "25.00 PLN",
      imageUrl: "https://placehold.co/300x300/000000/FFFFFF?text=Bidon",
      description: "Pojemny bidon sportowy z logo klubu, idealny do utrzymania nawodnienia podczas intensywnych treningów."
    },
  ];

  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Function to display a message about adding a product to the cart
  const handleAddToCart = (productName) => {
    setMessage(`"${productName}" został dodany do koszyka!`);
    setShowMessage(true);
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
      setMessage('');
    }, 3000);
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-200"> {/* Enhanced shadows and rounded corners */}
      <h2 className="text-4xl sm:text-5xl font-bold text-red-800 mb-6 text-center">Sklep Klubowy</h2>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Wspieraj klub, kupując oficjalne produkty! Znajdziesz u nas wysokiej jakości sprzęt treningowy i odzież.
        Tutaj możesz zintegrować bramki płatności (np. Stripe, PayPal) oraz system zarządzania produktami.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="bg-red-700 text-white font-bold py-3 px-10 rounded-full text-lg shadow-md hover:bg-red-600 transition-colors duration-300 transform hover:scale-105">
          Przejdź do koszyka
        </button>
      </div>

      {/* Cart added message */}
      {showMessage && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl animate-fadeInOut z-50">
          {message}
        </div>
      )}
    </div>
  );
}