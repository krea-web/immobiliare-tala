import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, MapPin, Ruler, CheckCircle, Building, 
  ArrowRight, ArrowLeft, FileText, 
  TrendingUp, Info, Euro, ChevronDown, 
  ShieldCheck, Target, Zap, Loader2
} from 'lucide-react';
import SEO from '../components/SEO';

const SARDINIA_LOCATIONS = [
  "Abbiadori", "Alghero", "Arzachena", "Badesi", "Baja Sardinia", "Budoni", 
  "Golfo Aranci", "Murta Maria", "Olbia", "Porto Cervo", "Porto Rotondo", 
  "Porto San Paolo", "Puntaldia", "San Pantaleo", "San Teodoro"
];

const PROPERTY_TYPES = [
  'Appartamento', 'Attico', 'Villetta', 'Villa Indipendente', 'Stazzo Gallurese'
];

const Valuation: React.FC = () => {
  const navigate = useNavigate();
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

  const handleSubmitValuation = () => {
    setLoading(true);
    setTimeout(() => { 
        setLoading(false); 
        setShowSuccess(true); 
    }, 2500);
  };

  return (
    <div className="pt-20 min-h-screen bg-[#0C0A09] text-white overflow-x-hidden">
      <SEO 
        title="Valuta il tuo Immobile" 
        description="Ottieni una valutazione professionale e accurata del tuo immobile in Sardegna grazie al nostro algoritmo avanzato e alla nostra esperienza decennale."
      />
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2574&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-20 grayscale"
          alt="Luxury background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0A09] via-transparent to-[#0C0A09]"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="animate-in slide-in-from-left duration-1000">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A18058]/10 border border-[#A18058]/30 text-[#A18058] text-[9px] font-bold tracking-[0.3em] uppercase mb-8">
              <Zap size={12} className="animate-pulse" /> Tala AI Assessment
            </span>
            <h1 className="text-4xl md:text-7xl font-serif leading-[1.1] text-white mb-8 tracking-tighter">
              La scienza dietro <br/> ogni <span className="italic text-[#A18058]">Valutazione.</span>
            </h1>
            <p className="text-stone-400 text-lg font-light leading-relaxed max-w-md mb-12">
              Utilizziamo algoritmi proprietari e dati transazionali in tempo reale per determinare il valore di mercato del tuo asset d'élite.
            </p>
            
            <div className="hidden md:grid grid-cols-2 gap-8">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <Target className="text-[#A18058] mb-4" />
                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Precisione</h3>
                <p className="text-xs text-stone-500">Analisi granulare del micro-mercato locale.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <ShieldCheck className="text-[#A18058] mb-4" />
                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Certificazione</h3>
                <p className="text-xs text-stone-500">Valutazione asseverata dai nostri esperti.</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl animate-in slide-in-from-right duration-1000">
            {!showSuccess ? (
              <div className="space-y-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-serif italic mb-8">Dove si trova l'asset?</h3>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2 block">Località</label>
                      <select 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#A18058] outline-none transition-all"
                      >
                        <option value="">Seleziona Località</option>
                        {SARDINIA_LOCATIONS.map(loc => <option key={loc} value={loc} className="bg-stone-900">{loc}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2 block">Tipologia</label>
                      <select 
                        name="propertyType" 
                        value={formData.propertyType} 
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#A18058] outline-none transition-all"
                      >
                        <option value="">Seleziona Tipologia</option>
                        {PROPERTY_TYPES.map(type => <option key={type} value={type} className="bg-stone-900">{type}</option>)}
                      </select>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!formData.location || !formData.propertyType}
                      className="w-full bg-white text-[#1C1917] py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#A18058] hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      Continua <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <button onClick={() => setStep(1)} className="text-stone-500 hover:text-white flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-4">
                      <ArrowLeft size={14} /> Indietro
                    </button>
                    <h3 className="text-2xl font-serif italic mb-8">Dettagli Tecnici</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2 block">Superficie (mq)</label>
                        <input 
                          type="number" name="sqm" value={formData.sqm} onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#A18058] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2 block">Classe Energetica</label>
                        <select 
                          name="energyClass" value={formData.energyClass} onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#A18058] outline-none transition-all"
                        >
                          <option value="" className="bg-stone-900">Seleziona</option>
                          {['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map(c => <option key={c} value={c} className="bg-stone-900">{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={handleSubmitValuation}
                      disabled={loading}
                      className="w-full bg-[#A18058] text-white py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#1C1917] transition-all flex items-center justify-center gap-3 shadow-xl"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : <>Calcola Valore <TrendingUp size={18} /></>}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 animate-in zoom-in duration-700">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-serif mb-4 italic">Analisi Completata.</h3>
                <p className="text-stone-400 font-light mb-12">Il nostro team di esperti sta revisionando i dati. Riceverai il report dettagliato via email entro 24 ore.</p>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full bg-white text-[#1C1917] py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#A18058] hover:text-white transition-all shadow-xl"
                >
                  Torna alla Home
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Valuation;
