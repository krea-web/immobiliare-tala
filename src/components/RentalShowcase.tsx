import React from 'react';
import { ArrowRight, Users, BedDouble, Bath, Star, Calendar } from 'lucide-react';

interface RentalShowcaseProps {
  onOpenRentals: (id?: number) => void;
  onOpenBooking: () => void;
}

const RENTAL_HIGHLIGHTS = [
  {
    id: 1,
    title: "Villa Sabina",
    location: "San Teodoro / Giardini d'Aldia",
    price: "€ 850",
    period: "/notte",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
    sleeps: 9,
    beds: 4,
    rating: 5.0,
    tag: "Top Selection"
  },
  {
    id: 2,
    title: "Lu Stazzu",
    location: "Lu Impostu",
    price: "€ 600",
    period: "/notte",
    image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2670&auto=format&fit=crop",
    sleeps: 4,
    beds: 2,
    rating: 4.9,
    tag: "Autentico"
  },
  {
    id: 3,
    title: "Villa Chira",
    location: "Porto San Paolo",
    price: "€ 1.200",
    period: "/notte",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2670&auto=format&fit=crop",
    sleeps: 10,
    beds: 5,
    rating: 5.0,
    tag: "Fronte Mare"
  }
];

const RentalShowcase: React.FC<RentalShowcaseProps> = ({ onOpenRentals, onOpenBooking }) => {
  return (
    <section className="py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden transition-colors duration-500">
      {/* Decorative Background Elements (Light Mode) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A18058] rounded-full blur-[150px] opacity-[0.05] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#A18058] rounded-full blur-[150px] opacity-[0.03] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#A18058] font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block flex items-center gap-2">
               <span className="w-8 h-[1px] bg-[#A18058]"></span>
               Soggiorni Esclusivi
            </span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[var(--text-primary)]">
              Collezione <span className="italic text-[#A18058]">Affitti.</span>
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] font-light max-w-md text-sm leading-relaxed">
              Vivi la Sardegna più autentica con la nostra selezione di ville di lusso disponibili per affitti brevi e stagionali.
            </p>
          </div>
          
          <button 
            onClick={() => onOpenRentals()}
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all text-xs font-bold uppercase tracking-widest"
          >
            Vedi tutte le disponibilità
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RENTAL_HIGHLIGHTS.map((prop) => (
            <div 
              key={prop.id}
              onClick={() => onOpenRentals(prop.id)} // Opens the main rental overlay with ID
              className="group cursor-pointer relative bg-[var(--bg-secondary)] rounded-[2rem] overflow-hidden border border-[var(--border-primary)] transition-all duration-500 hover:shadow-2xl hover:shadow-[#A18058]/10 hover:border-[#A18058]/30 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden bg-[var(--bg-tertiary)]">
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[var(--bg-secondary)]/90 backdrop-blur-md text-[var(--text-primary)] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
                    {prop.tag}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-[var(--bg-secondary)]/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm">
                    <Star size={10} className="text-[#A18058] fill-[#A18058]" />
                    <span className="text-[10px] font-bold text-[var(--text-primary)]">{prop.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                {/* Floating Price Pill */}
                <div className="absolute -top-6 right-6 bg-[#1C1917] dark:bg-[#A18058] text-white px-4 py-2 rounded-full shadow-lg text-xs font-serif z-10 group-hover:scale-110 transition-all">
                  <span className="font-bold">{prop.price}</span> <span className="text-white/80 font-sans text-[10px]">{prop.period}</span>
                </div>

                <h3 className="text-2xl font-serif mb-1 text-[var(--text-primary)] group-hover:text-[#A18058] transition-colors">{prop.title}</h3>
                <p className="text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider mb-6 flex items-center gap-1">
                   {prop.location}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-[var(--border-primary)]">
                    <div className="flex gap-4 text-[var(--text-secondary)] text-xs font-medium">
                        <span className="flex items-center gap-1.5"><Users size={14} className="text-[#A18058]" /> {prop.sleeps} Ospiti</span>
                        <span className="flex items-center gap-1.5"><BedDouble size={14} className="text-[#A18058]" /> {prop.beds} Camere</span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-all">
                        <ArrowRight size={14} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button (visible only on small screens) */}
        <div className="mt-8 md:hidden flex justify-center">
            <button 
                onClick={() => onOpenRentals()}
                className="btn-super-glow bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg"
            >
                Esplora Affitti
            </button>
        </div>

      </div>
    </section>
  );
};

export default RentalShowcase;