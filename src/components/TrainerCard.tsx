"use client";
// src/components/TrainerCard.tsx
import React from 'react';
import Image from 'next/image';

export type TrainerCardProps = {
  name: string;
  specialty: string;
  bio: string;
  imageUrl?: string;
  className?: string;
};

const TrainerCard: React.FC<TrainerCardProps> = ({
  name,
  specialty,
  bio,
  imageUrl,
  className,
}) => {
  const fallbackImg = 'https://placehold.co/150x150/CCCCCC/000000?text=Trener';

  const [imgSrc, setImgSrc] = React.useState<string>(imageUrl || fallbackImg);
  React.useEffect(() => {
    setImgSrc(imageUrl || fallbackImg);
  }, [imageUrl]);

  return (
    <div
      className={`group relative rounded-2xl p-[2px] bg-gradient-to-tr from-blue-500 via-sky-400 to-blue-700 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] ${className || ''}`}
    >
      <div className="flex flex-col sm:flex-row items-center bg-white dark:bg-neutral-900 p-6 rounded-2xl space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative h-28 w-28 flex-shrink-0 rounded-full overflow-hidden border-4 border-blue-600 shadow-md group-hover:border-sky-400 transition-colors duration-500">
          <Image
            src={imgSrc}
            alt={name ? `Trener ${name}` : 'Trener'}
            fill
            sizes="112px"
            className="object-cover"
            onError={() => setImgSrc(fallbackImg)}
            priority
          />
        </div>
        <div className="text-center sm:text-left max-w-lg">
          <h4 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">{name}</h4>
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wide mb-2">
            {specialty}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
