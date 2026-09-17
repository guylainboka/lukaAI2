import React from 'react';

interface Props {
  navStyle: 'gestures' | 'buttons';
  onBack: () => void;
  onHome: () => void;
  onRecents: () => void;
}

export const AndroidNavBar: React.FC<Props> = ({
  navStyle,
  onBack,
  onHome,
  onRecents,
}) => {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md select-none shrink-0 z-50 border-t border-slate-100 flex items-center justify-center">
      {navStyle === 'gestures' ? (
        /* Modern Android 14 Gesture Pill */
        <div className="py-2.5 w-full flex items-center justify-center cursor-pointer group" onClick={onHome}>
          <div className="w-32 h-1 bg-slate-800 rounded-full group-hover:bg-primary transition-all duration-200 shadow-xs"></div>
        </div>
      ) : (
        /* Traditional Android 3-Button Navigation Bar (Back, Home, Recents) */
        <div className="h-10 w-full px-8 flex items-center justify-between text-slate-700">
          {/* Back: Triangle ◀ */}
          <button
            onClick={onBack}
            className="w-12 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 active:scale-90 transition text-sm cursor-pointer"
            aria-label="Retour Android"
            title="Retour"
          >
            <i className="fa-solid fa-play -rotate-180 text-[11px]"></i>
          </button>

          {/* Home: Circle ● */}
          <button
            onClick={onHome}
            className="w-12 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 active:scale-90 transition text-sm cursor-pointer"
            aria-label="Accueil Android"
            title="Accueil"
          >
            <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-700 hover:border-primary transition"></div>
          </button>

          {/* Recents: Square ■ */}
          <button
            onClick={onRecents}
            className="w-12 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 active:scale-90 transition text-sm cursor-pointer"
            aria-label="Applications récentes"
            title="Applications récentes"
          >
            <div className="w-3 h-3 rounded-[3px] border-2 border-slate-700 hover:border-primary transition"></div>
          </button>
        </div>
      )}
    </div>
  );
};
