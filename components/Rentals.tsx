
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  X, MapPin, BedDouble, Bath, Users, Waves,
  CalendarPlus, ArrowLeft, CheckCircle, Search, Filter, ArrowRight, Loader2,
  Plus, Minus, Compass, Heart, Eye, User, Lock, Mail, Phone, MessageSquare,
  MessageCircle, Calendar, ChevronDown, ChevronLeft, ChevronRight, 
  Sparkles, ChefHat, ShieldCheck, Ship, Info, Coffee, Utensils
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

// Declare Leaflet global
declare const L: any;

interface RentalsProps {
  onClose: () => void;
  initialPropertyId?: number | null;
}

const VIBES = ['Tutti', 'Fronte Mare', 'Con Piscina', 'Stazzo Storico', 'Privacy Totale'];

const AGENTS = [
  {
    id: 'andrea',
    name: 'Andrea Tala',
    role: 'Senior Luxury Broker',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'dario',
    name: 'Dario Deiana',
    role: 'Property Manager',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop'
  }
];

const INITIAL_RENTAL_PROPERTIES = [
  {
    id: 1,
    title: "Villa Sabina",
    location: "San Teodoro / I Giardini d'Aldia",
    type: "Villa Singola",
    pricePerNight: 850,
    bedrooms: 4,
    bathrooms: 5,
    sleeps: 9,
    vibe: "Privacy Totale",
    features: ["Infinity Pool", "Private Gym", "Sea View", "Smart Home"],
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
    lat: 40.825,
    lng: 9.680
  },
  {
    id: 2,
    title: "Lu Stazzu",
    location: "San Teodoro / Lu Impostu",
    type: "Stazzo Gallurese",
    pricePerNight: 600,
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    vibe: "Stazzo Storico",
    features: ["Boutique Design", "Garden", "Authentic Sardo", "Quiet Area"],
    image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2670&auto=format&fit=crop",
    lat: 40.835,
    lng: 9.673
  },
  {
      id: 3,
      title: "Villa Chira",
      location: "Porto San Paolo",
      type: "Fronte Mare",
      pricePerNight: 1200,
      bedrooms: 5,
      bathrooms: 5,
      sleeps: 10,
      vibe: "Fronte Mare",
      features: ["Direct Beach Access", "Tavolara View", "Large Park", "Docking Pier"],
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2670&auto=format&fit=crop",
      lat: 40.8756,
      lng: 9.6465
  }
];

