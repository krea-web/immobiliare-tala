
import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Shield, 
  TrendingUp, 
  Anchor,
  X,
  ArrowRight,
  Instagram,
  Bell,
  Eye,
  Navigation,
  Clock,
  Phone,
  MessageCircle,
  Heart,
  CalendarCheck,
  BarChart3,
  CheckCircle2,
  ThumbsUp,
  Star,
  PhoneCall,
  Map,
  Send,
  Camera,
  Briefcase,
  Menu,
  LogOut,
  ChevronRight,
  ChevronDown,
  Download,
  ShieldCheck,
  BedDouble,
  Bath,
  Search,
  History,
  Calendar,
  User,
  Save,
  AlertCircle,
  Mail
} from 'lucide-react';

const IGHome = () => (<svg aria-label="Home" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>);
const IGSearch = () => (<svg aria-label="Cerca" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>);
const IGAdd = () => (<svg aria-label="Nuovo post" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>);
const IGReels = () => (<svg aria-label="Reels" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>);
const IGHeart = () => (<svg aria-label="Mi piace" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>);
const IGComment = () => (<svg aria-label="Commenta" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>);
const IGShare = () => (<svg aria-label="Condividi post" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="2" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>);
const IGBookmark = () => (<svg aria-label="Salva" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>);
const IGMessenger = () => (<svg aria-label="Messenger" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1-9.9 9.9 9.718 9.718 0 0 1 9.9-9.9zm0 17.597a7.9 7.9 0 1 0-7.9-7.9 7.91 7.91 0 0 0 7.9 7.9zm2.446-11.838-5.32 2.822a1.002 1.002 0 0 0-.466.702l-1.036 5.86a.5.5 0 0 0 .584.582l5.86-1.036a1.002 1.002 0 0 0 .704-.466l2.822-5.32a.5.5 0 0 0-.847-.846l-4.464 2.37-2.37 4.465 4.527-4.527z"></path></svg>);

interface AboutUsProps {
  onClose: () => void;
  onOpenValuation?: () => void;
  onOpenBooking?: () => void;
  onOpenRentals?: () => void;
  onOpenSales?: () => void;
  initialScrollToContact?: boolean;
}

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

// --- INTERNAL COMPONENT: ValueCard ---
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
                        {React.cloneElement(val.icon, { className: "w-10 h-10 text-white group-hover:text-[#1C1917] transition-colors" })}
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

export default function AboutUs({ onClose, onOpenValuation, onOpenBooking, onOpenRentals, onOpenSales, initialScrollToContact }: AboutUsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  
  const [phoneRotate, setPhoneRotate] = useState({ x: 0, y: 0 });
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);
  const [expansionProgress, setExpansionProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  useEffect(() => {
    if (initialScrollToContact && contactSectionRef.current) {
        setTimeout(() => {
            contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 300); 
    }
  }, [initialScrollToContact]);

  const messagesData = [
    { name: "Marco V.", text: "Disponibile per Agosto?", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" },
    { name: "Sofia R.", text: "Prezzo Villa Pevero?", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" },
    { name: "James L.", text: "Any off-market listings?", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200" }
  ];

  const statsData = [
    { label: "Reach Mensile", value: "+124%", icon: BarChart3 },
    { label: "Nuovi Lead", value: "85", icon: TrendingUp },
    { label: "ROI Clienti", value: "18%", icon: CheckCircle2 }
  ];

  useEffect(() => {
    const handleScroll = () => {
        if (containerRef.current) {
            const scrollTop = containerRef.current.scrollTop;
            const progress = Math.min(Math.max(scrollTop / 600, 0), 1);
            setExpansionProgress(progress);
        }
    };
    
    const container = containerRef.current;
    if (container) {
        container.addEventListener('scroll', handleScroll);
    }
    return () => {
        if (container) {
            container.removeEventListener('scroll', handleScroll);
        }
    };
  }, []);

  useEffect(() => {
    const msgInterval = setInterval(() => {
        setActiveMessageIndex((prev) => (prev + 1) % messagesData.length);
    }, 4000);
    const statInterval = setInterval(() => {
        setActiveStatIndex((prev) => (prev + 1) % statsData.length);
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

  const handlePhoneMouseLeave = () => {
    setPhoneRotate({ x: 0, y: 0 });
    setIsHoveringPhone(false);
  };

  const feedItems = [
    { id: 2, image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop", title: "Attico Vista Mare", user: "immobiliaretala" },
    { id: 3, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop", title: "Residenza Cala D'Ambra", user: "immobiliaretala" },
    { id: 4, image: "https://images.unsplash.com/photo-1600596542815-e32c630bd138?q=80&w=600&auto=format&fit=crop", title: "Villa Pevero Golf", user: "immobiliaretala" },
    { id: 5, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop", title: "Stazzo Ristrutturato", user: "immobiliaretala" },
    { id: 6, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop", title: "Villa Sabina", user: "immobiliaretala" }
  ];
  const scrollingFeed = [...feedItems, ...feedItems];

  const values = [
    { icon: <MapPin />, title: "Intelligence Territoriale", desc: "Conosciamo ogni versante esposto al maestrale e ogni caletta segreta della costa sarda." },
    { icon: <Shield />, title: "Sicurezza Tecnica", desc: "Due diligence completa su ogni immobile per azzerare ogni rischio legale o tecnico." },
    { icon: <Anchor />, title: "Lifestyle Esclusivo", desc: "Accesso a un Private Club di proprietà che risuonano con la vostra visione del mondo." },
    { icon: <TrendingUp />, title: "Asset Management", desc: "Gestiamo la valorizzazione patrimoniale dei vostri asset attraverso il nostro Club privato." }
  ];

  const widgets = [
    { 
        id: 'msg', 
        targetX: -180, targetY: -320, 
        content: (
            <div className="bg-white/95 backdrop-blur-xl border border-white/60 p-5 rounded-2xl rounded-tr-sm shadow-[0_8px_40px_rgba(0,0,0,0.15)] flex gap-4 max-w-[280px] hover:scale-105 transition-transform cursor-default">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <img src={messagesData[activeMessageIndex].avatar} alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="text-sm font-bold text-[#1C1917]">{messagesData[activeMessageIndex].name}</p>
                    <p className="text-sm text-stone-600 leading-tight line-clamp-2 mt-1">{messagesData[activeMessageIndex].text}</p>
                </div>
            </div>
        ) 
    },
    { 
        id: 'notif', 
        targetX: 300, targetY: -240, 
        content: (
            <div className="bg-white/95 backdrop-blur-xl border border-white/60 px-6 py-4 rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.15)] flex items-center gap-4 hover:scale-105 transition-transform cursor-default">
                <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 border-2 border-white flex items-center justify-center text-lg shadow-sm">🔥</div>
                    <div className="w-10 h-10 rounded-full bg-red-50 border-2 border-white flex items-center justify-center text-lg shadow-sm">😍</div>
                </div>
                <span className="text-sm font-bold text-stone-800">Interessi Club</span>
            </div>
        ) 
    },
    { 
        id: 'calendar', 
        targetX: -180, targetY: 300, 
        content: (
            <div className="bg-[#1C1917]/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl text-white w-[240px] border border-white/10 hover:scale-105 transition-transform cursor-default">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#A18058] flex items-center justify-center shadow-lg">
                        <CalendarCheck size={24} className="text-white" />
                    </div>
                    <span className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded text-[#A18058]">10:30</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-1">Visita Confermata</p>
                <p className="text-lg font-serif">Villa Pevero</p>
            </div>
        ) 
    },
    { 
        id: 'stats', 
        targetX: 340, targetY: -60, 
        content: (
            <div className="bg-white/95 backdrop-blur-xl border border-stone-200 p-5 rounded-2xl shadow-xl flex items-center gap-5 hover:scale-105 transition-transform cursor-default">
                <div className="p-3 bg-stone-50 rounded-full">
                    {React.createElement(statsData[activeStatIndex].icon, { className: "text-[#A18058]", size: 28 })}
                </div>
                <div>
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{statsData[activeStatIndex].label}</p>
                        <p className="text-2xl font-serif text-[#1C1917] font-bold">{statsData[activeStatIndex].value}</p>
                </div>
            </div>
        ) 
    },
    { 
        id: 'call', 
        targetX: 340, targetY: 120, 
        content: (
            <div className="bg-green-600/90 backdrop-blur-xl border border-green-500/50 p-4 pr-8 rounded-full shadow-2xl flex items-center gap-5 text-white hover:scale-105 transition-transform cursor-default">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                     <PhoneCall size={24} />
                </div>
                <div>
                     <p className="text-[10px] font-bold uppercase tracking-widest opacity-90">Chiamata Protetta</p>
                     <p className="text-base font-bold">Membro Platinum</p>
                </div>
            </div>
        ) 
    },
    { 
        id: 'map', 
        targetX: 140, targetY: -360, 
        content: (
            <div className="bg-white/95 backdrop-blur-xl border border-white/60 p-3 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] flex flex-col items-center gap-3 w-[140px] hover:scale-105 transition-transform cursor-default">
                 <div className="w-full h-20 bg-stone-100 rounded-xl overflow-hidden relative border border-stone-200">
                     <div className="absolute inset-0 bg-stone-200 flex items-center justify-center">
                         <Map size={24} className="text-stone-400" />
                     </div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#A18058] rounded-full ring-4 ring-white shadow-sm"></div>
                 </div>
                 <p className="text-xs font-bold text-stone-800 uppercase tracking-wide">Area Riservata</p>
            </div>
        ) 
    },
    { 
        id: 'review', 
        targetX: 240, targetY: 320, 
        content: (
            <div className="bg-white/95 backdrop-blur-xl border border-white/60 px-8 py-4 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform cursor-default">
                <div className="flex gap-1.5 text-[#A18058] mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm font-bold text-stone-800">Asset Certificato</p>
            </div>
        ) 
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAF9] animate-in fade-in duration-300 flex flex-col font-sans overflow-hidden">
      
      <style>{`
        @keyframes scrollVertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-vertical {
          animation: scrollVertical 20s linear infinite;
        }
        
        /* INSTAGRAM GLOW ANIMATION */
        @keyframes ig-super-spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .btn-ig-glow {
            position: relative;
            overflow: hidden;
            isolation: isolate;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            background-clip: padding-box;
            border: 2px solid transparent;
        }

        .btn-ig-glow::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300%;
            height: 300%;
            background: conic-gradient(
                from 0deg,
                #f09433 0%,
                #e6683c 25%,
                #dc2743 50%,
                #cc2366 75%,
                #bc1888 100%
            );
            animation: ig-super-spin 2s linear infinite;
            z-index: -2;
            opacity: 0.9;
            filter: blur(5px);
        }

        .btn-ig-glow:hover::before {
            animation-duration: 1s;
            filter: blur(10px);
            opacity: 1;
        }
      `}</style>

      {/* Close Button Header */}
      <div className="absolute top-0 left-0 w-full h-24 flex items-center justify-between px-8 z-[110] pointer-events-none">
          <div className="pointer-events-auto">
             <button onClick={onClose} className="w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-stone-900 hover:bg-[#1C1917] hover:text-white transition-all">
                <X size={24} />
             </button>
          </div>
          <div className="hidden md:flex gap-4 pointer-events-auto">
             <button onClick={onOpenValuation} className="px-6 py-2.5 bg-[#1C1917] text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg transition-all hover:bg-[#A18058]">Valuta Asset</button>
             <button onClick={onOpenBooking} className="px-6 py-2.5 bg-[#A18058] text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg transition-all hover:bg-[#1C1917]">Private Club Visit</button>
          </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto overflow-x-hidden w-full relative pt-24 custom-scrollbar" onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}>
         
         <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] z-0">
                <span className="font-serif text-[60rem] leading-none text-stone-900">T</span>
            </div>

            <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="hidden lg:block lg:col-span-1 h-full relative">
                    <div className="absolute top-0 left-0 origin-top-left rotate-90 translate-x-4 whitespace-nowrap">
                        <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#A18058] border-b border-[#A18058] pb-1">
                            TALA PRIVATE CLUB • 2025
                        </span>
                    </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                    <div className="overflow-hidden">
                        <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif leading-[0.9] text-[#1C1917] tracking-tighter italic animate-in fade-in slide-in-from-bottom-20 duration-1000">
                           Oltre la <br/>
                           <span className="not-italic font-bold text-stone-400">Mediazione.</span>
                        </h1>
                    </div>
                    
                    <div className="max-w-md animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                        <p className="text-xl text-stone-500 font-light leading-relaxed mb-10">
                            Non siamo semplici agenti, ma <strong>curatori del Club Privato Tala</strong>. Trasformiamo la gestione patrimoniale in un privilegio d'élite in Sardegna.
                        </p>
                        
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-6 group cursor-pointer" onClick={onOpenBooking}>
                                <div className="w-16 h-16 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-[#1C1917] group-hover:border-[#1C1917] group-hover:text-white transition-all duration-500">
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#A18058]">Consulenza Privata</p>
                                    <p className="text-sm font-bold text-[#1C1917]">Entra nel Suo Spazio Riservato</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 relative mt-12 lg:mt-0">
                    <div className="relative z-10 perspective-[2000px]">
                        <div 
                            className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-[12px] border-white transition-transform duration-700 ease-out"
                            style={{ transform: `translateY(${scrollY * -0.05}px) rotateY(-5deg)` }}
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop" 
                                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s]"
                                alt="Founders Vision"
                            />
                        </div>
                        <div 
                            className="absolute -bottom-10 -left-10 bg-[#1C1917] text-white p-10 rounded-[2rem] shadow-2xl animate-in zoom-in duration-1000 delay-500"
                            style={{ transform: `translateY(${scrollY * 0.02}px)` }}
                        >
                            <span className="font-serif italic text-4xl block mb-2 text-[#A18058]">Andrea Tala</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-6">Private Club Founder</span>
                            <div className="w-12 h-px bg-white/20"></div>
                        </div>
                    </div>
                    <div className="absolute -top-10 -right-10 w-full h-full bg-[#A18058]/5 rounded-[3rem] -z-10"></div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Il Nostro Manifesto</span>
                <div className="w-px h-12 bg-stone-900 animate-pulse"></div>
            </div>
         </div>

         <section className="py-32 bg-[#1C1917] text-[#FAFAF9] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#A18058] rounded-full blur-[200px] opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#A18058] rounded-full blur-[150px] opacity-[0.05] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
             
             <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <span className="text-[#A18058] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Manifesto</span>
                    <h2 className="text-4xl md:text-6xl font-serif mb-6">Filosofia <span className="italic text-[#A18058]">Tala Club.</span></h2>
                    <p className="text-stone-400 max-w-2xl mx-auto font-light leading-relaxed text-base">
                        Sosteniamo l'eccellenza immobiliare attraverso un accesso esclusivo e riservato ai patrimoni più distintivi della Sardegna.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {values.map((val, idx) => (
                        <ValueCard key={idx} val={val} index={idx} />
                    ))}
                </div>
             </div>
         </section>

         {/* RE-STYLED SOCIAL MEDIA SECTION - BLACK BG & INSTAGRAM VIBES */}
         <section className="py-32 bg-black relative overflow-hidden">
             {/* Dynamic Instagram Gradient Glows */}
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f09433] rounded-full blur-[180px] opacity-[0.08] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#bc1888] rounded-full blur-[180px] opacity-[0.1] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>

             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Text Content */}
                <div className="lg:col-span-6 space-y-8 animate-in slide-in-from-left duration-700 order-2 lg:order-1 relative z-30">
                    <div className="flex items-center gap-3 mb-2">
                         <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] p-px shadow-lg">
                            <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                                <Instagram className="text-white" size={24} />
                            </div>
                         </div>
                         <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-500">Social Excellence</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter">
                        L'immobiliare <br/>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] to-[#bc1888] italic">Sui Social.</span>
                    </h2>

                    <p className="text-lg text-stone-400 leading-relaxed font-light max-w-lg">
                        Non pubblichiamo annunci, creiamo desiderio. La nostra strategia digitale trasforma ogni immobile del Suo portafoglio privato in un'esperienza visiva irresistibile.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <a 
                            href="https://www.instagram.com/immobiliaretala/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-ig-glow group relative bg-black text-white px-10 py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-3 overflow-hidden"
                        >
                            <div className="btn-inner-bg bg-black"></div>
                            <Instagram className="w-5 h-5 relative z-10" /> 
                            <span className="relative z-10">Follow the Aesthetic</span>
                        </a>
                    </div>
                </div>

                {/* Phone Mockup with EXPLODING WIDGETS */}
                <div className="lg:col-span-6 relative flex justify-center items-center lg:justify-end py-10 order-1 lg:order-2 perspective-[1500px] min-h-[800px]">
                    
                    {/* WIDGETS CONTAINER */}
                    <div className="absolute top-1/2 left-1/2 lg:left-3/4 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none z-10 hidden md:block">
                        {widgets.map((widget, i) => {
                            const currentX = widget.targetX * expansionProgress;
                            const currentY = widget.targetY * expansionProgress;
                            const scale = 0.5 + (0.5 * expansionProgress); 
                            const opacity = expansionProgress; 
                            const floatY = expansionProgress > 0.8 ? Math.sin(scrollY * 0.005 + i) * 10 : 0;

                            return (
                                <div 
                                    key={widget.id}
                                    className="absolute transition-transform duration-500 ease-out origin-center"
                                    style={{
                                        transform: `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY + floatY}px)) scale(${scale})`,
                                        opacity: opacity,
                                        zIndex: 10 
                                    }}
                                >
                                    {widget.content}
                                </div>
                            );
                        })}
                    </div>

                    {/* The Phone */}
                    <div 
                        className="group relative w-[320px] h-[650px] bg-black rounded-[3.5rem] border-[10px] border-[#1C1917] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden z-30 ring-1 ring-white/10 transition-all duration-100 ease-linear"
                        onMouseMove={handlePhoneMouseMove}
                        onMouseLeave={handlePhoneMouseLeave}
                        style={{
                            transform: `rotateX(${phoneRotate.x}deg) rotateY(${phoneRotate.y}deg) scale3d(${isHoveringPhone ? 1.02 : 1}, ${isHoveringPhone ? 1.02 : 1}, 1)`,
                            transition: isHoveringPhone ? 'none' : 'all 0.5s ease-out'
                        }}
                    >
                        <div className="absolute top-0 w-full h-12 bg-white/95 backdrop-blur z-20 flex justify-between items-center px-6 pt-2 select-none">
                            <span className="text-[10px] font-bold">19:20</span>
                            <div className="w-24 h-6 bg-black rounded-b-[1.5rem] absolute left-1/2 -translate-x-1/2 top-0"></div>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                <div className="w-3 h-3 border border-black rounded-full"></div>
                            </div>
                        </div>

                        <div className="absolute top-12 w-full h-12 bg-white border-b border-stone-100 z-20 flex justify-between items-center px-4 select-none">
                            <div className="font-serif italic font-bold text-lg">ImmobiliareTala</div>
                            <div className="flex gap-3">
                                <IGHeart />
                                <IGMessenger />
                            </div>
                        </div>

                        <div className="w-full h-full bg-white pt-24 pb-16 overflow-hidden relative">
                            <div className="animate-scroll-vertical w-full group-hover:[animation-play-state:paused]">
                                {scrollingFeed.map((item, idx) => (
                                    <div key={`${item.id}-${idx}`} className="mb-4 bg-white border-b border-stone-100 pb-2">
                                        <div className="flex items-center gap-2 px-3 py-2">
                                            <div className="w-8 h-8 rounded-full bg-stone-200 overflow-hidden border border-stone-100">
                                                <div className="w-full h-full flex items-center justify-center bg-[#1C1917] text-white text-[10px] font-serif italic">T</div>
                                            </div>
                                            <span className="text-xs font-bold">{item.user}</span>
                                        </div>
                                        <img src={item.image} alt={item.title} className="w-full aspect-square object-cover" />
                                        <div className="px-3 py-2 text-[#1C1917]">
                                            <div className="flex justify-between mb-2">
                                                <div className="flex gap-3">
                                                    <IGHeart />
                                                    <IGComment />
                                                    <IGShare />
                                                </div>
                                                <IGBookmark />
                                            </div>
                                            <p className="text-xs"><span className="font-bold">{item.user}</span> {item.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="absolute bottom-0 w-full h-16 bg-white border-t border-stone-100 z-20 flex justify-around items-center pb-2 select-none">
                            <IGHome />
                            <IGSearch />
                            <IGAdd />
                            <IGReels />
                            <div className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center text-[8px] font-serif italic">T</div>
                        </div>
                    </div>
                </div>
             </div>
         </section>

         <section ref={contactSectionRef} className="py-24 bg-[#FAFAF9] border-t border-stone-200 scroll-mt-24">
             <div className="max-w-6xl mx-auto px-6">
                 <div className="flex flex-col lg:flex-row gap-8">
                     <div className="lg:w-2/3 bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-stone-100 flex flex-col md:flex-row h-[500px]">
                         <div className="md:w-1/3 p-10 flex flex-col justify-center bg-white relative z-10">
                             <div className="inline-flex items-center gap-2 text-[#A18058] mb-6">
                                 <MapPin size={18} />
                                 <span className="text-xs font-bold uppercase tracking-widest">Sede Private Club</span>
                             </div>
                             <h2 className="text-3xl font-serif text-[#1C1917] mb-6">Consulting Room</h2>
                             <div className="space-y-6">
                                 <div>
                                     <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-1">Indirizzo</p>
                                     <p className="text-stone-800 font-medium leading-relaxed">
                                         Viale Murta Maria, 70<br/>
                                         07026 Olbia (SS)<br/>
                                         Sardegna, Italia
                                     </p>
                                 </div>
                                 <div>
                                     <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-1">Orari Riservati</p>
                                     <div className="flex items-center gap-2 text-stone-600 text-sm">
                                         <Clock size={14} className="text-[#A18058]" />
                                         <span>Lun - Ven: Su Appuntamento</span>
                                     </div>
                                 </div>
                                 <div className="pt-4">
                                    <a 
                                        href="https://www.google.com/maps/search/?api=1&query=Viale+Murta+Maria+70+Olbia" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-[#1C1917] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#A18058] transition-colors"
                                    >
                                        <Navigation size={14} /> Percorso Private Club
                                    </a>
                                 </div>
                             </div>
                         </div>
                         <div className="md:w-2/3 relative bg-stone-100">
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.767073245645!2d9.5830000!3d40.8930000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d93260c04f9331%3A0x8797378772370c72!2sViale%20Murta%20Maria%2C%2070%2C%2007026%20Murta%20Maria%20SS!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
                                title="Mappa Sede Immobiliare Tala"
                             ></iframe>
                         </div>
                     </div>

                     <div className="lg:w-1/3 flex flex-col gap-6">
                        <div className="bg-[#1C1917] text-white p-8 rounded-[2.5rem] flex-1 flex flex-col justify-between shadow-xl">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A18058] mb-4">Advisor Privati</p>
                                <h3 className="text-2xl font-serif mb-6">I Tuoi Broker</h3>
                            </div>
                            <div className="space-y-6">
                                {AGENTS.map(agent => (
                                    <div key={agent.id} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/20">
                                            <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-serif text-lg leading-none mb-1">{agent.name}</p>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-3">{agent.role}</p>
                                            <div className="flex gap-2">
                                                <a href={`tel:${agent.phone}`} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A18058] transition-colors" title="Chiama">
                                                    <Phone size={14} />
                                                </a>
                                                <a href={`mailto:${agent.email}`} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A18058] transition-colors" title="Email">
                                                    <Mail size={14} />
                                                </a>
                                                <button onClick={onOpenBooking} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A18058] transition-colors" title="Prenota Visita">
                                                    <CalendarCheck size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                     </div>
                 </div>
             </div>
         </section>
         
         <section className="py-32 bg-[#0C0A09] px-6 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-[#A18058] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-serif mb-10 text-white leading-tight">
                    Accedi al Suo <br/> 
                    <span className="italic text-[#A18058]">Futuro Riservato.</span>
                </h2>
                
                <div className="relative inline-block group/btn">
                    <div className="absolute inset-0 bg-[#A18058] rounded-full blur-2xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-500 scale-110"></div>
                    <button 
                        onClick={onOpenSales}
                        className="btn-super-glow relative bg-white text-[#1C1917] px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl transition-transform active:scale-95 flex items-center gap-3"
                    >
                        Esplora Club Assets <ArrowRight size={16} />
                    </button>
                </div>
            </div>
         </section>

         <footer className="bg-white py-12 border-t border-stone-100 text-center text-stone-400 text-[10px] uppercase tracking-widest font-bold">
            <p>© 2025 Immobiliare Tala S.r.l. - Exclusive Sardinia Real Estate</p>
         </footer>
      </div>
    </div>
  );
}
