
import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Sparkles, MapPin, ShieldCheck, TrendingUp } from 'lucide-react';

interface HeroProps {
  onOpenValuation?: () => void;
  onOpenSales?: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1626011319760-4497e68846c2?q=80&w=2574&auto=format&fit=crop",
    alt: "Vista Tavolara",
    position: "center"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2574&auto=format&fit=crop",
    alt: "Esterno Villa Lusso",
    position: "bottom"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop",
    alt: "Interni Design",
    position: "center"
  }
];

export default function Hero({ onOpenValuation, onOpenSales }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 10000);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5);
      const y = (e.clientY / innerHeight - 0.5);
      setRotate({ x: y * -15, y: x * 15 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <header id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0C0A09] perspective-3d">
      
      {HERO_SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 z-0 transition-all duration-[3000ms] ${index === currentSlide ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-sm'}`}
        >
          <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover animate-hero-bg" style={{ objectPosition: slide.position }} />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-transparent to-black/30"></div>
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center preserve-3d transition-transform duration-300 ease-out" style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}>
        <div className="animate-cinema flex items-center gap-3 px-6 py-2.5 rounded-full glass-dark border border-white/20 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="w-2 h-2 rounded-full bg-[#A18058] animate-pulse"></div>
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/90">Real Estate d'Élite</span>
        </div>
        
        <div className="mb-10">
            <h1 className="text-7xl md:text-[9rem] lg:text-[11rem] font-serif leading-[0.8] text-white tracking-tighter italic">
                <span className="inline-block animate-cinema [animation-delay:200ms] opacity-0">Immobiliare</span> <br />
                <span className="inline-block animate-cinema [animation-delay:450ms] opacity-0 not-italic text-[#A18058]">Tala.</span>
            </h1>
        </div>
        
        <p className="animate-cinema [animation-delay:700ms] opacity-0 text-white/60 text-lg md:text-2xl font-light mb-16 max-w-2xl mx-auto leading-relaxed">
            Oltre l'orizzonte del lusso, dove il granito incontra il design.
        </p>

        <div className="animate-cinema [animation-delay:900ms] opacity-0 flex flex-col sm:flex-row items-center justify-center gap-8">
          {/* BOTTONE PRINCIPALE CON RAGGI */}
          <button 
            onClick={onOpenSales}
            className="btn-super-glow btn-ray-effect group relative bg-white text-[#1C1917] px-14 py-6 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl transition-all"
          >
            <div className="btn-inner-bg bg-white"></div>
            <span>Esplora il Portfolio</span>
          </button>

          <button 
            onClick={onOpenValuation}
            className="btn-super-glow group px-14 py-6 rounded-full border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1917] transition-all backdrop-blur-md overflow-hidden"
          >
            <div className="btn-inner-bg"></div>
            <span className="relative z-10">Valuta il tuo Asset</span>
          </button>
        </div>
      </div>
    </header>
  );
}
