
import React, { useState, useMemo } from 'react';
import { BedDouble, Maximize, ArrowRight, X, Check, ArrowUpRight, Bath, Users, Plane, Waves, Sun, Trees, SlidersHorizontal, ChevronDown, Heart, MapPin } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

interface Property {
  id: number;
  title: string;
  price: string;
  priceValue: number; // Added for filtering
  location: string;
  beds: number;
  baths: number;
  sqm: string; 
  image: string;
  tag?: string;
  tagColor?: string;
  tagText?: string;
  description: string;
  features: string[];
  lat: number;
  lng: number;
  type: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: "Villa Chira",
    price: "Trattativa Riservata",
    priceValue: 3500000, // Hidden value for sorting/filtering
    location: "Loiri Porto S. Paolo / Porto Taverna",
    type: "Villa Singola Fronte Mare",
    beds: 5,
    baths: 5,
    sqm: "10 Ospiti",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2670&auto=format&fit=crop",
    tag: "Esclusiva",
    tagColor: "bg-[#1C1917]/90 text-white border border-white/20",
    tagText: "Fronte Mare (5mt)",
    description: "Esclusività assoluta per questa Villa Singola Fronte Mare con accesso diretto alla spiaggia (5mt). Situata di fronte all'isola di Tavolara, offre una vista mozzafiato e un grande giardino privato. Dotata di ogni comfort: lavastoviglie, climatizzazione in ogni stanza e zona BBQ.",
    features: ["Accesso Mare Diretto", "Vista Tavolara", "Grande Giardino", "Privacy Totale"],
    lat: 40.871,
    lng: 9.645
  },
  {
    id: 2,
    title: "Villa San Lorenzo",
    price: "€ 680.000",
    priceValue: 680000,
    location: "Budoni / San Lorenzo",
    type: "Villa Indipendente",
    beds: 3,
    baths: 2,
    sqm: "6 Ospiti",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop",
    tag: "Autentica",
    tagColor: "bg-[#A18058] text-white",
    tagText: "Stile Sardo",
    description: "Autentica villa indipendente immersa nella tranquillità, libera su 4 lati con vista colline. Caratterizzata da stile sardo (pietra/cotto), offre un ampio giardino, doppia veranda abitabile, studio privato e terrazza panoramica. Ideale per smart workers e famiglie.",
    features: ["Giardino su 4 lati", "Doppia Veranda", "Studio Privato", "Terrazza Panoramica"],
    lat: 40.705,
    lng: 9.680
  },
  {
    id: 3,
    title: "Lu Stazzu",
    price: "In Valutazione",
    priceValue: 1200000, // Estimated for filtering
    location: "San Teodoro / Lu Impostu",
    type: "Villa Singola (Stazzo)",
    beds: 2,
    baths: 2,
    sqm: "4 Ospiti",
    image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2670&auto=format&fit=crop",
    tag: "Design",
    tagColor: "bg-white/90 text-[#1C1917]",
    tagText: "Architettura Gallurese",
    description: "Splendida reinterpretazione dello 'Stazzo Gallurese' strutturata in due corpi. Vista mare, piscina privata a sfioro, palestra e gazebo esterno. Una proprietà unica per gli amanti del design e della clientela internazionale.",
    features: ["Stazzo Gallurese", "Piscina a Sfioro", "Vista Mare", "Struttura in due corpi"],
    lat: 40.835,
    lng: 9.673
  }
];

interface ListingsProps {
    onOpenSales: (id?: number) => void;
}

