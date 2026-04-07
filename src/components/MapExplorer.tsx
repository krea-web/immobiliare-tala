
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Compass, Plus, Minus, X, Bath, BedDouble, Maximize, Heart, ArrowRight, Check } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

// Declare Leaflet global
declare const L: any;

const properties = [
  {
    id: 2,
    title: "Villa Chira",
    location: "Porto San Paolo",
    price: "€ 2.850.000",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop",
    beds: 5,
    baths: 5,
    sqm: "280 mq",
    rating: "5.0",
    description: "Esclusività assoluta fronte mare. Situata proprio di fronte all'isola di Tavolara, questa proprietà offre accesso diretto alla spiaggia (5mt) e un parco privato di macchia mediterranea.",
    features: ["Fronte Mare (5m)", "Vista Tavolara", "Accesso Spiaggia", "Privacy"],
    lat: 40.8756,
    lng: 9.6465
  },
  {
    id: 3,
    title: "Lu Stazzu",
    location: "Lu Impostu / S. Teodoro",
    price: "In Valutazione",
    image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=1000&auto=format&fit=crop",
    beds: 3,
    baths: 3,
    sqm: "180 mq",
    rating: "4.9",
    description: "Splendida reinterpretazione dello 'Stazzo Gallurese' in chiave contemporanea. Piscina a sfioro, palestra outdoor e un design che dialoga perfettamente con la natura circostante.",
    features: ["Design Architettonico", "Piscina Infinity", "Palestra", "Bioedilizia"],
    lat: 40.8359,
    lng: 9.6732
  },
  {
    id: 4,
    title: "Villa San Lorenzo",
    location: "Budoni",
    price: "€ 680.000",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop",
    beds: 3,
    baths: 2,
    sqm: "150 mq",
    rating: "4.7",
    description: "Autentica villa indipendente immersa nella tranquillità delle colline di Budoni, a pochi minuti dal mare. Ideale per chi cerca relax e autenticità sarda.",
    features: ["Ampio Giardino", "Vista Colline", "Veranda", "Zona BBQ"],
    lat: 40.7061,
    lng: 9.6845
  },
  {
    id: 5,
    title: "Residenza Puntaldia",
    location: "Puntaldia",
    price: "€ 1.200.000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    beds: 4,
    baths: 3,
    sqm: "200 mq",
    rating: "4.8",
    description: "Nel prestigioso consorzio di Puntaldia, appartamento con terrazza panoramica sul campo da golf e sul mare. Servizi di portineria e sicurezza h24.",
    features: ["Golf Front", "Sicurezza H24", "Porto Turistico", "Terrazza"],
    lat: 40.8158,
    lng: 9.6976
  },
  {
    id: 6,
    title: "Villa Sabina",
    location: "San Teodoro / I Giardini d'Aldia",
    price: "Affitto Esclusivo",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000&auto=format&fit=crop",
    beds: 4,
    baths: 5,
    sqm: "320 mq",
    rating: "5.0",
    description: "Villa moderna su due livelli con privacy totale situata nel prestigioso comprensorio de I Giardini d'Aldia. Vicinissima alla spiaggia di Lu Impostu, offre design contemporaneo e comfort di lusso.",
    features: ["Piscina Privata", "Palestra", "Domotica", "Vicinanza Spiaggia"],
    lat: 40.8250,
    lng: 9.6800
  },
  {
    id: 7,
    title: "Domus Martina",
    location: "San Teodoro / Le Farfalle",
    price: "Affitto Stagionale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    beds: 2,
    baths: 2,
    sqm: "110 mq",
    rating: "4.6",
    description: "Deliziosa villa bifamiliare con vista sulla baia di Cala Suaraccia. Immersa nel verde, offre accesso a campi da tennis e piscina condominiale. Ideale per famiglie.",
    features: ["Vista Baia", "Piscina Condominiale", "Tennis", "Veranda"],
    lat: 40.8400,
    lng: 9.6900
  }
];

interface MapExplorerProps {
    onOpenBooking?: () => void;
}

