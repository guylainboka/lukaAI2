import React, { useState } from 'react';
import { ScreenName, UserRole } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onOpenPaywall: () => void;
  userRole: UserRole;
  onSetUserRole: (role: UserRole) => void;
}

export const CompteScreen: React.FC<Props> = ({ onNavigate, onOpenPaywall, userRole, onSetUserRole }) => {
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [notifsEnabled, setNotifsEnabled] = useState(true);

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-6 pt-0 bg-slate-50 flex-1">
      {/* Header Profile Section */}
      <section className="px-5 pt-3 pb-5 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Mon Compte</h1>
          <button
            onClick={() => onNavigate('login')}
            className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            title="Paramètres"
          >
            <i className="fa-solid fa-gear text-sm"></i>
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3.5 mt-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-primary to-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-primary/20">
            TK
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-slate-900">Thomas Kouassi</h2>
              <span className="text-[10px] font-bold bg-blue-100 text-primary px-1.5 py-0.5 rounded">
                Client
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">thomas.kouassi@abidjan.ci</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <i className="fa-solid fa-circle-check"></i> Numéro Wave vérifié
            </span>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-5 py-3 px-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Visités</p>
            <p className="text-base font-extrabold text-slate-900 mt-0.5">12</p>
          </div>
          <div className="border-x border-slate-200">
            <p className="text-[10px] uppercase font-bold text-slate-400">Favoris</p>
            <p className="text-base font-extrabold text-primary mt-0.5">4</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Requêtes IA</p>
            <p className="text-base font-extrabold text-slate-900 mt-0.5">8</p>
          </div>
        </div>
      </section>

      {/* lukaAI Pro Subscription Promotion */}
      <section className="px-5 mt-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-primary to-blue-600 text-white rounded-3xl p-4 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-900 text-[10px] font-black uppercase">
                lukaAI Pro
              </span>
              <span className="text-[11px] text-blue-100">10 $ / an</span>
            </div>
            <h3 className="text-sm font-bold leading-snug">Comparateur &amp; Chat IA Illimités</h3>
            <p className="text-[10px] text-blue-100">Débloquez les alertes temps réel et la négociation IA.</p>
          </div>
          <button
            onClick={onOpenPaywall}
            className="px-4 py-2.5 rounded-2xl bg-white text-primary font-bold text-xs shadow-md shrink-0 cursor-pointer active:scale-95 transition"
          >
            Activer
          </button>
        </div>
      </section>

      {/* Switch to Pro / Manager View */}
      <section className="px-5 mt-4">
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base">
              <i className="fa-solid fa-store"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Vous êtes gérant d'établissement ?</h4>
              <p className="text-[10px] text-slate-500">Gérez vos paiements Wave, menus et réservations</p>
            </div>
          </div>
          <button
            onClick={() => {
              onSetUserRole('manager');
              onNavigate('pro-dashboard');
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shrink-0 cursor-pointer active:scale-95 transition"
          >
            Mode Pro
          </button>
        </div>
      </section>

      {/* Payment Wallet Methods */}
      <section className="px-5 mt-5">
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Moyens de paiement enregistrés</h3>
            <span className="text-xs font-semibold text-primary cursor-pointer">Ajouter</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500 text-white flex items-center justify-center font-bold text-xs">
                  Wave
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">+225 07 88 •• •• 42</p>
                  <p className="text-[10px] text-slate-400">Paiement Mobile Money par défaut</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Actif
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                  OM
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">+225 05 44 •• •• 18</p>
                  <p className="text-[10px] text-slate-400">Orange Money CI</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md">
                Secondaire
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences & Settings list */}
      <section className="px-5 mt-5 space-y-2">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {/* Item 1: Historique réservations */}
          <div
            onClick={() => onNavigate('reservation')}
            className="flex items-center justify-between p-4 hover:bg-slate-50 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-primary flex items-center justify-center text-xs">
                <i className="fa-regular fa-calendar-check"></i>
              </div>
              <span className="text-xs font-bold text-slate-800">Historique des réservations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold bg-blue-100 text-primary px-1.5 py-0.5 rounded">2 actives</span>
              <i className="fa-solid fa-chevron-right text-slate-300 text-[10px]"></i>
            </div>
          </div>

          {/* Item 2: Notifications */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
                <i className="fa-regular fa-bell"></i>
              </div>
              <span className="text-xs font-bold text-slate-800">Notifications &amp; Alertes</span>
            </div>
            <input
              type="checkbox"
              checked={notifsEnabled}
              onChange={(e) => setNotifsEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
            />
          </div>

          {/* Item 3: Face ID */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                <i className="fa-solid fa-fingerprint"></i>
              </div>
              <span className="text-xs font-bold text-slate-800">Connexion Face ID / Biométrie</span>
            </div>
            <input
              type="checkbox"
              checked={faceIdEnabled}
              onChange={(e) => setFaceIdEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
            />
          </div>

          {/* Item 4: Assistance */}
          <div
            onClick={() => alert('Support lukaAI 24/7 disponible sur WhatsApp au +225 07 00 00 00')}
            className="flex items-center justify-between p-4 hover:bg-slate-50 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <span className="text-xs font-bold text-slate-800">Assistance client WhatsApp 24/7</span>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-300 text-[10px]"></i>
          </div>

          {/* Item 5: Logout */}
          <div
            onClick={() => onNavigate('login')}
            className="flex items-center justify-between p-4 hover:bg-rose-50 transition cursor-pointer text-rose-600"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </div>
              <span className="text-xs font-bold">Se déconnecter</span>
            </div>
            <i className="fa-solid fa-chevron-right text-rose-300 text-[10px]"></i>
          </div>
        </div>
      </section>
    </div>
  );
};