const Listings: React.FC<ListingsProps> = ({ onOpenSales }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [animatingHeart, setAnimatingHeart] = useState<number | null>(null);
  
  // Filtering States
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');
  const [showFilters, setShowFilters] = useState(false);
  const [minBeds, setMinBeds] = useState(0);
  const [budgetRange, setBudgetRange] = useState<number>(5000000); // Default max

  const scrollToMap = () => {
      const mapSection = document.getElementById('map-explorer');
      if (mapSection) {
          mapSection.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const handleFavoriteClick = (e: React.MouseEvent, prop: any) => {
    e.stopPropagation();
    setAnimatingHeart(prop.id);
    toggleFavorite({ ...prop, status: 'In Vendita' });
    setTimeout(() => setAnimatingHeart(null), 600);
  };

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      // 1. Category Filter
      if (activeCategory === 'Vista Mare') {
        const hasSeaView = p.type.toLowerCase().includes('mare') || p.features.some(f => f.toLowerCase().includes('mare') || f.toLowerCase().includes('vista'));
        if (!hasSeaView) return false;
      }
      if (activeCategory === 'Stazzi') {
        const isStazzo = p.type.toLowerCase().includes('stazzo') || p.features.some(f => f.toLowerCase().includes('stazzo'));
        if (!isStazzo) return false;
      }

      // 2. Advanced Filters (Min Beds)
      if (p.beds < minBeds) return false;

      // 3. Advanced Filters (Budget)
      if (p.priceValue > budgetRange) return false;

      return true;
    });
  }, [activeCategory, minBeds, budgetRange]);

  const categories = [
    { id: 'Tutti', label: 'Tutti' },
    { id: 'Vista Mare', label: 'Vista Mare' },
    { id: 'Stazzi', label: 'Stazzi' },
  ];

  return (
    <section id="vendite" className="py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] relative z-20 transition-colors duration-500">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative">
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl lg:text-5xl text-[var(--text-primary)] font-serif mb-3">Collezione <span className="text-[#A18058] italic">Vendite</span></h2>
            <p className="text-[var(--text-secondary)] text-sm font-light">Le proprietà più esclusive della costa Nord-Orientale.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 relative">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setShowFilters(false); }}
                className={`
                  px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border
                  hover:scale-105 active:scale-95
                  ${activeCategory === cat.id 
                    ? 'bg-[#A18058] text-white border-[#A18058] shadow-[0_0_15px_rgba(161,128,88,0.3)]' 
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-primary)] hover:border-[#A18058] hover:text-[var(--text-primary)]'}
                `}
              >
                {cat.label}
              </button>
            ))}

            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border
                  hover:scale-105 active:scale-95
                  ${showFilters || (minBeds > 0 || budgetRange < 5000000)
                    ? 'bg-[#A18058] text-white border-[#A18058] shadow-lg' 
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-primary)] hover:border-[#A18058] hover:text-[var(--text-primary)]'}
                `}
              >
                <SlidersHorizontal size={14} />
                Filtri
                {(minBeds > 0 || budgetRange < 5000000) && <span className="ml-1 w-2 h-2 rounded-full bg-[#A18058]"></span>}
              </button>

              {showFilters && (
                <div className="absolute right-0 top-full mt-4 w-72 bg-[var(--bg-secondary)] rounded-2xl shadow-2xl border border-[var(--border-primary)] p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="mb-6">
                    <label className="block text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-3">Camere da letto</label>
                    <div className="flex gap-2">
                      {[0, 2, 3, 4, 5].map((num) => (
                        <button 
                          key={num}
                          onClick={() => setMinBeds(num)}
                          className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                            ${minBeds === num 
                              ? 'bg-[#A18058] text-white shadow-md scale-110' 
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[#A18058] hover:text-white'}
                          `}
                        >
                          {num === 0 ? 'All' : num + '+'}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">Budget Max</label>
                      <span className="text-xs font-bold text-[#A18058]">€ {(budgetRange / 1000000).toFixed(1)}M</span>
                    </div>
                    <input 
                      type="range" 
                      min="500000" 
                      max="10000000" 
                      step="500000"
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(parseInt(e.target.value))}
                      className="w-full accent-[#A18058] cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map((prop) => (
              <div 
                key={prop.id} 
                className="group bg-[var(--bg-secondary)] rounded-[2.5rem] overflow-hidden border border-[var(--border-primary)] shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer flex flex-col h-full"
                onClick={() => onOpenSales(prop.id)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg ${prop.tagColor}`}>
                    {prop.tagText}
                  </div>

                  <button 
                    onClick={(e) => handleFavoriteClick(e, prop)}
                    className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl backdrop-blur-md
                      ${isFavorite(prop.id) 
                        ? 'bg-red-500 text-white scale-110' 
                        : 'bg-[var(--bg-secondary)]/90 text-[var(--text-primary)] hover:bg-red-500 hover:text-white'}`}
                  >
                    <Heart size={20} className={isFavorite(prop.id) ? 'fill-white' : 'fill-none'} />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex gap-2">
                       {prop.features.slice(0, 2).map((f, i) => (
                         <span key={i} className="px-3 py-1 bg-[var(--bg-secondary)]/20 backdrop-blur-md border border-white/20 text-white text-[8px] font-bold uppercase tracking-widest rounded-full">{f}</span>
                       ))}
                    </div>
                  </div>
                </div>

                <div className="p-10 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-serif mb-1 italic text-[var(--text-primary)]">{prop.title}</h3>
                      <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><MapPin size={12} className="text-[#A18058]" /> {prop.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-8 py-6 border-y border-[var(--border-primary)]">
                    <div className="flex items-center gap-2">
                      <BedDouble size={16} className="text-[#A18058]" />
                      <span className="text-xs font-medium text-[var(--text-primary)]">{prop.beds} <span className="text-[var(--text-tertiary)] text-[9px] uppercase">Letti</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize size={16} className="text-[#A18058]" />
                      <span className="text-xs font-medium text-[var(--text-primary)]">{prop.sqm}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-xl font-serif italic text-[#A18058]">{prop.price}</span>
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-primary)] group/btn">
                      Dettagli <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-[var(--bg-secondary)] rounded-[4rem] border-2 border-dashed border-[var(--border-primary)]">
            <h3 className="text-3xl font-serif text-[var(--text-primary)] italic mb-4">Nessun immobile trovato.</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-10">Prova a modificare i filtri di ricerca.</p>
            <button onClick={() => { setActiveCategory('Tutti'); setMinBeds(0); setBudgetRange(5000000); }} className="px-10 py-4 bg-[#1C1917] dark:bg-[#A18058] text-white rounded-full text-[10px] font-bold uppercase tracking-widest">Resetta Filtri</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Listings;
