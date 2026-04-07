import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ArrowRight, Menu, X, Phone, Mail, ChevronDown, Sparkles, Home, Building, Key, Calculator, Calendar, Info, Users, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme } = useTheme();
  
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isReservedArea = location.pathname === '/area-riservata';
  const isDarkPage = !isReservedArea && (location.pathname === '/' || location.pathname === '/chi-siamo' || location.pathname === '/valuta-il-tuo-immobile');
  const showGlass = scrolled || !isDarkPage || isReservedArea;
  
  // Navbar text color logic
  const textColorClass = 'text-[var(--text-primary)]';

  const NavLinkContent = ({ label, isDropdown }: { label: string, isDropdown?: boolean }) => (
    <div className="group/nav relative w-20 h-20 flex items-center justify-center rounded-full border border-stone-200/50 dark:border-white/10 hover:border-[#A18058] transition-all duration-700 overflow-hidden bg-transparent hover:bg-white/5 backdrop-blur-sm shadow-inner">
      <div className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/nav:-translate-y-full">
        <div className="h-20 flex flex-col items-center justify-center gap-1 px-2">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] whitespace-nowrap">{label}</span>
          {isDropdown && <ChevronDown size={8} className="opacity-50" />}
        </div>
        <div className="h-20 flex flex-col items-center justify-center gap-1 px-2 text-[#A18058]">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] whitespace-nowrap">{label}</span>
          {isDropdown && <ChevronDown size={8} />}
        </div>
      </div>
    </div>
  );

  const menuItems = [
    { label: 'Home', path: '/' },
    { 
      label: 'Servizi', 
      path: '#',
      dropdown: [
        { label: 'Vendita', path: '/vendita', icon: <Building size={14} /> },
        { label: 'Affitto', path: '/affitto', icon: <Key size={14} /> },
        { label: 'Valutazione', path: '/valuta-il-tuo-immobile', icon: <Calculator size={14} /> },
        { label: 'Prenota una Visita', path: '/prenota', icon: <Calendar size={14} /> },
      ]
    },
    { 
      label: 'Chi Siamo', 
      path: '#',
      dropdown: [
        { label: 'La Nostra Mission', path: '/chi-siamo#mission', icon: <Info size={14} /> },
        { label: 'Il Nostro Team', path: '/chi-siamo#team', icon: <Users size={14} /> },
        { label: 'Contatti', path: '/chi-siamo#contatti', icon: <Send size={14} /> },
      ]
    },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[1001] transition-all duration-500 ease-out ${
          showGlass 
            ? 'glass border-b border-stone-200/50 dark:border-white/10 py-0' 
            : 'bg-transparent py-2'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group relative shrink-0 transition-transform hover:scale-105">
                <div className="w-9 h-9 bg-[#1C1917] dark:bg-[#A18058] text-white flex items-center justify-center rounded-sm shadow-lg transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(161,128,88,0.4)]">
                    <span className="font-serif italic text-lg pr-0.5">T</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-medium leading-none mb-0.5 text-[var(--text-tertiary)]">Immobiliare</span>
                    <span className={`font-serif text-xl leading-none tracking-tight ${textColorClass}`}>Tala</span>
                </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center absolute left-1/2 -translate-x-1/2 gap-2">
            {menuItems.map((item, idx) => (
              <div 
                key={idx} 
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <button className={`transition-colors p-1 ${textColorClass}`}>
                    <NavLinkContent label={item.label} isDropdown />
                  </button>
                ) : (
                  <Link to={item.path} className={`transition-colors p-1 ${textColorClass}`}>
                    <NavLinkContent label={item.label} />
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-500 ${activeDropdown === item.label ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <div className="bg-white dark:bg-black border border-stone-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden min-w-[280px] p-4 backdrop-blur-xl">
                      <div className="grid grid-cols-1 gap-2">
                        {item.dropdown.map((sub, sIdx) => (
                          <Link 
                            key={sIdx} 
                            to={sub.path}
                            className="flex items-center justify-between px-6 py-4 rounded-2xl text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-white/5 hover:text-stone-900 dark:hover:text-white transition-all group/sub"
                          >
                            <div className="flex items-center gap-4">
                              <span className="w-10 h-10 rounded-full bg-stone-50 dark:bg-white/5 flex items-center justify-center text-[#A18058] group-hover/sub:bg-[#A18058] group-hover/sub:text-white transition-all duration-500 shadow-sm">
                                {sub.icon}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-widest">{sub.label}</span>
                            </div>
                            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-500 text-[#A18058]" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link 
              to="/area-riservata" 
              className="group/btn relative h-11 px-6 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] hover:scale-105 active:scale-95 shadow-xl hover:shadow-[0_0_30px_rgba(161,128,88,0.3)]"
            >
              <div className="relative z-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]">
                <User size={16} />
                <span className="hidden md:inline">Area Riservata</span>
              </div>
              <div className="absolute inset-0 bg-[#A18058] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>
            </Link>
            
            <Link 
              to="/chi-siamo#contatti" 
              className="group/cta relative h-11 px-8 rounded-full bg-[#A18058] text-white flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl hover:shadow-[0_0_30px_rgba(161,128,88,0.5)] overflow-hidden"
            >
                <div className="relative z-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em]">
                  Contattaci <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>
            </Link>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`xl:hidden w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 z-[1003] hover:scale-110 active:scale-90 ${
                isMobileMenuOpen 
                  ? 'bg-white text-stone-900 shadow-2xl' 
                  : 'bg-stone-900 dark:bg-[#A18058] text-white shadow-lg'
              }`}
            >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[1002] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] xl:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-full'}`}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl"></div>
          
          <div className="relative h-full flex flex-col p-8 pt-32 overflow-y-auto">
              <div className="space-y-12 mb-16">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A18058] mb-8 opacity-50">Navigazione Privata</p>
                  {menuItems.map((item, idx) => (
                      <div key={idx} className="space-y-6">
                        {item.dropdown ? (
                          <>
                            <p className="text-[#A18058] text-xs font-black uppercase tracking-[0.3em] border-b border-white/10 pb-4">{item.label}</p>
                            <div className="grid grid-cols-1 gap-6 pl-4">
                              {item.dropdown.map((sub, sIdx) => (
                                <Link 
                                  key={sIdx} 
                                  to={sub.path}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-6 w-full text-left group/mob"
                                >
                                  <span className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#A18058] group-hover/mob:bg-[#A18058] group-hover/mob:text-white transition-all duration-500">
                                    {sub.icon}
                                  </span>
                                  <span className="text-3xl md:text-4xl font-serif italic text-white/70 hover:text-white transition-all">{sub.label}</span>
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link 
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block w-full text-left py-4 text-5xl md:text-6xl font-serif italic transition-all duration-500 ${location.pathname === item.path ? 'text-white translate-x-4' : 'text-stone-600 hover:text-white'}`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                  ))}
              </div>

              <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                  <Link 
                    to="/area-riservata"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-6 rounded-3xl bg-white/5 border border-white/10 text-white flex items-center justify-center gap-4 text-xs font-black uppercase tracking-widest hover:bg-[#A18058] transition-all duration-500"
                  >
                    <User size={20} /> Area Riservata
                  </Link>
                  
                  <Link 
                    to="/chi-siamo#contatti"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-6 rounded-3xl bg-[#A18058] text-white flex items-center justify-center gap-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500"
                  >
                    <Mail size={20} /> Contattaci Subito
                  </Link>
              </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;