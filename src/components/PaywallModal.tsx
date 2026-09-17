import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PaywallModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 overflow-hidden">
      <div
        className="w-full bg-white rounded-t-[32px] p-5 shadow-2xl border border-slate-100 relative space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[90%] overflow-y-auto no-scrollbar"
        role="dialog"
        aria-modal="true"
      >
        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto -mt-2 mb-2 sm:hidden"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          aria-label="Fermer"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        {/* Header visual */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20 text-2xl">
            <i className="fa-solid fa-crown"></i>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-on-primary text-[10px] font-extrabold uppercase tracking-wider">
            lukaAI Pro
          </span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Passez à lukaAI Pro</h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            Débloquez la pleine puissance de votre assistant local sans aucune limite de requêtes.
          </p>
        </div>

        {/* Advantages */}
        <div className="space-y-3 py-2">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 text-xs mt-0.5">
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Comparateur de Prix Illimité</h4>
              <p className="text-[11px] text-slate-500">Comparez en temps réel les menus, hébergements et offres directes à Abidjan.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-cyan-500 text-white flex items-center justify-center shrink-0 text-xs mt-0.5">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Chat Concierge IA Illimité</h4>
              <p className="text-[11px] text-slate-500">Posez toutes vos questions en direct sans quota quotidien de 5 requêtes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs mt-0.5">
              <i className="fa-solid fa-location-arrow"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Itinéraires GPS en Direct &amp; Trafic</h4>
              <p className="text-[11px] text-slate-500">Guidage temps réel vers les établissements acceptant Wave &amp; Mobile Money.</p>
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-2 text-center space-y-3">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-black text-slate-900">10 $</span>
            <span className="text-xs font-bold text-slate-400">/ an</span>
            <span className="text-[11px] text-emerald-600 font-semibold ml-2">
              (Soit moins de 550 FCFA / mois)
            </span>
          </div>

          <button
            onClick={() => {
              alert('Félicitations ! Votre compte lukaAI Pro a été activé avec succès.');
              onClose();
            }}
            className="w-full py-4 bg-primary hover:bg-primary-600 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-primary/30 transition cursor-pointer"
          >
            Débloquer lukaAI Pro maintenant
          </button>

          <p className="text-[10px] text-slate-400">
            Sans engagement • Résiliable à tout moment en 1 clic
          </p>
        </div>
      </div>
    </div>
  );
};
