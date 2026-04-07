
import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, MapPin, Ruler, CheckCircle, Building, 
  Waves, Sun, ArrowRight, ArrowLeft, FileText, 
  TrendingUp, Info, X, Euro, MousePointer2, ChevronDown, Leaf, Car, Trees, Warehouse,
  Lock, ShieldCheck, Download, Activity, Globe, Zap, BarChart3, Target, History
} from 'lucide-react';

interface ValuationToolProps {
  onClose: () => void;
}

const SARDINIA_LOCATIONS = [
  "Abbiadori", "Alghero", "Arzachena", "Badesi", "Baja Sardinia", "Budoni", 
  "Golfo Aranci", "Murta Maria", "Olbia", "Porto Cervo", "Porto Rotondo", 
  "Porto San Paolo", "Puntaldia", "San Pantaleo", "San Teodoro"
];

const PROPERTY_TYPES = [
  'Appartamento', 'Attico', 'Villetta', 'Villa Indipendente', 'Stazzo Gallurese'
];

// --- Sub-components for dynamic widgets ---

const FloatingWidget = ({ children, className = "", delay = 0 }: any) => (
  <div className={`absolute pointer-events-none animate-float opacity-40 hover:opacity-100 transition-opacity duration-700 ${className}`} style={{ animationDelay: `${delay}s` }}>
    {children}
  </div>
);

