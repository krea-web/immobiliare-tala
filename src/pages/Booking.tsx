import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalIcon, User, MapPin, Clock, ChevronRight, ChevronLeft, CheckCircle, Home, ArrowLeft, ShieldCheck, CalendarPlus, Building, X, ArrowRight as ArrowRightIcon, Lock, Mail, Phone, MessageSquare } from 'lucide-react';

interface BookingSystemProps {
  onClose?: () => void;
  onOpenValuation?: () => void;
  onOpenAbout?: () => void;
  onOpenRentals?: () => void;
  preSelectedProperty?: any;
}

const AGENTS = [
  {
    id: 'andrea',
    name: 'Andrea Tala',
    role: 'Founder & Senior Broker',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop', 
    contact: 'andrea.tala@immobiliaretala.it'
  },
  {
    id: 'dario',
    name: 'Dario Deiana',
    role: 'Property Manager',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', 
    contact: 'dario.deiana@immobiliaretala.it'
  }
];

const PROPERTIES = [
  {
    id: 1,
    title: "Villa Chira",
    location: "Loiri Porto S. Paolo",
    price: "Trattativa Riservata",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop",
    type: "Fronte Mare",
    description: "Villa singola fronte mare con accesso diretto spiaggia e vista Tavolara."
  },
  {
    id: 2,
    title: "Villa San Lorenzo",
    location: "Budoni / San Lorenzo",
    price: "€ 680.000",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
    type: "Indipendente",
    description: "Autentica villa indipendente in pietra con vista colline."
  },
  {
    id: 3,
    title: "Lu Stazzu",
    location: "San Teodoro / Lu Impostu",
    price: "In Valutazione",
    image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=600&auto=format&fit=crop",
    type: "Stazzo Gallurese",
    description: "Stazzo reinterpretato con piscina a sfioro e vista mare."
  },
  {
    id: 4,
    title: "Villa Sabina",
    location: "San Teodoro / Giardini d'Aldia",
    price: "Rental Only",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop",
    type: "Villa Lusso",
    description: "Villa moderna su due livelli con privacy totale e piscina."
  }
];

const createGoogleCalendarLink = (event: any) => {
  const { title, details, location, startTime, endTime } = event;
  const formatGCalDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.append('action', 'TEMPLATE');
  url.searchParams.append('text', title);
  url.searchParams.append('details', details);
  url.searchParams.append('location', location);
  url.searchParams.append('dates', `${formatGCalDate(startTime)}/${formatGCalDate(endTime)}`);
  return url.toString();
};

const generateTimeSlots = (dateSeed: Date) => {
  const slots = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  const seed = dateSeed.getDate() + dateSeed.getMonth(); 
  return slots.map((time, index) => {
    const isBusy = ((seed + index) * 9301 + 49297) % 10 > 5; 
    return { time, available: !isBusy };
  });
};

const STEPS_INFO = [
  { id: 1, label: 'Proprietà', icon: Building, desc: 'Scegli immobile' },
  { id: 2, label: 'Calendario', icon: CalIcon, desc: 'Data e Ora' },
  { id: 3, label: 'Profilo', icon: User, desc: 'Registrazione' },
  { id: 4, label: 'Agente', icon: ShieldCheck, desc: 'Scegli consulente' },
];

