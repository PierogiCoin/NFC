// src/components/ProductCard.tsx
import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden text-center p-5 flex flex-col justify-between transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"> {/* Ulepszone cienie i skalowanie */}
      <div className="relative w-full h-64 flex items-center justify-center overflow-hidden mb-4">
        <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/CCCCCC/000000?text=Brak+obrazu'; }} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-red-800 mb-2 group-hover:text-red-700 transition-colors duration-200">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-3xl font-extrabold text-gray-900 mb-4">{product.price}</p> {/* Większa czcionka dla ceny */}
      </div>
      <button
        onClick={() => onAddToCart(product.name)}
        className="bg-yellow-400 text-red-900 font-bold py-2.5 px-6 rounded-full shadow-md hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
};

export default ProductCard;
