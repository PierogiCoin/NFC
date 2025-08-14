/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'placehold.co', // Dodaj tę domenę do listy dozwolonych hostów obrazów
      'images.unsplash.com',
      // Jeśli będziesz używać innych zewnętrznych domen dla obrazów, dodaj je tutaj
      // np. 'example.com', 'cdn.yourapp.com'
    ],
  },
};

module.exports = nextConfig;