export default function Rentals({ onClose, initialPropertyId }: RentalsProps) {
  const [selectedVilla, setSelectedVilla] = useState<any>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [dateRange, setDateRange] = useState<{start: Date | null; end: Date | null}>({ start: null, end: null });
  const [guests, setGuests] = useState(1);
  const [activeVibe, setActiveVibe] = useState('Tutti');
  const [selectedAgent, setSelectedAgent] = useState<any>(AGENTS[0]);
  const [services, setServices] = useState<string[]>([]);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [animatingHeart, setAnimatingHeart] = useState(false);

  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ [key: number]: any }>({});

  const filteredProperties = useMemo(() => {
    return INITIAL_RENTAL_PROPERTIES.filter(p => {
        if (activeVibe !== 'Tutti' && p.vibe !== activeVibe && p.type !== activeVibe) return false;
        if (guests > p.sleeps) return false;
        return true;
    });
  }, [activeVibe, guests]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }

    const map = L.map(mapContainerRef.current, {
        center: [40.83, 9.67],
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: false
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19
    }).addTo(map);

    mapRef.current = map;

    const createCustomIcon = (prop: any) => L.divIcon({
        className: 'bg-transparent border-none',
        html: `<div class="relative flex items-center justify-center w-10 h-10 group cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-9 h-9 rounded-full bg-[#1C1917] text-white border-2 border-white shadow-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:bg-[#A18058] group-active:scale-90">
                    <span class="text-[10px] font-bold">€${prop.pricePerNight}</span>
                </div>
               </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    filteredProperties.forEach(prop => {
        const marker = L.marker([prop.lat, prop.lng], { icon: createCustomIcon(prop) }).addTo(map);
        marker.on('click', () => {
            setSelectedVilla(prop);
            map.flyTo([prop.lat, prop.lng], 14, { duration: 1.5 });
        });
        markersRef.current[prop.id] = marker;
    });

    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, [filteredProperties]);

  useEffect(() => {
    if (initialPropertyId) {
        const found = INITIAL_RENTAL_PROPERTIES.find(p => p.id === initialPropertyId);
        if (found) {
            setSelectedVilla(found);
            setTimeout(() => {
                mapRef.current?.flyTo([found.lat, found.lng], 14, { duration: 1.2 });
            }, 500);
        }
    }
  }, [initialPropertyId]);

  const calculateTotal = () => {
    if (!dateRange.start || !dateRange.end || !selectedVilla) return 0;
    const diff = Math.ceil(Math.abs(dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24));
    return diff * selectedVilla.pricePerNight;
  };

  const handleDateClick = (d: number) => {
      const date = new Date(2025, 4, d); // May 2025
      if (!dateRange.start || (dateRange.start && dateRange.end)) {
          setDateRange({ start: date, end: null });
      } else {
          if (date < dateRange.start) setDateRange({ start: date, end: null });
          else setDateRange({ ...dateRange, end: date });
      }
  };

  const toggleService = (s: string) => {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleStartBooking = () => {
      setBookingStep(1);
      setIsBookingOpen(true);
  };

  const handleFavoriteClick = (prop: any) => {
    setAnimatingHeart(true);
    toggleFavorite({ ...prop, status: 'Affitto' });
    setTimeout(() => setAnimatingHeart(false), 600);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAF9] flex flex-col animate-in fade-in duration-500 overflow-hidden">
      
      <nav className="h-20 border-b border-stone-200 bg-white flex items-center px-8 justify-between relative z-[110] shadow-sm shrink-0">
         <div className="flex items-center gap-6">
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 rounded-full transition-all active:scale-90">
                <X size={20} />
            </button>
            <div className="h-8 w-px bg-stone-200 mx-2"></div>
            <div className="flex flex-col">
                <span className="text-stone-400 uppercase text-[9px] font-bold tracking-[0.2em]">Rental Portfolio</span>
                <h1 className="font-serif text-xl italic leading-none">Affitti Luxury</h1>
            </div>
         </div>

         <div className="hidden lg:flex items-center gap-2 bg-stone-100/80 p-1 rounded-full border border-stone-200/60 backdrop-blur-md">
            {VIBES.map(v => (
                <button 
                    key={v} 
                    onClick={() => setActiveVibe(v)}
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeVibe === v ? 'bg-[#1C1917] text-white shadow-md scale-105' : 'text-stone-500 hover:text-[#1C1917] hover:bg-stone-200/50'}`}
                >
                    {v}
                </button>
            ))}
         </div>

         <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-3 px-4 py-2 border border-stone-200 rounded-full text-[11px] font-bold text-stone-600 bg-white shadow-sm transition-all hover:shadow-md">
                <Users size={14} className="text-[#A18058]" />
                <span>{guests} Ospiti</span>
                <div className="flex gap-1.5 ml-2">
                    <button onClick={() => setGuests(Math.max(1, guests-1))} className="w-6 h-6 flex items-center justify-center bg-stone-50 border border-stone-200 rounded-full hover:bg-stone-900 hover:text-white transition-all active:scale-75">-</button>
                    <button onClick={() => setGuests(guests+1)} className="w-6 h-6 flex items-center justify-center bg-stone-50 border border-stone-200 rounded-full hover:bg-stone-900 hover:text-white transition-all active:scale-75">+</button>
                </div>
             </div>
         </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-full lg:w-[500px] xl:w-[550px] bg-white border-r border-stone-200 overflow-y-auto custom-scrollbar z-20 shadow-2xl">
            <div className="p-8">
                <div className="space-y-10">
                    {filteredProperties.map((prop, idx) => (
                        <div 
                            key={prop.id} 
                            onClick={() => { setSelectedVilla(prop); mapRef.current?.flyTo([prop.lat, prop.lng], 14, { duration: 1.2 }); }}
                            className={`group cursor-pointer rounded-[2.5rem] overflow-hidden transition-all duration-500 transform will-change-transform ${selectedVilla?.id === prop.id ? 'ring-2 ring-[#A18058] shadow-2xl scale-[1.01]' : 'hover:shadow-xl hover:-translate-y-1 border border-stone-100'}`}
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img src={prop.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" alt={prop.title} />
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#1C1917] shadow-sm border border-white/20 w-fit">{prop.vibe}</span>
                                    <span className="bg-[#1C1917]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white shadow-sm border border-white/10 w-fit">€{prop.pricePerNight}/notte</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#1C1917]/90 via-transparent to-transparent text-white">
                                    <h3 className="text-3xl font-serif italic mb-1 transition-colors group-hover:text-[#A18058]">{prop.title}</h3>
                                    <p className="text-xs opacity-80 flex items-center gap-1"><MapPin size={12}/> {prop.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="hidden lg:block flex-1 relative bg-stone-200">
            <div ref={mapContainerRef} className="absolute inset-0 w-full h-full"></div>
            {/* Rimossa card concierge come richiesto */}
        </div>

        {selectedVilla && !isBookingOpen && (
            <div className="fixed inset-0 z-[120] flex justify-end">
                <div className="absolute inset-0 bg-[#1C1917]/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedVilla(null)}></div>
                <div className="relative w-full md:w-[600px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
                    <div className="h-[45vh] relative shrink-0 overflow-hidden">
                        <img src={selectedVilla.image} className="w-full h-full object-cover animate-slow-zoom" alt={selectedVilla.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                        <button onClick={() => setSelectedVilla(null)} className="absolute top-8 left-8 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all shadow-xl"><ArrowLeft size={24}/></button>
                        
                        <div className="absolute top-8 right-8 z-20">
                             <button 
                                onClick={() => handleFavoriteClick(selectedVilla)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 hover:scale-110 shadow-2xl group/heart ${isFavorite(selectedVilla.id) ? 'text-red-500 bg-white' : ''} ${animatingHeart ? 'animate-heart-pop active-heart-burst' : ''}`}
                             >
                                <Heart 
                                    size={24} 
                                    className={`transition-colors duration-300 ${isFavorite(selectedVilla.id) ? 'fill-red-500' : 'fill-none group-hover/heart:fill-red-500/20'}`} 
                                />
                             </button>
                        </div>

                        <div className="absolute bottom-10 left-10 right-10">
                            <h2 className="text-5xl font-serif italic text-stone-900 tracking-tight mb-2">{selectedVilla.title}</h2>
                            <p className="text-stone-500 flex items-center gap-2 text-sm font-bold uppercase tracking-widest"><MapPin size={16} className="text-[#A18058]"/> {selectedVilla.location}</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-10 bg-white">
                        <div className="grid grid-cols-3 gap-6 mb-12 border-y border-stone-100 py-8">
                             <div className="text-center">
                                 <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Camere</p>
                                 <p className="text-xl font-serif text-stone-900 flex items-center justify-center gap-2"><BedDouble size={18} className="text-[#A18058]"/> {selectedVilla.bedrooms}</p>
                             </div>
                             <div className="text-center border-x border-stone-100">
                                 <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Bagni</p>
                                 <p className="text-xl font-serif text-stone-900 flex items-center justify-center gap-2"><Bath size={18} className="text-[#A18058]"/> {selectedVilla.bathrooms}</p>
                             </div>
                             <div className="text-center">
                                 <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Ospiti</p>
                                 <p className="text-xl font-serif text-stone-900 flex items-center justify-center gap-2"><Users size={18} className="text-[#A18058]"/> {selectedVilla.sleeps}</p>
                             </div>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-lg font-serif italic mb-6">Caratteristiche Esclusive</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {selectedVilla.features.map((f: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                                        <CheckCircle size={16} className="text-[#A18058]"/>
                                        <span className="text-sm text-stone-600">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-[#1C1917] text-white relative overflow-hidden">
                             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                             <div className="relative z-10 flex flex-col items-center text-center">
                                 <h4 className="text-2xl font-serif italic mb-2 text-[#A18058]">Pianifica il tuo soggiorno</h4>
                                 <p className="text-stone-400 text-xs mb-8 leading-relaxed">Controlla le disponibilità e blocca le tue date. I nostri Private Broker si occuperanno di ogni dettaglio logistico.</p>
                                 <button 
                                    onClick={handleStartBooking}
                                    className="w-full py-5 bg-[#A18058] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1917] transition-all shadow-2xl flex items-center justify-center gap-4"
                                 >
                                    Verifica Disponibilità <ArrowRight size={18}/>
                                 </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {isBookingOpen && selectedVilla && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[#1C1917]/90 backdrop-blur-md animate-in fade-in" onClick={() => setIsBookingOpen(false)}></div>
                <div className="relative w-full max-w-4xl bg-[#FAFAF9] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500 h-[85vh] md:h-[650px]">
                    <div className="hidden md:flex md:w-[35%] bg-[#1C1917] relative p-10 flex-col justify-between">
                         <div className="absolute inset-0 opacity-40"><img src={selectedVilla.image} className="w-full h-full object-cover" alt="Recap" /><div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] to-[#1C1917]/60"></div></div>
                         <div className="relative z-10"><span className="text-[10px] font-bold text-[#A18058] uppercase tracking-[0.3em] mb-3 block">Recap Prenotazione</span><h3 className="text-3xl font-serif text-white italic mb-2">{selectedVilla.title}</h3><p className="text-stone-400 text-xs flex items-center gap-2 mb-8"><MapPin size={12} /> {selectedVilla.location}</p><div className="space-y-4"><div className="flex items-center gap-3 text-stone-300 text-xs"><Calendar size={14} className="text-[#A18058]" />{dateRange.start ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end ? dateRange.end.toLocaleDateString() : '...'}` : 'Seleziona date'}</div><div className="flex items-center gap-3 text-stone-300 text-xs"><Users size={14} className="text-[#A18058]" />{guests} Ospiti</div></div></div>
                         <div className="relative z-10 pt-8 border-t border-white/10"><p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Totale Stimato</p><p className="text-4xl font-serif text-white">€{calculateTotal() || '---'}</p></div>
                    </div>
                    <div className="flex-1 bg-white p-8 md:p-12 flex flex-col relative overflow-y-auto custom-scrollbar"><button onClick={() => setIsBookingOpen(false)} className="absolute top-8 right-8 text-stone-400 hover:text-stone-900 transition-colors"><X size={24}/></button>
                        <div className="mb-10 flex gap-2">{[1, 2, 3].map(s => (<div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${bookingStep >= s ? 'bg-[#1C1917]' : 'bg-stone-100'}`} />))}</div>
                        {bookingStep === 1 && (<div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full"><h3 className="text-3xl font-serif italic mb-2">Quando desidera soggiornare?</h3><p className="text-stone-400 text-xs uppercase tracking-widest font-bold mb-8">Soggiorno minimo: 5 notti</p><div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 mb-8 flex-1"><div className="flex justify-between items-center mb-6"><h4 className="font-bold text-xs uppercase tracking-[0.2em]">Maggio 2025</h4><div className="flex gap-2"><button className="p-1 hover:bg-stone-200 rounded-full transition-colors"><ChevronLeft size={20}/></button><button className="p-1 hover:bg-stone-200 rounded-full transition-colors"><ChevronRight size={20}/></button></div></div><div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-[#A18058] mb-4">{['L','M','M','G','V','S','D'].map(d => <div key={d}>{d}</div>)}</div><div className="grid grid-cols-7 gap-2">{Array.from({length: 31}).map((_, i) => { const d = i + 1; const date = new Date(2025, 4, d); const isSelected = (dateRange.start?.getTime() === date.getTime()) || (dateRange.end?.getTime() === date.getTime()); const isInRange = dateRange.start && dateRange.end && date > dateRange.start && date < dateRange.end; return (<button key={i} onClick={() => handleDateClick(d)} className={`aspect-square flex items-center justify-center rounded-xl text-xs font-medium transition-all ${isSelected ? 'bg-[#1C1917] text-white scale-110 shadow-lg' : isInRange ? 'bg-[#A18058]/20 text-[#1C1917]' : 'hover:bg-white text-stone-500'}`}>{d}</button>)})}</div></div><button onClick={() => setBookingStep(3)} disabled={!dateRange.start || !dateRange.end} className="w-full py-5 bg-[#1C1917] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#A18058] transition-all disabled:opacity-30 disabled:cursor-not-allowed">Prosegui</button></div>)}
                        {bookingStep === 3 && (<div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full"><h3 className="text-3xl font-serif italic mb-8">Informazioni di Contatto</h3><form className="space-y-6 flex-1" onSubmit={(e) => { e.preventDefault(); setBookingStep(4); }}><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} /><input required type="text" placeholder="Nome e Cognome" className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-[#A18058] transition-colors" /></div><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} /><input required type="email" placeholder="Email" className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-[#A18058] transition-colors" /></div><div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} /><input required type="tel" placeholder="Numero di Telefono" className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-[#A18058] transition-colors" /></div><div className="p-5 rounded-2xl bg-stone-50 border border-stone-100"><p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">La Sua Guida Dedicata</p><div className="flex items-center gap-4"><img src={AGENTS[0].image} className="w-10 h-10 rounded-full object-cover" alt="Agent" /><div><p className="text-sm font-bold">{AGENTS[0].name}</p><p className="text-[9px] text-stone-400 uppercase tracking-widest">{AGENTS[0].role}</p></div></div></div><button type="submit" className="w-full py-5 bg-[#1C1917] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.3em] hover:bg-[#A18058] transition-all shadow-xl">Richiedi Prenotazione</button></form></div>)}
                        {bookingStep === 4 && (<div className="animate-in zoom-in-95 duration-700 flex flex-col items-center justify-center text-center h-full py-10"><div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-10 border border-green-100 animate-bounce"><CheckCircle size={48} strokeWidth={1}/></div><h3 className="text-4xl font-serif mb-6 italic tracking-tight">Eredità Confermata.</h3><p className="text-stone-500 text-sm max-w-sm mx-auto leading-relaxed mb-10">La Sua richiesta è stata inviata con successo. Un nostro Private Broker la contatterà entro 30 minuti per finalizzare i dettagli.</p><button onClick={() => setIsBookingOpen(false)} className="w-full max-w-xs py-5 bg-[#1C1917] text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#A18058] transition-all shadow-2xl">Torna alla Proprietà</button></div>)}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
