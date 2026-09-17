import React, { useState } from 'react';
import { ScreenName } from '../types';
import { PaymentDisclaimerBanner } from './PaymentDisclaimerBanner';
import { PaymentLogo, PaymentMethodId, PAYMENT_METHODS } from './PaymentLogo';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onOpenGpsModal: () => void;
}

export const FicheLieuScreen: React.FC<Props> = ({ onNavigate, onOpenGpsModal }) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Rue des Jardins, Cocody Ambassades, Abidjan, Côte d’Ivoire');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Le Jardin Gourmand • lukaAI',
        text: 'Découvrez Le Jardin Gourmand à Cocody, paiement direct sur place accepté via Wave & Orange Money.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyAddress();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-6 bg-slate-50 flex-1">
      {/* Hero Media Header */}
      <div className="relative w-full h-72 bg-slate-900">
        <img
          alt="Le Jardin Gourmand Salle et Terrasse"
          className="w-full h-full object-cover opacity-90"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdbaAuRk4R3nRX6iIwrKtEK38iIPxrSAn6mRVfWGS1QqEubTXJEkerKlRGMG7kD7wPf8W39Q_Mljh4Go1hJoycs0ZbjiPgfPvUP8NlnETMyabXHH6ECpZdml8TqW3KCjs0vAqCSKnqHdp-j4hfLS4jrjOrPa2W6e7aAHOtLB38MQYLdC1nTDdhKFjkBLTo5j7TD_IWacjf4CFVAeUC-ZTNRD-ikNXYKw6j84vYBanj1BpL3nR-9PSZ0Q"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/50"></div>

        {/* Floating Top Controls */}
        <div className="absolute top-0 left-0 right-0 pt-safe px-4 py-3 flex items-center justify-between z-20">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center active:scale-95 transition cursor-pointer backdrop-blur-md"
            aria-label="Retour"
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center active:scale-95 transition cursor-pointer backdrop-blur-md"
              aria-label="Partager"
            >
              <i className="fa-solid fa-share-nodes text-sm"></i>
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center active:scale-95 transition cursor-pointer backdrop-blur-md"
              aria-label="Sauvegarder en favori"
            >
              <i className={`${isFavorite ? 'fa-solid text-rose-500' : 'fa-regular text-slate-800'} fa-heart text-sm`}></i>
            </button>
          </div>
        </div>

        {/* Gallery Badge */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
          <i className="fa-regular fa-images text-[11px]"></i>
          <span>16 photos</span>
        </div>

        {/* Live Status Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Ouvert actuellement • Ferme à 23h30
          </span>
        </div>
      </div>

      {/* Main Content Info */}
      <div className="px-5 pt-5 space-y-6">
        {/* Title & Headline */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-50 text-primary border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <i className="fa-solid fa-badge-check"></i>
              Établissement Pro Vérifié lukaAI
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Le Jardin Gourmand</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Cuisine Franco-Ivoirienne &amp; Cocktails Signatures • Cocody Ambassades
          </p>

          <div className="flex items-center gap-3 mt-3 text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded-lg">
              <i className="fa-solid fa-star text-[11px]"></i>
              <span>4.9</span>
              <span className="text-slate-400 font-normal">(128 avis)</span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">12 000 - 25 000 FCFA</span>
            <span className="text-slate-300">•</span>
            <span className="text-primary font-bold flex items-center gap-1">
              <i className="fa-solid fa-location-dot text-[10px]"></i> 350 m
            </span>
          </div>
        </div>

        {/* Disclaimer explicite */}
        <PaymentDisclaimerBanner />

        {/* SECTION: Paiements sur Place Acceptés */}
        <section className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Moyens de paiement acceptés sur place</h2>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <i className="fa-solid fa-shield-check"></i> 0 commission en ligne
            </span>
          </div>

          <p className="text-[11px] text-slate-600">
            Ce lieu accepte les paiements directs suivants au comptoir, à table ou via TPE :
          </p>

          <div className="grid grid-cols-1 gap-2">
            {/* Mobile Money */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <i className="fa-solid fa-mobile-screen text-primary"></i> Mobile Money acceptés
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <PaymentLogo id="wave" size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">Wave</p>
                    <p className="text-[9px] text-emerald-600 font-medium">QR / Direct</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <PaymentLogo id="orange" size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">Orange Money</p>
                    <p className="text-[9px] text-emerald-600 font-medium">Code marchand</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <PaymentLogo id="mtn" size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">MTN MoMo</p>
                    <p className="text-[9px] text-emerald-600 font-medium">Push USSD</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <PaymentLogo id="moov" size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">Moov Money</p>
                    <p className="text-[9px] text-emerald-600 font-medium">Transfert direct</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <PaymentLogo id="airtel" size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">Airtel Money</p>
                    <p className="text-[9px] text-emerald-600 font-medium">Accepté</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <PaymentLogo id="mpesa" size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">M-Pesa</p>
                    <p className="text-[9px] text-emerald-600 font-medium">Accepté</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cartes bancaires & Paiement digital */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <i className="fa-solid fa-credit-card text-primary"></i> Cartes Bancaires &amp; Digital
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <PaymentLogo id="visa" size="sm" />
                  <span className="text-[10px] font-bold text-slate-900 mt-1">Visa</span>
                  <span className="text-[8px] text-slate-500">TPE sur place</span>
                </div>

                <div className="flex flex-col items-center text-center p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <PaymentLogo id="mastercard" size="sm" />
                  <span className="text-[10px] font-bold text-slate-900 mt-1">Mastercard</span>
                  <span className="text-[8px] text-slate-500">TPE sur place</span>
                </div>

                <div className="flex flex-col items-center text-center p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <PaymentLogo id="paypal" size="sm" />
                  <span className="text-[10px] font-bold text-slate-900 mt-1">PayPal</span>
                  <span className="text-[8px] text-slate-500">QR / Scan direct</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Emplacement & Itinéraire */}
        <section className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Emplacement &amp; Itinéraire</h2>
          
          <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200">
            <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg animate-bounce">
                <i className="fa-solid fa-utensils text-xs"></i>
              </div>
              <span className="bg-white text-slate-900 font-bold text-[10px] px-2 py-0.5 rounded shadow mt-1">
                Le Jardin Gourmand
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-900">Rue des Jardins, Cocody Ambassades, Abidjan</p>
            <p className="text-[11px] text-slate-500">À 350 m de votre position actuelle • 4 min à pied, 2 min taxi/VTC</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onOpenGpsModal}
              className="w-full py-2.5 px-3 rounded-2xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
            >
              <i className="fa-solid fa-location-arrow"></i>
              <span>Lancer l'itinéraire</span>
            </button>
            <button
              onClick={handleCopyAddress}
              className="w-full py-2.5 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer"
            >
              <i className="fa-regular fa-copy text-slate-600"></i>
              <span>{copiedAddress ? 'Copié !' : 'Copier l’adresse'}</span>
            </button>
          </div>
        </section>

        {/* SECTION: Menu & Spécialités */}
        <section className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Menu &amp; Spécialités</h2>
            <span className="text-xs font-semibold text-primary cursor-pointer">Voir la carte complète</span>
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            {/* Dish 1 */}
            <div className="flex items-start justify-between pt-2 first:pt-0">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Braisiade de Mérou &amp; Aloko</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Mérou frais du jour mariné aux épices locales, bananes plantains frites.</p>
              </div>
              <span className="text-xs font-extrabold text-primary shrink-0 ml-3">8 500 FCFA</span>
            </div>

            {/* Dish 2 */}
            <div className="flex items-start justify-between pt-2">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Filet de Bœuf au Poivre Vert</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Viande tendre saisie au beurre maître d'hôtel, écrasé de patates douces.</p>
              </div>
              <span className="text-xs font-extrabold text-primary shrink-0 ml-3">14 000 FCFA</span>
            </div>

            {/* Dish 3 */}
            <div className="flex items-start justify-between pt-2">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Cocktail Signature "Le Babi Sunset"</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Rhum ambré, jus d'ananas victoria frais, passion, trait de gingembre bio.</p>
              </div>
              <span className="text-xs font-extrabold text-primary shrink-0 ml-3">5 000 FCFA</span>
            </div>
          </div>
        </section>

        {/* SECTION: Avis Clients */}
        <section className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Avis clients 100% vérifiés</h2>
            <span className="text-xs font-semibold text-primary cursor-pointer">Tous les avis (128)</span>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center">
                    A
                  </div>
                  <span className="text-xs font-bold text-slate-900">Awa M.</span>
                  <span className="text-[9px] bg-cyan-100 text-cyan-800 font-semibold px-1.5 py-0.5 rounded">
                    Payé avec Wave
                  </span>
                </div>
                <div className="flex text-amber-400 text-[10px]">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                "Superbe cadre en terrasse avec fontaine. Paiement par Wave direct ultra rapide à la caisse sans le moindre frais."
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center">
                    K
                  </div>
                  <span className="text-xs font-bold text-slate-900">Kouassi D.</span>
                  <span className="text-[9px] bg-slate-200 text-slate-700 font-semibold px-1.5 py-0.5 rounded">
                    Payé par Carte TPE
                  </span>
                </div>
                <div className="flex text-amber-400 text-[10px]">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                "Le mérou braisé est exceptionnel. Rien à avancer en ligne, réservation prise en compte instantanément."
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-5 py-2.5 shadow-lg max-w-lg mx-auto mt-auto flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium px-1">
          <span className="flex items-center gap-1 text-emerald-600 font-bold">
            <i className="fa-solid fa-shield-check"></i> 0 FCFA débité maintenant
          </span>
          <span>Règlement direct au lieu</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGpsModal}
            className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 cursor-pointer transition active:scale-95 shrink-0"
          >
            <i className="fa-solid fa-location-arrow text-primary"></i>
            <span>GPS (4 min)</span>
          </button>
          <button
            onClick={() => onNavigate('reservation')}
            className="flex-1 py-3 px-5 rounded-2xl bg-primary hover:bg-primary-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 cursor-pointer transition active:scale-95"
          >
            <i className="fa-regular fa-calendar-check"></i>
            <span>Réserver sans paiement en ligne</span>
          </button>
        </div>
      </div>
    </div>
  );
};
