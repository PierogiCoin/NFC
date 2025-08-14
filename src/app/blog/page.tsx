// src/app/blog/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import BlogPostCard from '@/components/BlogPostCard';

type BlogPost = {
  id: number;
  title: string;
  date: string;
  excerpt?: string;
  imageUrl?: string;
  fullContent: string;
  tags?: string[];
};

export default function BlogPage() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: '5 kluczowych technik w MMA dla początkujących',
      date: '15 lipca 2025',
      tags: ['MMA', 'Technika', 'Początkujący'],
      excerpt:
        'Poznaj podstawy, które pomogą Ci zacząć przygodę z MMA. Odpowiednie pozycje, chwyty i uderzenia to klucz do sukcesu.',
      imageUrl: 'https://placehold.co/800x500/000000/FFFFFF?text=MMA+Blog',
      fullContent:
        'W tym artykule skupiamy się na pięciu fundamentalnych technikach MMA...'
    },
    {
      id: 2,
      title: 'Dlaczego trening z kettlebell to must-have?',
      date: '10 lipca 2025',
      tags: ['Kettlebell', 'Siła', 'Mobilność'],
      excerpt:
        'Odkryj korzyści płynące z treningów funkcjonalnych z odważnikami...',
      imageUrl: 'https://placehold.co/800x500/000000/FFFFFF?text=Kettlebell+Blog',
      fullContent:
        'Trening z kettlebell angażuje całe ciało i rozwija siłę funkcjonalną...'
    },
    {
      id: 3,
      title: 'Historia boksu w Polsce – od amatora do mistrza',
      date: '5 lipca 2025',
      tags: ['Boks', 'Historia'],
      excerpt:
        'Prześledź drogę polskich pięściarzy na szczyt...',
      imageUrl: 'https://placehold.co/800x500/000000/FFFFFF?text=Boks+Blog',
      fullContent:
        'Boks w Polsce ma bogatą historię, pełną wybitnych postaci...'
    },
    {
      id: 4,
      title: 'Psychologia w sportach walki: Jak zbudować mentalną siłę?',
      date: '1 lipca 2025',
      tags: ['Mindset', 'Psychologia'],
      excerpt:
        'Oprócz fizyczności, mentalna siła jest kluczowa...',
      imageUrl: 'https://placehold.co/800x500/000000/FFFFFF?text=Psychologia+Sportu',
      fullContent:
        'W sportach walki ważna jest umiejętność radzenia sobie ze stresem...'
    },
    {
      id: 5,
      title: 'Dieta wojownika: Co jeść, aby trenować efektywnie?',
      date: '28 czerwca 2025',
      tags: ['Dieta', 'Regeneracja'],
      excerpt:
        'Odpowiednie odżywianie to podstawa...',
      imageUrl: 'https://placehold.co/800x500/000000/FFFFFF?text=Dieta+Sportowca',
      fullContent:
        'Dieta dostarcza energii i wspiera regenerację mięśni...'
    }
  ];

  const MONTHS_PL: Record<string, number> = {
    stycznia: 0, lutego: 1, marca: 2, kwietnia: 3, maja: 4, czerwca: 5,
    lipca: 6, sierpnia: 7, września: 8, października: 9, listopada: 10, grudnia: 11,
  };
  const parsePlDate = (s: string) => {
    const m = s.trim().toLowerCase().match(/^(\d{1,2})\s+([a-ząćęłńóśźż]+)\s+(\d{4})$/i);
    if (!m) return new Date(s);
    const [ , dStr, monthStr, yStr ] = m;
    return new Date(Number(yStr), MONTHS_PL[monthStr] ?? 0, Number(dStr));
  };
  const readMins = (txt: string) => Math.max(1, Math.round(txt.split(/\s+/).length / 200));

  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<'new'|'old'>('new');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showModal, setShowModal] = useState(false);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach(p => p.tags?.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [blogPosts]);

  const processed = useMemo(() => {
    const withMeta = blogPosts.map(p => ({
      ...p,
      _date: parsePlDate(p.date).getTime(),
      _mins: readMins(p.fullContent),
    }));
    let arr = withMeta;
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.fullContent.toLowerCase().includes(q)
      );
    }
    if (activeTags.length) {
      arr = arr.filter(p => p.tags?.some(t => activeTags.includes(t)));
    }
    arr.sort((a, b) => sort === 'new' ? b._date - a._date : a._date - b._date);
    return arr;
  }, [blogPosts, query, activeTags, sort]);

  const featured = processed[0];
  const rest = processed.slice(1);
  const paginated = rest.slice(0, page * PAGE_SIZE);

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    setShowModal(true);
    history.replaceState(null, '', `#post-${post.id}`);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    history.replaceState(null, '', location.pathname);
  };
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);
  useEffect(() => {
    const h = location.hash;
    if (h.startsWith('#post-')) {
      const id = Number(h.replace('#post-', ''));
      const post = blogPosts.find(p => p.id === id);
      if (post) openPost(post);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* tło: chłodny gradient bazowy */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950" />

      {/* HERO / nagłówek – ZMIANA PALETY */}
      <div className="rounded-3xl p-[2px] bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-[0_20px_60px_rgba(0,0,0,.45)]">
        <div className="rounded-3xl border border-white/10 bg-neutral-900/70 backdrop-blur-xl">
          <div className="px-6 py-8 md:px-10 md:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
                  Nasz Blog
                </span>
              </h2>
              <p className="mt-3 text-base md:text-lg text-white/80">
                Najnowsze artykuły, porady treningowe i relacje z życia klubu.
              </p>
            </div>

            {/* narzędzia: search + sort + tagi */}
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <label className="relative flex-1">
                  <span className="sr-only">Szukaj na blogu</span>
                  <input
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                    placeholder="Szukaj artykułów…"
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 pl-10 text-sm text-white placeholder-white/60 outline-none ring-0 backdrop-blur transition focus:border-white/20"
                  />
                  <svg aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </label>

                {/* Sort */}
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
                  {[
                    {key:'new', label:'Najnowsze'},
                    {key:'old', label:'Najstarsze'}
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setSort(opt.key as any)}
                      className={`
                        px-4 py-2 text-sm font-semibold rounded-full transition
                        ${sort === opt.key ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-black' : 'text-white/80 hover:text-white'}
                      `}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tagi */}
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => {
                  const active = activeTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        setPage(1);
                        setActiveTags(a => active ? a.filter(t => t !== tag) : [...a, tag]);
                      }}
                      className={`
                        rounded-full border px-3 py-1.5 text-xs font-semibold transition
                        ${active
                          ? 'border-cyan-400 bg-cyan-400 text-black'
                          : 'border-white/15 bg-white/5 text-white/85 hover:bg-white/10'}
                      `}
                    >
                      #{tag}
                    </button>
                  );
                })}
                {activeTags.length > 0 && (
                  <button
                    onClick={() => setActiveTags([])}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 hover:bg-white/10"
                  >
                    Wyczyść
                  </button>
                )}
              </div>
            </div>

            {/* FEATURED POST */}
            {featured && (
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-white/10">
                  <div className="relative h-64 w-full sm:h-80">
                    <Image
                      src={featured.imageUrl || 'https://placehold.co/1200x700/111111/FFFFFF?text=Blog'}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  </div>
                  <div className="bg-neutral-900/70 p-5 backdrop-blur">
                    <p className="text-xs text-white/60">{featured.date} • ~{readMins(featured.fullContent)} min</p>
                    <h3 className="mt-1 text-xl font-bold text-white">{featured.title}</h3>
                    <p className="mt-2 line-clamp-3 text-white/80">{featured.excerpt}</p>
                    <div className="mt-4">
                      <button
                        onClick={() => openPost(featured)}
                        className="inline-flex items-center rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-300"
                      >
                        Czytaj więcej
                      </button>
                    </div>
                  </div>
                </div>
                {/* boczne szybkie karty */}
                <div className="grid grid-cols-1 gap-4">
                  {paginated.slice(0, 2).map(post => (
                    <div key={`side-${post.id}`} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
                      <div className="relative h-36 w-full">
                        <Image
                          src={post.imageUrl || 'https://placehold.co/800x500/111111/FFFFFF?text=Blog'}
                          alt={post.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      </div>
                      <div className="p-4">
                        <p className="text-[11px] uppercase tracking-wide text-white/60">{post.date} • ~{readMins(post.fullContent)} min</p>
                        <h4 className="mt-1 line-clamp-2 font-semibold text-white">{post.title}</h4>
                        <button
                          onClick={() => openPost(post)}
                          className="mt-3 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/20"
                        >
                          Czytaj
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SIATKA POZOSTAŁYCH */}
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginated.map((post) => (
                <BlogPostCard key={post.id} post={post} onReadMore={() => openPost(post)} />
              ))}
              {paginated.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-white/15 p-10 text-center text-white/70">
                  Brak wpisów spełniających kryteria wyszukiwania.
                </div>
              )}
            </div>

            {/* Paginacja */}
            {rest.length > page * PAGE_SIZE && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-300"
                >
                  Załaduj więcej
                </button>
              </div>
            )}

            <div className="mt-12 text-center">
              <a
                href="/blog"
                className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-300"
              >
                Zobacz wszystkie wpisy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPost && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="post-title"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="w-full max-w-3xl transform overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 p-6 shadow-2xl backdrop-blur">
            <h3 id="post-title" className="text-2xl md:text-3xl font-bold text-white">
              {selectedPost.title}
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Opublikowano: {selectedPost.date} • ~{readMins(selectedPost.fullContent)} min czytania
            </p>

            <div className="relative mt-5 h-64 w-full overflow-hidden rounded-xl border border-white/10 md:h-80">
              <Image
                src={selectedPost.imageUrl || 'https://placehold.co/800x400/CCCCCC/000000?text=Brak+obrazu'}
                alt={selectedPost.title}
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            <p className="mt-5 leading-relaxed text-white/85">{selectedPost.fullContent}</p>

            <div className="mt-6 flex flex-wrap justify-between gap-2">
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    const url = `${location.origin}${location.pathname}#post-${selectedPost.id}`;
                    if (navigator.share) {
                      try { await navigator.share({ title: selectedPost.title, url }); } catch {}
                    } else {
                      await navigator.clipboard.writeText(url);
                      alert('Link skopiowany do schowka.');
                    }
                  }}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/20"
                >
                  Udostępnij
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
