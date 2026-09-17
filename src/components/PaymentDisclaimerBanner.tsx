import React from 'react';

export const PaymentDisclaimerBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div
      className={`bg-blue-50/80 border border-blue-200/90 rounded-2xl text-blue-950 flex items-start gap-2.5 shadow-2xs ${
        compact ? 'p-2.5 text-[11px]' : 'p-3 text-xs'
      }`}
    >
      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">
        <i className="fa-solid fa-circle-info"></i>
      </div>
      <div className="flex-1 leading-relaxed">
        <p className="font-bold text-blue-900">
          Recherche & Réservation sans paiement en ligne
        </p>
        <p className="text-blue-800/85 mt-0.5">
          lukaAI vous indique où vous pouvez payer avec votre Mobile Money ou Carte, et vous permet de <strong>réserver pour payer directement sur place</strong>. Aucun débit n’est effectué sur l’application.
        </p>
      </div>
    </div>
  );
};