export default function BookingSystem({ onClose, preSelectedProperty }: BookingSystemProps) {
  const [step, setStep] = useState(preSelectedProperty ? 2 : 1);
  const [formData, setFormData] = useState<any>({
    property: preSelectedProperty || null,
    agent: null,
    date: null,
    time: null,
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientPassword: ''
  });

  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateSlots, setSelectedDateSlots] = useState<any[]>([]);

  // --- Calendar Logic ---
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const startDay = firstDayOfMonth(currentMonth);
    const today = new Date();
    today.setHours(0,0,0,0);

    for (let i = 0; i < startDay; i++) { days.push(null); }
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isPast = date < today;
      const isSunday = date.getDay() === 0;
      days.push({ day: i, date: date, disabled: isPast || isSunday });
    }
    return days;
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentMonth(newDate);
  };

  // --- Handlers ---
  const handlePropertySelect = (prop: any) => {
    setFormData({ ...formData, property: prop });
    setStep(2);
  };

  const handleDateSelect = (dayObj: any) => {
    if (!dayObj || dayObj.disabled) return;
    setFormData({ ...formData, date: dayObj.date, time: null });
    setSelectedDateSlots(generateTimeSlots(dayObj.date));
  };

  const handleTimeSelect = (time: string) => {
    setFormData({ ...formData, time: time });
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const handleAgentSelect = (agent: any) => {
    setFormData({ ...formData, agent: agent });
  };

  const handleFinalSubmit = () => {
    setStep(5);
    // Notification logic simulation...
  };

  const goBack = () => {
    if (step > 1) {
        if (step === 2 && preSelectedProperty) onClose();
        else setStep(step - 1);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const getCalendarLink = () => {
    if (!formData.date || !formData.time || !formData.property) return '#';
    const [hours, minutes] = formData.time.split(':');
    const startTime = new Date(formData.date);
    startTime.setHours(parseInt(hours), parseInt(minutes));
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);
    return createGoogleCalendarLink({
      title: `Visita: ${formData.property.title}`,
      details: `Visita immobiliare con ${formData.agent?.name}. Cliente: ${formData.clientName}`,
      location: formData.property.location,
      startTime,
      endTime
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 animate-in fade-in duration-300 flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 pointer-events-none mix-blend-overlay"></div>
      
      <main className="flex-1 overflow-y-auto w-full relative z-0 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        
        <div className="md:w-64 flex-shrink-0">
          <div className="hidden md:block sticky top-28">
            <div className="relative pl-2">
               <div className="absolute left-[19px] top-4 bottom-10 w-px bg-[var(--border-primary)] -z-10"></div>
               {STEPS_INFO.map((s) => (
                   <div key={s.id} className="flex items-start mb-12 last:mb-0">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center border z-10 transition-all duration-300 ${step >= s.id ? 'bg-[#1C1917] dark:bg-[#A18058] border-[#1C1917] dark:border-[#A18058] text-white shadow-lg' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-tertiary)]'}`}>
                       {step > s.id ? <CheckCircle size={16} /> : <s.icon size={16} strokeWidth={1.5} />}
                     </div>
                     <div className="ml-4 mt-1">
                       <h4 className={`text-xs font-bold uppercase tracking-widest ${step >= s.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}`}>{s.label}</h4>
                       <p className={`text-[10px] mt-1 ${step === s.id ? 'text-[#A18058]' : 'text-[var(--text-tertiary)]'}`}>{s.desc}</p>
                     </div>
                   </div>
               ))}
            </div>
          </div>
        </div>

        <div className="flex-grow bg-[var(--bg-secondary)] rounded-[2rem] shadow-xl overflow-hidden min-h-[600px] relative flex flex-col border border-[var(--border-primary)]">
          {step > 1 && step < 5 && (
            <button onClick={goBack} className="absolute top-8 left-8 p-2 rounded-full hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors z-20 group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          )}

          <div className="p-8 md:p-12 flex-grow">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-serif text-[var(--text-primary)] mb-2">Seleziona l'immobile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                  {PROPERTIES.map(prop => (
                    <div key={prop.id} onClick={() => handlePropertySelect(prop)} className="group cursor-pointer border border-[var(--border-primary)] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 bg-[var(--bg-secondary)]">
                      <div className="h-48 overflow-hidden"><img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div>
                      <div className="p-6">
                        <h3 className="font-serif text-xl mb-1 group-hover:text-[#A18058]">{prop.title}</h3>
                        <p className="text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider">{prop.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-serif text-[var(--text-primary)] mb-2">Seleziona Data</h2>
                  <div className="bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-primary)] p-6 mt-8">
                    <div className="flex justify-between items-center mb-6 px-2">
                      <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-[var(--bg-secondary)] rounded-full"><ChevronLeft size={18}/></button>
                      <h3 className="font-serif text-lg capitalize">{currentMonth.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}</h3>
                      <button onClick={() => changeMonth(1)} className="p-2 hover:bg-[var(--bg-secondary)] rounded-full"><ChevronRight size={18}/></button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center mb-4">
                      {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(d => (<div key={d} className="text-[10px] font-bold text-[#A18058] uppercase">{d}</div>))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {generateCalendarDays().map((dayObj, i) => (
                        <div key={i} className="aspect-square">
                          {dayObj && <button onClick={() => handleDateSelect(dayObj)} disabled={dayObj.disabled} className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-serif transition-all ${dayObj.disabled ? 'text-[var(--text-tertiary)]' : formData.date?.toDateString() === dayObj.date.toDateString() ? 'bg-[#1C1917] dark:bg-[#A18058] text-white shadow-lg' : 'hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]'}`}>{dayObj.day}</button>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 flex flex-col">
                  <h2 className="text-3xl font-serif text-[var(--text-primary)] mb-2">Seleziona Ora</h2>
                  <div className="mt-8 flex-grow">
                    {formData.date ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selectedDateSlots.map((slot, idx) => (
                          <button key={idx} disabled={!slot.available} onClick={() => handleTimeSelect(slot.time)} className={`p-4 rounded-xl border flex items-center justify-center transition-all ${!slot.available ? 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed border-[var(--border-primary)]' : formData.time === slot.time ? 'bg-[#1C1917] dark:bg-[#A18058] text-white shadow-lg border-transparent' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-[#A18058]'}`}>{slot.time}</button>
                        ))}
                      </div>
                    ) : <div className="h-full flex items-center justify-center text-[var(--text-tertiary)] text-xs italic">Scegli una data prima</div>}
                  </div>
                  {formData.time && <button onClick={() => setStep(3)} className="mt-8 bg-[#1C1917] dark:bg-[#A18058] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-3 self-end hover:bg-[#A18058] dark:hover:bg-white dark:hover:text-[#1C1917] transition-colors">Continua <ArrowRightIcon size={14} /></button>}
                </div>
              </div>
            )}

            {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-lg mx-auto">
                    <h2 className="text-3xl font-serif text-[var(--text-primary)] mb-2">{authMode === 'register' ? 'Crea il tuo profilo' : 'Bentornato'}</h2>
                    <p className="text-[var(--text-secondary)] text-sm mb-10">Per confermare la visita è necessario un account.</p>
                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                        {authMode === 'register' && (
                            <div className="relative"><User className="absolute left-3 top-3 text-[var(--text-tertiary)]" size={18} /><input required type="text" placeholder="Nome Completo" className="w-full pl-10 p-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl focus:outline-none text-[var(--text-primary)]" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} /></div>
                        )}
                        <div className="relative"><Mail className="absolute left-3 top-3 text-[var(--text-tertiary)]" size={18} /><input required type="email" placeholder="Email" className="w-full pl-10 p-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl focus:outline-none text-[var(--text-primary)]" value={formData.clientEmail} onChange={e => setFormData({...formData, clientEmail: e.target.value})} /></div>
                        <div className="relative"><Lock className="absolute left-3 top-3 text-[var(--text-tertiary)]" size={18} /><input required type="password" placeholder="Password" className="w-full pl-10 p-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl focus:outline-none text-[var(--text-primary)]" value={formData.clientPassword} onChange={e => setFormData({...formData, clientPassword: e.target.value})} /></div>
                        <button type="submit" className="w-full py-4 bg-[#1C1917] dark:bg-[#A18058] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#A18058] dark:hover:bg-white dark:hover:text-[#1C1917] transition-all shadow-lg">{authMode === 'register' ? 'Registrati e Continua' : 'Accedi e Continua'}</button>
                    </form>
                    <button onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')} className="w-full mt-4 text-[10px] uppercase font-bold text-[#A18058] hover:underline">{authMode === 'register' ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati'}</button>
                </div>
            )}

            {step === 4 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-serif text-[var(--text-primary)] mb-2">Scegli il tuo consulente</h2>
                    <p className="text-[var(--text-secondary)] text-sm mb-12">L'agente selezionato ti guiderà durante la visita.</p>
                    <div className="grid grid-cols-2 gap-8">
                        {AGENTS.map(agent => (
                            <div key={agent.id} onClick={() => handleAgentSelect(agent)} className={`p-8 rounded-[2rem] border transition-all cursor-pointer ${formData.agent?.id === agent.id ? 'border-[#A18058] bg-[#A18058]/5' : 'border-[var(--border-primary)] hover:border-[#A18058]/40'}`}>
                                <img src={agent.image} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border border-[var(--border-primary)] shadow-sm" alt={agent.name} />
                                <h4 className="font-serif text-lg">{agent.name}</h4>
                                <p className="text-[9px] uppercase font-bold text-[var(--text-tertiary)] tracking-widest">{agent.role}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleFinalSubmit} disabled={!formData.agent} className={`w-full mt-12 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${formData.agent ? 'bg-[#1C1917] dark:bg-[#A18058] text-white hover:bg-[#A18058] dark:hover:bg-white dark:hover:text-[#1C1917] shadow-xl' : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed border border-[var(--border-primary)]'}`}>Invia Richiesta di Visita</button>
                </div>
            )}

            {step === 5 && (
              <div className="animate-in zoom-in duration-500 flex flex-col items-center justify-center text-center py-6 h-full">
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8"><CheckCircle size={40} /></div>
                <h2 className="text-4xl font-serif text-[var(--text-primary)] mb-4">Richiesta Inviata</h2>
                <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-10 leading-relaxed">Grazie! La richiesta per <strong>{formData.property?.title}</strong> è stata inoltrata a <strong>{formData.agent?.name}</strong>. Riceverai una notifica immediata via email e whatsapp.</p>
                <div className="flex gap-4 mb-10">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg text-[10px] font-bold uppercase shadow-md hover:bg-green-700 transition-colors"><MessageSquare size={14} /> WhatsApp</button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1C1917] dark:bg-[#A18058] text-white rounded-lg text-[10px] font-bold uppercase shadow-md hover:bg-[#A18058] dark:hover:bg-white dark:hover:text-[#1C1917] transition-colors"><Mail size={14} /> Email</button>
                </div>
                <a href={getCalendarLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#A18058] text-[10px] font-bold uppercase tracking-widest hover:underline"><CalendarPlus size={16} /> Aggiungi al Calendario</a>
                <button onClick={onClose} className="mt-12 text-[var(--text-tertiary)] text-[10px] uppercase font-bold hover:text-[var(--text-primary)]">Chiudi</button>
              </div>
            )}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
