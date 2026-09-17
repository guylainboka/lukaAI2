import React, { useState } from 'react';
import { ScreenName, ChatMessage } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onOpenGpsModal: () => void;
  onOpenPaywall: () => void;
}

export const ChatIaScreen: React.FC<Props> = ({ onNavigate, onOpenGpsModal, onOpenPaywall }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Trouve-moi un rooftop sympa à Cocody avec vue lagune qui accepte le paiement direct Wave pour 2 personnes ce soir.',
      time: '20:12',
    },
    {
      id: '2',
      sender: 'ai',
      text: 'Voici la meilleure option vérifiée en temps réel pour vous : le Sky View Rooftop & Lounge à Cocody Val Doyen.',
      time: '20:13',
      hasRecommendationCard: true,
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [quotaRemaining, setQuotaRemaining] = useState(3);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Generate intelligent AI response
    setTimeout(() => {
      let reply = '';
      if (text.toLowerCase().includes('orange money') || text.toLowerCase().includes('om')) {
        reply = "Plusieurs établissements d'excellence acceptent Orange Money sans frais : Le Jardin Gourmand (Cocody), L'Oasis du Port (Plateau) et le Sky View Lounge.";
      } else if (text.toLowerCase().includes('italien') || text.toLowerCase().includes('pizza')) {
        reply = "Pour la cuisine italienne, la Trattoria Bella à Marcory Zone 4 accepte Wave et Orange Money directement à la table !";
      } else if (text.toLowerCase().includes('23h') || text.toLowerCase().includes('nuit')) {
        reply = "Le Jardin Gourmand sert jusqu'à 23h30 et le Sky View Lounge reste ouvert jusqu'à 02h00 du matin avec règlement Mobile Money continu.";
      } else {
        reply = `J'ai analysé 34 établissements autour de votre position à Cocody. Le Jardin Gourmand et Sky View Rooftop correspondent parfaitement à votre critère avec paiement direct garanti !`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setQuotaRemaining((q) => Math.max(0, q - 1));
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto h-full flex-1 bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 pt-safe pb-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Retour"
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-blue-500 text-white flex items-center justify-center shadow-md">
              <i className="fa-solid fa-wand-magic-sparkles text-sm"></i>
            </div>
            <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-slate-900 leading-none">Assistant IA lukaAI</h1>
              <span className="text-[9px] font-bold bg-blue-100 text-primary px-1.5 py-0.5 rounded">
                Concierge
              </span>
            </div>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">En ligne • Abidjan</p>
          </div>
        </div>

        <button
          onClick={onOpenPaywall}
          className="text-xs font-bold text-primary hover:bg-blue-50 px-2.5 py-1 rounded-xl transition cursor-pointer flex items-center gap-1"
        >
          <i className="fa-solid fa-crown text-amber-500"></i>
          <span>Pro</span>
        </button>
      </header>

      {/* Quota Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-primary text-white px-4 py-2 flex items-center justify-between text-xs shrink-0 shadow-sm">
        <div className="flex items-center gap-1.5">
          <i className="fa-solid fa-bolt text-amber-300"></i>
          <span>
            <strong className="font-bold">{quotaRemaining}/5</strong> requêtes gratuites restantes
          </span>
        </div>
        <button
          onClick={onOpenPaywall}
          className="text-[11px] font-bold text-amber-300 underline underline-offset-2 hover:text-white transition cursor-pointer"
        >
          Passer en illimité Pro (10$/an)
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-36">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-3xl p-4 shadow-sm text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-br-xs'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
              }`}
            >
              <p>{msg.text}</p>

              {/* Rich Recommendation Card embedded in AI message */}
              {msg.hasRecommendationCard && (
                <div className="mt-3.5 bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2.5 text-slate-900">
                  <div className="relative w-full h-28 rounded-xl overflow-hidden bg-slate-200">
                    <img
                      alt="Sky View Rooftop"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuATg5IoRL0iIOOfiXELW3RZ7RTgYGAV1GAiy_Vzi-J6N90M1kYRHjHMkmrnotziRAafTYHGa2ujUoYupG8ZNH2WJHP-nrX3ZdbJxXuweyfruklWZMM7soO__Mz7hwaTsw89bfKCYsMtKnzDEv0tUe8HE00lfEzlmF8KlaeH1tiqDCAZ3CwJhrHNqRp43IKunzBIl-KM4pfWCsFQp9BAc1CZ4BRE_nkyjdWK_ZLXNSVpBPl0ROkni0lQWQ"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                      600 m
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs">Sky View Rooftop &amp; Lounge</h4>
                      <span className="text-amber-500 font-bold text-[11px] flex items-center gap-0.5">
                        <i className="fa-solid fa-star text-[10px]"></i> 4.8
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">Vue lagune panoramique • Cocody Val Doyen</p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] font-bold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded">
                      Wave accepté
                    </span>
                    <span className="text-[9px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded">
                      OM accepté
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onNavigate('reservation')}
                      className="w-full py-2 rounded-xl bg-primary text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <i className="fa-regular fa-calendar-check text-[10px]"></i>
                      <span>Réserver</span>
                    </button>
                    <button
                      onClick={onOpenGpsModal}
                      className="w-full py-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <i className="fa-solid fa-location-arrow text-primary text-[10px]"></i>
                      <span>Itinéraire GPS</span>
                    </button>
                  </div>
                </div>
              )}

              <span
                className={`block text-[9px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Input and Suggestion Chips */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 pt-2 pb-safe max-w-lg mx-auto">
        {/* Quick Suggestion Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => handleSend('Autre resto italien à proximité ?')}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium shrink-0 cursor-pointer transition"
          >
            Autre resto italien ?
          </button>
          <button
            onClick={() => handleSend('Qui prend Orange Money sans frais ?')}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium shrink-0 cursor-pointer transition"
          >
            Qui prend Orange Money ?
          </button>
          <button
            onClick={() => handleSend('Y a-t-il un lieu ouvert après 23h ?')}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium shrink-0 cursor-pointer transition"
          >
            Ouvert après 23h ?
          </button>
        </div>

        {/* Chat input box */}
        <div className="flex items-center gap-2 mb-2">
          <button
            type="button"
            className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 hover:text-slate-700 flex items-center justify-center shrink-0 cursor-pointer"
            title="Saisie vocale"
          >
            <i className="fa-solid fa-microphone"></i>
          </button>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Posez votre question à lukaAI..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
          />
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-2xl bg-primary hover:bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/25 cursor-pointer active:scale-95 transition"
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
