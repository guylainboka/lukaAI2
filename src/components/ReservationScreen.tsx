import React, { useState } from 'react';
import { ScreenName } from '../types';
import { PaymentDisclaimerBanner } from './PaymentDisclaimerBanner';
import { PaymentLogo, PaymentMethodId, PAYMENT_METHODS } from './PaymentLogo';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

export const ReservationScreen: React.FC<Props> = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState('Aujourd’hui 24 Jeu');
  const [selectedTime, setSelectedTime] = useState('20h00');
  const [guests, setGuests] = useState(2);
  const [selectedArea, setSelectedArea] = useState('Terrasse jardin');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId | 'especes'>('wave');
  const [specialNote, setSpecialNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const dates = [
    { label: 'Aujourd’hui', sub: '24 Jeu' },
    { label: 'Demain', sub: '25 Ven' },
    { label: 'Week-end', sub: '26 Sam' },
    { label: 'Dimanche', sub: '27 Dim' },
  ];

  const times = ['19h00', '19h30', '20h00', '20h30', '21h00', '21h30'];
  const areas = ['Terrasse jardin', 'Salle climatisée', 'Espace lounge'];

  const supportedPayments: { id: PaymentMethodId; name: string }[] = [
    { id: 'wave', name: 'Wave' },
    { id: 'orange', name: 'Orange Money' },
    { id: 'mtn', name: 'MTN MoMo' },
    { id: 'moov', name: 'Moov Africa' },
    { id: 'airtel', name: 'Airtel Money' },
    { id: 'mpesa', name: 'M-Pesa' },
    { id: 'visa', name: 'Carte Visa' },
    { id: 'mastercard', name: 'Mastercard' },
    { id: 'paypal', name: 'PayPal' },
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-8 bg-slate-50 flex-1">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-5 pt-safe pb-3 flex items-center justify-between">
        <button
          onClick={() => onNavigate('fiche-lieu')}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Retour"
        >
          <i className="fa-solid fa-arrow-left text-sm"></i>
        </button>
        <h1 className="text-base font-bold text-slate-900">Réserver une table</h1>
        <div className="w-10 flex items-center justify-end">
          <i className="fa-solid fa-circle-question text-slate-400 text-sm"></i>
        </div>
      </header>

      {/* Disclaimer explicite */}
      <div className="p-4 pb-0">
        <PaymentDisclaimerBanner />
      </div>

      {/* Success Modal / State */}
      {isSuccess ? (
        <div className="p-6 my-auto text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl animate-bounce">
            <i className="fa-solid fa-check"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Réservation Confirmée !</h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
            Votre table au <span className="font-bold text-slate-900">Jardin Gourmand</span> est réservée pour le{' '}
            <span className="font-bold text-primary">{selectedDate} à {selectedTime}</span> ({guests} personnes, {selectedArea}).
          </p>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left space-y-2 text-xs">
            <p className="font-bold text-emerald-950 flex items-center gap-1.5">
              <i className="fa-solid fa-shield-check text-emerald-600 text-sm"></i> 0 FCFA débité en ligne
            </p>
            <p className="text-emerald-900 leading-relaxed">
              Aucun prélèvement n'est effectué sur l'application. Vous réglerez directement sur place à votre arrivée auprès du serveur ou à la caisse ({selectedPayment === 'especes' ? 'Espèces' : PAYMENT_METHODS[selectedPayment as PaymentMethodId]?.name || selectedPayment}).
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="w-full py-3.5 bg-primary text-white font-bold rounded-2xl shadow-md cursor-pointer"
            >
              Retour à l'accueil
            </button>
            <button
              onClick={() => onNavigate('favoris')}
              className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Voir mes réservations dans mon Profil
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <form onSubmit={handleConfirm} className="p-5 space-y-5">
          {/* Établissement Card */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                <img
                  alt="Le Jardin Gourmand"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdbaAuRk4R3nRX6iIwrKtEK38iIPxrSAn6mRVfWGS1QqEubTXJEkerKlRGMG7kD7wPf8W39Q_Mljh4Go1hJoycs0ZbjiPgfPvUP8NlnETMyabXHH6ECpZdml8TqW3KCjs0vAqCSKnqHdp-j4hfLS4jrjOrPa2W6e7aAHOtLB38MQYLdC1nTDdhKFjkBLTo5j7TD_IWacjf4CFVAeUC-ZTNRD-ikNXYKw6j84vYBanj1BpL3nR-9PSZ0Q"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Le Jardin Gourmand</h3>
                <p className="text-[11px] text-slate-500">Cocody Ambassades • 4.9 ★</p>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <i className="fa-solid fa-check"></i> 100% Paiement sur place garanti
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-primary bg-blue-50 px-2.5 py-1 rounded-lg">Gratuit</span>
          </div>

          {/* 1. Date */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              1. Date de réservation
            </label>
            <div className="grid grid-cols-4 gap-2">
              {dates.map((d) => {
                const isSelected = selectedDate.includes(d.sub);
                return (
                  <button
                    key={d.sub}
                    type="button"
                    onClick={() => setSelectedDate(`${d.label} ${d.sub}`)}
                    className={`p-2.5 rounded-2xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-[10px] uppercase font-semibold opacity-80">{d.label}</span>
                    <span className="block text-xs font-bold mt-0.5">{d.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Heure de service */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              2. Heure du service
            </label>
            <div className="grid grid-cols-3 gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    selectedTime === t
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Nombre de personnes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                3. Nombre de personnes
              </label>
              <span className="text-xs font-bold text-slate-900">{guests} convives</span>
            </div>
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-2 px-4 shadow-sm">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold active:scale-95 transition cursor-pointer"
              >
                <i className="fa-solid fa-minus text-xs"></i>
              </button>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-user-group text-primary text-sm"></i>
                <span className="text-base font-extrabold text-slate-900">{guests} personnes</span>
              </div>
              <button
                type="button"
                onClick={() => setGuests(Math.min(20, guests + 1))}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold active:scale-95 transition cursor-pointer"
              >
                <i className="fa-solid fa-plus text-xs"></i>
              </button>
            </div>
          </div>

          {/* 4. Espace souhaité */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              4. Espace souhaité
            </label>
            <div className="grid grid-cols-3 gap-2">
              {areas.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => setSelectedArea(area)}
                  className={`py-2 px-2 rounded-xl border text-[11px] font-bold text-center transition cursor-pointer leading-tight ${
                    selectedArea === area
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Moyen de paiement prévu sur place */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                5. Moyen de paiement prévu sur place
              </label>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                0 FCFA en ligne
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Indiquez au gérant comment vous comptez régler votre addition à votre arrivée :
            </p>
            <div className="grid grid-cols-2 gap-2">
              {supportedPayments.map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setSelectedPayment(pm.id)}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center justify-between transition cursor-pointer active:scale-95 ${
                    selectedPayment === pm.id
                      ? 'bg-blue-50/90 border-blue-600 text-blue-950 shadow-xs ring-1 ring-blue-600'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <PaymentLogo id={pm.id} size="xs" />
                    <span className="truncate">{pm.name}</span>
                  </div>
                  {selectedPayment === pm.id && (
                    <i className="fa-solid fa-circle-check text-blue-600 text-sm"></i>
                  )}
                </button>
              ))}

              {/* Option Espèces */}
              <button
                type="button"
                onClick={() => setSelectedPayment('especes')}
                className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center justify-between transition cursor-pointer active:scale-95 ${
                  selectedPayment === 'especes'
                    ? 'bg-blue-50/90 border-blue-600 text-blue-950 shadow-xs ring-1 ring-blue-600'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                    💵
                  </span>
                  <span>Espèces (Cash FCFA)</span>
                </div>
                {selectedPayment === 'especes' && (
                  <i className="fa-solid fa-circle-check text-blue-600 text-sm"></i>
                )}
              </button>
            </div>
          </div>

          {/* Demande spéciale */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Note spéciale (optionnel)
            </label>
            <textarea
              rows={2}
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="Ex. Anniversaire, table au calme près des plantes..."
              className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary font-normal"
            ></textarea>
          </div>

          {/* Reassurance Banner */}
          <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-2.5 text-xs text-blue-950">
            <i className="fa-solid fa-shield-check text-primary text-base mt-0.5 shrink-0"></i>
            <p className="text-[11px] leading-snug">
              <span className="font-bold">Garantie lukaAI :</span> Réservation gratuite sans aucun paiement en ligne. Vous réglerez directement au restaurateur avec {selectedPayment}.
            </p>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-primary-600 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-primary/25 cursor-pointer active:scale-95 transition"
          >
            Confirmer la réservation (Gratuit)
          </button>
        </form>
      )}
    </div>
  );
};
