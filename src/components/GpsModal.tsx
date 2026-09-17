import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  venueName?: string;
}

export const GpsModal: React.FC<Props> = ({ isOpen, onClose, venueName = 'Le Jardin Gourmand' }) => {
  if (!isOpen) return null;

  const handleLaunch = (app: string) => {
    alert(`Lancement de l'itinéraire vers ${venueName} via ${app}...`);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 overflow-hidden">
      <div
        className="w-full bg-white rounded-t-3xl p-5 shadow-2xl border border-slate-100 space-y-4 animate-in slide-in-from-bottom duration-300"
        role="dialog"
      >
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto sm:hidden"></div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Itinéraire GPS en direct</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">{venueName} • Cocody</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>

        {/* Proximity summary */}
        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center justify-around text-center text-xs">
          <div>
            <p className="text-[10px] text-slate-400 font-semibold">Distance</p>
            <p className="font-extrabold text-slate-800">350 m</p>
          </div>
          <div className="border-x border-blue-200 px-3">
            <p className="text-[10px] text-slate-400 font-semibold">À pied</p>
            <p className="font-extrabold text-primary">4 min</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold">En VTC / Taxi</p>
            <p className="font-extrabold text-slate-800">2 min</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2">
          <button
            onClick={() => handleLaunch('Google Maps')}
            className="w-full p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between transition cursor-pointer text-xs font-bold text-slate-800"
          >
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-map-location-dot text-emerald-500 text-base"></i>
              <span>Google Maps</span>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-slate-400 text-xs"></i>
          </button>

          <button
            onClick={() => handleLaunch('Waze')}
            className="w-full p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between transition cursor-pointer text-xs font-bold text-slate-800"
          >
            <div className="flex items-center gap-3">
              <i className="fa-brands fa-waze text-cyan-500 text-base"></i>
              <span>Waze (Éviter les bouchons)</span>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-slate-400 text-xs"></i>
          </button>

          <button
            onClick={() => handleLaunch('Apple Maps')}
            className="w-full p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between transition cursor-pointer text-xs font-bold text-slate-800"
          >
            <div className="flex items-center gap-3">
              <i className="fa-brands fa-apple text-slate-800 text-base"></i>
              <span>Plans (Apple Maps)</span>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-slate-400 text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
