import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { MapPin, Phone, Plane, ParkingCircle, Utensils, Building2, Navigation } from 'lucide-react';

type Guide = {
  title: string;
  type: 'localita' | 'spiaggia';
  intro: string;
};

const GUIDES: Record<string, Guide> = {
  'olbia': { title: 'Olbia', type: 'localita', intro: 'Nodo strategico del Nord-Est Sardegna, collegamenti portuali e aeroportuali.' },
  'porto-rotondo': { title: 'Porto Rotondo', type: 'localita', intro: 'Marina d’elite, architettura curata, servizi premium.' },
  'budoni': { title: 'Budoni', type: 'localita', intro: 'Località family-friendly tra spiagge ampie e servizi completi.' },
  'porto-ottiolu': { title: 'Porto Ottiolu', type: 'localita', intro: 'Marina vivace tra San Teodoro e Budoni, ottima base nautica.' },
  'puntaldia': { title: 'Puntaldia', type: 'localita', intro: 'Consorzio con campo da golf, marina e accesso a spiagge top.' },
  'murta-maria': { title: 'Murta Maria', type: 'localita', intro: 'Frazione a sud di Olbia, vicina a Porto Istana e servizi.' },
  'porto-san-paolo': { title: 'Porto San Paolo', type: 'localita', intro: 'Fronte Tavolara, marina, escursioni e ristorazione di qualità.' },
  'vaccileddi': { title: 'Vaccileddi', type: 'localita', intro: 'Area residenziale tra Porto San Paolo e Loiri, tranquilla e strategica.' },
  'monte-contros': { title: 'Monte Contros', type: 'localita', intro: 'Collina panoramica sopra Porto San Paolo, viste sul mare.' },
  'lu-impostu': { title: 'Lu Impostu', type: 'spiaggia', intro: 'Spiaggia bianca e acque turchesi, adiacente a Puntaldia.' },
  'porto-taverna': { title: 'Porto Taverna', type: 'spiaggia', intro: 'Lido con vista Tavolara, servizi balneari e parcheggi.' },
};

export default function PlaceGuide() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug && GUIDES[slug] ? GUIDES[slug] : null;
  const kindPrefix = guide?.type === 'spiaggia' ? '/spiaggia' : '/localita';

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      <SEO title={`${guide ? `${guide.title} • Guida` : 'Guida Località'}`} description="Guida completa al territorio: servizi, collegamenti e consigli locali." />
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#A18058]">{guide ? (guide.type === 'spiaggia' ? 'Spiaggia' : 'Località') : ''} • Guida</p>
          <h1 className="text-4xl md:text-6xl font-serif mt-3">{guide ? guide.title : 'Località'}</h1>
          <p className="mt-4 text-[var(--text-secondary)] max-w-2xl">{guide ? guide.intro : 'Selezione area non trovata.'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section className="rounded-[2rem] border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
              <h2 className="text-xl font-serif mb-4 flex items-center gap-3"><Building2 size={18} /> Servizi Essenziali</h2>
              <ul className="list-disc ml-5 text-[var(--text-secondary)] space-y-2">
                <li>Strutture sanitarie e farmacie</li>
                <li>Supermercati, market e aree shopping</li>
                <li>Noleggi auto/barche e servizi balneari</li>
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
              <h2 className="text-xl font-serif mb-4 flex items-center gap-3"><Navigation size={18} /> Orientamento</h2>
              <ul className="list-disc ml-5 text-[var(--text-secondary)] space-y-2">
                <li>Collegamenti principali stradali</li>
                <li>Parcheggi spiagge gratuiti/a pagamento</li>
                <li>Locali e ristoranti consigliati</li>
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
              <h2 className="text-xl font-serif mb-4 flex items-center gap-3"><Plane size={18} /> Distanze & Trasporti</h2>
              <ul className="list-disc ml-5 text-[var(--text-secondary)] space-y-2">
                <li>Distanza Aeroporto Olbia-Costa Smeralda</li>
                <li>Marina/porto più vicino</li>
                <li>Servizi taxi e transfer</li>
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><MapPin size={14} /> Mappa</h3>
              <div className="rounded-xl overflow-hidden border border-[var(--border-primary)] bg-black">
                <iframe
                  title="Mappa"
                  className="w-full h-60"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(guide ? guide.title : 'Sardegna')}&output=embed`}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Serve assistenza?</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">Chiama per una selezione su misura nella zona.</p>
              <a href="tel:+390789123456" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#A18058] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors">
                Chiama Agenzia <Phone size={14} />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
