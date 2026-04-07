import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, BedDouble, Bath, Users,
  ArrowRight, Loader2, Heart, Star,
  Calendar, ShieldCheck, Info, Sparkles,
  Waves, Coffee, Utensils
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import SEO from '../components/SEO';

// Declare Leaflet global
declare const L: any;

const VIBES = ['Tutti', 'Fronte Mare', 'Con Piscina', 'Stazzo Storico', 'Privacy Totale'];

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

const Rentals: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPropertyId = searchParams.get('id');

  const [selectedVilla, setSelectedVilla] = useState<any>(null);
  const [activeVibe, setActiveVibe] = useState('Tutti');
  const [guests, setGuests] = useState(1);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const filteredProperties = useMemo(() => {
    return INITIAL_RENTAL_PROPERTIES.filter(p => {
        if (activeVibe !== 'Tutti' && p.vibe !== activeVibe && p.type !== activeVibe) return false;
        if (guests > p.sleeps) return false;
        return true;
    });
  }, [activeVibe, guests]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    if (!loading && mapContainerRef.current && typeof L !== 'undefined') {
      if (mapRef.current) {
        mapRef.current.remove();
      }

      const map = L.map(mapContainerRef.current, {
        center: [40.83, 9.67],
        zoom: 11,
        zoomControl: false,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{y}/{x}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapRef.current = map;

      filteredProperties.forEach(prop => {
        const marker = L.marker([prop.lat, prop.lng]).addTo(map);
        marker.on('click', () => {
          setSelectedVilla(prop);
          map.flyTo([prop.lat, prop.lng], 13);
        });
      });
    }
  }, [loading, filteredProperties]);

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
      <SEO 
        title="Affitti Estivi di Lusso" 
        description="Prenota la tua vacanza da sogno in Sardegna. Ville con piscina, stazzi storici e proprietà fronte mare selezionate per te."
      />

      <header className="relative pt-16 pb-12 md:pt-24 md:pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#A18058]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A18058] mb-4 md:mb-6">The Rental Collection • 2026</span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-[var(--text-primary)] tracking-tighter italic mb-6 md:mb-8">Vacanze <span className="not-italic text-[var(--text-tertiary)]">Esclusive.</span></h1>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto overflow-x-auto no-scrollbar pb-4">
                <div className="bg-[var(--bg-tertiary)] p-1 rounded-full flex items-center gap-1 border border-[var(--border-primary)]">
                    {VIBES.map(v => (
                      <button 
                        key={v} 
                        onClick={() => setActiveVibe(v)} 
                        className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeVibe === v ? 'bg-[#A18058] text-white shadow-sm' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
                      >
                        {v}
                      </button>
                    ))}
                </div>
            </div>
        </div>
      </header>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* List View */}
          <div className="lg:col-span-7 space-y-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="w-12 h-12 text-[#A18058] animate-spin mb-6" />
                <p className="text-[var(--text-tertiary)] font-serif italic text-lg">Selezionando le migliori proposte...</p>
              </div>
            ) : (
              filteredProperties.map((prop) => (
                <div 
                  key={prop.id} 
                  className={`group bg-[var(--bg-secondary)] rounded-[2.5rem] overflow-hidden border border-[var(--border-primary)] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row h-full md:h-80 cursor-pointer ${selectedVilla?.id === prop.id ? 'ring-2 ring-[#A18058]' : ''}`}
                  onClick={() => setSelectedVilla(prop)}
                >
                  <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                    <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-[var(--bg-secondary)]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#A18058] shadow-lg">
                        {prop.vibe}
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-serif text-[var(--text-primary)]">{prop.title}</h3>
                        <p className="text-[#A18058] font-bold text-lg">€{prop.pricePerNight}<span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-widest ml-1">/notte</span></p>
                      </div>
                      <p className="text-[var(--text-tertiary)] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 mb-6">
                        <MapPin size={12} className="text-[#A18058]"/> {prop.location}
                      </p>
                      <div className="flex gap-4 mb-6">
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium">
                          <BedDouble size={14} className="text-[var(--text-tertiary)]"/> {prop.bedrooms} Camere
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium">
                          <Users size={14} className="text-[var(--text-tertiary)]"/> {prop.sleeps} Ospiti
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-[var(--border-primary)] pt-6">
                      <div className="flex gap-2">
                        {prop.features.slice(0, 2).map((f: string, i: number) => (
                          <span key={i} className="text-[8px] font-bold uppercase tracking-widest px-2 py-1 bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] rounded-md">{f}</span>
                        ))}
                      </div>
                      <button className="text-[var(--text-primary)] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-[#A18058] transition-colors">
                        Dettagli <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Map View - Sticky on Desktop */}
          <div className="lg:col-span-5 h-[400px] lg:h-[700px] sticky top-28 rounded-[2.5rem] overflow-hidden border border-[var(--border-primary)] shadow-inner order-first lg:order-last">
            <div ref={mapContainerRef} className="w-full h-full bg-[var(--bg-tertiary)]" />
          </div>

        </div>
      </section>

      {/* Detail Overlay */}
      {selectedVilla && (
        <div className="fixed inset-0 z-[2000] flex justify-end animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedVilla(null)}></div>
          <div className="relative w-full md:w-[600px] bg-[var(--bg-primary)] h-full shadow-2xl overflow-y-auto no-scrollbar p-8 md:p-12">
            <button onClick={() => setSelectedVilla(null)} className="mb-12 flex items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors text-[10px] font-bold uppercase tracking-widest">
              <ArrowRight className="rotate-180" size={16} /> Torna alla lista
            </button>
            
            <img src={selectedVilla.image} alt={selectedVilla.title} className="w-full h-80 object-cover rounded-[2rem] mb-12 shadow-2xl" />
            
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-primary)] italic">{selectedVilla.title}</h2>
              <button 
                onClick={() => toggleFavorite(selectedVilla)}
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${isFavorite(selectedVilla.id) ? 'bg-red-500 border-red-500 text-white' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-tertiary)] hover:text-red-500'}`}
              >
                <Heart size={20} className={isFavorite(selectedVilla.id) ? 'fill-white' : ''} />
              </button>
            </div>
            
            <p className="text-[var(--text-tertiary)] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 mb-8">
              <MapPin size={14} className="text-[#A18058]"/> {selectedVilla.location}
            </p>

            <div className="grid grid-cols-3 gap-6 mb-12 pb-12 border-b border-[var(--border-primary)] text-center">
              <div>
                <p className="text-[9px] font-bold uppercase text-[var(--text-tertiary)] mb-2">Camere</p>
                <p className="text-xl font-serif text-[var(--text-primary)]">{selectedVilla.bedrooms}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase text-[var(--text-tertiary)] mb-2">Ospiti</p>
                <p className="text-xl font-serif text-[var(--text-primary)]">{selectedVilla.sleeps}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase text-[var(--text-tertiary)] mb-2">Prezzo</p>
                <p className="text-xl font-serif text-[#A18058]">€{selectedVilla.pricePerNight}</p>
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] mb-6">Servizi Inclusi</h3>
            <div className="grid grid-cols-2 gap-4 mb-12">
              {selectedVilla.features.map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
                  <ShieldCheck size={16} className="text-[#A18058]" /> {f}
                </div>
              ))}
            </div>

            <button onClick={() => navigate('/prenota')} className="w-full py-5 bg-[#1C1917] dark:bg-[#A18058] text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#A18058] dark:hover:bg-white dark:hover:text-[#1C1917] transition-all flex items-center justify-center gap-3 shadow-xl">
              Verifica Disponibilità
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rentals;
