import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, BedDouble, Bath, ArrowRight, 
  Search, SlidersHorizontal, CheckCircle, 
  Heart, Share2, ShieldCheck, Loader2, 
  CalendarCheck, Info, Shield, Sparkles
} from 'lucide-react';
import { fetchSalesFromSheet } from '../utils/googleSheets';
import { useFavorites } from '../context/FavoritesContext';
import SEO from '../components/SEO';

const INITIAL_SALES_PROPERTIES = [
  {
    id: 1,
    title: "Villa Chira",
    location: "Loiri Porto S. Paolo / Porto Taverna",
    price: "Trattativa Riservata",
    priceValue: 3500000,
    type: "Villa Singola Fronte Mare",
    beds: 5,
    baths: 5,
    sqm: "280 mq",
    land: "2000 mq",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2670&auto=format&fit=crop",
    tag: "Fronte Mare",
    description: "Esclusività assoluta per questa Villa Singola Fronte Mare con accesso diretto alla spiaggia (5mt). Situata di fronte all'isola di Tavolara, offre una vista mozzafiato e un grande giardino privato.",
    features: ["Accesso Mare Diretto", "Vista Isola Tavolara", "Grande Giardino Privato", "Privacy Totale", "Domotica Integrale", "Posti Auto Coperti"]
  },
  {
    id: 2,
    title: "Residenza Puntaldia",
    location: "San Teodoro / Puntaldia",
    price: "€ 1.200.000",
    priceValue: 1200000,
    type: "Appartamento Lusso",
    beds: 3,
    baths: 3,
    sqm: "140 mq",
    land: "Condominiale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
    tag: "Golf & Marina",
    description: "Nel prestigioso consorzio di Puntaldia, proponiamo elegante appartamento con terrazza panoramica sul campo da golf e sul mare.",
    features: ["Vicinanza Golf Club", "Sicurezza H24", "Porto Turistico", "Terrazza Panoramica", "Aree Verdi Curate", "Finiture d'Elite"]
  }
];

