import React, { useState } from 'react';
import { ScreenName, UserRole } from '../types';
import { PaymentLogo, PaymentMethodId, PAYMENT_METHODS } from './PaymentLogo';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onSetUserRole: (role: UserRole) => void;
}

export const ProProfileScreen: React.FC<Props> = ({ onNavigate, onSetUserRole }) => {
  const [acceptedPayments, setAcceptedPayments] = useState<Record<PaymentMethodId, boolean>>({
    wave: true,
    orange: true,
    mtn: true,
    moov: true,
    airtel: false,
    mpesa: false,
    visa: true,
    mastercard: true,
    paypal: false,
  });

  const togglePayment = (id: PaymentMethodId) => {
    setAcceptedPayments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-6 pt-0 bg-slate-50 flex-1">
      {/* Toast */}
      {savedSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in duration-200">
          <i className="fa-solid fa-check"></i>
          <span>Modifications enregistrées avec succès !</span>
        </div>
      )}

      {/* Top Header */}
      <section className="px-5 pt-3 pb-4 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('pro-dashboard')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </button>
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight">Profil de l'Établissement</h1>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
            PRO VÉRIFIÉ
          </span>
        </div>

        {/* Business card overview */}
        <div className="flex items-center gap-3.5 mt-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
            <img
              alt="Le Jardin Gourmand"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdbaAuRk4R3nRX6iIwrKtEK38iIPxrSAn6mRVfWGS1QqEubTXJEkerKlRGMG7kD7wPf8W39Q_Mljh4Go1hJoycs0ZbjiPgfPvUP8NlnETMyabXHH6ECpZdml8TqW3KCjs0vAqCSKnqHdp-j4hfLS4jrjOrPa2W6e7aAHOtLB38MQYLdC1nTDdhKFjkBLTo5j7TD_IWacjf4CFVAeUC-ZTNRD-ikNXYKw6j84vYBanj1BpL3nR-9PSZ0Q"
            />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Le Jardin Gourmand</h2>
            <p className="text-xs text-slate-500 mt-0.5">Gérante : Marcelle Koffi</p>
            <p className="text-[10px] text-slate-400 mt-0.5">ID Partenaire lukaAI : LK-CI-20491</p>
          </div>
        </div>
      </section>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="p-5 space-y-5">
        {/* SECTION: Paiements acceptés sur place */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Moyens de paiement acceptés sur place
            </h3>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              0% commission lukaAI
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            Cochez les modes de règlement que vos clients peuvent utiliser directement à votre caisse ou sur place. lukaAI ne fait aucun paiement en ligne : ces options permettent aux utilisateurs de vous trouver selon leur compte bancaire ou mobile money.
          </p>

          <div className="space-y-2.5 divide-y divide-slate-100">
            {/* 9 Méthodes supportées */}
            {(Object.keys(PAYMENT_METHODS) as PaymentMethodId[]).map((id) => {
              const meta = PAYMENT_METHODS[id];
              const isChecked = !!acceptedPayments[id];
              return (
                <div key={id} className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <PaymentLogo id={id} size="sm" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{meta.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{meta.category} • Règlement direct sur place</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => togglePayment(id)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer shrink-0 ml-2"
                  />
                </div>
              );
            })}

            {/* Espèces (Verrouillé) */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                  CFA
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Espèces (Francs CFA)</h4>
                  <p className="text-[10px] text-slate-400">Règlement au comptoir (Recommandé)</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Toujours actif
              </span>
            </div>
          </div>
        </div>

        {/* SECTION: Informations de l'Établissement */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Coordonnées &amp; Horaires
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Nom de l'enseigne</label>
              <input
                type="text"
                defaultValue="Le Jardin Gourmand"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Adresse physique</label>
              <input
                type="text"
                defaultValue="Rue des Jardins, Cocody Ambassades, Abidjan"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Téléphone direct</label>
                <input
                  type="text"
                  defaultValue="+225 27 22 44 88"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Heure de fermeture</label>
                <input
                  type="text"
                  defaultValue="23h30"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-primary-600 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-primary/25 transition cursor-pointer"
          >
            Enregistrer les modifications
          </button>
          <button
            type="button"
            onClick={() => {
              onSetUserRole('client');
              onNavigate('home');
            }}
            className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
          >
            Basculer vers l'Espace Client
          </button>
        </div>
      </form>
    </div>
  );
};
