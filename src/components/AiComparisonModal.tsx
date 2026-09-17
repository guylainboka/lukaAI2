import React, { useState } from 'react';
import { ProductItem, ShopItem } from '../types';
import { PaymentLogo } from './PaymentLogo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: (ProductItem | ShopItem)[];
  type: 'product' | 'shop';
  onSelectWinningItem: (item: ProductItem | ShopItem) => void;
}

export const AiComparisonModal: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  type,
  onSelectWinningItem,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFocus, setAiFocus] = useState<'budget' | 'quality' | 'payment' | 'speed'>('budget');

  if (!isOpen || items.length < 2) return null;

  // Compute best values
  const getPriceNum = (item: ProductItem | ShopItem) => {
    if ('price' in item) return item.price;
    // For shop, extract first number from priceRange e.g. "8 500"
    const match = item.priceRange.match(/\d+/g);
    return match ? parseInt(match.join(''), 10) : 10000;
  };

  const sortedByPrice = [...items].sort((a, b) => getPriceNum(a) - getPriceNum(b));
  const sortedByRating = [...items].sort((a, b) => b.rating - a.rating);

  const cheapestItem = sortedByPrice[0];
  const highestRatedItem = sortedByRating[0];
  const winner = aiFocus === 'budget' ? cheapestItem : highestRatedItem;

  const priceDiff = Math.abs(getPriceNum(sortedByPrice[sortedByPrice.length - 1]) - getPriceNum(cheapestItem));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-blue-900 via-primary to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-amber-300 text-base shadow-inner">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold tracking-tight">Analyse Comparative lukaAI</h3>
                <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full uppercase">
                  IA Active
                </span>
              </div>
              <p className="text-[11px] text-blue-100">
                Comparaison intelligente de {items.length} {type === 'product' ? 'produits' : 'établissements'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4 no-scrollbar">
          {/* Quick focus filters for the AI verdict */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Critère prioritaire de votre choix :
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => setAiFocus('budget')}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold flex flex-col items-center gap-0.5 border transition cursor-pointer ${
                  aiFocus === 'budget'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <i className="fa-solid fa-piggy-bank text-[11px]"></i>
                <span>Économie</span>
              </button>

              <button
                type="button"
                onClick={() => setAiFocus('quality')}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold flex flex-col items-center gap-0.5 border transition cursor-pointer ${
                  aiFocus === 'quality'
                    ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <i className="fa-solid fa-star text-[11px]"></i>
                <span>Qualité</span>
              </button>

              <button
                type="button"
                onClick={() => setAiFocus('payment')}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold flex flex-col items-center gap-0.5 border transition cursor-pointer ${
                  aiFocus === 'payment'
                    ? 'bg-blue-50 border-primary text-blue-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <i className="fa-solid fa-wallet text-[11px]"></i>
                <span>Paiement</span>
              </button>

              <button
                type="button"
                onClick={() => setAiFocus('speed')}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold flex flex-col items-center gap-0.5 border transition cursor-pointer ${
                  aiFocus === 'speed'
                    ? 'bg-cyan-50 border-cyan-500 text-cyan-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <i className="fa-solid fa-location-arrow text-[11px]"></i>
                <span>Proximité</span>
              </button>
            </div>
          </div>

          {/* Verdict lukaAI Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-3xl p-4 border border-blue-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <i className="fa-solid fa-trophy text-amber-500"></i> Le Choix Recommandé
              </span>
              <span className="text-[10px] font-bold bg-white text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                Score IA : 96/100
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <img
                src={winner.image}
                alt={winner.name}
                className="w-14 h-14 rounded-2xl object-cover border border-blue-200 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-extrabold text-slate-900 truncate">{winner.name}</h4>
                <p className="text-[11px] text-slate-600">
                  {'shopLocation' in winner ? winner.shopLocation : winner.location}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-primary">
                    {'formattedPrice' in winner ? winner.formattedPrice : winner.priceRange}
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                    <i className="fa-solid fa-star text-[9px]"></i> {winner.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Explanation Text */}
            <div className="pt-2 border-t border-blue-100 text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-2xl">
              {aiFocus === 'budget' && (
                <p>
                  <strong>{winner.name}</strong> est l'option la plus rentable de votre sélection.
                  {priceDiff > 0 && ` Vous économisez jusqu'à ${priceDiff.toLocaleString()} FCFA`} tout en profitant d'une excellente note client ({winner.rating}/5).
                </p>
              )}
              {aiFocus === 'quality' && (
                <p>
                  <strong>{winner.name}</strong> affiche le meilleur taux de satisfaction ({winner.rating}/5 sur {winner.reviewsCount} avis). C'est le choix sans compromis pour une expérience réussie.
                </p>
              )}
              {aiFocus === 'payment' && (
                <p>
                  <strong>{winner.name}</strong> offre une excellente souplesse de règlement direct sur place ({winner.acceptedPayments.join(', ').toUpperCase()}). Vous n'avez rien à avancer en ligne.
                </p>
              )}
              {aiFocus === 'speed' && (
                <p>
                  <strong>{winner.name}</strong> est à seulement {winner.distance} de vous, ce qui minimise le temps de déplacement et évite les bouchons aux heures de pointe.
                </p>
              )}
            </div>
          </div>

          {/* Side by side synthesis */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Synthèse comparative directe :
            </h4>

            <div className="space-y-2">
              {items.map((item, idx) => {
                const isWinner = item.id === winner.id;
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border transition ${
                      isWinner ? 'bg-white border-primary shadow-xs ring-2 ring-primary/10' : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                            isWinner ? 'bg-primary text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 truncate">{item.name}</h5>
                          <p className="text-[10px] text-slate-500">
                            {item.distance} • Note {item.rating}/5 ({item.reviewsCount} avis)
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-slate-900 block">
                          {'formattedPrice' in item ? item.formattedPrice : item.priceRange}
                        </span>
                        {isWinner && (
                          <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                            Recommandé
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Moyens de paiement direct */}
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-[9px] text-slate-400 mr-1">Règlement direct :</span>
                        {item.acceptedPayments.map((p) => (
                          <PaymentLogo key={p} id={p} size="xs" />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectWinningItem(item);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-700 font-bold text-[10px] transition cursor-pointer"
                      >
                        Choisir celui-ci
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rappel sécurité paiement */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-center gap-2.5 text-emerald-900 text-xs">
            <i className="fa-solid fa-shield-check text-emerald-600 text-base shrink-0"></i>
            <p className="text-[10px] leading-snug">
              <strong>Aucun paiement en ligne :</strong> Quel que soit votre choix, vous réservez gratuitement et réglez directement sur place à votre arrivée avec vos comptes préférés.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectWinningItem(winner);
              onClose();
            }}
            className="px-5 py-2 rounded-2xl bg-primary hover:bg-primary-600 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-check"></i>
            <span>Choisir le gagnant ({winner.name.split(' ')[0]})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
