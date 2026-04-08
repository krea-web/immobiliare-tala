import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, Shield, TrendingUp, ArrowRight, Phone, 
  BarChart3, CheckCircle2, Mail, User, ShieldCheck, 
  Star, Award, Users, Building2, Globe2, X, Instagram, 
  Bell, Eye, Navigation, Clock, MessageCircle, Heart, 
  CalendarCheck, ThumbsUp, PhoneCall, Map, Send, Camera, 
  Briefcase, Menu, LogOut, ChevronRight, ChevronDown, 
  Download, BedDouble, Bath, Search, History, Calendar, 
  Save, AlertCircle, Zap, Sparkles
} from 'lucide-react';
import SEO from '../components/SEO';

const IGHome = () => (<svg aria-label="Home" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>);
const IGSearch = () => (<svg aria-label="Cerca" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>);
const IGAdd = () => (<svg aria-label="Nuovo post" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>);
const IGReels = () => (<svg aria-label="Reels" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>);
const IGHeart = () => (<svg aria-label="Mi piace" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>);
const IGComment = () => (<svg aria-label="Commenta" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>);
const IGShare = () => (<svg aria-label="Condividi post" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="2" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>);
const IGBookmark = () => (<svg aria-label="Salva" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>);
const IGMessenger = () => (<svg aria-label="Messenger" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1-9.9 9.9 9.718 9.718 0 0 1 9.9-9.9zm0 17.597a7.9 7.9 0 1 0-7.9-7.9 7.91 7.91 0 0 0 7.9 7.9zm2.446-11.838-5.32 2.822a1.002 1.002 0 0 0-.466.702l-1.036 5.86a.5.5 0 0 0 .584.582l5.86-1.036a1.002 1.002 0 0 0 .704-.466l2.822-5.32a.5.5 0 0 0-.847-.846l-4.464 2.37-2.37 4.465 4.527-4.527z"></path></svg>);

const AGENTS = [
  {
    id: 'andrea',
    name: 'Andrea Tala',
    role: 'Founder & Senior Broker',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop', 
    bio: 'Specialista in compravendite di lusso e ville fronte mare in Gallura. 15 anni di esperienza nel real estate internazionale.',
    phone: '+39 345 678 9012',
    email: 'andrea.tala@immobiliaretala.it'
  },
  {
    id: 'dario',
    name: 'Dario Deiana',
    role: 'Property Manager',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', 
    bio: 'Esperto nella gestione di stazzi galluresi e proprietà a San Teodoro. Consulenza tecnica e legale.',
    phone: '+39 349 123 4567',
    email: 'dario.deiana@immobiliaretala.it'
  }
];

const ValueCard: React.FC<{ val: any; index: number }> = ({ val, index }) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const box = card.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        const centerX = box.width / 2;
        const centerY = box.height / 2;
        
        const rotateX = (y - centerY) / 12; 
        const rotateY = (centerX - x) / 12;
        
        const glareX = (x / box.width) * 100;
        const glareY = (y / box.height) * 100;

        setRotate({ x: rotateX, y: -rotateY });
        setGlare({ x: glareX, y: glareY, opacity: 0.5 });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setGlare(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <div 
            ref={cardRef}
            className="perspective-[1200px] h-full"
        >
            <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`group relative p-10 bg-gradient-to-br from-[#1C1917] to-[#0C0A09] border border-white/5 hover:border-[#A18058]/40 transition-all duration-300 rounded-[2.5rem] h-full flex flex-col items-center text-center overflow-hidden shadow-2xl ${
                    isVisible ? 'animate-in fade-in slide-in-from-bottom-12 duration-1000' : 'opacity-0'
                }`}
                style={{
                    animationDelay: `${index * 150}ms`,
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    transformStyle: 'preserve-3d',
                    boxShadow: rotate.x !== 0 ? `0 25px 50px -12px rgba(0, 0, 0, 0.5)` : 'none'
                }}
            >
                <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(161, 128, 88, 0.2), transparent 60%)`,
                        opacity: glare.opacity,
                        transition: 'opacity 0.4s ease'
                    }}
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
                <div className="relative z-20 flex flex-col items-center h-full" style={{ transform: 'translateZ(60px)' }}>
                    <div className="mb-10 p-7 bg-[#262626] rounded-[2rem] border border-white/5 shadow-2xl group-hover:bg-[#A18058] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-3">
                        {val.icon}
                    </div>
                    <h3 className="text-2xl font-serif text-[#FAFAF9] mb-4 group-hover:text-[#A18058] transition-colors tracking-tight">
                        {val.title}
                    </h3>
                    <p className="text-stone-400 text-sm leading-relaxed font-light group-hover:text-stone-200 transition-colors">
                        {val.desc}
                    </p>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#A18058] group-hover:w-1/3 transition-all duration-700"></div>
            </div>
        </div>
    );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  
  const [phoneRotate, setPhoneRotate] = useState({ x: 0, y: 0 });
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);
  const [expansionProgress, setExpansionProgress] = useState(0);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  const messagesData = [
    { name: "giulia.r", text: "Ciao! Disponibile Villa Sabina dal 10 al 17?", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" },
    { name: "mattia.v", text: "Mi mandate info su Porto San Paolo?", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" },
    { name: "alex.l", text: "Avete reel con tour interni?", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200" }
  ];

  const statsData = [
    { label: "Story Views", value: "48K", icon: Eye },
    { label: "DM Risposte", value: "2h", icon: MessageCircle },
    { label: "Reach Mensile", value: "+124%", icon: BarChart3 }
  ];

  useEffect(() => {
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const progress = Math.min(Math.max(scrollTop / 600, 0), 1);
        setExpansionProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const msgInterval = setInterval(() => {
        setActiveMessageIndex((prev) => (prev + (messagesData?.length ? 1 : 0)) % (messagesData?.length || 1));
    }, 4000);
    const statInterval = setInterval(() => {
        setActiveStatIndex((prev) => (prev + (statsData?.length ? 1 : 0)) % (statsData?.length || 1));
    }, 5000);
    return () => {
        clearInterval(msgInterval);
        clearInterval(statInterval);
    };
  }, []);

  const handlePhoneMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 20; 
    const rotateY = (centerX - x) / 20;

    setPhoneRotate({ x: rotateX, y: rotateY });
    setIsHoveringPhone(true);
  };

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 pt-20">
      <SEO title="Chi Siamo" description="L'agenzia immobiliare d'élite in Sardegna." />
      
      {/* 1. HERO SECTION - IMMERSIVA */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 scale-105 animate-hero-bg" alt="Luxury Villa" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[var(--bg-primary)]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
              <div className="animate-cinema mb-8">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#A18058] text-[10px] font-bold uppercase tracking-[0.4em] backdrop-blur-md">The Visionaries</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter italic leading-none mb-8 animate-cinema [animation-delay:200ms]">
                  Oltre il <br /> <span className="not-italic text-[#A18058]">Visibile.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-2xl font-light leading-relaxed animate-cinema [animation-delay:400ms]">
                  Non vendiamo metri quadri, curiamo l'eredità architettonica della Gallura e i sogni di chi la abita.
              </p>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-px h-16 bg-gradient-to-b from-[#A18058] to-transparent"></div>
          </div>
      </section>

      {/* 2. THE STORY - DESIGN CINEMATOGRAFICO */}
      <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-8">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                  <div className="relative">
                      <div className="absolute -top-20 -left-20 text-[20rem] font-serif text-[var(--bg-tertiary)] select-none pointer-events-none z-0">T</div>
                      <div className="relative z-10">
                          <h2 className="text-4xl md:text-6xl font-serif mb-12 italic leading-tight text-[var(--text-primary)]">
                              Dal <span className="not-italic text-[#A18058]">1998</span>, <br /> un'etica scolpita nel granito.
                          </h2>
                          <div className="space-y-8 text-[var(--text-secondary)] font-light leading-relaxed text-lg">
                              <p>Immobiliare Tala nasce dal desiderio di Andrea Tala di offrire un servizio di intermediazione che superasse la semplice vendita, diventando una vera consulenza d'asset.</p>
                              <p>Abbiamo scelto la Sardegna non solo come mercato, ma come missione: preservarne la bellezza integrando l'architettura contemporanea nel paesaggio millenario.</p>
                          </div>
                          
                          <div className="mt-16 grid grid-cols-2 gap-12">
                              <div>
                                  <p className="text-4xl font-serif text-[var(--text-primary)] mb-2">500+</p>
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A18058]">Asset Transati</p>
                              </div>
                              <div>
                                  <p className="text-4xl font-serif text-[var(--text-primary)] mb-2">€1.2B</p>
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A18058]">Valore Generato</p>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="relative group">
                      <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt="Sardinian Stazzo" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-10 left-10 text-white">
                              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Featured Project</p>
                              <p className="text-2xl font-serif italic">Lu Stazzu di San Pantaleo</p>
                          </div>
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#A18058] rounded-[2rem] -z-0 flex items-center justify-center p-8 transition-transform group-hover:rotate-6">
                          <ShieldCheck className="text-white w-20 h-20 opacity-20 absolute" />
                          <p className="text-white text-sm font-medium italic text-center relative z-10">"La nostra garanzia è la nostra storia. Ogni pietra parla di noi."</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. CORE VALUES - 3D CARDS */}
      <section className="py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
              <div className="text-center mb-24">
                  <span className="text-[#A18058] text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block">Il nostro DNA</span>
                  <h2 className="text-4xl md:text-6xl font-serif text-[var(--text-primary)] italic">Pilastri di Eccellenza</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-12 h-full">
                  <ValueCard index={0} val={{ icon: <Shield />, title: "Integrità Assoluta", desc: "Ogni transazione è protetta da protocolli di due diligence rigorosi e trasparenza totale." }} />
                  <ValueCard index={1} val={{ icon: <Star />, title: "Discrezione d'Elite", desc: "Gestiamo il 40% dei nostri asset 'off-market', garantendo la massima privacy ai nostri clienti." }} />
                  <ValueCard index={2} val={{ icon: <TrendingUp />, title: "Visione d'Asset", desc: "Non valutiamo solo lo stato attuale, ma il potenziale di rivalutazione a lungo termine." }} />
              </div>
          </div>
      </section>

      {/* 4. THE TEAM - INTERACTIVE SHOWCASE */}
      <section className="py-32 bg-[var(--bg-primary)]" id="team">
          <div className="max-w-7xl mx-auto px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                  <div className="max-w-xl">
                      <h2 className="text-5xl font-serif mb-6 italic text-[var(--text-primary)]">Menti Dietro l'Asset.</h2>
                      <p className="text-[var(--text-secondary)] font-light text-lg">Un collettivo di esperti che fondono analisi finanziaria, sensibilità estetica e radicata conoscenza del territorio gallurese.</p>
                  </div>
                  <button className="group flex items-center gap-4 px-8 py-4 rounded-full border border-[var(--border-primary)] hover:border-[#A18058] transition-all text-[var(--text-primary)]">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Lavora con noi</span>
                      <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center group-hover:bg-[#A18058] group-hover:text-white transition-all">
                          <ArrowRight size={14} />
                      </div>
                  </button>
              </div>

              <div className="mb-20">
                  <div className="rounded-[3rem] overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-secondary)] shadow-2xl">
                      <div className="grid lg:grid-cols-5">
                          <div className="lg:col-span-2 p-10 md:p-12">
                              <span className="text-[#A18058] text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block">Uffici Sardegna</span>
                              <h3 className="text-3xl font-serif text-[var(--text-primary)] italic mb-6">Viale Murta Maria, 70</h3>
                              <p className="text-[var(--text-secondary)] font-light leading-relaxed">
                                  07026 Olbia (SS), Italia
                              </p>
                              <div className="mt-10 flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center text-[#A18058]">
                                      <MapPin size={18} />
                                  </div>
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
                                      Punto fisso sulla mappa
                                  </p>
                              </div>
                          </div>
                          <div className="lg:col-span-3 bg-[var(--bg-tertiary)] border-t lg:border-t-0 lg:border-l border-[var(--border-primary)]">
                              <div className="w-full h-[360px] lg:h-full">
                                  <iframe
                                      title="Uffici Sardegna - Immobiliare Tala"
                                      className="w-full h-full"
                                      loading="lazy"
                                      referrerPolicy="no-referrer-when-downgrade"
                                      src="https://www.google.com/maps?q=Viale%20Murta%20Maria%2C%2070%2C%2007026%20Olbia%20SS&output=embed"
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-20">
                  {AGENTS.map((agent) => (
                      <div key={agent.id} className="group flex flex-col md:flex-row gap-10 items-center md:items-stretch">
                          <div className="w-full md:w-72 aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl relative shrink-0">
                              <img src={agent.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={agent.name} />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              <div className="absolute bottom-8 left-8 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all delay-100">
                                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#A18058] transition-all"><Instagram size={18} /></a>
                                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#A18058] transition-all"><Mail size={18} /></a>
                              </div>
                          </div>
                          <div className="flex flex-col justify-center py-4">
                              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A18058] mb-3">{agent.role}</span>
                              <h3 className="text-4xl font-serif mb-6 text-[var(--text-primary)]">{agent.name}</h3>
                              <p className="text-[var(--text-secondary)] font-light leading-relaxed mb-8">{agent.bio}</p>
                              <div className="flex items-center gap-6 pt-6 border-t border-[var(--border-primary)]">
                                  <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
                                      <Phone size={14} />
                                      <span className="text-xs font-medium">{agent.phone}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <section className="py-32 bg-black relative overflow-hidden" id="lavora-con-noi">
          <div className="absolute inset-0">
              <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-[#A18058]/15 blur-[140px] rounded-full"></div>
              <div className="absolute -bottom-40 -left-32 w-[620px] h-[620px] bg-[#A18058]/10 blur-[160px] rounded-full"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                  <div className="order-2 lg:order-1 relative h-[720px] flex items-center justify-center">
                      <div 
                        onMouseMove={handlePhoneMouseMove}
                        onMouseLeave={() => { setPhoneRotate({ x: 0, y: 0 }); setIsHoveringPhone(false); }}
                        className="relative w-[320px] h-[650px] bg-[#1C1917] rounded-[3.5rem] border-[8px] border-[#262626] shadow-[0_50px_110px_-20px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-500 ease-out z-20"
                        style={{ transform: `perspective(1000px) rotateX(${phoneRotate.x}deg) rotateY(${phoneRotate.y}deg)` }}
                      >
                          <div className="h-14 bg-[#1C1917] flex items-center justify-between px-8 pt-4">
                              <div className="text-white text-xs font-bold">9:41</div>
                              <div className="flex gap-1.5">
                                  <div className="w-4 h-4 rounded-full border border-white/20"></div>
                                  <div className="w-4 h-4 rounded-full bg-[#A18058]"></div>
                              </div>
                          </div>

                          <div className="h-full bg-white">
                              <div className="px-6 pt-5 pb-4 border-b border-stone-100 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]">
                                          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" className="w-9 h-9 rounded-full object-cover border-2 border-white" alt="Immobiliare Tala" />
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-black uppercase tracking-widest text-stone-900">immobiliaretala</p>
                                          <p className="text-[8px] text-stone-400">Luxury Real Estate • Sardegna</p>
                                      </div>
                                  </div>
                                  <div className="text-stone-900 flex items-center gap-3">
                                      <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                                      <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                                      <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                                  </div>
                              </div>

                              <div className="px-6 py-5">
                                  <div className="flex items-center justify-between mb-4">
                                      <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">DM in arrivo</p>
                                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#A18058]">Rispondi</p>
                                  </div>
                                  <div className="space-y-3">
                                      {messagesData.map((msg, idx) => (
                                          <div key={idx} className={`flex gap-3 transition-all duration-500 ${idx === activeMessageIndex ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4 scale-95'}`}>
                                              <img src={msg.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 shadow-md" alt={msg.name} />
                                              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-stone-100 flex-1">
                                                  <p className="text-[8px] font-bold text-stone-400 mb-1">@{msg.name}</p>
                                                  <p className="text-[10px] text-stone-700 font-medium leading-tight">{msg.text}</p>
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              </div>

                              <div className="px-6 pb-6">
                                  <div className="rounded-2xl overflow-hidden border border-stone-100 shadow-sm">
                                      <div className="h-40 bg-stone-100 overflow-hidden">
                                          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900&auto=format&fit=crop" className="w-full h-full object-cover" alt="Post" />
                                      </div>
                                      <div className="p-4">
                                          <p className="text-[10px] text-stone-700 font-medium leading-snug">
                                              Tour rapido in villa: dettagli, vista mare e materiali autentici. Salvare per la prossima visita.
                                          </p>
                                      </div>
                                  </div>
                              </div>

                              <div className="absolute bottom-20 left-6 right-6">
                                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-[2rem] border border-stone-100 shadow-xl">
                                      <div className="flex items-center justify-between mb-3">
                                          <p className="text-[9px] font-bold uppercase text-stone-400">Instagram Insights</p>
                                          {React.createElement(statsData[activeStatIndex].icon, { size: 12, className: "text-[#A18058]" })}
                                      </div>
                                      <p className="text-2xl font-serif text-stone-900 leading-none mb-1">{statsData[activeStatIndex].value}</p>
                                      <p className="text-[8px] font-bold uppercase text-[#A18058] tracking-widest">{statsData[activeStatIndex].label}</p>
                                  </div>
                              </div>

                              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-stone-100 flex items-center justify-around">
                                  <IGHome />
                                  <IGSearch />
                                  <IGAdd />
                                  <IGReels />
                                  <IGHome />
                              </div>
                          </div>
                      </div>

                      <div className="absolute top-20 -left-6 w-44 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-5 shadow-2xl">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-white/60 mb-2">Stories</p>
                          <div className="flex gap-2">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] p-[2px]">
                                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" className="w-full h-full rounded-full object-cover border-2 border-black" alt="Story" />
                              </div>
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] p-[2px]">
                                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" className="w-full h-full rounded-full object-cover border-2 border-black" alt="Story" />
                              </div>
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] p-[2px]">
                                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200" className="w-full h-full rounded-full object-cover border-2 border-black" alt="Story" />
                              </div>
                          </div>
                      </div>

                      <div className="absolute bottom-24 -right-10 w-56 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-5 shadow-2xl">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-white/60 mb-2">Nuovi post</p>
                          <div className="rounded-xl overflow-hidden bg-black/20 border border-white/10">
                              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" className="w-full h-20 object-cover" alt="Post" />
                          </div>
                          <p className="text-[10px] text-white/70 mt-3 font-medium">Anteprime, tour e backstage.</p>
                      </div>
                  </div>

                  <div className="order-1 lg:order-2">
                      <span className="text-[#A18058] text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block">Instagram Presence</span>
                      <h2 className="text-5xl md:text-7xl font-serif text-white mb-10 leading-[0.9] tracking-tighter">
                          Smart. <br /> <span className="italic">Connected.</span> <br /> <span className="text-[#A18058]">Human.</span>
                      </h2>
                      <p className="text-stone-400 text-lg font-light leading-relaxed max-w-xl mb-12">
                          Il nostro profilo Instagram è la vetrina più diretta: tour in reel, stories con disponibilità aggiornate, dettagli di progetto e dietro le quinte sul territorio.
                      </p>

                      <div className="space-y-8 mb-12">
                          <div className="flex gap-6 group">
                              <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-[#A18058] group-hover:bg-[#A18058] group-hover:text-white transition-all duration-500">
                                  <Camera size={24} />
                              </div>
                              <div>
                                  <h4 className="text-white text-lg font-serif mb-2">Reel & Tour</h4>
                                  <p className="text-stone-500 text-sm font-light leading-relaxed">Video brevi con dettagli architettonici, vista e atmosfera. Ideali per una prima selezione rapida.</p>
                              </div>
                          </div>
                          <div className="flex gap-6 group">
                              <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-[#A18058] group-hover:bg-[#A18058] group-hover:text-white transition-all duration-500">
                                  <Sparkles size={24} />
                              </div>
                              <div>
                                  <h4 className="text-white text-lg font-serif mb-2">Stories in tempo reale</h4>
                                  <p className="text-stone-500 text-sm font-light leading-relaxed">Aggiornamenti su disponibilità, momenti di location e novità. Con risposte rapide via DM.</p>
                              </div>
                          </div>
                      </div>

                      <a href="https://www.instagram.com/immobiliaretala/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[#A18058] text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#1C1917] transition-colors shadow-2xl">
                          Apri Instagram <ArrowRight size={16} />
                      </a>
                  </div>
              </div>
          </div>
      </section>

      {/* 6. CONTACT SECTION - MINIMALIST */}
      <section className="py-32 bg-[var(--bg-primary)]" id="contatti" ref={contactSectionRef}>
          <div className="max-w-7xl mx-auto px-8">
              <div className="bg-[var(--bg-secondary)] rounded-[4rem] overflow-hidden shadow-2xl relative border border-[#A18058]/30">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
                  <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-[#A18058]/10 blur-[140px] rounded-full"></div>
                  <div className="grid lg:grid-cols-2">
                      <div className="p-16 md:p-24 relative z-10">
                          <h2 className="text-5xl font-serif text-[var(--text-primary)] mb-8 italic leading-[0.95]">
                              Parliamo del <span className="not-italic bg-gradient-to-r from-[#A18058] via-[#D7B587] to-[#A18058] bg-clip-text text-transparent">Tuo prossimo</span> Asset.
                          </h2>
                          <p className="text-[var(--text-secondary)] text-lg font-light mb-16">Sia che tu voglia vendere, acquistare o collaborare, il nostro team è a Tua completa disposizione per una consulenza privata.</p>
                          
                          <div className="space-y-8">
                              <div className="flex items-center gap-6">
                                  <div className="w-12 h-12 rounded-full bg-[#A18058]/10 border border-[#A18058]/30 flex items-center justify-center text-[#A18058]">
                                      <Phone size={20} />
                                  </div>
                                  <div>
                                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-1">Centralino</p>
                                      <p className="text-[var(--text-primary)] font-medium">+39 0789 123456</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-6">
                                  <div className="w-12 h-12 rounded-full bg-[#A18058]/10 border border-[#A18058]/30 flex items-center justify-center text-[#A18058]">
                                      <MapPin size={20} />
                                  </div>
                                  <div>
                                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-1">Uffici Sardegna</p>
                                      <p className="text-[var(--text-primary)] font-medium">Viale Murta Maria, 70 • 07026 Olbia (SS)</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="bg-[var(--bg-tertiary)] backdrop-blur-xl border-l border-[var(--border-primary)] p-16 md:p-24">
                          <form className="space-y-8">
                              <div className="grid md:grid-cols-2 gap-8">
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Nome</label>
                                      <input type="text" className="w-full bg-transparent border-b border-[var(--border-primary)] py-3 text-[var(--text-primary)] focus:border-[#A18058] outline-none transition-all font-light" placeholder="Inserisca il Suo nome" />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Email</label>
                                      <input type="email" className="w-full bg-transparent border-b border-[var(--border-primary)] py-3 text-[var(--text-primary)] focus:border-[#A18058] outline-none transition-all font-light" placeholder="indirizzo@email.com" />
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Interesse</label>
                                  <select className="w-full bg-transparent border-b border-[var(--border-primary)] py-3 text-[var(--text-secondary)] focus:border-[#A18058] outline-none transition-all font-light appearance-none">
                                      <option className="bg-[var(--bg-secondary)]">Acquisto Lusso</option>
                                      <option className="bg-[var(--bg-secondary)]">Vendita Asset</option>
                                      <option className="bg-[var(--bg-secondary)]">Affitto Estivo</option>
                                      <option className="bg-[var(--bg-secondary)]">Collaborazione</option>
                                  </select>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Messaggio</label>
                                  <textarea rows={4} className="w-full bg-transparent border-b border-[var(--border-primary)] py-3 text-[var(--text-primary)] focus:border-[#A18058] outline-none transition-all font-light resize-none" placeholder="Come possiamo aiutarLa?"></textarea>
                              </div>
                              <button className="btn-super-glow relative w-full bg-[#A18058] text-white py-6 rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden group hover:bg-white hover:text-[#1C1917] transition-colors">
                                  <div className="btn-inner-bg bg-[#A18058] group-hover:bg-white"></div>
                                  <span className="relative z-10 flex items-center justify-center gap-3">
                                      Invia Richiesta <ArrowRight size={16} />
                                  </span>
                              </button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default About;
