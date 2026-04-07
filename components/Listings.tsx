
import React, { useState, useMemo } from 'react';
import { BedDouble, Maximize, ArrowRight, X, Check, ArrowUpRight, Bath, Users, Plane, Waves, Sun, Trees, SlidersHorizontal, ChevronDown, Heart } from 'lucide-react';
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
    <section id="vendite" className="py-24 bg-[#1C1917] text-[#FAFAF9] relative z-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative">
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl lg:text-5xl text-[#FAFAF9] font-serif mb-3">Collezione <span className="text-[#A18058] italic">Vendite</span></h2>
            <p className="text-stone-400 text-sm font-light">Le proprietà più esclusive della costa Nord-Orientale.</p>
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
                    ? 'bg-[#FAFAF9] text-[#1C1917] border-[#FAFAF9] shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                    : 'bg-stone-800 text-stone-400 border-stone-700 hover:border-[#FAFAF9] hover:text-[#FAFAF9]'}
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
                    ? 'bg-[#FAFAF9] text-[#1C1917] border-[#FAFAF9] shadow-lg' 
                    : 'bg-stone-800 text-stone-400 border-stone-700 hover:border-[#FAFAF9] hover:text-[#FAFAF9]'}
                `}
              >
                <SlidersHorizontal size={14} />
                Filtri
                {(minBeds > 0 || budgetRange < 5000000) && <span className="ml-1 w-2 h-2 rounded-full bg-[#A18058]"></span>}
              </button>

              {showFilters && (
                <div className="absolute right-0 top-full mt-4 w-72 bg-[#0C0A09] rounded-2xl shadow-2xl border border-stone-800 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="mb-6">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3">Camere da letto</label>
                    <div className="flex gap-2">
                      {[0, 2, 3, 4, 5].map((num) => (
                        <button 
                          key={num}
                          onClick={() => setMinBeds(num)}
                          className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                            ${minBeds === num 
                              ? 'bg-[#A18058] text-white shadow-md scale-110' 
                              : 'bg-stone-800 text-stone-400 hover:bg-stone-700'}
                          `}
                        >
                          {num === 0 ? 'Any' : num === 5 ? '5+' : num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Budget Max</label>
                      <span className="text-xs font-serif font-bold text-[#FAFAF9]">
                        {budgetRange >= 5000000 ? 'Illimitato' : `€ ${(budgetRange / 1000000).toFixed(1)}M`}
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="500000" 
                      max="5000000" 
                      step="100000" 
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(parseInt(e.target.value))}
                      className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#FAFAF9]"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-stone-800">
                    <button 
                      onClick={() => { setMinBeds(0); setBudgetRange(5000000); }}
                      className="text-[10px] uppercase font-bold text-stone-500 hover:text-[#FAFAF9] transition-colors"
                    >
                      Reset
                    </button>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="text-xs font-bold text-[#A18058] hover:text-[#8B6B46] transition-colors"
                    >
                      Applica
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop) => {
              return (
                <div 
                  key={prop.id} 
                  className="group cursor-pointer transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.01]"
                  onClick={() => onOpenSales(prop.id)}
                >
                  <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[1rem] mb-5 bg-stone-900 border border-stone-800 shadow-sm group-hover:shadow-[0_20px_40px_-15px_rgba(161,128,88,0.15)] group-hover:border-[#A18058]/30 transition-all duration-500">
                    <img 
                      src={prop.image} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                      alt={prop.title}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
                    
                    {prop.tagText && (
                      <div className="absolute top-4 left-4 transition-opacity duration-300">
                        <span className={`${prop.tagColor} backdrop-blur-md px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-lg`}>{prop.tagText}</span>
                      </div>
                    )}

                    {/* HEART BUTTON - ACTIVATED */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                            onClick={(e) => handleFavoriteClick(e, prop)}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white hover:text-red-500 hover:scale-110 group/heart ${isFavorite(prop.id) ? 'text-red-500 bg-white border-red-200' : 'text-white'} ${animatingHeart === prop.id ? 'animate-heart-pop active-heart-burst' : ''}`}
                        >
                            <Heart 
                                size={18} 
                                className={`transition-colors duration-300 ${isFavorite(prop.id) ? 'fill-red-500' : 'fill-none group-hover/heart:fill-red-500/20'}`} 
                            />
                        </button>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <button 
                        className="w-full bg-[#FAFAF9] text-[#1C1917] py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-[#A18058] hover:text-white transition-colors"
                      >
                        Vedi Dettagli
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-xl font-serif transition-colors text-[#FAFAF9] group-hover:text-[#A18058]">{prop.title}</h3>
                      <span className="text-sm font-medium text-[#FAFAF9] font-sans opacity-90">{prop.price}</span>
                    </div>
                    <p className="text-xs text-stone-400 font-light mb-3 line-clamp-1 flex items-center gap-1"><Waves size={10} className="text-[#A18058]"/> {prop.location}</p>
                    <div className="flex items-center gap-4 text-stone-500 text-[10px] uppercase tracking-wider font-medium">
                      <span className="flex items-center gap-1"><BedDouble size={12} /> {prop.beds} Camere</span>
                      <span className="w-1 h-1 rounded-full bg-stone-700"></span>
                      <span className="flex items-center gap-1"><Bath size={12} /> {prop.baths} Bagni</span>
                      <span className="w-1 h-1 rounded-full bg-stone-700"></span>
                      <span className="flex items-center gap-1"><Users size={12} /> {prop.sqm}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-stone-900/50 rounded-3xl border border-dashed border-stone-800">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-500">
                <SlidersHorizontal size={24} />
              </div>
              <h3 className="text-xl font-serif text-[#FAFAF9] mb-2">Nessun Risultato</h3>
              <p className="text-stone-500 text-sm max-w-md mx-auto">Nessuna proprietà corrisponde ai filtri selezionati. Prova a modificare i criteri di ricerca.</p>
              <button 
                onClick={() => { setActiveCategory('Tutti'); setMinBeds(0); setBudgetRange(5000000); }}
                className="mt-6 text-xs font-bold uppercase tracking-widest text-[#A18058] hover:text-white transition-colors"
              >
                Resetta Filtri
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-20 flex justify-center">
          <button 
            onClick={scrollToMap}
            className="btn-super-glow group bg-transparent border border-stone-700 bg-[#1C1917] text-[#FAFAF9] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-stone-800"
          >
            Visualizza Mappa Interattiva
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Listings;
