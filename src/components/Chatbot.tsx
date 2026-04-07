import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, MapPin } from 'lucide-react';
import { GoogleGenAI, Chat, FunctionDeclaration, Type } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
  groundingMetadata?: any;
}

interface ChatbotProps {
  onNavigate: (view: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Benvenuto in Immobiliare Tala. Sono Tala Concierge, a Sua completa disposizione. Desidera esplorare le nostre esclusive proprietà o necessita di informazioni specifiche?" }
  ]);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Define Navigation Tool
  const navigationTool: FunctionDeclaration = {
    name: 'navigate_to_page',
    description: 'Naviga l\'utente verso una specifica sezione del sito web quando richiesto o quando pertinente alla domanda.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        destination: {
          type: Type.STRING,
          description: "La pagina di destinazione. Valori ammessi: 'home' (Home Page), 'sales' (Vendite/Compravendita), 'rentals' (Affitti/Vacanze), 'valuation' (Valutazione Immobile), 'booking' (Prenotazione Visita), 'about' (Chi Siamo/Contatti/Sede), 'reserved' (Area Riservata).",
          enum: ['home', 'sales', 'rentals', 'valuation', 'booking', 'about', 'reserved']
        }
      },
      required: ['destination']
    }
  };

  // Initialize Chat Session with Grounding Tools and Function Calling
  useEffect(() => {
    const initChat = async () => {
      // Attempt to get user location for better Maps grounding
      let location = undefined;
      try {
          const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
          });
          location = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
          };
      } catch (e) {
          console.debug("Location access denied or unavailable, proceeding without user location.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          tools: [
              { googleSearch: {} },
              { googleMaps: {} },
              { functionDeclarations: [navigationTool] }
          ],
          toolConfig: location ? {
              googleMapsToolConfig: {
                 // SDK might interpret retrievalConfig here if supported in future
              }
          } : undefined,
          systemInstruction: `
            Sei 'Tala Concierge', l'assistente virtuale d'élite di 'Immobiliare Tala'.
            
            IDENTITÀ E TONO:
            - Dai SEMPRE del 'LEI'.
            - Tono: Sofisticato, sicuro, estremamente cortese.
            - DIVIETO ASSOLUTO: Non dire MAI "Non ho capito", "Ho difficoltà", "Non riesco". Se non sai cosa dire, proponi di visitare le collezioni 'Vendite' o 'Affitti'.
            
            GESTIONE NAVIGAZIONE:
            - Usa 'navigate_to_page' non appena intuisci l'intento dell'utente (es. "Voglio comprare" -> sales).
            - DOPO aver navigato, la tua risposta testuale deve ESSERE UNA CONFERMA, ad esempio: "Ecco qui quello che stava cercando", "Ho aperto la sezione per Lei", "Certamente, ecco a Lei".
            
            RISPOSTE A DOMANDE NON PERTINENTI:
            - Non scusarti profusamente. Reindirizza con classe: "La mia specialità sono le dimore esclusive in Sardegna. Posso mostrarLe le nostre novità?"
            
            DESTINAZIONI VALIDE: 'home', 'sales', 'rentals', 'valuation', 'booking', 'about', 'reserved'.
          `,
        },
      });
    };
    initChat();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    let navigationPerformed = false;

    try {
      // 1. Send user message
      let result = await chatSessionRef.current.sendMessage(userMessage);
      
      // 2. Handle Function Calls (Navigation)
      const functionCalls = result.functionCalls;
      
      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        
        if (call.name === 'navigate_to_page') {
          const destination = call.args['destination'] as string;
          
          // Execute navigation on the client
          onNavigate(destination);
          navigationPerformed = true;
          
          // Send success response back to model
          try {
            // Strictly typed Part structure to avoid "ContentUnion is required" error
            const responsePart = {
                functionResponse: {
                    name: call.name,
                    response: { result: "Navigazione completata" }, // Simple JSON object
                    id: call.id
                }
            };
            
            // We use a separate try-catch for the tool response step.
            // If this fails (e.g. network or format issue), we DO NOT want to crash the whole handler,
            // because the navigation (the important part) has already happened.
            result = await chatSessionRef.current.sendMessage([responsePart]);
            
          } catch (toolError) {
             console.warn("Tool response error (non-fatal):", toolError);
             // We swallow this error so we can still show the "Ecco qui" message below.
             // 'result' remains the object from the first call (function request), which is fine.
          }
        }
      }

      // 3. Determine Final Text Response
      // If we navigated, we force a confirmation message if the model didn't provide a new one
      if (navigationPerformed) {
          const modelText = result.text;
          // Use model text if available (from 2nd call), otherwise fallback to hardcoded confirmation
          const finalMessage = (modelText && modelText.length > 0) 
                               ? modelText 
                               : "Certamente, ecco a Lei la sezione richiesta.";
          
          setMessages(prev => [...prev, { 
              role: 'model', 
              text: finalMessage,
              groundingMetadata: result.candidates?.[0]?.groundingMetadata
          }]);
      } else {
          // Standard response flow
          setMessages(prev => [...prev, { 
              role: 'model', 
              text: result.text || "Certamente.", 
              groundingMetadata: result.candidates?.[0]?.groundingMetadata
          }]);
      }

    } catch (error) {
      console.error("Errore chat:", error);
      
      // Critical fix: If navigation worked, DO NOT show an error message.
      if (navigationPerformed) {
          setMessages(prev => [...prev, { role: 'model', text: "Ecco qui quello che stava cercando." }]);
      } else {
          setMessages(prev => [...prev, { role: 'model', text: "Gentile Cliente, la prego di perdonarmi. Potrebbe riformulare la Sua richiesta? Sarò lieto di aiutarLa." }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`pointer-events-auto w-[90vw] md:w-[380px] bg-white/90 backdrop-blur-xl border border-stone-200 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right mb-4 flex flex-col ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 h-[550px]' : 'opacity-0 scale-90 translate-y-10 h-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#1C1917] p-4 flex justify-between items-center text-[#FAFAF9]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#A18058] flex items-center justify-center text-white">
              <span className="font-serif italic text-sm pt-0.5">T</span>
            </div>
            <div>
              <h3 className="font-serif italic text-lg leading-none">Tala Concierge</h3>
              <span className="text-[10px] uppercase tracking-widest text-stone-400">AI Assistant</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAF9]/50 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#1C1917] text-white rounded-tr-none' 
                    : 'bg-white border border-stone-200 text-stone-700 rounded-tl-none'
                }`}
              >
                {msg.role === 'model' && (
                  <div className="mb-1 text-[9px] font-bold text-[#A18058] uppercase tracking-widest flex items-center gap-1">
                      <Sparkles size={10} /> Tala Concierge
                  </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: msg.text ? msg.text.replace(/\n/g, '<br/>') : '' }} />
                
                {/* Grounding Sources Display */}
                {msg.groundingMetadata?.groundingChunks && msg.groundingMetadata.groundingChunks.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-stone-100">
                        <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Fonti</p>
                        <div className="flex flex-wrap gap-2">
                            {msg.groundingMetadata.groundingChunks.map((chunk: any, i: number) => {
                                if (chunk.web) {
                                    return (
                                        <a 
                                            key={i} 
                                            href={chunk.web.uri} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-[10px] text-[#A18058] hover:underline bg-stone-50 px-2 py-1 rounded border border-stone-100 truncate max-w-full block"
                                        >
                                            {chunk.web.title}
                                        </a>
                                    );
                                }
                                if (chunk.maps) {
                                    return (
                                        <a 
                                            key={i} 
                                            href={chunk.maps.uri} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-[10px] text-[#A18058] hover:underline bg-stone-50 px-2 py-1 rounded border border-stone-100 truncate max-w-full block flex items-center gap-1"
                                        >
                                            <MapPin size={10} />
                                            {chunk.maps.title}
                                        </a>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#A18058] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#A18058] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#A18058] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-stone-200">
          <div className="flex items-center gap-2 bg-stone-50 rounded-full border border-stone-200 px-2 py-1.5 focus-within:border-[#A18058] focus-within:ring-1 focus-within:ring-[#A18058]/20 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Chiedi a Tala Concierge..."
              className="flex-1 bg-transparent px-3 py-1 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-full transition-all ${
                input.trim() 
                  ? 'bg-[#1C1917] text-white hover:bg-[#A18058]' 
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-center mt-2 flex items-center justify-center gap-1">
            <span className="text-[9px] text-stone-400">Powered by Gemini AI with Search & Maps</span>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 ${
          isOpen ? 'bg-[#FAFAF9] text-[#1C1917]' : 'bg-[#1C1917] text-[#FAFAF9]'
        }`}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="relative">
             <MessageCircle size={24} />
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#A18058] rounded-full animate-pulse border-2 border-[#1C1917]"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default Chatbot;