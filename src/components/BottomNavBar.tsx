import React from 'react';
import { ScreenName, UserRole } from '../types';

interface Props {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  userRole: UserRole;
}

export const BottomNavBar: React.FC<Props> = ({ currentScreen, onNavigate, userRole }) => {
  if (userRole === 'manager') {
    return (
      <nav
        className="w-full shrink-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,71,255,0.08)] border-t border-slate-200"
        data-active-classes="text-primary-container font-semibold"
      >
        <div className="flex items-center justify-around h-14 px-2 max-w-lg mx-auto">
          {/* Aperçu */}
          <button
            onClick={() => onNavigate('pro-dashboard')}
            aria-current={currentScreen === 'pro-dashboard' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] transition-colors group cursor-pointer ${
              currentScreen === 'pro-dashboard' ? 'text-primary font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
            type="button"
          >
            <i className="fa-solid fa-chart-pie text-[16px] mb-0.5"></i>
            <span className="text-[10px] font-semibold">Aperçu</span>
          </button>

          {/* Publication */}
          <button
            onClick={() => onNavigate('pro-publish')}
            aria-current={currentScreen === 'pro-publish' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] transition-colors group cursor-pointer ${
              currentScreen === 'pro-publish' ? 'text-primary font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
            type="button"
          >
            <i className="fa-solid fa-pen-to-square text-[16px] mb-0.5"></i>
            <span className="text-[10px] font-semibold">Publication</span>
          </button>

          {/* Réservations */}
          <button
            onClick={() => onNavigate('reservation')}
            aria-current={currentScreen === 'reservation' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] transition-colors group cursor-pointer ${
              currentScreen === 'reservation' ? 'text-primary font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
            type="button"
          >
            <i className="fa-solid fa-calendar-check text-[16px] mb-0.5"></i>
            <span className="text-[10px] font-semibold">Réservations</span>
          </button>

          {/* Profil Pro */}
          <button
            onClick={() => onNavigate('pro-profile')}
            aria-current={currentScreen === 'pro-profile' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] transition-colors group cursor-pointer ${
              currentScreen === 'pro-profile' ? 'text-primary font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
            type="button"
          >
            <i className="fa-solid fa-store text-[16px] mb-0.5"></i>
            <span className="text-[10px] font-semibold">Profil Pro</span>
          </button>
        </div>
      </nav>
    );
  }

  // Client mode nav bar
  return (
    <nav
      className="w-full shrink-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-slate-200"
      data-active-classes="text-primary-container"
    >
      <div className="flex items-center justify-around h-14 px-1 relative max-w-lg mx-auto">
        {/* Explorer / Accueil */}
        <button
          onClick={() => onNavigate('home')}
          aria-current={currentScreen === 'home' || currentScreen === 'home-discovery' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] h-full transition-colors cursor-pointer ${
            currentScreen === 'home' || currentScreen === 'home-discovery'
              ? 'text-primary font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          type="button"
        >
          <i className="fa-solid fa-compass text-[16px]"></i>
          <span className="text-[10px] font-semibold">Explorer</span>
        </button>

        {/* Carte */}
        <button
          onClick={() => onNavigate('carte')}
          aria-current={currentScreen === 'carte' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] h-full transition-colors cursor-pointer ${
            currentScreen === 'carte' ? 'text-primary font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          type="button"
        >
          <i className="fa-solid fa-map-location-dot text-[16px]"></i>
          <span className="text-[10px] font-semibold">Carte</span>
        </button>

        {/* Floating Center Action Button: Chat IA (lukaAI) */}
        <div className="relative flex items-center justify-center -top-3">
          <button
            onClick={() => onNavigate('chat-ia')}
            aria-current={currentScreen === 'chat-ia' ? 'page' : undefined}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg shadow-primary/30 active:scale-95 transition-transform cursor-pointer ring-3 ring-white"
            type="button"
            aria-label="Assistant lukaAI Concierge"
            title="Assistant lukaAI"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-[18px]"></i>
          </button>
        </div>

        {/* Favoris */}
        <button
          onClick={() => onNavigate('favoris')}
          aria-current={currentScreen === 'favoris' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] h-full transition-colors cursor-pointer ${
            currentScreen === 'favoris' ? 'text-primary font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          type="button"
        >
          <i className="fa-solid fa-heart text-[16px]"></i>
          <span className="text-[10px] font-semibold">Favoris</span>
        </button>

        {/* Compte */}
        <button
          onClick={() => onNavigate('compte')}
          aria-current={currentScreen === 'compte' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] h-full transition-colors cursor-pointer ${
            currentScreen === 'compte' ? 'text-primary font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          type="button"
        >
          <i className="fa-solid fa-user text-[16px]"></i>
          <span className="text-[10px] font-semibold">Compte</span>
        </button>
      </div>
    </nav>
  );
};
