
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MapPin, BedDouble, Bath, Maximize, ArrowRight, 
  ArrowLeft, Search, SlidersHorizontal, CheckCircle, 
  ArrowUpRight, Heart, Share2, Trees, ShieldCheck, Loader2, 
  CalendarCheck, Info, FileText, Download, Navigation, X, Sparkles,
  Shield
} from 'lucide-react';
import { fetchSalesFromSheet } from '../utils/googleSheets';
import { useFavorites } from '../context/FavoritesContext';

interface SalesProps {
  onClose: () => void;
  onOpenBooking?: () => void;
  onOpenValuation?: () => void;
  initialPropertyId?: number | null;
}

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
    description: "Esclusività assoluta per questa Villa Singola Fronte Mare con accesso diretto alla spiaggia (5mt). Situata di fronte all'isola di Tavolara, offre una vista mozzafiato e un grande giardino privato. Un'opportunità irripetibile per chi cerca il contatto diretto con il mare e la massima riservatezza.",
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
    description: "Nel prestigioso consorzio di Puntaldia, proponiamo elegante appartamento con terrazza panoramica sul campo da golf e sul mare. Finiture di pregio in teak e pietra sarda, sicurezza h24 e accesso al porto turistico privato.",
    features: ["Vicinanza Golf Club", "Sicurezza H24", "Porto Turistico", "Terrazza Panoramica", "Aree Verdi Curate", "Finiture d'Elite"]
  },
  {
    id: 3,
    title: "Lu Stazzu Contemporaneo",
    location: "San Teodoro / Lu Impostu",
    price: "In Valutazione",
    priceValue: 2200000,
    type: "Villa di Design",
    beds: 4,
    baths: 4,
    sqm: "220 mq",
    land: "1 Ha",
    image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2670&auto=format&fit=crop",
    tag: "Architettura D'Autore",
    description: "Splendida reinterpretazione dello 'Stazzo Gallurese' strutturata in due corpi indipendenti collegati da un patio centrale. Piscina a sfioro con acqua salata, palestra outdoor e un progetto che fonde perfettamente tradizione e modernità.",
    features: ["Design Pluripremiato", "Piscina Infinity", "Bioedilizia Avanzata", "Domotica", "Privacy Assoluta", "Viste Panoramiche"]
  },
  {
    id: 4,
    title: "Villa San Lorenzo",
    location: "Budoni / San Lorenzo",
    price: "€ 680.000",
    priceValue: 680000,
    type: "Villa Indipendente",
    beds: 3,
    baths: 2,
    sqm: "150 mq",
    land: "800 mq",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop",
    tag: "Autenticità Sarda",
    description: "Autentica villa indipendente immersa nella tranquillità delle colline, libera su 4 lati. Caratterizzata da rivestimenti in pietra locale e pavimenti in cotto artigianale. Un rifugio ideale per chi cerca l'anima della Gallura a pochi minuti dal mare.",
    features: ["Giardino Privato", "Doppia Veranda", "Pietra a Vista", "Nessuna Spesa Comune", "Climatizzazione", "Zona Barbecue"]
  }
];

