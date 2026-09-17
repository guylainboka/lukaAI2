import React from 'react';
import { ScreenName } from '../types';

interface Props {
  title: string;
  onNavigate: (screen: ScreenName) => void;
  showBack?: boolean;
  backTarget?: ScreenName;
  onOpenPaywall?: () => void;
}

export const AppHeader: React.FC<Props> = ({
  title,
  onNavigate,
  showBack = false,
  backTarget = 'home',
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 shrink-0">
      {/* Main Title Row */}
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {showBack ? (
            <button
              onClick={() => onNavigate(backTarget)}
              aria-label="Retour"
              className="w-9 h-9 -ml-1.5 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              type="button"
            >
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </button>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-xs">
              <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
            </div>
          )}
          <h1 className="text-base font-extrabold text-slate-900 tracking-tight capitalize">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications button */}
          <button
            onClick={() => onNavigate('notifications')}
            aria-label="Notifications"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition relative cursor-pointer"
            type="button"
          >
            <i className="fa-regular fa-bell text-base"></i>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white"></span>
          </button>

          {/* User profile avatar */}
          <button
            onClick={() => onNavigate('compte')}
            aria-label="Compte"
            className="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition"
            type="button"
          >
            <i className="fa-solid fa-user text-[11px]"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

