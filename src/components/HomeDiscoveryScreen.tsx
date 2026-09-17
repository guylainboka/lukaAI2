import React, { useState } from 'react';
import { ScreenName } from '../types';
import { PaymentDisclaimerBanner } from './PaymentDisclaimerBanner';
import { PaymentLogo, PaymentFilterPill, PaymentMethodId } from './PaymentLogo';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

export const HomeDiscoveryScreen: React.FC<Props> = ({ onNavigate }) => {
  const [activePaymentFilter, setActivePaymentFilter] = useState<PaymentMethodId | 'all'>('all');

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-6 pt-0 bg-slate-50 flex-1">
      {/* Disclaimer explicite */}
      <div className="px-5 pt-3">
        <PaymentDisclaimerBanner />
      </div>

      {/* Greeting and search bar section */}
      <section className="px-5 pt-3 pb-4 bg-white shadow-xs">
        <div className="mb-3">
          <p className="text-xs font-medium text-primary">Assistant Local lukaAI</p>
          <p className="text-xl font-bold text-slate-900 tracking-tight">Bonjour, Thomas 👋</p>
        </div>
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <i className="fa-solid fa-magnifying-glass text-sm"></i>
          </div>
          <input
            className="w-full pl-10 pr-10 py-2.5 bg-slate-100/90 text-xs font-medium placeholder-slate-400 text-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
            placeholder="Rechercher un restaurant, hôtel, boutique..."
            type="search"
          />
          <button
            onClick={() => onNavigate('home')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-primary cursor-pointer"
            title="Comparateur de prix"
            type="button"
          >
            <i className="fa-solid fa-sliders text-sm"></i>
          </button>
        </div>
      </section>

      {/* PaymentPillsFilters */}
      <section className="py-3 px-5 border-y border-slate-100 bg-white" data-purpose="payment-filters">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <i className="fa-solid fa-wallet text-primary"></i> Filtrer par moyen accepté sur place :
          </span>
          {activePaymentFilter !== 'all' && (
            <button
              onClick={() => setActivePaymentFilter('all')}
              className="text-[10px] text-primary font-bold hover:underline cursor-pointer"
            >
              Tous
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActivePaymentFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer border ${
              activePaymentFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tous les moyens
          </button>
          <PaymentFilterPill
            id="wave"
            selected={activePaymentFilter === 'wave'}
            onClick={() => setActivePaymentFilter('wave')}
          />
          <PaymentFilterPill
            id="orange"
            selected={activePaymentFilter === 'orange'}
            onClick={() => setActivePaymentFilter('orange')}
          />
          <PaymentFilterPill
            id="mtn"
            selected={activePaymentFilter === 'mtn'}
            onClick={() => setActivePaymentFilter('mtn')}
          />
          <PaymentFilterPill
            id="moov"
            selected={activePaymentFilter === 'moov'}
            onClick={() => setActivePaymentFilter('moov')}
          />
          <PaymentFilterPill
            id="airtel"
            selected={activePaymentFilter === 'airtel'}
            onClick={() => setActivePaymentFilter('airtel')}
          />
          <PaymentFilterPill
            id="mpesa"
            selected={activePaymentFilter === 'mpesa'}
            onClick={() => setActivePaymentFilter('mpesa')}
          />
          <PaymentFilterPill
            id="visa"
            selected={activePaymentFilter === 'visa'}
            onClick={() => setActivePaymentFilter('visa')}
          />
          <PaymentFilterPill
            id="mastercard"
            selected={activePaymentFilter === 'mastercard'}
            onClick={() => setActivePaymentFilter('mastercard')}
          />
          <PaymentFilterPill
            id="paypal"
            selected={activePaymentFilter === 'paypal'}
            onClick={() => setActivePaymentFilter('paypal')}
          />
        </div>
      </section>

      {/* CategoryQuickNav */}
      <section className="mt-4 px-5" data-purpose="quick-category-navigation">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Explorer par catégorie</h2>
          <button onClick={() => onNavigate('explorer')} className="text-xs font-semibold text-primary hover:underline cursor-pointer">
            Voir tout
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2.5 text-center">
          <div onClick={() => onNavigate('explorer')} className="flex flex-col items-center gap-1.5 cursor-pointer group">
            <div className="w-full aspect-square rounded-2xl bg-orange-50 border border-orange-100/80 text-orange-600 flex items-center justify-center shadow-xs group-hover:bg-orange-100 transition">
              <i className="fa-solid fa-utensils text-lg"></i>
            </div>
            <span className="text-[11px] font-medium text-slate-700 leading-tight">Restos</span>
          </div>
          <div onClick={() => onNavigate('explorer')} className="flex flex-col items-center gap-1.5 cursor-pointer group">
            <div className="w-full aspect-square rounded-2xl bg-blue-50 border border-blue-100/80 text-blue-600 flex items-center justify-center shadow-xs group-hover:bg-blue-100 transition">
              <i className="fa-solid fa-hotel text-lg"></i>
            </div>
            <span className="text-[11px] font-medium text-slate-700 leading-tight">Hôtels</span>
          </div>
          <div onClick={() => onNavigate('explorer')} className="flex flex-col items-center gap-1.5 cursor-pointer group">
            <div className="w-full aspect-square rounded-2xl bg-emerald-50 border border-emerald-100/80 text-emerald-600 flex items-center justify-center shadow-xs group-hover:bg-emerald-100 transition">
              <i className="fa-solid fa-bag-shopping text-lg"></i>
            </div>
            <span className="text-[11px] font-medium text-slate-700 leading-tight">Boutiques</span>
          </div>
          <div onClick={() => onNavigate('explorer')} className="flex flex-col items-center gap-1.5 cursor-pointer group">
            <div className="w-full aspect-square rounded-2xl bg-amber-50 border border-amber-100/80 text-amber-600 flex items-center justify-center shadow-xs group-hover:bg-amber-100 transition">
              <i className="fa-solid fa-mug-saucer text-lg"></i>
            </div>
            <span className="text-[11px] font-medium text-slate-700 leading-tight">Cafés</span>
          </div>
          <div onClick={() => onNavigate('explorer')} className="flex flex-col items-center gap-1.5 cursor-pointer group">
            <div className="w-full aspect-square rounded-2xl bg-purple-50 border border-purple-100/80 text-purple-600 flex items-center justify-center shadow-xs group-hover:bg-purple-100 transition">
              <i className="fa-solid fa-martini-glass-citrus text-lg"></i>
            </div>
            <span className="text-[11px] font-medium text-slate-700 leading-tight">Rooftops</span>
          </div>
        </div>
      </section>

      {/* SecurityNoticeBanner */}
      <section className="mt-4 px-5" data-purpose="security-reassurance-notice">
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-primary text-white rounded-2xl p-3.5 flex items-start gap-3 shadow-md shadow-primary/10">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="fa-solid fa-shield-halved text-emerald-300 text-sm"></i>
          </div>
          <div>
            <h3 className="text-xs font-bold leading-tight flex items-center gap-1.5">
              Zéro frais, zéro risque en ligne
              <span className="bg-emerald-400/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Garanti</span>
            </h3>
            <p className="text-[10px] text-blue-100/90 mt-1 leading-snug">
              Rappel : Aucun paiement en ligne requis — Réglez directement sur place via Wave, Orange Money ou Espèces.
            </p>
          </div>
        </div>
      </section>

      {/* PopularVenuesSection */}
      <section className="mt-5 px-5" data-purpose="popular-venues">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Populaires à proximité</h2>
            <p className="text-[10px] text-slate-500">Sélectionnés avec soin pour vos sorties</p>
          </div>
          <button onClick={() => onNavigate('explorer')} className="text-xs font-semibold text-primary cursor-pointer">
            Filtrer
          </button>
        </div>

        {/* Venue Card 1 */}
        <article
          onClick={() => onNavigate('fiche-lieu')}
          className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-sm mb-3.5 cursor-pointer transition hover:shadow-md"
        >
          <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-slate-200 mb-3">
            <img
              alt="Le Jardin Gourmand Cocody"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdbaAuRk4R3nRX6iIwrKtEK38iIPxrSAn6mRVfWGS1QqEubTXJEkerKlRGMG7kD7wPf8W39Q_Mljh4Go1hJoycs0ZbjiPgfPvUP8NlnETMyabXHH6ECpZdml8TqW3KCjs0vAqCSKnqHdp-j4hfLS4jrjOrPa2W6e7aAHOtLB38MQYLdC1nTDdhKFjkBLTo5j7TD_IWacjf4CFVAeUC-ZTNRD-ikNXYKw6j84vYBanj1BpL3nR-9PSZ0Q"
            />
            <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <i className="fa-solid fa-star text-amber-400 text-[11px]"></i>
              <span className="text-xs font-bold text-slate-800">4.9</span>
              <span className="text-[9px] text-slate-500 font-normal">(128)</span>
            </div>
            <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-800 shadow-sm flex items-center gap-1">
              <i className="fa-solid fa-location-dot text-slate-500 text-[10px]"></i>
              350 m
            </div>
            <div className="absolute bottom-2.5 left-2.5 bg-emerald-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-xs">
              Ouvert actuellement
            </div>
          </div>
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">Le Jardin Gourmand • Cocody Ambassades</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Cuisine Franco-Ivoirienne &amp; Cocktails • FCFA 12 000 - 25 000</p>
              </div>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                <PaymentLogo id="wave" size="xs" />
                <PaymentLogo id="orange" size="xs" />
                <PaymentLogo id="visa" size="xs" />
              </div>
              <span className="text-xs font-bold text-primary flex items-center gap-1">
                Détails
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </span>
            </div>
          </div>
        </article>

        {/* Venue Card 2 */}
        <article
          onClick={() => onNavigate('fiche-lieu')}
          className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-sm mb-3.5 cursor-pointer transition hover:shadow-md"
        >
          <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-slate-200 mb-3">
            <img
              alt="Sky View Lounge &amp; Rooftop"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATg5IoRL0iIOOfiXELW3RZ7RTgYGAV1GAiy_Vzi-J6N90M1kYRHjHMkmrnotziRAafTYHGa2ujUoYupG8ZNH2WJHP-nrX3ZdbJxXuweyfruklWZMM7soO__Mz7hwaTsw89bfKCYsMtKnzDEv0tUe8HE00lfEzlmF8KlaeH1tiqDCAZ3CwJhrHNqRp43IKunzBIl-KM4pfWCsFQp9BAc1CZ4BRE_nkyjdWK_ZLXNSVpBPl0ROkni0lQWQ"
            />
            <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <i className="fa-solid fa-star text-amber-400 text-[11px]"></i>
              <span className="text-xs font-bold text-slate-800">4.8</span>
              <span className="text-[9px] text-slate-500 font-normal">(94)</span>
            </div>
            <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-800 shadow-sm flex items-center gap-1">
              <i className="fa-solid fa-location-dot text-slate-500 text-[10px]"></i>
              1.2 km
            </div>
            <div className="absolute bottom-2.5 left-2.5 bg-primary/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-xs">
              Vue panoramique
            </div>
          </div>
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">Sky View Rooftop &amp; Tapas</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Bar lounge vue lagune • FCFA 8 000 - 18 000</p>
              </div>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                <PaymentLogo id="wave" size="xs" />
                <PaymentLogo id="mtn" size="xs" />
                <PaymentLogo id="mastercard" size="xs" />
              </div>
              <span className="text-xs font-bold text-primary flex items-center gap-1">
                Détails
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </span>
            </div>
          </div>
        </article>
      </section>

      {/* FlashOffersSection */}
      <section className="mt-2 px-5 mb-6" data-purpose="flash-offers-and-statuses">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Offres &amp; Statuts récents</h2>
          </div>
          <span className="text-xs font-semibold text-primary cursor-pointer">En direct</span>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {/* Flash 1 */}
          <div className="min-w-[220px] bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-3 shadow-xs flex-shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full uppercase">Happy Hour</span>
              <span className="text-[10px] text-slate-500">Il y a 12 min</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Café de Paris Plateau</h4>
            <p className="text-[10px] text-slate-600 mt-1 leading-snug">-20% sur la carte tapas jusqu'à 20h en réglant par Wave.</p>
          </div>
          {/* Flash 2 */}
          <div className="min-w-[220px] bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl p-3 shadow-xs flex-shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-full uppercase">Places dispo</span>
              <span className="text-[10px] text-slate-500">Il y a 30 min</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Spa Botanique Deux-Plateaux</h4>
            <p className="text-[10px] text-slate-600 mt-1 leading-snug">2 créneaux massage libre ce soir à 18h30 sans avance en ligne.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
