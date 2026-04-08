import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock, Dog, Users, Home as HomeIcon, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

type RentalVilla = {
  id: number;
  title: string;
  location: string;
  pricePerNight: number;
  sleeps: number;
  image: string;
};

const RENTAL_VILLAS: RentalVilla[] = [
  {
    id: 1,
    title: "Villa Sabina",
    location: "San Teodoro / I Giardini d'Aldia",
    pricePerNight: 850,
    sleeps: 9,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Lu Stazzu",
    location: "San Teodoro / Lu Impostu",
    pricePerNight: 600,
    sleeps: 4,
    image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Villa Chira",
    location: "Porto San Paolo",
    pricePerNight: 1200,
    sleeps: 10,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1600&auto=format&fit=crop"
  }
];

type BookingState = {
  villaId: number | null;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  guests: number;
  pets: 'yes' | 'no';
  notes: string;
  fullName: string;
  email: string;
  phone: string;
  extras: {
    transfer: boolean;
    privateChef: boolean;
    babyKit: boolean;
  };
};

const CHECKOUT_TIME = '10:00';

const formatMoney = (value: number) =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

const toLocalDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const nightsBetween = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const diffMs = end.getTime() - start.getTime();
  return diffMs > 0 ? Math.round(diffMs / (1000 * 60 * 60 * 24)) : 0;
};

const timeOptions = (() => {
  const options: string[] = [];
  for (let h = 12; h <= 22; h++) {
    options.push(`${String(h).padStart(2, '0')}:00`);
    options.push(`${String(h).padStart(2, '0')}:30`);
  }
  return options;
})();