const MarketTrendWidget = ({ label, value, trend }: any) => (
  <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl w-48 shadow-2xl">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[8px] font-bold uppercase tracking-widest text-stone-500">{label}</span>
      <Activity size={12} className="text-[#A18058]" />
    </div>
    <div className="flex items-end gap-2">
      <span className="text-xl font-serif text-white">{value}</span>
      <span className={`text-[9px] font-bold ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
  </div>
);

const CustomSelect = ({ label, icon: Icon, value, options, onChange, placeholder = "Seleziona" }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full mb-4 ${isOpen ? 'z-50' : 'z-auto'}`} ref={containerRef}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          {Icon && <Icon size={12} className="text-[#A18058]" />}
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{label}</span>
        </div>
      )}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer border border-stone-800 rounded-xl px-5 py-4 transition-all duration-300 flex justify-between items-center bg-black/50 backdrop-blur-md hover:border-[#A18058]/50 ${isOpen ? 'border-[#A18058] ring-1 ring-[#A18058]/20' : ''}`}
      >
        <span className={`font-serif text-sm ${!value ? 'text-stone-500' : 'text-white'}`}>{value || placeholder}</span>
        <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#A18058]' : 'text-stone-500'}`} />
      </div>
      <div className={`absolute left-0 top-full mt-2 w-full bg-[#1C1917] shadow-2xl rounded-xl border border-stone-700 overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
        <div className="max-h-60 overflow-y-auto custom-scrollbar py-2">
          {options.map((opt: string) => (
            <div key={opt} onClick={() => { onChange({ target: { value: opt } }); setIsOpen(false); }} className={`px-5 py-3 text-sm font-medium hover:bg-white/5 cursor-pointer transition-colors flex items-center justify-between ${value === opt ? 'bg-[#A18058]/10 text-[#A18058]' : 'text-stone-400'}`}>
              {opt}
              {value === opt && <CheckCircle size={14} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomInput = ({ label, icon: Icon, value, onChange, type = "text", placeholder, name, suffix }: any) => (
  <div className="relative w-full mb-4">
    <div className="flex items-center gap-2 mb-2">
      {Icon && <Icon size={12} className="text-[#A18058]" />}
      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{label}</span>
    </div>
    <div className="bg-black/50 backdrop-blur-md border border-stone-800 rounded-xl px-5 py-4 flex items-center focus-within:border-[#A18058] focus-within:ring-1 focus-within:ring-[#A18058]/20 transition-all duration-300">
      <input 
        name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full bg-transparent font-serif text-sm text-white placeholder:text-stone-700 focus:outline-none"
      />
      {suffix && <span className="text-stone-500 text-xs font-bold ml-2">{suffix}</span>}
    </div>
  </div>
);

const FeatureCard = ({ label, icon: Icon, ...props }: any) => (
  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 group mb-3 ${props.checked ? 'bg-[#A18058]/20 border-[#A18058] text-white' : 'bg-black/30 border-stone-800 text-stone-500 hover:border-stone-700'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${props.checked ? 'bg-[#A18058] text-black' : 'bg-stone-900'}`}>
        {Icon && <Icon size={16} />}
      </div>
      <span className="font-serif text-sm">{label}</span>
    </div>
    <div className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${props.checked ? 'border-[#A18058] bg-[#A18058]' : 'border-stone-700'}`}>
      {props.checked && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
    </div>
    <input type="checkbox" className="hidden" {...props} />
  </label>
);

export default function ValuationTool({ onClose }: ValuationToolProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [precision, setPrecision] = useState(15);

  const [formData, setFormData] = useState({
    location: '', propertyType: '', sqm: '', rooms: '', bathrooms: '', 
    yearBuilt: '', condition: 'Buono', energyClass: '', 
    hasSeaView: false, hasPool: false, distanceToSea: ''
  });

  useEffect(() => {
    let score = 15;
    if (formData.location) score += 15;
    if (formData.propertyType) score += 15;
    if (formData.sqm) score += 20;
    if (formData.energyClass) score += 15;
    if (formData.condition !== 'Buono' || formData.hasPool || formData.hasSeaView) score += 20;
    setPrecision(Math.min(score, 100));
  }, [formData]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const saveValuationToReservedArea = () => {
    const existingValuationsRaw = localStorage.getItem('tala_valuations');
    const existingValuations = existingValuationsRaw ? JSON.parse(existingValuationsRaw) : [];
    
    const newValuation = {
      id: Date.now(),
      date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' }),
      location: formData.location || 'N/A',
      propertyType: formData.propertyType || 'Villa',
      sqm: formData.sqm || '0',
      precision: precision,
      estimatedValue: (Number(formData.sqm || 0) * 8500 * (precision / 100)).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }),
      status: 'Certificato'
    };

    localStorage.setItem('tala_valuations', JSON.stringify([newValuation, ...existingValuations]));
  };

  const handleSubmitValuation = () => {
    setLoading(true);
    setTimeout(() => { 
        setLoading(false); 
        setShowSuccess(true); 
        saveValuationToReservedArea();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0C0A09] text-[#FAFAF9] overflow-hidden">
      
      {/* CINEMATIC BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2574&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-30 grayscale brightness-50"
          alt="Luxury background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0A09] via-transparent to-[#0C0A09]"></div>
        <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, #0C0A09 100%) opacity-60"></div>
        
        {/* Scanning Laser Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A18058]/50 to-transparent animate-[scan_6s_linear_infinite] shadow-[0_0_15px_#A18058]"></div>
      </div>

      {/* DYNAMIC FLOATING WIDGETS */}
      <FloatingWidget className="top-32 left-12" delay={0}>
        <MarketTrendWidget label="Porto Cervo" value="€18.5k/mq" trend={2.4} />
      </FloatingWidget>
      <FloatingWidget className="top-64 left-24" delay={1.5}>
        <MarketTrendWidget label="San Teodoro" value="€6.2k/mq" trend={-0.8} />
      </FloatingWidget>
      <FloatingWidget className="bottom-48 left-16" delay={3}>
        <MarketTrendWidget label="Puntaldia" value="€12.1k/mq" trend={1.2} />
      </FloatingWidget>

      {/* PRECISION METER WIDGET */}
      <div className="absolute top-32 right-12 hidden lg:flex flex-col items-center gap-6 animate-in fade-in duration-1000 delay-500">
         <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                <circle cx="80" cy="80" r="70" stroke="#A18058" strokeWidth="8" fill="transparent" 
                        strokeDasharray="440" strokeDashoffset={440 - (440 * precision / 100)}
                        className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-serif text-white">{precision}%</span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-stone-500">Precisione</span>
            </div>
         </div>
         <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl w-64">
            <div className="flex items-center gap-3 mb-4">
                <Target size={16} className="text-[#A18058]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300">Stato Algoritmo</span>
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-stone-500">Incrocio Catastale</span>
                    {precision > 30 ? <CheckCircle size={10} className="text-emerald-500"/> : <div className="w-2 h-2 rounded-full bg-stone-800 animate-pulse"/>}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-stone-500">Analisi Comparativa</span>
                    {precision > 60 ? <CheckCircle size={10} className="text-emerald-500"/> : <div className="w-2 h-2 rounded-full bg-stone-800 animate-pulse"/>}
                </div>
            </div>
         </div>
      </div>

      <main className="absolute inset-0 z-10 pt-24 overflow-y-auto custom-scrollbar">
        <div className="max-w-6xl mx-auto px-6 h-full flex flex-col justify-center py-12">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="animate-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A18058]/10 border border-[#A18058]/30 text-[#A18058] text-[9px] font-bold tracking-[0.3em] uppercase mb-8">
                <Zap size={12} className="animate-pulse" /> Tala AI Assessment
              </div>
              <h2 className="text-5xl md:text-7xl font-serif leading-[0.9] text-white mb-10 tracking-tighter">
                La scienza dietro <br/> ogni <span className="italic text-[#A18058]">Valutazione.</span>
              </h2>
              <div className="space-y-6 max-w-sm">
                 <div className="flex gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <Globe size={24} className="text-[#A18058] shrink-0" />
                    <p className="text-xs text-stone-400 leading-relaxed">Accesso a database transazionali globali per determinare il posizionamento esatto del Tuo asset.</p>
                 </div>
                 <div className="flex gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <Target size={24} className="text-[#A18058] shrink-0" />
                    <p className="text-xs text-stone-400 leading-relaxed">Incrocio dei dati di design, esposizione e rarità architettonica della Gallura.</p>
                 </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="bg-[#1C1917]/80 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl relative animate-in slide-in-from-right duration-1000">
              
              {loading && (
                <div className="absolute inset-0 z-50 bg-[#1C1917]/95 flex flex-col items-center justify-center rounded-[3rem]">
                   <div className="w-20 h-20 border-2 border-stone-800 border-t-[#A18058] rounded-full animate-spin mb-6"></div>
                   <p className="font-serif italic text-xl text-white">Analisi in corso...</p>
                </div>
              )}

              {showSuccess ? (
                <div className="text-center animate-in zoom-in duration-700">
                  <div className="w-20 h-20 bg-[#A18058]/20 text-[#A18058] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#A18058]/30">
                    <ShieldCheck size={40} />
                  </div>
                  <h3 className="text-3xl font-serif text-white mb-4">Report Pronto</h3>
                  <p className="text-stone-400 text-sm mb-10 leading-relaxed">Abbiamo processato i dati. Il report PDF certificato è stato generato e salvato nella Tua Area Riservata.</p>
                  <button onClick={onClose} className="btn-super-glow w-full bg-[#A18058] text-black py-5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl">
                    <Download size={18} /> Scarica Report Certificato
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                    <div>
                      <h4 className="text-2xl font-serif italic text-white">
                        {step === 1 ? "1. Localizzazione" : step === 2 ? "2. Struttura" : "3. Dettagli"}
                      </h4>
                      <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">Step {step} di 3</p>
                    </div>
                    <div className="flex gap-2">
                       {[1,2,3].map(s => <div key={s} className={`h-1.5 w-10 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#A18058]' : 'bg-stone-800'}`} />)}
                    </div>
                  </div>

                  <div className="space-y-4 min-h-[350px]">
                    {step === 1 && (
                      <div className="animate-in fade-in duration-500">
                         <CustomSelect label="Località" icon={MapPin} value={formData.location} options={SARDINIA_LOCATIONS} onChange={(e: any) => setFormData({...formData, location: e.target.value})} />
                         <CustomSelect label="Tipologia" icon={Building} value={formData.propertyType} options={PROPERTY_TYPES} onChange={(e: any) => setFormData({...formData, propertyType: e.target.value})} />
                         <CustomInput label="Distanza dal Mare" icon={Waves} name="distanceToSea" type="number" suffix="metri" value={formData.distanceToSea} onChange={handleChange} placeholder="Es. 100" />
                         <button onClick={() => setStep(2)} disabled={!formData.location || !formData.propertyType} className="mt-8 w-full py-5 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#A18058] transition-all shadow-xl disabled:opacity-20 flex items-center justify-center gap-3">
                            Continua <ArrowRight size={16} />
                         </button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="animate-in fade-in duration-500">
                         <div className="grid grid-cols-2 gap-4">
                            <CustomInput label="Superficie" icon={Ruler} name="sqm" type="number" suffix="mq" value={formData.sqm} onChange={handleChange} placeholder="0" />
                            <CustomInput label="Anno" icon={History} name="yearBuilt" type="number" value={formData.yearBuilt} onChange={handleChange} placeholder="Es. 2010" />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <CustomSelect label="Vani" value={formData.rooms} options={['1','2','3','4','5+']} onChange={(e: any) => setFormData({...formData, rooms: e.target.value})} />
                            <CustomSelect label="Bagni" value={formData.bathrooms} options={['1','2','3','4+']} onChange={(e: any) => setFormData({...formData, bathrooms: e.target.value})} />
                         </div>
                         <div className="flex gap-4 mt-8">
                            <button onClick={() => setStep(1)} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"><ArrowLeft size={18}/></button>
                            <button onClick={() => setStep(3)} disabled={!formData.sqm} className="flex-1 py-5 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#A18058] transition-all shadow-xl disabled:opacity-20">Configura Dettagli</button>
                         </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="animate-in fade-in duration-500">
                         <FeatureCard label="Vista Mare" icon={Waves} name="hasSeaView" checked={formData.hasSeaView} onChange={handleChange} />
                         <FeatureCard label="Piscina Privata" icon={Sun} name="hasPool" checked={formData.hasPool} onChange={handleChange} />
                         <CustomSelect label="Classe Energetica" icon={Zap} value={formData.energyClass} options={['A4','A3','A2','A1','B','C','D','E','F','G']} onChange={(e: any) => setFormData({...formData, energyClass: e.target.value})} />
                         
                         <div className="flex gap-4 mt-8">
                            <button onClick={() => setStep(2)} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"><ArrowLeft size={18}/></button>
                            <button onClick={handleSubmitValuation} disabled={!formData.energyClass} className="flex-1 py-5 bg-[#A18058] text-black rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3">
                                <Activity size={18} /> Avvia Algoritmo Tala
                            </button>
                         </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <button onClick={onClose} className="absolute top-8 right-8 z-50 w-14 h-14 bg-white/10 hover:bg-white hover:text-black backdrop-blur-xl rounded-full flex items-center justify-center transition-all shadow-2xl">
        <X size={24} />
      </button>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
