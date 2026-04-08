import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Heart, ArrowRight, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

type Brochure = {
  id: string;
  title: string;
  cover: string;
  pdfUrl: string;
};

const PLACEHOLDERS: Brochure[] = [
  { id: 'b1', title: 'Portfolio Vendite', cover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop', pdfUrl: '#' },
  { id: 'b2', title: 'Collezione Affitti', cover: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=900&auto=format&fit=crop', pdfUrl: '#' },
  { id: 'b3', title: 'Stazzi Galluresi', cover: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=900&auto=format&fit=crop', pdfUrl: '#' },
  { id: 'b4', title: 'Selezione Mare', cover: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=900&auto=format&fit=crop', pdfUrl: '#' },
];

export default function BrochureAndMagazine() {
  const [open, setOpen] = useState<Brochure | null>(null);
  const [zoom, setZoom] = useState(1);
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      <SEO title="Brochure & Magazine" description="Sfoglia le brochure d'agenzia in versione digitale." />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[#A18058] text-[10px] font-bold uppercase tracking-[0.5em]">Materiali Ufficiali</span>
            <h1 className="text-4xl md:text-6xl font-serif mt-3">Brochure & Magazine</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLACEHOLDERS.map((b) => (
            <div key={b.id} className="group rounded-[2rem] overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-secondary)] shadow-xl">
              <div className="aspect-[4/5] overflow-hidden bg-[var(--bg-tertiary)] relative">
                <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <button
                  onClick={() => toggleFavorite({ id: `brochure:${b.id}`, title: b.title, location: 'Brochure', price: '', image: b.cover, type: 'brochure' })}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${
                    isFavorite(`brochure:${b.id}`) ? 'bg-red-500 text-white' : 'bg-white/80 text-red-500'
                  } shadow-lg`}
                >
                  <Heart size={18} className={isFavorite(`brochure:${b.id}`) ? 'fill-white' : ''} />
                </button>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-serif text-lg">{b.title}</p>
                  <p className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">PDF</p>
                </div>
                <button onClick={() => { setOpen(b); setZoom(1); }} className="w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[#A18058] hover:text-white transition-colors flex items-center justify-center">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(null)}></div>
          <div className="relative w-full max-w-6xl bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-primary)] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-primary)]">
              <p className="font-serif text-xl">{open.title}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center"><ZoomOut size={16} /></button>
                <button onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center"><ZoomIn size={16} /></button>
                <a href={open.pdfUrl} download className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center"><Download size={16} /></a>
              </div>
            </div>
            <div className="p-4 bg-[var(--bg-primary)]">
              <div className="w-full h-[75vh] rounded-xl overflow-auto border border-[var(--border-primary)] bg-white flex items-center justify-center">
                <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', width: '100%' }} className="min-w-full">
                  <iframe src={open.pdfUrl} title={open.title} className="w-full h-[75vh]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

