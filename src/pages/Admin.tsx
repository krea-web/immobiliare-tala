import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  Mail, 
  FileText, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Image as ImageIcon,
  Pause,
  Play,
  Trash2,
  Edit,
  Menu,
  X,
  ChevronRight,
  Send,
  Save,
  CheckCircle,
  Clock,
  Briefcase,
  Smartphone,
  MapPin,
  ArrowRight,
  Download,
  Eye,
  Type,
  Layout,
  LogOut,
  Handshake,
  Activity,
  Crown
} from 'lucide-react';
import SEO from '../components/SEO';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'crm', label: 'CRM / Contatti', icon: <Users size={20} /> },
    { id: 'properties', label: 'Case / Immobili', icon: <Home size={20} /> },
    { id: 'marketing', label: 'Marketing Email', icon: <Mail size={20} /> },
    { id: 'documents', label: 'Documenti', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Impostazioni', icon: <Settings size={20} /> },
  ];

  // Close sidebar on mobile when tab changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex flex-col lg:flex-row pt-20 overflow-x-hidden">
      <SEO title="Admin Dashboard" description="Area riservata amministratore Immobiliare Tala." />
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-20 z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1C1917] rounded-sm flex items-center justify-center text-white text-xs font-serif italic">T</div>
          <span className="font-serif text-lg italic">Admin Panel</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-stone-50 rounded-lg text-stone-900"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[70] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky lg:top-20 z-[80] lg:z-30
        w-72 lg:w-72 h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)]
        bg-white border-r border-stone-200 flex flex-col
        transition-all duration-500 ease-in-out
        ${isSidebarOpen ? 'left-0' : '-left-full lg:left-0'}
      `}>
        <div className="hidden lg:flex items-center gap-4 px-8 py-10">
          <div className="w-10 h-10 bg-[#1C1917] rounded-lg flex items-center justify-center text-white text-lg font-serif italic shadow-xl">T</div>
          <div>
            <h2 className="text-xl font-serif text-stone-900 leading-tight">Admin <span className="text-[#A18058] italic">Tala</span></h2>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Control Center v2.0</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-[#1C1917] text-white shadow-xl translate-x-1' 
                : 'text-stone-400 hover:bg-stone-50 hover:text-stone-900'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`${activeTab === item.id ? 'text-[#A18058]' : 'text-stone-300 group-hover:text-[#A18058] transition-colors'}`}>
                  {item.icon}
                </span>
                {item.label}
              </div>
              <ChevronRight size={14} className={`transition-transform duration-300 ${activeTab === item.id ? 'opacity-100' : 'opacity-0 -translate-x-2'}`} />
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-stone-100">
          <div className="bg-stone-50 rounded-[1.5rem] p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#A18058] rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg">AT</div>
            <div className="flex flex-col">
              <span className="text-sm font-serif italic text-stone-900">Andrea Tala</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Broker Founder</span>
            </div>
            <button className="ml-auto text-stone-300 hover:text-red-500 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen relative overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto p-6 md:p-10 lg:p-14">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'crm' && <CRMView />}
          {activeTab === 'properties' && <PropertiesView />}
          {activeTab === 'marketing' && <MarketingView />}
          {activeTab === 'documents' && <DocumentsView />}
        </div>
      </main>
    </div>
  );
};

// --- Dashboard View ---
const DashboardView = () => (
  <div className="space-y-12 animate-in fade-in duration-700">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-2">Benvenuto, <span className="italic">Andrea</span></h1>
        <p className="text-stone-400 text-sm font-light max-w-sm">Performance aziendali e analisi dei lead in tempo reale.</p>
      </div>
      <div className="flex gap-3">
        <button className="px-6 py-3 bg-white border border-stone-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-50 transition-all flex items-center gap-2 shadow-sm">
          <Calendar size={14} /> Ultimi 30 giorni
        </button>
        <button className="px-6 py-3 bg-[#1C1917] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#A18058] transition-all flex items-center gap-2 shadow-xl">
          <Download size={14} /> Report PDF
        </button>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: "Asset Gestiti", value: "€142,5M", trend: "+12.5%", up: true, icon: <Briefcase size={20} /> },
        { label: "Nuovi Lead", value: "48", trend: "+8.2%", up: true, icon: <Users size={20} /> },
        { label: "Trattative Aperte", value: "12", trend: "-2.4%", up: false, icon: <Handshake size={20} /> },
        { label: "Conversione", value: "3.2%", trend: "+1.1%", up: true, icon: <TrendingUp size={20} /> },
      ].map((stat, idx) => (
        <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#A18058]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-stone-50 rounded-2xl text-[#A18058] group-hover:bg-[#A18058] group-hover:text-white transition-all shadow-inner">{stat.icon}</div>
            <div className={`flex items-center gap-1.5 text-[10px] font-bold ${stat.up ? 'text-green-600' : 'text-red-600'} bg-white px-3 py-1 rounded-full shadow-sm border border-stone-50`}>
              {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {stat.trend}
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">{stat.label}</p>
          <p className="text-3xl font-serif text-stone-900 italic tracking-tight">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-stone-100 shadow-xl h-96 flex flex-col relative overflow-hidden group">
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">Volume Vendite Estive</h3>
          <div className="flex gap-4">
             <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#A18058]"></span> <span className="text-[10px] font-bold uppercase text-stone-400">Affitti</span></div>
             <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#1C1917]"></span> <span className="text-[10px] font-bold uppercase text-stone-400">Vendite</span></div>
          </div>
        </div>
        <div className="flex-1 bg-stone-50 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-stone-100 relative group-hover:border-[#A18058]/30 transition-colors">
          <Activity className="text-stone-200 w-16 h-16 animate-pulse" />
          <p className="text-stone-400 text-xs italic absolute bottom-8">Dati analitici in caricamento...</p>
        </div>
      </div>
      <div className="bg-[#1C1917] p-10 rounded-[3rem] border border-stone-800 shadow-xl h-96 flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#A18058]/10 to-transparent"></div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-8 relative z-10">Top Property Lead</h3>
        <div className="space-y-6 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg"><img src={`https://images.unsplash.com/photo-${1512917774080 + i}-9991f1c4c750?q=80&w=100`} className="w-full h-full object-cover" alt="" /></div>
              <div className="flex-1">
                <p className="text-xs font-serif italic text-white">Villa Smeralda #{i}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-stone-500">Porto Cervo</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[#A18058]">12 Lead</p>
                <p className="text-[8px] text-stone-600 font-bold uppercase">Hot</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 w-full py-4 bg-white/10 hover:bg-[#A18058] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">Vedi Tutti</button>
      </div>
    </div>
  </div>
);

