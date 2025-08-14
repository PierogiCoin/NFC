// src/app/calendar/page.tsx
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views, ToolbarProps, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';

const buildGCalUrl = (ev: { title: string; start: Date; end: Date; description?: string }) => {
  const fmt = (d: Date) => moment(d).utc().format('YYYYMMDD[T]HHmmss[Z]');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${fmt(ev.start)}/${fmt(ev.end)}`,
    details: ev.description || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const localizer = momentLocalizer(moment);
moment.locale('pl');

type ApiEvent = {
  id?: string;
  title: string;
  start: string; // ISO
  end: string;   // ISO
  description?: string;
  resource?: string;
  trainer?: string;
};

const weekRange = (center: Date) => {
  const start = moment(center).startOf('week'); // Mon (locale)
  const end = moment(center).endOf('week');
  return {
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
  };
};

interface ClubEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: 'MMA' | 'Boks' | 'Sekcja Kobieca' | 'Kettlebell' | 'BJJ' | 'KickBoxing' | string;
  description: string;
  trainer: string;
}

const RESOURCE_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  MMA: { bg: '#ef4444', text: '#ffffff', ring: 'ring-red-400/40' },
  Boks: { bg: '#f97316', text: '#111111', ring: 'ring-orange-400/40' },
  'Sekcja Kobieca': { bg: '#ec4899', text: '#ffffff', ring: 'ring-pink-400/40' },
  Kettlebell: { bg: '#22c55e', text: '#07130a', ring: 'ring-green-400/40' },
  BJJ: { bg: '#06b6d4', text: '#06262b', ring: 'ring-cyan-400/40' },
  KickBoxing: { bg: '#f59e0b', text: '#111111', ring: 'ring-amber-400/40' },
};

// ---------- Pretty Toolbar ----------
function FancyToolbar<TDate extends Date = Date>({ label, onNavigate }: ToolbarProps<TDate>) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="inline-flex items-center gap-2">
        <button
          onClick={() => onNavigate('TODAY')}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
        >
          Dziś
        </button>
        <div className="inline-flex overflow-hidden rounded-full ring-1 ring-white/10">
          <button onClick={() => onNavigate('PREV')} className="px-3 py-2 text-white/90 hover:bg-white/10">←</button>
          <span className="bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10">{label}</span>
          <button onClick={() => onNavigate('NEXT')} className="px-3 py-2 text-white/90 hover:bg-white/10">→</button>
        </div>
      </div>
      <div className="inline-flex items-center gap-2">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80">
          Widoczne godziny: 14:00–22:00
        </span>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [now, setNow] = useState<Date>(new Date());
  const [date, setDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resource filter (chips)
  const allResources = Object.keys(RESOURCE_COLORS);
  const [activeResources, setActiveResources] = useState<string[]>(allResources);

  const toggleResource = (r: string) => {
    setActiveResources((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  // Limit widocznych godzin 14:00–22:00
  const minTime = useMemo(() => {
    const d = new Date();
    d.setHours(14, 0, 0, 0);
    return d;
  }, []);
  const maxTime = useMemo(() => {
    const d = new Date();
    d.setHours(22, 0, 0, 0);
    return d;
  }, []);
  const scrollToTime = useMemo(() => {
    const d = new Date();
    d.setHours(16, 0, 0, 0);
    return d;
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Fetch events for current week
  useEffect(() => {
    const { timeMin, timeMax } = weekRange(date);
    const url = `/api/google-calendar?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}`;
    setLoading(true);
    setError(null);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('Błąd pobierania danych');
        return r.json();
      })
      .then((data: ApiEvent[]) => {
        const mapped: ClubEvent[] = data.map((e, i) => ({
          id: i + 1,
          title: e.title,
          start: new Date(e.start),
          end: new Date(e.end),
          resource: (e.resource as any) || 'MMA',
          description: e.description || '',
          trainer: e.trainer || '',
        }));
        setEvents(mapped);
      })
      .catch((err) => setError(err.message || 'Coś poszło nie tak'))
      .finally(() => setLoading(false));
  }, [date]);

  const filteredEvents = useMemo(
    () => events.filter((e) => activeResources.includes(e.resource)),
    [events, activeResources]
  );

  const createQuickEvent = async () => {
    const start = moment(date).hour(18).minute(0).second(0).toDate();
    const end = moment(start).add(60, 'minutes').toDate();
    await fetch('/api/google-calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Nowe zajęcia',
        start: start.toISOString(),
        end: end.toISOString(),
        description: 'Dodane z panelu klubu',
      } as ApiEvent),
    });
    // refresh
    const { timeMin, timeMax } = weekRange(date);
    const url = `/api/google-calendar?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}`;
    const data: ApiEvent[] = await fetch(url).then((r) => r.json());
    setEvents(
      data.map((e, i) => ({
        id: i + 1,
        title: e.title,
        start: new Date(e.start),
        end: new Date(e.end),
        resource: (e.resource as any) || 'MMA',
        description: e.description || '',
        trainer: e.trainer || '',
      }))
    );
  };

  const deleteSelected = async () => {
    if (!selectedEvent) return;
    await fetch('/api/google-calendar', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: selectedEvent.title,
        start: selectedEvent.start.toISOString(),
        end: selectedEvent.end.toISOString(),
      }),
    });
    setShowModal(false);
    const { timeMin, timeMax } = weekRange(date);
    const url = `/api/google-calendar?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}`;
    const data: ApiEvent[] = await fetch(url).then((r) => r.json());
    setEvents(
      data.map((e, i) => ({
        id: i + 1,
        title: e.title,
        start: new Date(e.start),
        end: new Date(e.end),
        resource: (e.resource as any) || 'MMA',
        description: e.description || '',
        trainer: e.trainer || '',
      }))
    );
  };

  const handleSelectEvent = (event: ClubEvent) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Styl wydarzeń
  const eventPropGetter = (event: ClubEvent) => {
    const c = RESOURCE_COLORS[event.resource] || { bg: '#dc2626', text: '#ffffff', ring: 'ring-white/10' };
    return {
      style: {
        backgroundColor: c.bg,
        color: c.text,
        borderRadius: 12,
        border: 'none',
        boxShadow: '0 4px 14px rgba(0,0,0,.25)',
        padding: 2,
      },
      className: `ring-1 ${c.ring}`,
    } as any;
  };

  // Formatowanie godzin i etykiet
  const formats = useMemo(
    () => ({
      timeGutterFormat: (date: Date) => moment(date).format('HH:mm'),
      eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
        `${moment(start).format('HH:mm')}–${moment(end).format('HH:mm')}`,
      dayFormat: (date: Date) => moment(date).format('ddd DD.MM'),
      weekdayFormat: (date: Date) => moment(date).format('ddd'),
    }),
    []
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Kalendarz Zajęć</h2>
          <button
            onClick={createQuickEvent}
            className="hidden sm:inline-flex rounded-full border border-white/10 bg-yellow-400/90 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
          >
            + Dodaj wydarzenie
          </button>
        </div>
        <p className="mx-auto mt-3 max-w-3xl text-center text-base text-white/70">
          Tydzień pracy klubu. Wyświetlamy wyłącznie godziny <strong>14:00–22:00</strong> dla czytelności.
        </p>

        {/* Filtry sekcji */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {allResources.map((r) => {
            const active = activeResources.includes(r);
            const c = RESOURCE_COLORS[r];
            return (
              <button
                key={r}
                onClick={() => toggleResource(r)}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                  active
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-black/20 border-white/10 text-white/70 hover:bg-white/10'
                }`}
                style={active && c ? { boxShadow: 'inset 0 0 0 2px rgba(255,255,255,.05)' } : undefined}
              >
                {r}
              </button>
            );
          })}
        </div>

        {/* Legenda kolorów */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/70">
          {Object.entries(RESOURCE_COLORS).map(([key, val]) => (
            <span key={key} className="inline-flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: val.bg }} />
              {key}
            </span>
          ))}
        </div>

        <div className="mt-6 h-[70vh] md:h-[75vh] rounded-2xl border border-white/10 bg-black/20 p-3">
          {loading ? (
            <div className="grid h-full place-items-center text-white/70">Ładowanie kalendarza…</div>
          ) : error ? (
            <div className="grid h-full place-items-center text-red-300">{error}</div>
          ) : (
            <Calendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              views={[Views.WEEK]}
              view={Views.WEEK as View}
              components={{ toolbar: FancyToolbar }}
              date={date}
              onNavigate={(d) => setDate(d as Date)}
              eventPropGetter={eventPropGetter}
              onSelectEvent={handleSelectEvent}
              now={now}
              style={{ height: '100%' }}
              min={minTime}
              max={maxTime}
              scrollToTime={scrollToTime}
              step={30}
              timeslots={2}
              formats={formats}
              culture="pl"
            />
          )}
        </div>

        <p className="mt-4 text-center text-xs text-white/50">
          Zajęcia pochodzą z Google Kalendarza (zakres tygodnia). Kliknij wydarzenie, aby zobaczyć szczegóły lub dodać je do swojego kalendarza.
        </p>
      </div>

      {showModal && selectedEvent && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-lg transform overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 p-6 shadow-2xl backdrop-blur">
            <h3 className="text-2xl font-bold text-white">{selectedEvent.title}</h3>
            <div className="mt-3 grid grid-cols-1 gap-2 text-white/80">
              <div><span className="font-semibold text-white">Typ:</span> {selectedEvent.resource}</div>
              <div><span className="font-semibold text-white">Trener:</span> {selectedEvent.trainer}</div>
              <div>
                <span className="font-semibold text-white">Data:</span> {moment(selectedEvent.start).format('DD.MM.YYYY')}
              </div>
              <div>
                <span className="font-semibold text-white">Godziny:</span> {moment(selectedEvent.start).format('HH:mm')} – {moment(selectedEvent.end).format('HH:mm')}
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70">{selectedEvent.description}</p>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                onClick={async () => {
                  await navigator.clipboard?.writeText(`${selectedEvent.title} — ${moment(selectedEvent.start).format('DD.MM HH:mm')}–${moment(selectedEvent.end).format('HH:mm')}`);
                }}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
              >
                Kopiuj szczegóły
              </button>
              <button
                onClick={deleteSelected}
                className="rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                Usuń
              </button>
              <a
                href={buildGCalUrl(selectedEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
              >
                Dodaj do Google Kalendarza
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-300"
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}