const MapExplorer: React.FC<MapExplorerProps> = ({ onOpenBooking }) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProp, setSelectedProp] = useState<typeof properties[0] | null>(null);
  const [animatingHeart, setAnimatingHeart] = useState(false);
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ [key: number]: any }>({});
  
  const { toggleFavorite, isFavorite } = useFavorites();

  const handlePinClick = (prop: typeof properties[0]) => {
    setActiveId(prop.id);
    setSelectedProp(prop);
    setShowDetail(true);

    if (mapRef.current) {
        mapRef.current.flyTo([prop.lat, prop.lng], 15, {
            duration: 1.5,
            paddingTopLeft: [0, 0] 
        });
    }
  };

  const handleFavoriteClick = (prop: any) => {
    setAnimatingHeart(true);
    toggleFavorite({ ...prop, status: 'Salvataggio' });
    setTimeout(() => setAnimatingHeart(false), 600);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setTimeout(() => {
        setSelectedProp(null);
        setActiveId(null);
        if (mapRef.current) {
             mapRef.current.flyTo([40.82, 9.68], 11.5, { duration: 1.5 });
        }
    }, 300);
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    if (typeof L !== 'undefined') {
        const map = L.map(mapContainerRef.current, {
            center: [40.82, 9.68],
            zoom: 11.5,
            zoomControl: false,
            scrollWheelZoom: false,
            dragging: true
        });

        // Use dark tiles if theme is dark
        const tileUrl = theme === 'dark' 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

        L.tileLayer(tileUrl, {
            attribution: theme === 'dark' ? '&copy; OpenStreetMap &copy; CARTO' : 'Tiles &copy; Esri',
            maxZoom: 19
        }).addTo(map);

        mapRef.current = map;

        const createCustomIcon = (prop: typeof properties[0]) => {
             return L.divIcon({
                 className: 'bg-transparent border-none',
                 html: `
                    <div class="relative flex items-center justify-center w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform duration-300 hover:scale-110">
                        <span class="absolute inset-0 rounded-full bg-white animate-ping opacity-40"></span>
                        <span class="absolute inset-[-4px] rounded-full bg-[#A18058] opacity-20 group-hover:opacity-40 transition-opacity"></span>
                        <div class="relative flex items-center justify-center w-9 h-9 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md border-2 border-white transition-all duration-300 bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[#A18058] hover:border-white">
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        </div>
                    </div>
                 `,
                 iconSize: [40, 40],
                 iconAnchor: [20, 20]
             });
        };

        properties.forEach(prop => {
            const marker = L.marker([prop.lat, prop.lng], { icon: createCustomIcon(prop) }).addTo(map);
            marker.bindTooltip(`<div class="text-center"><div class="font-bold text-[10px] uppercase tracking-widest text-[#1C1917] mb-0.5">${prop.title}</div><div class="font-serif text-[9px] text-stone-500">${prop.price}</div></div>`, { permanent: false, direction: 'top', offset: [0, -20], opacity: 1, className: 'custom-leaflet-tooltip' });
            marker.on('click', () => handlePinClick(prop));
            marker.on('mouseover', function(this: any) { this.setZIndexOffset(1000); });
            marker.on('mouseout', function(this: any) { if (activeId !== prop.id) this.setZIndexOffset(0); });
            markersRef.current[prop.id] = marker;
        });
    }
  }, []);

  useEffect(() => {
      if (!mapRef.current) return;
      properties.forEach(prop => {
          const marker = markersRef.current[prop.id];
          if (marker) {
              const el = marker.getElement();
              if(el) {
                  const inner = el.querySelector('.w-9');
                  if(inner) {
                      if (prop.id === activeId) {
                          marker.setZIndexOffset(2000);
                          inner.classList.add('bg-[#A18058]', 'scale-125', 'ring-4', 'ring-[#A18058]/40');
                          inner.classList.remove('bg-[#1C1917]');
                      } else {
                          marker.setZIndexOffset(0);
                          inner.classList.remove('bg-[#A18058]', 'scale-125', 'ring-4', 'ring-[#A18058]/40');
                          inner.classList.add('bg-[#1C1917]');
                      }
                  }
              }
          }
      });
  }, [activeId]);

  return (
    <section id="map-explorer" className="py-24 bg-[var(--bg-primary)] relative scroll-mt-20 transition-colors duration-500">
      <style>{`
        .custom-leaflet-tooltip { 
          background: var(--bg-secondary); 
          border: 1px solid var(--border-primary); 
          border-radius: 12px; 
          padding: 8px 12px; 
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); 
          font-family: 'Inter', sans-serif; 
          color: var(--text-primary);
        } 
        .custom-leaflet-tooltip:before { border-top-color: var(--bg-secondary); } 
        .leaflet-container { background: #000 !important; }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-[#A18058] font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block flex items-center gap-2">
              <span className="w-10 h-[1px] bg-[#A18058]"></span>
              Visuale Satellitare
            </span>
            <h2 className="text-4xl md:text-6xl text-[var(--text-primary)] font-serif leading-tight">
              I colori <span className="italic text-[var(--text-tertiary)]">della costa.</span>
            </h2>
          </div>
          <p className="max-w-md text-[var(--text-secondary)] font-light text-sm mt-6 md:mt-0 leading-relaxed text-right">
            Osserva la Sardegna come non l'hai mai vista. <br/>
            Dalle acque cristalline di <strong>Cala Brandinchi</strong> ai promontori di <strong>Porto Cervo</strong>.
          </p>
        </div>

        <div className="relative h-[85vh] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-[var(--border-primary)] bg-black group">
          <div ref={mapContainerRef} className="absolute inset-0 z-0 w-full h-full" id="map-leaflet"></div>
          <div className="absolute inset-0 bg-black/5 pointer-events-none z-[1]"></div>
          
          <div className="absolute right-6 top-6 flex flex-col gap-2 z-10">
             <div onClick={() => mapRef.current?.flyTo([40.82, 9.68], 11.5)} className="w-10 h-10 bg-[var(--bg-secondary)] backdrop-blur rounded-xl shadow-lg flex items-center justify-center text-[var(--text-primary)] hover:bg-[#A18058] hover:text-white cursor-pointer transition-all"><Compass size={20} strokeWidth={1.5} /></div>
             <div className="h-4"></div>
             <div onClick={() => mapRef.current?.zoomIn()} className="w-10 h-10 bg-[var(--bg-secondary)] backdrop-blur rounded-t-xl border-b border-[var(--border-primary)] shadow-lg flex items-center justify-center text-[var(--text-primary)] hover:bg-[#A18058] hover:text-white cursor-pointer transition-all"><Plus size={20} /></div>
             <div onClick={() => mapRef.current?.zoomOut()} className="w-10 h-10 bg-[var(--bg-secondary)] backdrop-blur rounded-b-xl shadow-lg flex items-center justify-center text-[var(--text-primary)] hover:bg-[#A18058] hover:text-white cursor-pointer transition-all"><Minus size={20} /></div>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex gap-4 overflow-x-auto pb-8 custom-scrollbar snap-x">
               {properties.map((prop) => (
                   <div 
                    key={prop.id} 
                    onClick={() => handlePinClick(prop)} 
                    className={`snap-center shrink-0 w-[280px] md:w-[320px] bg-[var(--bg-secondary)] backdrop-blur-xl rounded-[2rem] p-3 border transition-all duration-300 cursor-pointer hover:shadow-2xl shadow-lg ${activeId === prop.id ? 'border-[#A18058] ring-1 ring-[#A18058]/20' : 'border-[var(--border-primary)] hover:border-stone-400'}`}
                   >
                      <div className="flex gap-4">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative">
                            <img src={prop.image} className="w-full h-full object-cover" alt={prop.title} />
                            <div className="absolute top-1 left-1 bg-black/50 backdrop-blur text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">{prop.rating} ★</div>
                          </div>
                          <div className="flex flex-col justify-center flex-1 min-w-0">
                              <h3 className="font-serif text-lg text-[var(--text-primary)] truncate pr-2">{prop.title}</h3>
                              <p className="text-[10px] text-[var(--text-secondary)] font-medium uppercase tracking-wide truncate mb-2">{prop.location}</p>
                              <div className="flex items-center gap-3 text-[var(--text-tertiary)] text-[10px] font-bold">
                                <span className="flex items-center gap-1"><BedDouble size={12} /> {prop.beds}</span>
                                <span className="w-px h-3 bg-[var(--border-primary)]"></span>
                                <span className="flex items-center gap-1"><Maximize size={12} /> {prop.sqm}</span>
                              </div>
                              <div className="mt-2 pt-2 border-t border-[var(--border-primary)] flex justify-between items-center">
                                <span className="text-xs font-serif text-[var(--text-primary)]">{prop.price}</span>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${activeId === prop.id ? 'bg-[#A18058] text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'}`}>
                                  <ArrowRight size={14} />
                                </div>
                              </div>
                          </div>
                      </div>
                   </div>
               ))}
          </div>
        </div>
      </div>

      {selectedProp && (
        <div className={`fixed inset-0 z-[60] flex justify-end transition-opacity duration-500 ${showDetail ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeDetail}></div>
             <div className={`relative w-full md:w-[600px] h-full bg-[var(--bg-secondary)] shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${showDetail ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={closeDetail} className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center text-white hover:text-[#1C1917] transition-all duration-300"><X size={20} /></button>
                <div className="h-[40%] relative shrink-0"><img src={selectedProp.image} alt={selectedProp.title} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div><div className="absolute bottom-0 left-0 p-8 text-white"><div className="inline-block px-3 py-1 bg-[#A18058] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm mb-3">{selectedProp.price.includes('Affitto') ? 'Affitto' : 'In Vendita'}</div><h2 className="text-4xl font-serif mb-2">{selectedProp.title}</h2><p className="text-white/80 flex items-center gap-2 text-sm font-medium"><MapPin size={16} /> {selectedProp.location}</p></div></div>
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="flex items-center justify-between mb-8 border-b border-[var(--border-primary)] pb-8"><div><p className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-1">Prezzo</p><p className="text-2xl font-serif text-[var(--text-primary)]">{selectedProp.price}</p></div><div className="flex gap-6"><div className="text-center"><p className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-1">Camere</p><div className="flex items-center gap-1 justify-center text-[var(--text-primary)] font-medium"><BedDouble size={16}/> {selectedProp.beds}</div></div><div className="text-center"><p className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-1">Bagni</p><div className="flex items-center gap-1 justify-center text-[var(--text-primary)] font-medium"><Bath size={16}/> {selectedProp.baths}</div></div><div className="text-center"><p className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-1">Superficie</p><div className="flex items-center gap-1 justify-center text-[var(--text-primary)] font-medium"><Maximize size={16}/> {selectedProp.sqm}</div></div></div></div>
                    <div className="mb-8"><h3 className="text-lg font-serif text-[var(--text-primary)] mb-4">Descrizione</h3><p className="text-[var(--text-secondary)] font-light leading-relaxed text-sm">{selectedProp.description}</p></div>
                    <div className="mb-8"><h3 className="text-lg font-serif text-[var(--text-primary)] mb-4">Caratteristiche</h3><div className="grid grid-cols-2 gap-3">{selectedProp.features.map((feat, idx) => (<div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-medium"><Check size={14} className="text-[#A18058]" /> {feat}</div>))}</div></div>
                </div>
                <div className="p-6 border-t border-[var(--border-primary)] bg-[var(--bg-tertiary)] shrink-0 flex gap-4">
                    {/* HEART BUTTON - ACTIVATED */}
                    <button 
                        onClick={() => handleFavoriteClick(selectedProp)} 
                        className={`flex-1 border text-[var(--text-primary)] py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/heart ${isFavorite(selectedProp.id) ? 'bg-[var(--bg-secondary)] border-red-200 text-red-500 active-heart-burst' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-red-400 hover:text-red-500'} ${animatingHeart ? 'animate-heart-pop' : ''}`}
                    >
                        <Heart 
                            size={16} 
                            className={`transition-colors duration-300 ${isFavorite(selectedProp.id) ? 'fill-red-500' : 'fill-none group-hover/heart:fill-red-500/20'}`} 
                        /> 
                        {isFavorite(selectedProp.id) ? "Salvato" : "Salva"}
                    </button>
                    <button onClick={onOpenBooking} className="flex-[2] bg-stone-900 dark:bg-[#A18058] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#A18058] dark:hover:bg-white dark:hover:text-[#1C1917] transition-colors shadow-lg flex items-center justify-center gap-2">Prenota Visita <ArrowRight size={16} /></button>
                </div>
             </div>
        </div>
      )}
    </section>
  );
};

export default MapExplorer;
