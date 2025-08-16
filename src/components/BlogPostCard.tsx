// src/components/BlogPostCard.tsx
import React from 'react';
import Image from 'next/image';

export type BlogPost = {
  id: number;
  title: string;
  date: string;
  excerpt?: string;
  imageUrl?: string;
  fullContent: string;
  tags?: string[];
};

type BlogPostCardProps = {
  post: BlogPost;
  onReadMore: () => void;
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onReadMore }) => {
  const getDisplayContent = (content: string, maxLength = 150): string => {
    if (!content) return '';
    return content.length <= maxLength ? content : content.substring(0, maxLength) + '...';
    // alternatywnie: `${content.slice(0, maxLength)}…`
  };

  const displayExcerpt = post.excerpt || getDisplayContent(post.fullContent);

  return (
    <div className="group relative rounded-2xl p-[2px] bg-brand-warm shadow-[0_12px_30px_rgba(0,0,0,.35)] transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
      <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-brand-card border border-white/10 shadow-lg">
        <div className="relative w-full h-48">
          <Image
            src={post.imageUrl || 'https://placehold.co/600x400/CCCCCC/000000?text=Post'}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-brand-amber mb-2 transition-colors duration-300 group-hover:text-brand-yellow">
              {post.title}
            </h3>
            <p className="text-xs uppercase tracking-wide text-white/60 mb-3">{post.date}</p>
            <p className="text-white/80 text-sm leading-relaxed">{displayExcerpt}</p>
          </div>

          <button
            type="button"
            onClick={onReadMore}
            className="mt-5 inline-flex items-center px-5 py-2 rounded-full bg-red-600 text-white font-semibold shadow-md hover:bg-red-500 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          >
            Czytaj więcej
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
