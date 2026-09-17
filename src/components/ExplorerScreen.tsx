import React, { useState } from 'react';
import { ScreenName } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onOpenGpsModal: () => void;
}

export const ExplorerScreen: React.FC<Props> = ({ onNavigate, onOpenGpsModal }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-6 pt-0 bg-slate-50 flex-1">
      {/* Zone explorer bar */}
      <section className="px-5 pt-3 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Zone explorée</span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <i className="fa-solid fa-location-dot text-primary"></i>
            <span>Abidjan, Cocody Val Doyen</span>
            <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
          </div>
        </div>
        <button
          onClick={() => onNavigate('carte')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-primary rounded-xl text-xs font-semibold hover:bg-blue-100 transition cursor-pointer"
        >
          <i className="fa-solid fa-map"></i>
          <span>Vue Carte</span>
        </button>
      </section>

      {/* Filter Chips row */}
      <section className="py-2.5 px-5 bg-white border-b border-slate-100">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 cursor-pointer ${
              activeFilter === 'all' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setActiveFilter('wave')}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-medium shrink-0 flex items-center gap-1 cursor-pointer ${
              activeFilter === 'wave'
                ? 'bg-cyan-500 text-white border-cyan-500'
                : 'bg-cyan-50 text-cyan-800 border-cyan-200'
            }`}
          >
            <i className="fa-solid fa-water text-[10px]"></i>
            Wave direct
          </button>
          <button
            onClick={() => setActiveFilter('om')}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-medium shrink-0 flex items-center gap-1 cursor-pointer ${
              activeFilter === 'om'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-orange-50 text-orange-800 border-orange-200'
            }`}
          >
            <i className="fa-solid fa-wallet text-[10px]"></i>
            Orange Money
          </button>
          <button
            onClick={() => setActiveFilter('momo')}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-medium shrink-0 flex items-center gap-1 cursor-pointer ${
              activeFilter === 'momo'
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-yellow-50 text-yellow-900 border-yellow-200'
            }`}
          >
            <i className="fa-solid fa-mobile-screen text-[10px]"></i>
            MTN MoMo
          </button>
          <button
            onClick={() => setActiveFilter('cb')}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-medium shrink-0 flex items-center gap-1 cursor-pointer ${
              activeFilter === 'cb'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <i className="fa-regular fa-credit-card text-[10px]"></i>
            CB sur place
          </button>
        </div>
      </section>

      {/* Interactive Map Preview Box */}
      <section className="p-5">
        <div className="relative w-full h-44 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-200 group">
          <img
            alt="Carte stylisée d'Abidjan"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCb7P-dG-5UaF3p02Z29Y7Z6kK9Z8M8mZ7X2p5_N3y8f_8LwL3Ww9j"
            onError={(e) => {
              // Graceful fallback stylized vector map
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          {/* Map stylized overlay background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-sky-800/20 to-transparent pointer-events-none"></div>

          {/* Interactive Marker 1: Le Jardin Gourmand */}
          <div
            onClick={() => onNavigate('fiche-lieu')}
            className="absolute top-10 left-16 bg-white/95 px-2 py-1 rounded-full shadow-md flex items-center gap-1 border border-cyan-500/50 cursor-pointer animate-bounce hover:scale-110 transition"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            <span className="text-[10px] font-bold text-slate-900">Jardin Gourmand</span>
          </div>

          {/* Interactive Marker 2: Sky Lounge */}
          <div
            onClick={() => onNavigate('carte')}
            className="absolute top-20 right-14 bg-white/95 px-2 py-1 rounded-full shadow-md flex items-center gap-1 border border-orange-500/50 cursor-pointer hover:scale-110 transition"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span className="text-[10px] font-bold text-slate-900">Sky Lounge</span>
          </div>

          {/* Interactive Marker 3: Café de Paris */}
          <div
            onClick={() => onNavigate('carte')}
            className="absolute bottom-6 left-1/3 bg-white/95 px-2 py-1 rounded-full shadow-md flex items-center gap-1 border border-primary/50 cursor-pointer hover:scale-110 transition"
          >
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-[10px] font-bold text-slate-900">Café de Paris</span>
          </div>

          {/* Recenter / Open Map Button */}
          <button
            onClick={() => onNavigate('carte')}
            className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-800 px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer backdrop-blur-xs"
          >
            <i className="fa-solid fa-crosshairs text-primary"></i>
            <span>Plein écran</span>
          </button>
        </div>
      </section>

      {/* Direct Payment Guarantee Banner */}
      <section className="px-5 mb-3">
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs">
              <i className="fa-solid fa-handshake"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-950">Engagement Direct &amp; Éthique</p>
              <p className="text-[10px] text-emerald-800">0% de commission sur vos consommations. Vous payez le vrai prix affiché.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Listing */}
      <section className="px-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">34 établissements vérifiés à Cocody</h3>
          <span className="text-xs text-primary font-medium">Trier par proximité</span>
        </div>

        {/* Item 1: Le Jardin Gourmand */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  alt="Le Jardin Gourmand"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdbaAuRk4R3nRX6iIwrKtEK38iIPxrSAn6mRVfWGS1QqEubTXJEkerKlRGMG7kD7wPf8W39Q_Mljh4Go1hJoycs0ZbjiPgfPvUP8NlnETMyabXHH6ECpZdml8TqW3KCjs0vAqCSKnqHdp-j4hfLS4jrjOrPa2W6e7aAHOtLB38MQYLdC1nTDdhKFjkBLTo5j7TD_IWacjf4CFVAeUC-ZTNRD-ikNXYKw6j84vYBanj1BpL3nR-9PSZ0Q"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900">Le Jardin Gourmand</h4>
                  <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Vérifié PRO</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Cocody Ambassades • 250 m</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-emerald-600 font-semibold">Ouvert jusqu'à 23h30</span>
                  <span className="text-[10px] text-slate-400">•</span>
                  <div className="flex items-center text-amber-500 text-[10px] font-bold">
                    <i className="fa-solid fa-star mr-1"></i>4.9
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[10px] font-semibold text-slate-400">Paiements :</span>
            <span className="text-[10px] font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full border border-cyan-200">
              Wave direct
            </span>
            <span className="text-[10px] font-bold bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full border border-orange-200">
              Orange Money
            </span>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              Espèces
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('fiche-lieu')}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              Voir la fiche complète
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
            <button
              onClick={onOpenGpsModal}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-location-arrow text-primary text-[11px]"></i>
              Itinéraire (3 min)
            </button>
          </div>
        </div>

        {/* Item 2: Sky View Rooftop */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  alt="Sky View Rooftop"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATg5IoRL0iIOOfiXELW3RZ7RTgYGAV1GAiy_Vzi-J6N90M1kYRHjHMkmrnotziRAafTYHGa2ujUoYupG8ZNH2WJHP-nrX3ZdbJxXuweyfruklWZMM7soO__Mz7hwaTsw89bfKCYsMtKnzDEv0tUe8HE00lfEzlmF8KlaeH1tiqDCAZ3CwJhrHNqRp43IKunzBIl-KM4pfWCsFQp9BAc1CZ4BRE_nkyjdWK_ZLXNSVpBPl0ROkni0lQWQ"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900">Sky View Rooftop &amp; Lounge</h4>
                  <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Rooftop</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Cocody Val Doyen • 600 m</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-emerald-600 font-semibold">Ouvert</span>
                  <span className="text-[10px] text-slate-400">•</span>
                  <div className="flex items-center text-amber-500 text-[10px] font-bold">
                    <i className="fa-solid fa-star mr-1"></i>4.8
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[10px] font-semibold text-slate-400">Paiements :</span>
            <span className="text-[10px] font-bold bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full border border-orange-200">
              Orange Money
            </span>
            <span className="text-[10px] font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full border border-cyan-200">
              Wave direct
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('reservation')}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              Réserver une table
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
            <button
              onClick={onOpenGpsModal}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-location-arrow text-primary text-[11px]"></i>
              Itinéraire (7 min)
            </button>
          </div>
        </div>

        {/* Item 3: Kola Concept Store & Café */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  alt="Kola Concept Store &amp; Café"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRV71nO4a1gL51J-cOaG6oY8e_Kk8P3q9L2V3mX7A_V1_7vX8-B1K9m_P3"
                  onError={(e) => {
                    // Fallback visual
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900">Kola Concept Store &amp; Café</h4>
                  <span className="text-[9px] font-bold bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">Café &amp; Mode</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Cocody Danga • 1.1 km</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-500">Fermeture à 20h00</span>
                  <span className="text-[10px] text-slate-400">•</span>
                  <div className="flex items-center text-amber-500 text-[10px] font-bold">
                    <i className="fa-solid fa-star mr-1"></i>4.7
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[10px] font-semibold text-slate-400">Paiements :</span>
            <span className="text-[10px] font-bold bg-yellow-50 text-yellow-800 px-2 py-0.5 rounded-full border border-yellow-200">
              MTN MoMo
            </span>
            <span className="text-[10px] font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full border border-cyan-200">
              Wave
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              Menu &amp; Prix comparés
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
            <button
              onClick={onOpenGpsModal}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-location-arrow text-primary text-[11px]"></i>
              Itinéraire
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