const Sales: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPropertyId = searchParams.get('id');

  const [selectedProp, setSelectedProp] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>(INITIAL_SALES_PROPERTIES);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  // Filter States
  const [minPrice, setMinPrice] = useState(0);
  const [minBeds, setMinBeds] = useState(0);
  const [propertyType, setPropertyType] = useState('Tutti');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const sheetData = await fetchSalesFromSheet();
        if (sheetData && sheetData.length > 0) {
          setProperties(sheetData);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
      setTimeout(() => setLoading(false), 800); 
    };
    loadData();
  }, []);

  useEffect(() => {
    if (initialPropertyId && !loading && properties.length > 0) {
        const found = properties.find(p => p.id === Number(initialPropertyId));
        if (found) setSelectedProp(found);
    }
  }, [initialPropertyId, loading, properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
        if (minBeds > 0 && prop.beds < minBeds) return false;
        if (minPrice > 0 && prop.priceValue < minPrice) return false;
        if (propertyType !== 'Tutti' && !prop.type.toLowerCase().includes(propertyType.toLowerCase())) return false;
        return true;
    });
  }, [properties, minBeds, minPrice, propertyType]);

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
      <SEO 
        title="Vendita Immobili di Lusso" 
        description="Esplora la nostra collezione esclusiva di ville, attici e stazzi in vendita nelle location più prestigiose della Sardegna."
      />
      
      <header className="relative pt-16 pb-12 md:pt-24 md:pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#A18058]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A18058] mb-4 md:mb-6">The Sales Collection • 2026</span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-[var(--text-primary)] tracking-tighter italic mb-6 md:mb-8">Proprietà <span className="not-italic text-[var(--text-tertiary)]">Distintive.</span></h1>
            <p className="text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl mx-auto mb-10 md:mb-12">Dal fronte mare assoluto di Porto Taverna alle ville di design integrate nelle rocce granitiche.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                <div className="bg-[var(--bg-tertiary)] p-1 rounded-full flex items-center gap-1 overflow-x-auto no-scrollbar border border-[var(--border-primary)]">
                    {['Tutti', 'Villa', 'Appartamento', 'Stazzo'].map(t => (
                      <button 
                        key={t} 
                        onClick={() => setPropertyType(t)} 
                        className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${propertyType === t ? 'bg-[#A18058] text-white shadow-sm' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
                      >
                        {t}
                      </button>
                    ))}
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)} 
                  className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${showFilters ? 'bg-[#1C1917] dark:bg-[#A18058] text-white border-[#1C1917] shadow-xl' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-[#A18058]'}`}
                >
                  <SlidersHorizontal size={14} /> {showFilters ? 'Chiudi Filtri' : 'Filtri'}
                </button>
            </div>
        </div>

        {showFilters && (
            <div className="mt-8 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[2.5rem] shadow-2xl p-6 md:p-10 max-w-4xl mx-auto animate-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                      <div className="flex justify-between mb-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Budget Minimo</label>
                        <span className="text-xs font-bold text-[var(--text-primary)]">{minPrice > 0 ? `€ ${(minPrice/1000000).toFixed(1)}M+` : 'Qualsiasi'}</span>
                      </div>
                      <input type="range" min="0" max="5000000" step="500000" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className="w-full h-1 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-[#A18058]"/>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">Camere da Letto</label>
                      <div className="flex gap-2">
                        {[0, 2, 3, 4, 5].map(num => (
                          <button 
                            key={num} 
                            onClick={() => setMinBeds(num)} 
                            className={`flex-1 h-12 rounded-xl flex items-center justify-center text-xs font-bold border transition-all ${minBeds === num ? 'bg-[#1C1917] dark:bg-[#A18058] text-white border-[#1C1917]' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-tertiary)] hover:border-[#A18058]'}`}
                          >
                            {num === 0 ? 'Tutte' : num === 5 ? '5+' : num}
                          </button>
                        ))}
                      </div>
                    </div>
                </div>
            </div>
        )}
      </header>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="w-12 h-12 text-[#A18058] animate-spin mb-6" />
              <p className="text-[var(--text-tertiary)] font-serif italic text-lg">Curando l'esposizione...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredProperties.map((prop) => (
                <div key={prop.id} className="group bg-[var(--bg-secondary)] rounded-[2rem] overflow-hidden border border-[var(--border-primary)] shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="h-64 md:h-80 relative overflow-hidden">
                    <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-[var(--bg-secondary)]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#A18058] shadow-lg">
                        {prop.tag || 'Luxury Estate'}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(prop); }}
                      className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isFavorite(prop.id) ? 'bg-red-500 text-white' : 'bg-black/20 text-white hover:bg-white hover:text-red-500'}`}
                    >
                      <Heart size={18} className={isFavorite(prop.id) ? 'fill-red-500' : ''} />
                    </button>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-serif text-[var(--text-primary)] mb-1">{prop.title}</h3>
                        <p className="text-[var(--text-tertiary)] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                          <MapPin size={12} className="text-[#A18058]"/> {prop.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 mb-8 border-t border-[var(--border-primary)] pt-6">
                      <div className="flex items-center gap-2">
                        <BedDouble size={16} className="text-[#A18058]"/>
                        <span className="text-xs font-bold text-[var(--text-secondary)]">{prop.beds} Camere</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath size={16} className="text-[#A18058]"/>
                        <span className="text-xs font-bold text-[var(--text-secondary)]">{prop.baths} Bagni</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase text-[var(--text-tertiary)] mb-0.5">Asking Price</p>
                        <p className="text-lg font-serif text-[var(--text-primary)]">{prop.price}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedProp(prop)}
                        className="w-12 h-12 bg-[#1C1917] dark:bg-[#A18058] text-white rounded-full flex items-center justify-center hover:bg-[#A18058] dark:hover:bg-white dark:hover:text-[#1C1917] transition-all group"
                      >
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredProperties.length === 0 && (
            <div className="py-32 text-center bg-[var(--bg-secondary)] rounded-[3rem] border border-dashed border-[var(--border-primary)]">
              <Info size={48} className="mx-auto text-[var(--border-primary)] mb-6" />
              <h3 className="text-2xl font-serif text-[var(--text-primary)] mb-2">Nessun Match Trovato</h3>
              <p className="text-[var(--text-tertiary)] max-w-sm mx-auto">Non abbiamo attualmente proprietà pubbliche che corrispondano a questi criteri.</p>
            </div>
          )}
        </div>
      </section>

      {/* Property Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex justify-end"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProp(null)}></div>
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full md:w-[600px] lg:w-[800px] bg-[var(--bg-primary)] h-full shadow-2xl overflow-y-auto no-scrollbar"
            >
              <div className="relative h-64 md:h-[400px]">
                <img src={selectedProp.image} alt={selectedProp.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedProp(null)}
                  className="absolute top-8 left-8 w-12 h-12 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center text-[var(--text-primary)] shadow-xl hover:bg-[#A18058] hover:text-white transition-all"
                >
                  <ArrowRight className="rotate-180" size={24} />
                </button>
              </div>
              <div className="p-8 md:p-12">
                <span className="text-[#A18058] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{selectedProp.tag}</span>
                <h2 className="text-4xl md:text-6xl font-serif text-[var(--text-primary)] mb-6 italic">{selectedProp.title}</h2>
                <p className="text-[var(--text-secondary)] font-light leading-relaxed text-lg mb-12 italic">"{selectedProp.description}"</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-[var(--border-primary)]">
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[var(--text-tertiary)] mb-2">Camere</p>
                    <p className="text-lg font-serif text-[var(--text-primary)]">{selectedProp.beds}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[var(--text-tertiary)] mb-2">Bagni</p>
                    <p className="text-lg font-serif text-[var(--text-primary)]">{selectedProp.baths}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[var(--text-tertiary)] mb-2">Superficie</p>
                    <p className="text-lg font-serif text-[var(--text-primary)]">{selectedProp.sqm}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[var(--text-tertiary)] mb-2">Prezzo</p>
                    <p className="text-lg font-serif text-[var(--text-primary)]">{selectedProp.price}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button onClick={() => navigate('/prenota')} className="w-full py-5 bg-[#1C1917] dark:bg-[#A18058] text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#A18058] dark:hover:bg-white dark:hover:text-[#1C1917] transition-all flex items-center justify-center gap-3 shadow-xl">
                    <CalendarCheck size={18} /> Richiedi Visita Privata
                  </button>
                  <button className="w-full py-5 border-2 border-[#1C1917] dark:border-[var(--border-primary)] text-[var(--text-primary)] rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#1C1917] dark:hover:bg-[#A18058] hover:text-white transition-all flex items-center justify-center gap-3">
                    Invia Manifestazione d'Interesse
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sales;