// --- CRM View ---
const CRMView = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-2">CRM <span className="italic text-[#A18058]">Contatti</span></h1>
          <p className="text-stone-400 text-sm font-light">Gestione lead, relazioni e database clienti d'élite.</p>
        </div>
        <button className="px-8 py-4 bg-[#1C1917] text-white rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A18058] transition-all flex items-center gap-3 shadow-2xl">
          <Plus size={18} /> Nuovo Lead
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Table Section */}
        <div className={`xl:col-span-${selectedContact ? '7' : '12'} transition-all duration-500`}>
          <div className="bg-white rounded-[3rem] border border-stone-100 shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-stone-50 flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                <input type="text" placeholder="Nome, Email o Proprietà..." className="w-full pl-14 pr-6 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#A18058] transition-all font-light" />
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-4 bg-stone-50 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2 hover:bg-stone-100 transition-all">
                  <Filter size={18} /> Filtri
                </button>
                <button className="p-4 bg-stone-50 rounded-2xl text-stone-500 hover:text-stone-900 transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50/30">
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Contatto</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Stato Lead</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Interesse</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 text-right">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {[
                    { id: 1, name: "Marco Rossi", email: "marco@example.com", phone: "+39 333 4567890", status: "Hot Lead", interest: "Villa Costa Smeralda", date: "2 ore fa" },
                    { id: 2, name: "Giulia Bianchi", email: "giulia@example.com", phone: "+39 347 1234567", status: "In Trattativa", interest: "Affitto Estivo Porto Cervo", date: "Ieri" },
                    { id: 3, name: "Robert Smith", email: "robert@global.com", phone: "+1 555 0199", status: "Iscritto", interest: "Investimento Immobiliare", date: "3 giorni fa" },
                    { id: 4, name: "Elena Verdi", email: "elena@verdi.it", phone: "+39 335 9876543", status: "Posticipato", interest: "Valutazione Proprietà", date: "1 sett fa" },
                  ].map((contact) => (
                    <tr 
                      key={contact.id} 
                      onClick={() => setSelectedContact(contact)}
                      className={`hover:bg-stone-50/50 transition-all cursor-pointer group ${selectedContact?.id === contact.id ? 'bg-[#A18058]/5' : ''}`}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#A18058] font-bold group-hover:bg-[#A18058] group-hover:text-white transition-all shadow-sm">
                            {contact.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-serif italic text-stone-900 leading-tight">{contact.name}</span>
                            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{contact.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm border ${
                          contact.status === 'Hot Lead' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                          contact.status === 'In Trattativa' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                          'bg-stone-50 text-stone-400 border-stone-100'
                        }`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-xs text-stone-600 font-medium">{contact.interest}</span>
                          <span className="text-[9px] text-stone-300 font-bold uppercase tracking-widest">{contact.date}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2.5 bg-white border border-stone-100 rounded-xl text-stone-400 hover:text-[#A18058] shadow-sm transition-all"><Edit size={16}/></button>
                            <button className="p-2.5 bg-white border border-stone-100 rounded-xl text-stone-400 hover:text-red-500 shadow-sm transition-all"><Trash2 size={16}/></button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Contact Details Drawer/Card */}
        {selectedContact && (
          <div className="xl:col-span-5 animate-in slide-in-from-right-10 duration-500">
             <div className="bg-white rounded-[3rem] border border-stone-100 shadow-2xl p-10 sticky top-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#A18058]/5 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="flex justify-between items-start mb-10 relative z-10">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-[1.5rem] bg-stone-900 text-white flex items-center justify-center text-3xl font-serif italic shadow-2xl">
                        {selectedContact.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-3xl font-serif text-stone-900 leading-tight">{selectedContact.name}</h3>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#A18058]">
                          <Crown size={12} /> Platinum Private Member
                        </div>
                      </div>
                   </div>
                   <button onClick={() => setSelectedContact(null)} className="p-3 bg-stone-50 rounded-full hover:bg-stone-100 transition-all"><X size={20}/></button>
                </div>

                <div className="space-y-8 relative z-10">
                   <div className="grid grid-cols-2 gap-4">
                      <a href={`tel:${selectedContact.phone}`} className="flex flex-col p-5 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-all no-underline group">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-2">Telefono</span>
                        <div className="flex items-center gap-3 text-stone-900 font-medium">
                          <Smartphone size={16} className="text-[#A18058]" /> {selectedContact.phone}
                        </div>
                      </a>
                      <a href={`mailto:${selectedContact.email}`} className="flex flex-col p-5 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-all no-underline group">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-2">Email Privata</span>
                        <div className="flex items-center gap-3 text-stone-900 font-medium">
                          <Mail size={16} className="text-[#A18058]" /> {selectedContact.email}
                        </div>
                      </a>
                   </div>

                   <div className="bg-stone-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#A18058]/20 to-transparent"></div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#A18058] mb-6">Attività Recente</h4>
                      <div className="space-y-6 relative z-10">
                        <div className="flex gap-4">
                           <div className="w-1 h-10 bg-[#A18058] rounded-full"></div>
                           <div>
                              <p className="text-xs font-serif italic text-white/90">Ha visualizzato "Villa Turchese"</p>
                              <p className="text-[9px] font-bold uppercase text-stone-500 tracking-widest">2 ore fa • App Mobile</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-1 h-10 bg-white/20 rounded-full"></div>
                           <div>
                              <p className="text-xs font-serif italic text-white/90">Richiesta valutazione stazzo</p>
                              <p className="text-[9px] font-bold uppercase text-stone-500 tracking-widest">Ieri • Form Web</p>
                           </div>
                        </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-2">Note Amministrative</h4>
                      <textarea className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-5 text-sm font-light italic focus:outline-none focus:ring-2 focus:ring-[#A18058] transition-all" rows={3} placeholder="Aggiungi una nota riservata..."></textarea>
                   </div>

                   <div className="flex gap-4 pt-4">
                      <button className="flex-1 py-5 bg-[#A18058] text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-xl hover:bg-[#1C1917] transition-all flex items-center justify-center gap-3">
                        <Send size={16} /> Invia Email
                      </button>
                      <button className="flex-1 py-5 bg-stone-100 text-stone-900 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-stone-200 transition-all flex items-center justify-center gap-3">
                        <Calendar size={16} /> Appuntamento
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Properties View ---
const PropertiesView = () => (
  <div className="space-y-12 animate-in fade-in duration-700">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-2">Portfolio <span className="italic">Immobili</span></h1>
        <p className="text-stone-400 text-sm font-light">Customizzazione e gestione del catalogo immobiliare.</p>
      </div>
      <button className="px-8 py-4 bg-[#1C1917] text-white rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A18058] transition-all flex items-center gap-3 shadow-2xl">
        <Plus size={18} /> Nuovo Immobile
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        { title: "Villa Smeralda", type: "Vendita", price: "€2,400,000", status: "Attivo", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400", tags: ["Piscina", "Vista Mare"] },
        { title: "Attico Porto Cervo", type: "Affitto Estivo", price: "€4,500 / sett", status: "Pausa", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400", tags: ["Jacuzzi", "Design"] },
        { title: "Stazzo Gallurese", type: "Vendita", price: "€850,000", status: "Attivo", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400", tags: ["Storico", "Natura"] },
      ].map((prop, idx) => (
        <div key={idx} className="bg-white rounded-[3rem] border border-stone-100 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="h-64 relative overflow-hidden">
            <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute top-6 left-6 flex gap-2">
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-lg backdrop-blur-md ${
                prop.status === 'Attivo' ? 'bg-emerald-500/90 text-white' : 'bg-orange-500/90 text-white'
              }`}>
                {prop.status}
              </span>
            </div>
            <div className="absolute bottom-6 left-6">
               <div className="flex gap-2">
                 {prop.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-white border border-white/30">{tag}</span>
                 ))}
               </div>
            </div>
          </div>
          <div className="p-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-serif text-stone-900 mb-1 italic">{prop.title}</h3>
                <p className="text-[#A18058] font-bold text-sm tracking-tight">{prop.price}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300">{prop.type}</span>
            </div>
            <div className="flex pt-8 gap-3 border-t border-stone-50">
              <button className="flex-1 py-4 bg-stone-50 hover:bg-[#A18058] hover:text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-600 transition-all flex items-center justify-center gap-3">
                <Edit size={16} /> Modifica
              </button>
              <button className="w-14 h-14 bg-stone-50 hover:bg-stone-100 rounded-2xl text-stone-600 transition-all flex items-center justify-center">
                {prop.status === 'Attivo' ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button className="w-14 h-14 bg-stone-50 hover:bg-red-50 hover:text-red-600 rounded-2xl text-stone-400 transition-all flex items-center justify-center">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Marketing View (Email Builder Table) ---
const MarketingView = () => {
  const [view, setView] = useState<'list' | 'builder'>('list');

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-2">Marketing <span className="italic text-[#A18058]">Campaigns</span></h1>
          <p className="text-stone-400 text-sm font-light">Costruisci e monitora le tue campagne email marketing.</p>
        </div>
        {view === 'list' ? (
          <button onClick={() => setView('builder')} className="px-8 py-4 bg-[#1C1917] text-white rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A18058] transition-all flex items-center gap-3 shadow-2xl">
            <Plus size={18} /> Crea Email
          </button>
        ) : (
          <button onClick={() => setView('list')} className="px-8 py-4 bg-stone-100 text-stone-900 rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-stone-200 transition-all flex items-center gap-3 shadow-sm">
            <ArrowRight size={18} className="rotate-180" /> Torna alla Lista
          </button>
        )}
      </div>

      {view === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] border border-stone-100 shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-stone-50 flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">Storico Email</h3>
                <div className="flex gap-2">
                   <button className="px-4 py-2 bg-stone-50 text-stone-500 rounded-xl text-[10px] font-bold uppercase tracking-widest">Inviate</button>
                   <button className="px-4 py-2 bg-stone-50 text-stone-500 rounded-xl text-[10px] font-bold uppercase tracking-widest">Bozze</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-stone-50">
                    {[
                      { subject: "Benvenuto nel Private Club", audience: "Nuovi Lead", date: "Oggi, 10:30", stats: "85% open", status: "Sent" },
                      { subject: "Nuova Villa Porto Cervo", audience: "Clienti Platinum", date: "Ieri, 14:15", stats: "92% open", status: "Sent" },
                      { subject: "Auguri di Pasqua 2026", audience: "Tutti i Contatti", date: "2 giorni fa", stats: "45% open", status: "Sent" },
                      { subject: "Newsletter Mensile Aprile", audience: "Investitori", date: "10 min fa", stats: "-", status: "Draft" },
                    ].map((email, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/50 transition-all group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-5">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${email.status === 'Sent' ? 'bg-emerald-50 text-emerald-500' : 'bg-stone-100 text-stone-400'}`}>
                                 {email.status === 'Sent' ? <CheckCircle size={20} /> : <Edit size={18} />}
                              </div>
                              <div>
                                <p className="text-sm font-serif italic text-stone-900 leading-tight">{email.subject}</p>
                                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Destinatari: {email.audience}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{email.date}</span>
                              <span className="text-[10px] text-[#A18058] font-bold">{email.stats}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="p-3 text-stone-300 hover:text-stone-900 transition-all opacity-0 group-hover:opacity-100"><Eye size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-[#A18058] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform"></div>
                <h3 className="text-2xl font-serif italic mb-6">Performance Email</h3>
                <div className="space-y-6">
                   <div>
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                        <span>Open Rate Medio</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-[78%] h-full bg-white rounded-full"></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                        <span>Click Rate</span>
                        <span>24%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-[24%] h-full bg-white rounded-full"></div>
                      </div>
                   </div>
                </div>
                <button className="mt-10 w-full py-4 bg-stone-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl">Vedi Analytics</button>
             </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[3.5rem] border border-stone-100 shadow-2xl p-10 md:p-14 animate-in zoom-in-95 duration-700">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
              <div className="lg:col-span-7 space-y-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-2">Oggetto Email</label>
                    <input type="text" placeholder="Es: Scopri la nuova collezione Estate 2026..." className="w-full px-8 py-5 bg-stone-50 border-none rounded-2xl text-lg font-serif italic focus:ring-2 focus:ring-[#A18058] outline-none" />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-2">Corpo del Messaggio</label>
                    <div className="bg-stone-50 rounded-2xl border border-stone-100 overflow-hidden">
                       <div className="flex gap-4 p-4 border-b border-stone-100">
                          <button className="p-2 hover:bg-white rounded-lg transition-all"><Type size={18}/></button>
                          <button className="p-2 hover:bg-white rounded-lg transition-all"><Layout size={18}/></button>
                          <button className="p-2 hover:bg-white rounded-lg transition-all"><ImageIcon size={18}/></button>
                       </div>
                       <textarea rows={10} className="w-full p-8 bg-transparent border-none outline-none font-light leading-relaxed text-stone-600" placeholder="Scrivi qui la tua comunicazione esclusiva..."></textarea>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-5 space-y-10">
                 <div className="bg-stone-50 rounded-[2.5rem] p-10 border border-stone-100">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-8">Configurazione Invio</h4>
                    <div className="space-y-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Segmento Pubblico</label>
                          <select className="w-full px-6 py-4 bg-white border border-stone-200 rounded-xl focus:outline-none appearance-none">
                             <option>Tutti i Contatti</option>
                             <option>Platinum Club</option>
                             <option>Solo Venditori</option>
                             <option>Lead Recenti (30gg)</option>
                          </select>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Template</label>
                          <div className="grid grid-cols-2 gap-4">
                             <button className="p-4 bg-[#1C1917] text-white rounded-xl text-[10px] font-bold uppercase border-2 border-stone-900">Luxury Dark</button>
                             <button className="p-4 bg-white text-stone-900 rounded-xl text-[10px] font-bold uppercase border-2 border-stone-100">Minimal Light</button>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <button className="flex-1 py-6 bg-stone-900 text-white rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-[#A18058] transition-all flex items-center justify-center gap-3">
                       <Send size={18} /> Invia Ora
                    </button>
                    <button className="px-8 py-6 bg-stone-100 text-stone-400 rounded-[1.5rem] hover:text-stone-900 transition-all">
                       <Save size={20} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// --- Documents View ---
const DocumentsView = () => (
  <div className="space-y-10 animate-in fade-in duration-700">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-2">Cassetto <span className="italic text-[#A18058]">Documenti</span></h1>
        <p className="text-stone-400 text-sm font-light">Cloud privato per contratti, visure e asset aziendali.</p>
      </div>
      <button className="px-8 py-4 bg-[#1C1917] text-white rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A18058] transition-all flex items-center gap-3 shadow-2xl">
        <Plus size={18} /> Carica File
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[
        { name: "Contratto Villa Smeralda", type: "PDF", size: "2.4 MB", date: "12 Mar 2026", color: "text-red-500" },
        { name: "Fattura Commissione #402", type: "PDF", size: "1.1 MB", date: "10 Mar 2026", color: "text-blue-500" },
        { name: "Planimetria Attico", type: "DWG", size: "15.6 MB", date: "05 Mar 2026", color: "text-amber-500" },
        { name: "Documenti Identità Rossi", type: "ZIP", size: "8.2 MB", date: "01 Mar 2026", color: "text-emerald-500" },
      ].map((doc, idx) => (
        <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-full -translate-y-12 translate-x-12"></div>
          <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-300 mb-6 group-hover:bg-stone-900 group-hover:text-white transition-all shadow-inner">
            <FileText size={28} />
          </div>
          <h4 className="text-base font-serif italic text-stone-900 mb-1 truncate">{doc.name}</h4>
          <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-6">{doc.type} • {doc.size}</p>
          <div className="flex justify-between items-center border-t border-stone-50 pt-6">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{doc.date}</span>
            <div className="flex gap-2">
               <button className="p-2 hover:text-stone-900 transition-colors"><Eye size={16} /></button>
               <button className="p-2 hover:text-stone-900 transition-colors"><Download size={16} /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Admin;