export default function Sales({ onClose, onOpenBooking, onOpenValuation, initialPropertyId }: SalesProps) {
  const [selectedProp, setSelectedProp] = useState<any>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [properties, setProperties] = useState<any[]>(INITIAL_SALES_PROPERTIES);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [animatingHeart, setAnimatingHeart] = useState(false);

  const mainScrollRef = useRef<HTMLDivElement>(null);

  // Filter States
  const [minPrice, setMinPrice] = useState(0);
  const [minBeds, setMinBeds] = useState(0);
  const [propertyType, setPropertyType] = useState('Tutti');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const sheetData = await fetchSalesFromSheet();
      if (sheetData && sheetData.length > 0) {
        setProperties(sheetData);
      }
      setTimeout(() => setLoading(false), 800); 
    };
    loadData();
  }, []);

  useEffect(() => {
    if (initialPropertyId && !loading && properties.length > 0) {
        const found = properties.find(p => p.id === initialPropertyId);
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);
  };

  const handleFavoriteClick = (prop: any) => {
    setAnimatingHeart(true);
    toggleFavorite(prop);
    setTimeout(() => setAnimatingHeart(false), 600);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAF9] overflow-hidden flex flex-col animate-in fade-in duration-500">
      
      <div className="fixed top-20 left-0 h-1 bg-[#A18058] z-[1002] transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }}></div>

      <main ref={mainScrollRef} className="flex-1 overflow-y-auto pt-20 custom-scrollbar relative" onScroll={handleScroll}>
        <section className="relative pt-24 pb-20 px-8 max-w-7xl mx-auto overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#A18058]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A18058] mb-6 animate-in slide-in-from-bottom-2 duration-700">The Sales Collection • 2025</span>
                <h1 className="text-6xl md:text-8xl font-serif text-[#1C1917] tracking-tighter italic mb-8 animate-in slide-in-from-bottom-4 duration-700 delay-100">Proprietà <span className="not-italic text-stone-400">Distintive.</span></h1>
                <p className="text-lg text-stone-500 font-light leading-relaxed max-w-2xl mx-auto mb-12 animate-in slide-in-from-bottom-6 duration-700 delay-200">Dal fronte mare assoluto di Porto Taverna alle ville di design integrate nelle rocce granitiche. Curiamo solo immobili che possiedono un'anima e un valore d'asset certificato.</p>
                <div className="flex flex-wrap justify-center gap-3 animate-in fade-in duration-1000 delay-500">
                    <div className="glass-dark border border-white/10 p-1.5 rounded-full shadow-2xl flex items-center gap-1">
                        {['Tutti', 'Villa', 'Appartamento', 'Stazzo'].map(t => (<button key={t} onClick={() => setPropertyType(t)} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${propertyType === t ? 'bg-white text-[#1C1917]' : 'text-white/60 hover:text-white'}`}>{t}</button>))}
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${showFilters ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xl' : 'bg-white border-stone-200 text-stone-600 hover:border-[#1C1917] shadow-lg shadow-stone-200/50'}`}><SlidersHorizontal size={14} /> {showFilters ? 'Chiudi Filtri' : 'Parametri Avanzati'}</button>
                </div>
            </div>
            {showFilters && (
                <div className="mt-8 bg-white border border-stone-100 rounded-[2.5rem] shadow-2xl p-10 max-w-4xl mx-auto animate-in slide-in-from-top-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div><div className="flex justify-between mb-4"><label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Budget Minimo Richiesto</label><span className="text-xs font-bold text-[#1C1917]">{minPrice > 0 ? `€ ${(minPrice/1000000).toFixed(1)}M+` : 'Qualsiasi'}</span></div><input type="range" min="0" max="5000000" step="500000" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className="w-full h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-[#A18058]"/></div>
                        <div><label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Capacità (Camere da Letto)</label><div className="flex gap-2">{[0, 2, 3, 4, 5].map(num => (<button key={num} onClick={() => setMinBeds(num)} className={`flex-1 aspect-square md:aspect-auto md:h-12 rounded-xl flex items-center justify-center text-xs font-bold border transition-all ${minBeds === num ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'bg-white border-stone-100 text-stone-400 hover:border-[#A18058]'}`}>{num === 0 ? 'Tutte' : num === 5 ? '5+' : num}</button>))}</div></div>
                    </div>
                    <div className="flex justify-center mt-10 pt-8 border-t border-stone-50"><button onClick={() => { setMinPrice(0); setMinBeds(0); setPropertyType('Tutti'); }} className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300 hover:text-[#1C1917] transition-colors">Reset della ricerca</button></div>
                </div>
            )}
        </section>

        {loading && (<div className="flex flex-col items-center justify-center py-40"><div className="w-12 h-12 border-2 border-stone-200 border-t-[#A18058] rounded-full animate-spin mb-6"></div><p className="text-stone-400 font-serif italic text-lg">Curando l'esposizione...</p></div>)}

        <section className="pb-32 px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto space-y-12 md:space-y-0">
                {!loading && filteredProperties.map((prop, index) => (
                    <div key={prop.id} className={`group relative flex flex-col md:flex-row items-center min-h-[70vh] md:h-[80vh] overflow-hidden bg-white md:bg-transparent ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-full md:w-[55%] h-[50vh] md:h-full relative overflow-hidden shadow-2xl z-20"><img src={prop.image} alt={prop.title} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" /><div className="absolute inset-0 bg-[#1C1917]/5 transition-opacity group-hover:opacity-0"></div><div className="absolute top-8 left-8"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-sm shadow-xl border border-white/20"><p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#A18058] mb-0.5">Asset Code</p><p className="text-xs font-mono font-bold text-[#1C1917]">ST-{prop.id}00-25</p></div></div></div>
                        <div className={`w-full md:w-[45%] p-10 md:p-16 lg:p-24 bg-white relative z-30 transition-all duration-700 transform ${index % 2 === 1 ? 'md:-translate-x-12' : 'md:translate-x-12'} group-hover:translate-x-0 shadow-2xl md:rounded-[3rem]`}>
                            <div className="flex items-center gap-3 mb-6"><span className="w-8 h-px bg-[#A18058]"></span><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A18058]">{prop.tag || 'Luxury Estate'}</span></div>
                            <h2 className="text-4xl lg:text-6xl font-serif text-[#1C1917] mb-4 italic leading-none">{prop.title}</h2>
                            <p className="text-stone-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-8"><MapPin size={14} className="text-[#A18058]"/> {prop.location}</p>
                            <p className="text-stone-500 font-light leading-relaxed mb-10 text-base">{prop.description.length > 200 ? prop.description.substring(0, 180) + '...' : prop.description}</p>
                            <div className="grid grid-cols-2 gap-6 mb-12 border-t border-stone-50 pt-8"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-[#A18058]"><BedDouble size={18}/></div><div><p className="text-[9px] font-bold uppercase text-stone-400">Camere</p><p className="text-sm font-bold">{prop.beds}</p></div></div><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-[#A18058]"><Bath size={18}/></div><div><p className="text-[9px] font-bold uppercase text-stone-400">Bagni</p><p className="text-sm font-bold">{prop.baths}</p></div></div></div>
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-50"><div className="flex flex-col"><p className="text-[9px] font-bold uppercase text-stone-400 mb-1">Asking Price</p><p className="text-2xl font-serif text-[#1C1917]">{prop.price}</p></div><button onClick={() => setSelectedProp(prop)} className="btn-super-glow group relative bg-[#1C1917] text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl flex items-center gap-3">Dettagli Asset <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></button></div>
                        </div>
                    </div>
                ))}
                {!loading && filteredProperties.length === 0 && (<div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-stone-200"><Info size={48} className="mx-auto text-stone-200 mb-6" /><h3 className="text-2xl font-serif text-[#1C1917] mb-2">Nessun Match Trovato</h3><p className="text-stone-400 max-w-sm mx-auto">Non abbiamo attualmente proprietà pubbliche che corrispondano a questi criteri. Prova a contattarci per il portfolio off-market.</p><button onClick={() => setMinPrice(0)} className="mt-8 text-[#A18058] font-bold uppercase text-[10px] tracking-widest border-b border-[#A18058] pb-1">Reset Filtri</button></div>)}
            </div>
        </section>

        <section className="bg-[#1C1917] py-32 relative overflow-hidden"><div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div><div className="max-w-4xl mx-auto px-8 text-center relative z-10"><h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Accesso al <span className="italic text-[#A18058]">Secret Portfolio.</span></h2><p className="text-stone-400 text-lg font-light mb-12 leading-relaxed">Oltre il 40% delle nostre transazioni avviene fuori mercato. Se cerchi il massimo della discrezione e proprietà uniche, i nostri Private Bankers sono a tua disposizione.</p><button onClick={onOpenBooking} className="bg-white text-[#1C1917] px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#A18058] hover:text-white transition-all shadow-2xl active:scale-95">Richiedi Consulenza Privata</button></div></section>
      </main>

      {selectedProp && (
        <div className="fixed inset-0 z-[1100] flex justify-end">
            <div className="absolute inset-0 bg-[#1C1917]/80 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setSelectedProp(null)}></div>
            <div className="relative w-full md:w-[750px] bg-[#FAFAF9] h-full shadow-2xl animate-in slide-in-from-right duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col">
                <div className="relative h-[45vh] shrink-0 overflow-hidden">
                    <img src={selectedProp.image} className="w-full h-full object-cover" alt={selectedProp.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF9] via-transparent to-transparent"></div>
                    <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
                        <button onClick={() => setSelectedProp(null)} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1C1917] transition-all shadow-2xl"><ArrowLeft size={24} /></button>
                        <div className="flex gap-3">
                            {/* HEART BUTTON - ACTIVATED */}
                            <button 
                                onClick={() => handleFavoriteClick(selectedProp)} 
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all group/heart ${isFavorite(selectedProp.id) ? 'bg-white text-red-500 shadow-lg border border-red-100 active-heart-burst' : 'bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-red-500 hover:border-red-100'} ${animatingHeart ? 'animate-heart-pop' : ''}`}
                            >
                                <Heart 
                                    size={20} 
                                    className={`transition-colors duration-300 ${isFavorite(selectedProp.id) ? 'fill-red-500' : 'fill-none group-hover/heart:fill-red-500/20'}`} 
                                />
                            </button>
                            <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1C1917] transition-all"><Share2 size={20} /></button>
                        </div>
                    </div>
                    <div className="absolute bottom-10 left-10 right-10"><div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A18058] text-white text-[9px] font-bold uppercase tracking-widest rounded-sm mb-4"><Sparkles size={10} /> {selectedProp.tag || 'Luxury Asset'}</div><h2 className="text-5xl lg:text-6xl font-serif text-[#1C1917] mb-2 italic tracking-tight">{selectedProp.title}</h2><p className="flex items-center gap-2 text-stone-500 font-bold text-xs uppercase tracking-widest"><MapPin size={16} className="text-[#A18058]"/> {selectedProp.location}</p></div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:p-14"><div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 pb-12 border-b border-stone-200"><div className="flex-1"><h3 className="text-xl font-serif text-[#1C1917] mb-4">L'Essenza della Proprietà</h3><p className="text-stone-600 font-light leading-relaxed text-base italic">"{selectedProp.description}"</p></div><div className="w-full lg:w-48 space-y-6"><div className="text-center p-6 bg-white rounded-3xl shadow-sm border border-stone-100"><p className="text-[10px] font-bold text-stone-400 uppercase mb-1">Asking Price</p><p className="text-xl font-serif text-[#1C1917] font-bold">{selectedProp.price}</p></div><div className="text-center"><p className="text-[10px] font-bold text-stone-400 uppercase mb-4">Certificazioni</p><div className="flex justify-center gap-3"><div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100" title="Energy Class A+"><ShieldCheck size={18}/></div><div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100" title="Tech Checked"><CheckCircle size={18}/></div></div></div></div></div><div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"><div className="space-y-1"><p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Interni</p><div className="flex items-center gap-2 text-[#1C1917] font-bold"><BedDouble size={16} className="text-[#A18058]"/> {selectedProp.beds} Camere</div></div><div className="space-y-1"><p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Servizi</p><div className="flex items-center gap-2 text-[#1C1917] font-bold"><Bath size={16} className="text-[#A18058]"/> {selectedProp.baths} Bagni</div></div><div className="space-y-1"><p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Superficie</p><div className="flex items-center gap-2 text-[#1C1917] font-bold"><Maximize size={16} className="text-[#A18058]"/> {selectedProp.sqm}</div></div><div className="space-y-1"><p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Terreno</p><div className="flex items-center gap-2 text-[#1C1917] font-bold"><Trees size={16} className="text-[#A18058]"/> {selectedProp.land || '-'}</div></div></div><div className="mb-20"><h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#A18058] mb-8 flex items-center gap-3">Caratteristiche Tecniche <span className="flex-1 h-px bg-stone-100"></span></h4><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{selectedProp.features.map((feat: string, i: number) => (<div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-stone-100 group transition-all hover:border-[#A18058]/30 hover:shadow-md"><div className="w-2 h-2 rounded-full bg-[#A18058] group-hover:scale-150 transition-transform"></div><span className="text-sm font-medium text-stone-700">{feat}</span></div>))}</div></div><div className="bg-[#1C1917] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl"><div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div><div className="relative z-10 flex flex-col md:flex-row items-center gap-8"><div className="flex-1 text-center md:text-left"><h4 className="text-2xl font-serif italic mb-2">Documentazione Tecnica</h4><p className="text-stone-400 text-xs leading-relaxed max-w-xs">Planimetrie catastali, certificati di agibilità e analisi costi di manutenzione disponibili.</p></div><button className="px-8 py-4 bg-[#A18058] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#1C1917] transition-all flex items-center gap-3 shadow-lg"><Download size={16}/> Download Dossier PDF</button></div></div></div>
                <div className="p-8 bg-white border-t border-stone-100 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] z-[1101]"><div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4"><button onClick={onOpenBooking} className="flex-1 py-5 rounded-2xl border-2 border-[#1C1917] text-[#1C1917] font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#1C1917] hover:text-white transition-all flex items-center justify-center gap-3"><CalendarCheck size={18} /> Richiedi Visita Privata</button><button className="flex-1 py-5 rounded-2xl bg-[#1C1917] text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#A18058] transition-all shadow-xl flex items-center justify-center gap-3">Invia Manifestazione d'Interesse <ArrowRightIcon size={18} /></button></div><p className="text-center text-[9px] text-stone-400 uppercase tracking-widest mt-6 font-bold flex items-center justify-center gap-2"><Shield size={12} className="text-[#A18058]"/> Brokerage assistito da Andrea Tala • Senior Luxury Advisor</p></div>
            </div>
        </div>
      )}

    </div>
  );
}

const ArrowRightIcon = ArrowRight;
