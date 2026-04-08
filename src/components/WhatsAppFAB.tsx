import React from 'react';

interface WhatsAppFABProps {
  phone?: string;
}

const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({ phone = '393000000000' }) => {
  const href = `https://wa.me/${phone}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatta su WhatsApp"
      className="fixed bottom-6 right-6 z-[1100] group"
    >
      <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity"></div>
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.62-6.003C.122 5.281 5.403 0 12.057 0c3.2 0 6.2 1.246 8.477 3.524A11.86 11.86 0 0 1 24 12.057c-.003 6.654-5.284 11.935-11.938 11.935a11.9 11.9 0 0 1-6.007-1.617L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.593 5.448 0 9.886-4.434 9.889-9.885.003-5.462-4.415-9.89-9.881-9.893-5.449 0-9.885 4.434-9.888 9.884a9.86 9.86 0 0 0 1.59 5.255l-.999 3.648 3.897-.602zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.03-.967-.272-.099-.47-.149-.668.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.668-1.611-.916-2.207-.242-.579-.487-.5-.668-.51l-.57-.01c-.198 0-.521.074-.793.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412z"/>
        </svg>
      </div>
    </a>
  );
};

export default WhatsAppFAB;
