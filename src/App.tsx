import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import Home from './pages/Home';
import About from './pages/About';
import Sales from './pages/Sales';
import Rentals from './pages/Rentals';
import Valuation from './pages/Valuation';
import ReservedArea from './pages/ReservedArea';
import Booking from './pages/Booking';
import StayBooking from './pages/StayBooking';
import BrochureAndMagazine from './pages/BrochureAndMagazine';
import PlaceGuide from './pages/PlaceGuide';
import Admin from './pages/Admin';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleChatbotNavigate = (destination: string) => {
    const routes: Record<string, string> = {
      home: '/',
      sales: '/vendita',
      rentals: '/affitto',
      valuation: '/valuta-il-tuo-immobile',
      booking: '/prenota-una-visita',
      about: '/chi-siamo',
      reserved: '/area-riservata'
    };
    if (routes[destination]) {
      navigate(routes[destination]);
    }
  };

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
          <Navbar />
          
          <main className="animate-in fade-in duration-500">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chi-siamo" element={<About />} />
              <Route path="/vendita" element={<Sales />} />
              <Route path="/affitto" element={<Rentals />} />
              <Route path="/valuta-il-tuo-immobile" element={<Valuation />} />
              <Route path="/area-riservata" element={<ReservedArea />} />
              <Route path="/prenota" element={<StayBooking />} />
              <Route path="/prenota-una-visita" element={<Booking />} />
              <Route path="/brochure-and-magazine" element={<BrochureAndMagazine />} />
              <Route path="/localita/:slug" element={<PlaceGuide />} />
              <Route path="/spiaggia/:slug" element={<PlaceGuide />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppFAB />
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
