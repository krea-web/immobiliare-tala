import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Heart, Calendar, Home, Search, Settings, Bell, MapPin, Clock, History, 
  TrendingUp, Star, CheckCircle, ArrowRight, Send, Camera, Briefcase, Menu, X, 
  ChevronDown, LogOut, Shield, BedDouble, Bath, ShieldCheck, Save, AlertCircle, 
  Phone, Handshake, Sparkles, Diamond, Crown, ChevronRight, Download, FileText, 
  Command, Activity, Award, MessageCircle, Share2, Plus, Moon, Sun, Trash2,
  Building, Upload, Map, ArrowUpRight, Maximize, Instagram, Edit3, Type as TypeIcon,
  Check, Mail, Smartphone, Zap, Award as AwardIcon
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';

interface ReservedAreaProps {
  onClose?: () => void;
  initialSection?: string;
  onNavigateToValuation?: () => void;
}

// --- 3D INTERACTIVE COMPONENTS ---
const ThreeDCard = ({ children, className = "" }: any) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -8, y: x * 8 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      className={`preserve-3d transition-transform duration-500 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
      }}
    >
      {children}
    </div>
  );
};

// --- MOCK DATA ---
const PREFERRED_AGENT = {
  name: "Andrea Tala",
  role: "Senior Private Broker",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  phone: "+393456789012",
  whatsapp: "393456789012",
  email: "andrea.tala@immobiliaretala.it",
  instagram: "immobiliaretala"
};

const SectionHeader = ({ title, subtitle, icon: Icon }: any) => (
  <div className="flex items-center gap-4 mb-10">
    <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] shadow-xl border border-[var(--border-primary)] flex items-center justify-center text-[#A18058]">
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <div>
      <h3 className="text-2xl font-serif text-[var(--text-primary)] leading-none mb-1.5">{title}</h3>
      <p className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-[0.3em]">{subtitle}</p>
    </div>
  </div>
);

export default function ReservedArea({ onClose, initialSection = 'profile', onNavigateToValuation }: ReservedAreaProps) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  
  // Profilo
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Marco Rossi',
    email: 'marco.rossi@privatelife.com',
    phone: '+39 333 456 7890',
    preferredStyle: 'Moderno / Minimalista',
    bio: 'Appassionato di architettura organica e design sostenibile nelle coste galluresi.'
  });

  // Storico & Recensioni
  const [stays, setStays] = useState([
    {
      id: 101,
      title: "Villa Turchese",
      location: "San Teodoro, Puntaldia",
      dates: "10 Ago - 24 Ago 2024",
      image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=600&auto=format&fit=crop",
      hasReview: true,
      reviewRating: 5,
      reviewText: "Un soggiorno indimenticabile. Servizio concierge impeccabile e vista mozzafiato."
    },
    {
      id: 102,
      title: "Appartamento La Marina",
      location: "Porto Rotondo",
      dates: "15 Lug - 22 Lug 2023",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
      hasReview: false,
      reviewRating: 0,
      reviewText: ""
    }
  ]);

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [reviewModalStay, setReviewModalStay] = useState<any>(null);

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
      const element = document.getElementById(initialSection);
      if (element) {
        const offset = 100; // Account for navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [initialSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Club Profilo', icon: User },
    { id: 'favorites', label: 'La Mia Wishlist', icon: Heart },
    { id: 'reviews', label: 'Archivio Feedback', icon: Star },
    { id: 'memories', label: 'Storico Soggiorni', icon: History },
    { id: 'collaboration', label: 'Vendi con noi', icon: Handshake },
  ];

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
  };

  const handleReviewSubmit = (e: React.FormEvent, stayId: number, rating: number, text: string) => {
    e.preventDefault();
    setStays(prev => prev.map(s => s.id === stayId ? { ...s, hasReview: true, reviewRating: rating, reviewText: text } : s));
    setReviewModalStay(null);
  };

  const handleCollaborationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('loading');
    setTimeout(() => setSubmissionStatus('success'), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] animate-in fade-in duration-500 flex flex-col lg:flex-row overflow-x-hidden pt-20 transition-colors duration-500">
      
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-20 z-40 bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--border-primary)] px-6 py-4 flex items-center justify-between transition-colors duration-500">
        <div className="flex items-center gap-3">
          <Crown size={16} className="text-[#A18058]" />
          <h2 className="text-xl font-serif italic text-[var(--text-primary)]">Dashboard</h2>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Overlay) */}
      <aside className={`
        fixed lg:sticky top-20 lg:top-20 z-50 lg:z-30
        w-full lg:w-80 h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)]
        bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] flex flex-col
        transition-all duration-500 ease-in-out
        ${mobileMenuOpen ? 'left-0' : '-left-full lg:left-0'}
      `}>
        <div className="hidden lg:block pt-12 pb-8 px-8">
          <div className="flex items-center gap-3 mb-2">
            <Crown size={16} className="text-[#A18058]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A18058]">Platinum Club Member</span>
          </div>
          <h2 className="text-4xl font-serif text-[var(--text-primary)] tracking-tight italic">Dashboard</h2>
        </div>
        
        <nav className="flex-1 px-4 lg:px-6 py-8 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center justify-between group px-5 py-4 text-[11px] font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 ${
                activeSection === item.id 
                ? 'bg-[#1C1917] dark:bg-[#A18058] text-white shadow-xl translate-x-2' 
                : 'text-[var(--text-tertiary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} strokeWidth={activeSection === item.id ? 2 : 1.5} />
                {item.label}
              </div>
              <ChevronRight size={14} className={`transition-transform duration-300 ${activeSection === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
            </button>
          ))}
        </nav>

        <div className="p-6 lg:p-8 space-y-4 border-t border-[var(--border-primary)]">
           <button 
             onClick={toggleTheme} 
             className="w-full flex items-center justify-between p-4 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-2xl transition-all hover:bg-[var(--bg-secondary)]"
           >
              <div className="flex items-center gap-3">
                {theme === 'light' ? <Sun size={18} className="text-[#A18058]" /> : <Moon size={18} className="text-[#A18058]" />}
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </span>
              </div>
              <div className={`w-10 h-5 rounded-full bg-[var(--border-primary)] relative transition-colors ${theme === 'dark' ? 'bg-[#A18058]' : ''}`}>
                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${theme === 'dark' ? 'left-6' : 'left-1'}`}></div>
              </div>
           </button>

           <button 
             onClick={onClose} 
             className="w-full flex items-center gap-4 px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] hover:text-red-500 transition-all"
           >
            <LogOut size={18} /> Esci Sessione
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[var(--bg-primary)] relative transition-colors duration-500">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 lg:py-20">

          <header className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl font-serif text-[var(--text-primary)] tracking-tighter leading-none mb-6">
              Tala <span className="italic text-[#A18058]">Private Club.</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-base font-light max-w-sm">Gestisca le Sue proprietà d'élite nel Suo spazio riservato.</p>
          </header>

          <div className="space-y-40">
            
            {/* SECTION: PROFILE & AGENT */}
            <section id="profile" className="scroll-mt-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Profile Card */}
                <div className="lg:col-span-8">
                    <div className="bg-[var(--bg-secondary)] rounded-[3.5rem] border border-[var(--border-primary)] shadow-2xl relative overflow-hidden transition-all h-full group">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#A18058]/5 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute top-10 right-10 flex items-center gap-2 opacity-20">
                             <Diamond size={40} className="text-[#A18058]" />
                        </div>
                        
                        {isEditingProfile ? (
                            <form onSubmit={handleProfileSave} className="relative z-10 p-10 md:p-14 animate-in fade-in duration-500">
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-3xl font-serif italic text-[var(--text-primary)]">Modifica Profilo</h2>
                                    <button type="button" onClick={() => setIsEditingProfile(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-tertiary)]"><X size={20}/></button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-[var(--text-tertiary)] tracking-widest ml-1">Nome Completo</label>
                                        <input type="text" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] p-4 rounded-2xl text-sm text-[var(--text-primary)] focus:border-[#A18058] outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-[var(--text-tertiary)] tracking-widest ml-1">Email Privata</label>
                                        <input type="email" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] p-4 rounded-2xl text-sm text-[var(--text-primary)] focus:border-[#A18058] outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2 mb-10">
                                    <label className="text-[10px] uppercase font-bold text-[var(--text-tertiary)] tracking-widest ml-1">Stile Abitativo Preferito</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {['Moderno', 'Stazzo', 'Vanguard', 'Classic'].map(style => (
                                            <button key={style} type="button" onClick={() => setUserData({...userData, preferredStyle: style})} className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${userData.preferredStyle.includes(style) ? 'bg-[#A18058] text-white border-[#A18058]' : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] border border-[var(--border-primary)]'}`}>{style}</button>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="btn-super-glow relative w-full py-5 bg-[#1C1917] dark:bg-[#A18058] text-white font-bold uppercase text-[11px] tracking-[0.3em] rounded-2xl shadow-2xl overflow-hidden">
                                    <div className="btn-inner-bg"></div>
                                    <span className="relative z-10 flex items-center justify-center gap-3"><Save size={16}/> Salva Modifiche Profilo</span>
                                </button>
                            </form>
                        ) : (
                            <div className="p-10 md:p-14 h-full flex flex-col">
                                <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
                                    <div className="relative">
                                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] border-4 border-[#A18058]/30 overflow-hidden shrink-0 shadow-2xl transition-transform duration-700 group-hover:scale-105">
                                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="absolute -top-3 -left-3 bg-[#A18058] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                             <AwardIcon size={20} />
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left flex-1">
                                        <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
                                            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-primary)] leading-tight">{userData.name}</h2>
                                            <button onClick={() => setIsEditingProfile(true)} className="p-2.5 bg-[var(--bg-tertiary)] rounded-full text-[var(--text-primary)] hover:bg-[#A18058] hover:text-white transition-all shadow-sm"><Edit3 size={16}/></button>
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] mb-8">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Platinum Privé Member</span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                            <div className="space-y-1">
                                                <p className="text-[9px] uppercase font-bold text-[var(--text-tertiary)] tracking-widest">La Mia Wishlist</p>
                                                <p className="text-2xl font-serif text-[#A18058]">{favorites.length}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] uppercase font-bold text-[var(--text-tertiary)] tracking-widest">Soggiorni</p>
                                                <p className="text-2xl font-serif text-[var(--text-primary)]">{stays.length}</p>
                                            </div>
                                            <div className="hidden sm:block space-y-1">
                                                <p className="text-[9px] uppercase font-bold text-[var(--text-tertiary)] tracking-widest">Asset Reports</p>
                                                <p className="text-2xl font-serif text-[var(--text-primary)]">4</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-auto pt-8 border-t border-[var(--border-primary)]">
                                    <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed italic">"{userData.bio}"</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preferred Agent */}
                <div className="lg:col-span-4">
                    <div className="bg-[#1C1917] dark:bg-black rounded-[3.5rem] p-10 text-white h-full flex flex-col justify-between shadow-2xl relative overflow-hidden group border border-white/5 transition-colors duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#A18058]/10 to-transparent opacity-50"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-10 h-px bg-[#A18058]"></div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A18058]">Il Tuo Advisor</span>
                            </div>
                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-full p-1 border-2 border-dashed border-[#A18058] animate-[spin_20s_linear_infinite] absolute inset-0"></div>
                                    <img src={PREFERRED_AGENT.image} className="w-24 h-24 rounded-full object-cover border-4 border-[#1C1917] dark:border-black relative z-10" alt="Agent" />
                                    <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-[#1C1917] dark:border-black z-20"></div>
                                </div>
                                <h4 className="font-serif text-3xl mb-1">{PREFERRED_AGENT.name}</h4>
                                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-[0.2em]">{PREFERRED_AGENT.role}</p>
                            </div>
                        </div>
                        <div className="space-y-4 relative z-10">
                            <a 
                                href={`tel:${PREFERRED_AGENT.phone}`}
                                className="btn-super-glow relative w-full py-5 bg-[#A18058] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 overflow-hidden shadow-2xl transform transition-all hover:scale-[1.02] active:scale-95 no-underline"
                            >
                                <div className="btn-inner-bg bg-[#A18058]"></div>
                                <span className="relative z-10 flex items-center gap-2 font-black tracking-[0.3em]"><Phone size={18} fill="currentColor" /> Chiamata Protetta</span>
                            </a>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <a 
                                    href={`https://wa.me/${PREFERRED_AGENT.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-4 bg-white/5 border border-white/10 text-white rounded-xl text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-600/20 hover:border-green-600 transition-all no-underline"
                                >
                                    <MessageCircle size={14} className="text-green-500" /> WhatsApp
                                </a>

                                <a 
                                    href={`https://instagram.com/${PREFERRED_AGENT.instagram}`} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-4 bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] to-[#bc1888] text-white rounded-xl text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg opacity-90 hover:opacity-100 hover:scale-[1.05] transition-all no-underline"
                                >
                                    <Instagram size={14} /> Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </section>

            {/* SECTION: WISHLIST */}
            <section id="favorites" className="scroll-mt-32">
                <SectionHeader title="La Mia Wishlist" subtitle="Proprietà salvate nel club" icon={Heart} />
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {favorites.map((prop) => (
                            <ThreeDCard key={prop.id}>
                                <div className="bg-[var(--bg-secondary)] rounded-[3rem] overflow-hidden border border-[var(--border-primary)] shadow-xl group">
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img src={prop.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={prop.title} />
                                        <div className="absolute top-6 right-6">
                                            <button onClick={() => toggleFavorite(prop)} className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-xl transition-all hover:bg-red-500 hover:text-white active:scale-75">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h4 className="font-serif text-2xl mb-1.5 text-[var(--text-primary)]">{prop.title}</h4>
                                        <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-1.5"><MapPin size={14} className="text-[#A18058]"/> {prop.location}</p>
                                        <div className="flex justify-between items-center pt-6 border-t border-[var(--border-primary)]">
                                            <span className="text-xl font-serif italic text-[#A18058]">{prop.price}</span>
                                            <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)] flex items-center gap-2 group/btn">Vedi <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform"/></button>
                                        </div>
                                    </div>
                                </div>
                            </ThreeDCard>
                        ))}
                    </div>
                ) : (
                    <div className="bg-[var(--bg-secondary)] rounded-[4rem] p-24 text-center border-2 border-dashed border-[var(--border-primary)]">
                        <Heart size={64} className="mx-auto text-[var(--border-primary)] mb-8" />
                        <h4 className="text-3xl font-serif mb-3 text-[var(--text-primary)] italic">La lista dei desideri è vuota.</h4>
                        <p className="text-[var(--text-secondary)] text-sm font-light mb-10 max-w-sm mx-auto">Esplori la nostra collezione privata per iniziare.</p>
                        <button onClick={onClose} className="px-12 py-5 bg-[#1C1917] dark:bg-[#A18058] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl transition-transform hover:scale-105">Portfolio Immobili</button>
                    </div>
                )}
            </section>

            {/* SECTION: REVIEWS ARCHIVE */}
            <section id="reviews" className="scroll-mt-32">
                <SectionHeader title="Archivio Recensioni" subtitle="Feedback d'Elite" icon={Star} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {stays.filter(s => s.hasReview).map(stay => (
                        <div key={stay.id} className="bg-[var(--bg-secondary)] rounded-[3.5rem] p-10 border border-[var(--border-primary)] shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-[var(--text-primary)]">
                                <Star size={120} />
                            </div>
                            <div className="flex items-center gap-6 mb-8">
                                <img src={stay.image} className="w-20 h-20 rounded-3xl object-cover shadow-lg" alt={stay.title} />
                                <div>
                                    <h4 className="font-serif text-2xl text-[var(--text-primary)] italic">{stay.title}</h4>
                                    <div className="flex gap-1 text-[#A18058] mt-2">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < stay.reviewRating ? "currentColor" : "none"} />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-[var(--text-secondary)] text-base font-light italic leading-relaxed mb-8">
                                "{stay.reviewText}"
                            </p>
                            <div className="pt-8 border-t border-[var(--border-primary)] flex justify-between items-center">
                                <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)] tracking-widest">{stay.dates}</span>
                                <button className="text-[10px] font-bold uppercase text-[#A18058] tracking-widest border-b border-[#A18058] pb-1 hover:text-[var(--text-primary)] transition-colors">Modifica Testimonianza</button>
                            </div>
                        </div>
                    ))}
                    {stays.filter(s => !s.hasReview).length > 0 && stays.filter(s => !s.hasReview).map(stay => (
                        <div key={stay.id} className="bg-[#A18058]/5 rounded-[3.5rem] p-12 border-2 border-dashed border-[#A18058]/20 flex flex-col items-center text-center justify-center">
                            <Sparkles size={40} className="text-[#A18058] mb-6 animate-pulse" />
                            <h4 className="text-2xl font-serif mb-2 text-[var(--text-primary)] italic">Il Tuo Feedback è prezioso.</h4>
                            <p className="text-sm text-[var(--text-secondary)] mb-10 max-w-xs">Come è stata la Sua permanenza a {stay.title}? Condivida la Sua visione.</p>
                            <button onClick={() => setReviewModalStay(stay)} className="btn-super-glow relative px-10 py-4.5 bg-[#1C1917] dark:bg-[#A18058] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl overflow-hidden">
                                <div className="btn-inner-bg"></div>
                                <span className="relative z-10">Lascia una Recensione</span>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION: MEMORIES */}
            <section id="memories" className="scroll-mt-32">
                <SectionHeader title="Storico Soggiorni" subtitle="Archivio Esperienze" icon={History} />
                <div className="space-y-8">
                    {stays.map((stay) => (
                        <div key={stay.id} className="bg-[var(--bg-secondary)] rounded-[3rem] p-8 md:p-10 border border-[var(--border-primary)] shadow-lg flex flex-col md:flex-row gap-10 items-center group hover:shadow-2xl transition-all duration-500">
                            <div className="w-full md:w-60 h-40 rounded-[2rem] overflow-hidden shrink-0 shadow-inner">
                                <img src={stay.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={stay.title} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-3xl font-serif text-[var(--text-primary)] mb-3 italic">{stay.title}</h4>
                                <p className="text-[var(--text-tertiary)] text-[10px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center justify-center md:justify-start gap-6">
                                    <span className="flex items-center gap-2"><MapPin size={14} className="text-[#A18058]"/> {stay.location}</span>
                                    <span className="flex items-center gap-2 text-[#A18058]"><Calendar size={14}/> {stay.dates}</span>
                                </p>
                                {!stay.hasReview && (
                                    <button onClick={() => setReviewModalStay(stay)} className="text-[10px] font-bold uppercase tracking-widest text-[#A18058] flex items-center gap-2 hover:underline">
                                        <Plus size={16}/> Carica ora la Sua recensione
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <button className="w-14 h-14 bg-[var(--bg-tertiary)] rounded-2xl text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center shadow-sm" title="Fattura PDF"><FileText size={22} /></button>
                                <button className="w-14 h-14 bg-[var(--bg-tertiary)] rounded-2xl text-[var(--text-tertiary)] hover:text-[#A18058] transition-all flex items-center justify-center shadow-sm" title="Prenota di Nuovo"><ArrowUpRight size={22} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION: COLLABORATION (VALORIZZAZIONE ASSET) */}
            <section id="collaboration" className="scroll-mt-32">
                <SectionHeader title="Valorizzazione Asset" subtitle="Vendi o Segnala con Tala" icon={Handshake} />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-gradient-to-br from-[#A18058] to-[#8B6B46] text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <Diamond className="mb-8 opacity-40 group-hover:scale-110 transition-transform duration-500" size={50} />
                                <h4 className="text-3xl font-serif mb-6 italic leading-tight">Trasformiamo il Suo immobile in un'opportunità globale.</h4>
                                <p className="text-white/80 text-sm font-light leading-relaxed mb-8">Accesso prioritario al nostro network esclusivo di investitori internazionali pre-qualificati.</p>
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <ShieldCheck size={16} /> Asset Management Certificato
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                                <TrendingUp size={240} />
                            </div>
                        </div>
                        
                        <div className="p-10 bg-[var(--bg-secondary)] rounded-[3rem] border border-[var(--border-primary)] shadow-lg">
                            <h5 className="text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-8">Il Nostro Metodo</h5>
                            <ul className="space-y-8">
                                <li className="flex gap-5 items-start">
                                    <div className="w-8 h-8 rounded-full bg-[#1C1917] dark:bg-[#A18058] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-lg">1</div>
                                    <div><p className="text-sm font-serif italic text-[var(--text-primary)] mb-1">Due Diligence</p><p className="text-xs text-[var(--text-tertiary)]">Analisi tecnica e posizionamento sul mercato.</p></div>
                                </li>
                                <li className="flex gap-5 items-start">
                                    <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                    <div><p className="text-sm font-serif italic text-[var(--text-primary)] mb-1">Exposure</p><p className="text-xs text-[var(--text-tertiary)]">Strategie di marketing digitale d'avanguardia.</p></div>
                                </li>
                                <li className="flex gap-5 items-start">
                                    <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                    <div><p className="text-sm font-serif italic text-[var(--text-primary)] mb-1">Closing</p><p className="text-xs text-[var(--text-tertiary)]">Gestione totale delle trattative con riservatezza.</p></div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-[var(--bg-secondary)] rounded-[3.5rem] p-10 md:p-14 shadow-2xl border border-[var(--border-primary)] relative">
                            {submissionStatus === 'loading' && (
                                <div className="absolute inset-0 z-50 bg-[var(--glass-bg)] backdrop-blur-md rounded-[3.5rem] flex flex-col items-center justify-center">
                                    <Loader2 className="w-20 h-20 text-[#A18058] animate-spin mb-8" />
                                    <p className="font-serif italic text-2xl animate-pulse text-[var(--text-primary)]">Caricamento Asset...</p>
                                </div>
                            )}
                            {submissionStatus === 'success' ? (
                                <div className="text-center py-20 animate-in zoom-in-95 duration-700">
                                    <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-100 dark:border-green-900/30">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h3 className="text-4xl font-serif mb-4 italic text-[var(--text-primary)]">Inviato.</h3>
                                    <p className="text-[var(--text-secondary)] text-base mb-12 max-w-sm mx-auto">Abbiamo ricevuto la Sua segnalazione. Il Suo Advisor la ricontatterà privatamente entro 12 ore.</p>
                                    <button onClick={() => setSubmissionStatus('idle')} className="text-[#A18058] font-bold uppercase text-[11px] tracking-[0.3em] border-b-2 border-[#A18058] pb-1.5 hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all">Nuova Pratica Asset</button>
                                </div>
                            ) : (
                                <form onSubmit={handleCollaborationSubmit} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] ml-2">Tipo di Proprietà</label>
                                            <div className="relative">
                                                <Building className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A18058]" size={18} />
                                                <select required className="w-full pl-14 pr-6 py-5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-2xl focus:outline-none appearance-none cursor-pointer font-medium text-[var(--text-primary)]">
                                                    <option>Villa Singola</option>
                                                    <option>Appartamento di Lusso</option>
                                                    <option>Stazzo Storico</option>
                                                    <option>Terreno Edificabile</option>
                                                </select>
                                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" size={18} />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] ml-2">Localizzazione</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A18058]" size={18} />
                                                <input required type="text" placeholder="Es: Porto Cervo, Puntaldia..." className="w-full pl-14 pr-6 py-5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-2xl focus:outline-none focus:border-[#A18058] transition-all font-medium text-[var(--text-primary)]" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] ml-2">Dimensioni mq</label>
                                            <div className="relative">
                                                <Maximize className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={18} />
                                                <input type="text" placeholder="mq" className="w-full pl-14 pr-6 py-5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-2xl focus:outline-none font-medium text-[var(--text-primary)]" />
                                            </div>
                                        </div>
                                        <div className="space-y-3 md:col-span-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] ml-2">Valutazione Richiesta</label>
                                            <div className="relative">
                                                <Shield className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={18} />
                                                <input type="text" placeholder="Es: Trattativa Riservata o Budget specifico" className="w-full pl-14 pr-6 py-5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-2xl focus:outline-none font-medium text-[var(--text-primary)]" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] ml-2">Media Asset (Foto o Dossier)</label>
                                        <div className="border-3 border-dashed border-[var(--border-primary)] rounded-[3rem] p-16 text-center hover:bg-[var(--bg-tertiary)] transition-all cursor-pointer group shadow-inner">
                                            <Upload size={40} className="mx-auto text-[var(--text-tertiary)] group-hover:text-[#A18058] group-hover:scale-110 transition-all mb-6" />
                                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors">Trascina qui i Tuoi file</p>
                                            <p className="text-[10px] text-[var(--text-tertiary)] mt-3 font-medium uppercase tracking-widest opacity-50">Documentazione Riservata • Max 100MB</p>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn-super-glow relative w-full py-6 bg-[#1C1917] dark:bg-[#A18058] text-white rounded-[1.5rem] text-[12px] font-bold uppercase tracking-[0.4em] shadow-2xl overflow-hidden group">
                                        <div className="btn-inner-bg"></div>
                                        <span className="relative z-10 flex items-center justify-center gap-4">Avvia Proposta di Vendita <ArrowRight size={20} /></span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

          </div>

          <footer className="mt-40 pt-20 border-t border-[var(--border-primary)] flex flex-col items-center">
             <div className="w-16 h-16 bg-[#1C1917] dark:bg-[#A18058] text-white flex items-center justify-center rounded-lg shadow-2xl mb-8 group hover:scale-110 transition-transform">
                <span className="font-serif italic text-2xl pr-0.5">T</span>
             </div>
             <p className="text-[11px] text-[var(--text-tertiary)] font-bold uppercase tracking-[0.4em] mb-4">© 2025 Immobiliare Tala • Exclusive Sardinia Real Estate</p>
             <div className="flex gap-8 text-[9px] uppercase font-bold tracking-widest text-[var(--text-tertiary)]">
                <a href="#" className="hover:text-[#A18058]">Privacy Policy</a>
                <a href="#" className="hover:text-[#A18058]">Supporto d'Elite</a>
             </div>
          </footer>
          
        </div>
      </main>

      {/* REVIEW MODAL */}
      {reviewModalStay && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-[#1C1917]/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setReviewModalStay(null)}></div>
              <div className="relative w-full max-w-xl bg-[var(--bg-secondary)] rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden p-12 md:p-16 animate-in zoom-in-95 duration-500 border border-[var(--border-primary)]">
                  <button onClick={() => setReviewModalStay(null)} className="absolute top-10 right-10 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"><X size={32}/></button>
                  <div className="text-center mb-12">
                      <h3 className="text-4xl font-serif mb-3 italic text-[var(--text-primary)]">Il Tuo Feedback.</h3>
                      <p className="text-[10px] text-[#A18058] uppercase font-bold tracking-[0.3em]">Per la Proprietà: {reviewModalStay.title}</p>
                  </div>
                  
                  <form onSubmit={(e) => {
                      const text = (e.target as any).reviewText.value;
                      handleReviewSubmit(e, reviewModalStay.id, 5, text);
                  }} className="space-y-10">
                      <div className="flex justify-center gap-6">
                          {[1,2,3,4,5].map(i => (
                              <button key={i} type="button" className="text-[#A18058] hover:scale-125 transition-transform"><Star size={40} fill={i <= 4 ? "currentColor" : "none"} /></button>
                          ))}
                      </div>
                      <div className="space-y-2">
                          <label className="text-[9px] uppercase font-bold text-[var(--text-tertiary)] tracking-widest ml-1">Condivida la Sua visione</label>
                          <textarea name="reviewText" required placeholder="Dettagli sul soggiorno, privacy, comfort..." rows={5} className="w-full p-6 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-[2rem] text-[var(--text-primary)] focus:border-[#A18058] outline-none resize-none font-light leading-relaxed"></textarea>
                      </div>
                      <button type="submit" className="btn-super-glow relative w-full py-6 bg-[#1C1917] dark:bg-[#A18058] text-white rounded-[1.5rem] font-bold text-[11px] uppercase tracking-[0.3em] shadow-2xl overflow-hidden">
                          <div className="btn-inner-bg"></div>
                          <span className="relative z-10">Pubblica Testimonianza</span>
                      </button>
                  </form>
              </div>
          </div>
      )}

      {/* MOBILE OVERLAY MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end lg:hidden">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
           <div className="relative w-80 h-full bg-[var(--bg-secondary)] shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500">
              <div className="flex justify-between items-center mb-12">
                 <h2 className="font-serif text-3xl italic text-[var(--text-primary)]">Club Menu</h2>
                 <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center text-[var(--text-primary)]"><X size={24}/></button>
              </div>
              <nav className="space-y-2 flex-1">
                 {menuItems.map(item => (
                   <button 
                      key={item.id} 
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-5 px-6 py-5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${activeSection === item.id ? 'bg-[#1C1917] dark:bg-[#A18058] text-white' : 'text-[var(--text-tertiary)] hover:bg-[var(--bg-tertiary)]'}`}
                   >
                      <item.icon size={20} />
                      {item.label}
                   </button>
                 ))}
              </nav>
              <button onClick={onClose} className="w-full py-5 border border-[var(--border-primary)] rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mt-auto">Esci dal Club</button>
           </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e7e5e4; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #262626; }
      `}</style>
    </div>
  );
}

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);