export default function StayBooking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const villaFromQuery = searchParams.get('villa');
  const guestsFromQuery = searchParams.get('guests');

  const initialVillaId = villaFromQuery ? Number(villaFromQuery) : null;
  const initialGuests = guestsFromQuery ? Math.max(1, Number(guestsFromQuery)) : 2;

  const today = useMemo(() => toLocalDate(new Date()), []);
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toLocalDate(d);
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState<BookingState>({
    villaId: Number.isFinite(initialVillaId) ? initialVillaId : null,
    checkInDate: today,
    checkOutDate: tomorrow,
    checkInTime: '',
    guests: Number.isFinite(initialGuests) ? initialGuests : 2,
    pets: 'no',
    notes: '',
    fullName: '',
    email: '',
    phone: '',
    extras: {
      transfer: false,
      privateChef: false,
      babyKit: false
    }
  });

  const selectedVilla = useMemo(() => {
    if (!state.villaId) return null;
    return RENTAL_VILLAS.find(v => v.id === state.villaId) ?? null;
  }, [state.villaId]);

  const nights = useMemo(() => nightsBetween(state.checkInDate, state.checkOutDate), [state.checkInDate, state.checkOutDate]);

  const maxGuests = selectedVilla?.sleeps ?? 12;
  const clampedGuests = Math.min(Math.max(1, state.guests), maxGuests);

  const baseTotal = selectedVilla ? selectedVilla.pricePerNight * nights : 0;
  const extrasTotal =
    (state.extras.transfer ? 120 : 0) +
    (state.extras.privateChef ? 250 : 0) +
    (state.extras.babyKit ? 35 : 0);
  const total = baseTotal + extrasTotal;

  const errors = useMemo(() => {
    const list: string[] = [];
    if (!state.villaId) list.push('Selezioni una villa.');
    if (!state.checkInDate) list.push('Selezioni la data di check-in.');
    if (!state.checkOutDate) list.push('Selezioni la data di check-out.');
    if (state.checkInDate && state.checkOutDate && nights <= 0) list.push('La data di check-out deve essere successiva al check-in.');
    if (!state.checkInTime) list.push('Selezioni un orario di check-in.');
    if (!state.fullName.trim()) list.push('Inserisca nome e cognome.');
    if (!state.email.trim()) list.push('Inserisca email.');
    if (!state.phone.trim()) list.push('Inserisca telefono.');
    if (state.guests < 1) list.push('Numero ospiti non valido.');
    if (selectedVilla && state.guests > selectedVilla.sleeps) list.push(`Massimo ${selectedVilla.sleeps} ospiti per questa villa.`);
    return list;
  }, [state.villaId, state.checkInDate, state.checkOutDate, state.checkInTime, state.fullName, state.email, state.phone, state.guests, nights, selectedVilla]);

  const canSubmit = errors.length === 0;

  const update = <K extends keyof BookingState>(key: K, value: BookingState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      <SEO
        title="Prenota Soggiorno"
        description="Prenota il tuo soggiorno nelle ville in affitto: scegli le date, l'orario di check-in e personalizza la tua esperienza."
      />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#A18058] mb-3 flex items-center gap-2">
              <HomeIcon size={14} /> Booking Soggiorno
            </p>
            <h1 className="text-3xl md:text-5xl font-serif italic">Prenota il tuo <span className="not-italic text-[var(--text-tertiary)]">soggiorno</span>.</h1>
          </div>
          <button
            onClick={() => navigate('/affitto')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--border-primary)] text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Torna agli affitti <ArrowRight size={14} className="rotate-180" />
          </button>
        </div>

        {submitted ? (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[2.5rem] p-10 md:p-14 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#A18058] text-white flex items-center justify-center">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-serif">Richiesta inviata</h2>
                <p className="text-sm text-[var(--text-secondary)]">Riceverà una conferma via email con i dettagli del soggiorno.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)] p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Villa</p>
                <p className="text-lg font-serif">{selectedVilla?.title ?? '—'}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{selectedVilla?.location ?? ''}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)] p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Date</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Check-in: <span className="text-[var(--text-primary)] font-semibold">{state.checkInDate}</span> alle <span className="text-[var(--text-primary)] font-semibold">{state.checkInTime}</span>
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Check-out: <span className="text-[var(--text-primary)] font-semibold">{state.checkOutDate}</span> alle <span className="text-[var(--text-primary)] font-semibold">{CHECKOUT_TIME}</span>
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-4 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-[11px] font-bold uppercase tracking-widest hover:bg-[#A18058] hover:text-white transition-colors"
              >
                Torna alla Home
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="flex-1 py-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                Nuova prenotazione
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[2.5rem] p-8 md:p-10 shadow-xl">
                <h2 className="text-xl font-serif mb-6">Selezione villa</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {RENTAL_VILLAS.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => update('villaId', v.id)}
                      className={`text-left rounded-2xl overflow-hidden border transition-all hover:shadow-lg ${
                        state.villaId === v.id ? 'border-[#A18058] ring-2 ring-[#A18058]/20' : 'border-[var(--border-primary)]'
                      }`}
                    >
                      <div className="h-28 bg-[var(--bg-tertiary)] overflow-hidden">
                        <img src={v.image} alt={v.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#A18058]">{formatMoney(v.pricePerNight)} <span className="text-[9px] text-[var(--text-tertiary)]">/notte</span></p>
                        <p className="font-serif text-lg mt-1">{v.title}</p>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-1">{v.location}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[2.5rem] p-8 md:p-10 shadow-xl">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-serif">Date e orari</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] flex items-center gap-2">
                    <CalendarDays size={14} /> Check-out fisso {CHECKOUT_TIME}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Check-in</span>
                    <input
                      type="date"
                      min={today}
                      value={state.checkInDate}
                      onChange={(e) => update('checkInDate', e.target.value)}
                      className="mt-2 w-full h-12 px-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)]"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Check-out</span>
                    <input
                      type="date"
                      min={state.checkInDate || today}
                      value={state.checkOutDate}
                      onChange={(e) => update('checkOutDate', e.target.value)}
                      className="mt-2 w-full h-12 px-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)]"
                      required
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Orario check-in (obbligatorio)</span>
                    <div className="mt-2 relative">
                      <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
                      <select
                        value={state.checkInTime}
                        onChange={(e) => update('checkInTime', e.target.value)}
                        className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)]"
                        required
                      >
                        <option value="">Selezioni un orario</option>
                        {timeOptions.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Check-out</span>
                    <div className="mt-2 h-12 px-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-between">
                      <span className="text-sm text-[var(--text-secondary)]">Orario fisso</span>
                      <span className="text-sm font-bold text-[var(--text-primary)]">{CHECKOUT_TIME}</span>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Ospiti</span>
                    <div className="mt-2 relative">
                      <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
                      <input
                        type="number"
                        min={1}
                        max={maxGuests}
                        value={clampedGuests}
                        onChange={(e) => update('guests', Number(e.target.value))}
                        className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)]"
                        required
                      />
                    </div>
                    {selectedVilla && (
                      <p className="mt-2 text-[11px] text-[var(--text-tertiary)]">Massimo {selectedVilla.sleeps} ospiti.</p>
                    )}
                  </label>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Animali</span>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => update('pets', 'no')}
                        className={`h-12 rounded-2xl border text-[11px] font-bold uppercase tracking-widest transition-colors ${
                          state.pets === 'no'
                            ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                            : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-[var(--border-primary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => update('pets', 'yes')}
                        className={`h-12 rounded-2xl border text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${
                          state.pets === 'yes'
                            ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                            : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-[var(--border-primary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                      >
                        <Dog size={16} /> Sì
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[2.5rem] p-8 md:p-10 shadow-xl">
                <h2 className="text-xl font-serif mb-6">Dati ospite</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    value={state.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    placeholder="Nome e Cognome"
                    className="h-12 px-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)]"
                    required
                  />
                  <input
                    value={state.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="Telefono"
                    className="h-12 px-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)]"
                    required
                  />
                  <input
                    value={state.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="Email"
                    type="email"
                    className="h-12 px-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] md:col-span-2"
                    required
                  />
                  <textarea
                    value={state.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder="Richieste particolari (arrivo tardivo, esigenze, ecc.)"
                    className="min-h-28 p-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] md:col-span-2"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[2.5rem] p-8 shadow-xl">
                  <h3 className="text-xl font-serif mb-6">Riepilogo</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Notti</span>
                      <span className="text-[var(--text-primary)] font-semibold">{nights || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Ospiti</span>
                      <span className="text-[var(--text-primary)] font-semibold">{clampedGuests}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Check-in</span>
                      <span className="text-[var(--text-primary)] font-semibold">{state.checkInTime ? `${state.checkInDate} ${state.checkInTime}` : '—'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Check-out</span>
                      <span className="text-[var(--text-primary)] font-semibold">{state.checkOutDate ? `${state.checkOutDate} ${CHECKOUT_TIME}` : '—'}</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--border-primary)]">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">Extra</p>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between gap-4 text-sm cursor-pointer">
                        <span className="text-[var(--text-secondary)]">Transfer aeroporto</span>
                        <input
                          type="checkbox"
                          checked={state.extras.transfer}
                          onChange={(e) => update('extras', { ...state.extras, transfer: e.target.checked })}
                          className="h-5 w-5 accent-[#A18058]"
                        />
                      </label>
                      <label className="flex items-center justify-between gap-4 text-sm cursor-pointer">
                        <span className="text-[var(--text-secondary)]">Private chef (1 sera)</span>
                        <input
                          type="checkbox"
                          checked={state.extras.privateChef}
                          onChange={(e) => update('extras', { ...state.extras, privateChef: e.target.checked })}
                          className="h-5 w-5 accent-[#A18058]"
                        />
                      </label>
                      <label className="flex items-center justify-between gap-4 text-sm cursor-pointer">
                        <span className="text-[var(--text-secondary)]">Kit bimbo</span>
                        <input
                          type="checkbox"
                          checked={state.extras.babyKit}
                          onChange={(e) => update('extras', { ...state.extras, babyKit: e.target.checked })}
                          className="h-5 w-5 accent-[#A18058]"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--border-primary)]">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Totale stimato</span>
                      <span className="text-2xl font-serif text-[#A18058]">{formatMoney(total)}</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-tertiary)] mt-2">
                      Il totale è indicativo. La disponibilità viene confermata dal team.
                    </p>
                  </div>

                  {!canSubmit && (
                    <div className="mt-6 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Da completare</p>
                      <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                        {errors.slice(0, 4).map((e) => (
                          <li key={e}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`mt-8 w-full h-12 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                      canSubmit
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[#A18058] hover:text-white'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed border border-[var(--border-primary)]'
                    }`}
                  >
                    Invia richiesta <ArrowRight size={16} />
                  </button>
                </div>

                {selectedVilla && (
                  <div className="rounded-[2.5rem] overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-secondary)] shadow-xl">
                    <div className="h-40 bg-[var(--bg-tertiary)] overflow-hidden">
                      <img src={selectedVilla.image} alt={selectedVilla.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#A18058] mb-2">Selezionata</p>
                      <p className="font-serif text-xl">{selectedVilla.title}</p>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-1">{selectedVilla.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

