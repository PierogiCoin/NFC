/**
 * Library entry point - exports reusable components
 * 
 * This file is used when building the project as a library (via tsup).
 * If this is primarily a Next.js app and not a library, you can remove
 * tsup.config.ts and package.json.suggested.
 */

// Export all reusable components
export { default as TrainerCard } from './components/TrainerCard';
export { default as Footer } from './components/Footer';
export { default as SectionCard } from './components/SectionCard';
export { default as FacebookSection } from './components/FacebookSection';
export { default as TestimonialsSection } from './components/TestimonialsSection';
export { default as HeroSlider } from './components/HeroSlider';
export { default as Header } from './components/Header';
export { default as BlogPostCard } from './components/BlogPostCard';
