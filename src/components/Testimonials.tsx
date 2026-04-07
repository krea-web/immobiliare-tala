
import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Giulia Romano",
    role: "Imprenditrice",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    quote: "La professionalità del team Tala è impareggiabile. Hanno trovato la villa dei nostri sogni con una discrezione assoluta.",
    rating: 5
  },
  {
    id: 2,
    name: "Luca Bianchi",
    role: "Architetto",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    quote: "L'attenzione ai dettagli costruttivi e la selezione di proprietà sono curate con un occhio esperto unico nel settore.",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Investitrice",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote: "Gestire un acquisto dall'estero può essere complesso, ma Tala ha reso tutto fluido. Un servizio davvero d'élite.",
    rating: 5
  },
  {
    id: 4,
    name: "James Calver",
    role: "Private Equity",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote: "Ho acquistato diverse proprietà in Europa, ma l'esperienza con Tala in Sardegna è stata superiore per efficienza e classe.",
    rating: 5
  },
  {
    id: 5,
    name: "Valentina Ricci",
    role: "Art Curator",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote: "Hanno capito che cercavo non solo una casa, ma una fonte di ispirazione. La vista dalla mia nuova terrazza è un'opera d'arte.",
    rating: 5
  },
  {
    id: 6,
    name: "Robert D.",
    role: "Global Investor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    quote: "Il ROI sugli investimenti proposti a Porto Cervo ha superato le aspettative. Partner affidabili per grandi capitali.",
    rating: 5
  }
];

// Split testimonials into two rows for the marquee
const firstRow = [...testimonials, ...testimonials];
const secondRow = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

// Fix: Explicitly type TestimonialCard as a React functional component to allow React's special 'key' prop.
const TestimonialCard: React.FC<{ item: typeof testimonials[0] }> = ({ item }) => (
  <div className="flex-none w-[350px] md:w-[450px] p-4 group">
    <div className="h-full bg-[var(--bg-secondary)] rounded-[2.5rem] p-8 border border-[var(--border-primary)] shadow-sm transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(161,128,88,0.12)] group-hover:border-[#A18058]/30 group-hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between">
      {/* Decorative Initial */}
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
        <span className="text-9xl font-serif leading-none select-none text-[var(--text-primary)]">{item.name.charAt(0)}</span>
      </div>

      <div className="relative z-10">
        <div className="flex gap-0.5 mb-6 text-[#A18058]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" className="animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
          ))}
        </div>
        
        <blockquote className="text-xl md:text-2xl font-serif italic text-[var(--text-primary)] leading-snug mb-8">
          "{item.quote}"
        </blockquote>
      </div>

      <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-[var(--border-primary)]">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--border-primary)] shadow-md">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-bold text-[11px] uppercase tracking-widest text-[var(--text-primary)]">{item.name}</p>
          <p className="text-[10px] text-[#A18058] font-medium tracking-wide">{item.role}</p>
        </div>
        <div className="ml-auto opacity-10 text-[var(--text-primary)]">
          <Quote size={24} />
        </div>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-[var(--bg-primary)] overflow-hidden relative transition-colors duration-500">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A18058] rounded-full blur-[200px] opacity-[0.04] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <span className="text-[#A18058] font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Voci dall'Elite</span>
        <h2 className="text-4xl md:text-6xl font-serif text-[var(--text-primary)] leading-tight">
          L'eccellenza è <br />
          <span className="italic text-[var(--text-secondary)]">un'abitudine.</span>
        </h2>
      </div>

      <div className="marquee-container space-y-8 relative z-10">
        {/* Track 1: Left moving */}
        <div className="flex overflow-hidden group/row">
          <div className="flex animate-marquee-left whitespace-nowrap group-hover/row:[&>div]:opacity-50 group-hover/row:[&>div:hover]:opacity-100 [&>div]:transition-opacity">
            {firstRow.map((t, idx) => (
              <TestimonialCard key={`r1-${idx}`} item={t} />
            ))}
          </div>
        </div>

        {/* Track 2: Right moving */}
        <div className="flex overflow-hidden group/row">
          <div className="flex animate-marquee-right whitespace-nowrap group-hover/row:[&>div]:opacity-50 group-hover/row:[&>div:hover]:opacity-100 [&>div]:transition-opacity">
            {secondRow.map((t, idx) => (
              <TestimonialCard key={`r2-${idx}`} item={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Subtle Tag */}
      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm text-[var(--text-tertiary)] text-[10px] font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Oltre 500 clienti soddisfatti nel 2024
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
