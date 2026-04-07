import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

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

const Hero: React.FC<HeroProps> = ({ onOpenValuation, onOpenSales }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#0C0A09]">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={HERO_SLIDES[currentSlide].image} 
            alt={HERO_SLIDES[currentSlide].alt} 
            className="w-full h-full object-cover" 
            style={{ objectPosition: HERO_SLIDES[currentSlide].position }} 
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-transparent to-black/30"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="mb-8 md:mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif leading-[0.9] text-white tracking-tighter italic"
            >
                <span className="inline-block">Immobiliare</span> <br />
                <span className="inline-block not-italic text-[#A18058]">Tala.</span>
            </motion.h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-white/70 text-base md:text-xl lg:text-2xl font-light mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed px-4"
        >
            Oltre l'orizzonte del lusso, dove il granito incontra il design contemporaneo.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 w-full sm:w-auto"
        >
          <button 
            onClick={onOpenSales}
            className="w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-primary)] px-10 md:px-14 py-5 md:py-6 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-[#A18058] hover:text-white transition-all duration-500"
          >
            Esplora Portfolio
          </button>

          <button 
            onClick={onOpenValuation}
            className="w-full sm:w-auto px-10 md:px-14 py-5 md:py-6 rounded-full border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all backdrop-blur-md"
          >
            Valuta il tuo Asset
          </button>
        </motion.div>
      </div>
    </header>
  );
}

export default Hero;
