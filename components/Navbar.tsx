
import React, { useState, useEffect, useRef } from 'react';
import { User, ArrowRight, Menu, X, Globe, Phone, ChevronDown, MapPin, Calendar, MessageCircle, Star, Coins, Mail } from 'lucide-react';

type ViewState = 'home' | 'sales' | 'rentals' | 'valuation' | 'booking' | 'about' | 'reserved';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenContacts: () => void;
}

const menuItems: { label: string; view: ViewState }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Vendite', view: 'sales' },
  { label: 'Affitto', view: 'rentals' },
  { label: 'Valutazione', view: 'valuation' },
  { label: 'Chi Siamo', view: 'about' },
];

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenContacts }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);

  const activeIndex = menuItems.findIndex(item => item.view === currentView);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : null);
    if (targetIndex !== null && navRef.current) {
      const navLinks = navRef.current.querySelectorAll('.nav-item');
      const target = navLinks[targetIndex] as HTMLElement;
      if (target) {
        setPillStyle({
          width: `${target.offsetWidth}px`,
          transform: `translateX(${target.offsetLeft}px)`,
          opacity: 1,
        });
      }
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredIndex, activeIndex]);

  const showBackground = scrolled || currentView !== 'home';

  const handleMobileNav = (view: ViewState) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const handleMobileContacts = () => {
    onOpenContacts();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[1001] transition-all duration-500 ease-out ${showBackground ? 'glass border-b border-stone-200/50 dark:border-white/10 py-0' : 'bg-transparent py-2'}`}>
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2 group relative shrink-0 transition-transform hover:scale-105">
                <div className="w-9 h-9 bg-[#1C1917] dark:bg-[#A18058] text-white flex items-center justify-center rounded-sm shadow-lg transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(161,128,88,0.4)]">
                    <span className="font-serif italic text-lg pr-0.5">T</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400 font-medium leading-none mb-0.5">Immobiliare</span>
                    <span className="font-serif text-xl leading-none text-stone-900 dark:text-white tracking-tight">Tala</span>
                </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden xl:flex items-center absolute left-1/2 -translate-x-1/2 transition-all duration-500`}>
            <div className="bg-stone-100/80 dark:bg-white/5 p-1.5 rounded-full border border-stone-200/60 dark:border-white/10 backdrop-blur-md relative shadow-inner flex" ref={navRef} onMouseLeave={() => setHoveredIndex(null)}>
              <div className="absolute top-1.5 bottom-1.5 bg-white dark:bg-[#1C1917] shadow-xl border border-stone-100 dark:border-white/5 rounded-full transition-all duration-500" style={{ left: 0, ...pillStyle }} />
              {menuItems.map((item, index) => (
                <a key={index} href="#" onClick={(e) => { e.preventDefault(); onNavigate(item.view); }} className={`nav-item relative z-10 px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap ${ (hoveredIndex === index || activeIndex === index) ? 'text-stone-900 dark:text-white' : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white' }`} onMouseEnter={() => setHoveredIndex(index)} >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => onNavigate('reserved')} className="hidden md:flex items-center gap-2 px-3 md:px-5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm text-[10px] font-bold uppercase tracking-widest text-[#1C1917] dark:text-white hover:bg-[#1C1917] dark:hover:bg-[#A18058] hover:text-white transition-all">
              <User size={15} />
              <span className="hidden md:inline">Area Riservata</span>
            </button>
            
            {/* BOTTONE CONTATTI DESKTOP */}
            <button onClick={onOpenContacts} className="btn-super-glow relative hidden md:flex items-center gap-2 rounded-full bg-[#1C1917] dark:bg-[#A18058] px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[#FAFAF9] shadow-lg overflow-hidden">
                <div className="btn-inner-bg"></div>
                <span className="relative z-10 flex items-center gap-2">Contattaci <ArrowRight size={13} /></span>
            </button>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`xl:hidden w-12 h-12 flex items-center justify-center rounded-full transition-all z-[1003] ${isMobileMenuOpen ? 'bg-white text-stone-900' : 'bg-stone-900 dark:bg-[#A18058] text-white shadow-lg'}`}
              aria-label="Toggle Menu"
            >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[1002] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] xl:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-full'}`}>
          <div className="absolute inset-0 bg-[#0C0A09]/95 backdrop-blur-2xl"></div>
          
          <div className="relative h-full flex flex-col p-8 pt-24 overflow-y-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-serif text-[40rem] pointer-events-none select-none">T</div>
              
              <div className="space-y-2 mb-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A18058] mb-4">Navigazione</p>
                  {menuItems.map((item, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleMobileNav(item.view)}
                        className={`w-full text-left py-4 text-4xl md:text-5xl font-serif italic transition-all duration-300 ${currentView === item.view ? 'text-white pl-4 border-l-2 border-[#A18058]' : 'text-stone-500 hover:text-white'}`}
                      >
                        {item.label}
                      </button>
                  ))}
              </div>

              <div className="mt-auto space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                      <button 
                        onClick={() => handleMobileNav('reserved')}
                        className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                      >
                        <User size={18} /> Area Riservata
                      </button>
                      
                      <button 
                        onClick={handleMobileContacts}
                        className="btn-super-glow relative w-full py-5 rounded-2xl bg-white dark:bg-[#A18058] text-[#1C1917] flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest overflow-hidden"
                      >
                        <div className="btn-inner-bg bg-white dark:bg-[#A18058]"></div>
                        <span className="relative z-10 flex items-center gap-2">Contattaci <ArrowRight size={18} /></span>
                      </button>
                  </div>

                  <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                      <div className="flex items-center gap-4 text-stone-400">
                          <Phone size={16} className="text-[#A18058]" />
                          <span className="text-sm font-medium">+39 0789 123456</span>
                      </div>
                      <div className="flex items-center gap-4 text-stone-400">
                          <Mail size={16} className="text-[#A18058]" />
                          <span className="text-sm font-medium">info@immobiliaretala.it</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;
