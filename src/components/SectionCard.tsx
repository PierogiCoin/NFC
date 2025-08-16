// src/components/SectionCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type SectionCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  linkHref: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
  linkHref,
}) => {
  return (
    <Link href={linkHref} onClick={onClick} className="block group" prefetch={false}>
      <div className="relative rounded-2xl p-[2px] bg-gradient-to-tr from-blue-400 via-blue-500 to-indigo-600 transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden h-full flex flex-col shadow-lg">
          <div className="relative w-full h-52 overflow-hidden">
            <Image
              src={imageUrl || 'https://placehold.co/600x400/CCCCCC/000000?text=Sekcja'}
              alt={title}
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-grow">
              {description}
            </p>
            <div className="mt-4">
              <span className="inline-block px-5 py-2 text-sm font-semibold text-black bg-blue-400 rounded-full shadow-md transition-colors duration-300 group-hover:bg-blue-300">
                Dowiedz się więcej →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SectionCard;
