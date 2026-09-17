import React, { useState } from 'react';
import { ScreenName } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

interface NotificationItem {
  id: string;
  type: 'reservation' | 'promo' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: string;
  color: string;
}

export const NotificationsScreen: React.FC<Props> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'reservation' | 'promo' | 'system'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'reservation',
      title: 'Table confirmée au Jardin Gourmand',
      description: 'Votre réservation pour 2 personnes ce soir à 20h00 est validée par le restaurateur.',
      time: 'Il y a 10 min',
      read: false,
      icon: 'fa-regular fa-calendar-check',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: '2',
      type: 'promo',
      title: 'Happy Hour Wave au Sky View Lounge',
      description: '-20% sur les cocktails signatures ce vendredi pour tout règlement par Wave direct.',
      time: 'Il y a 1h',
      read: true,
      icon: 'fa-solid fa-martini-glass-citrus',
      color: 'bg-cyan-50 text-cyan-600',
    },
    {
      id: '3',
      type: 'system',
      title: 'Nouvelle recommandation de l’IA lukaAI',
      description: '2 nouveaux établissements partenaires acceptant Orange Money ont ouvert près de chez vous à Cocody.',
      time: 'Hier à 18h30',
      read: true,
      icon: 'fa-solid fa-wand-magic-sparkles',
      color: 'bg-blue-50 text-primary',
    },
    {
      id: '4',
      type: 'system',
      title: 'Sécurité de votre compte',
      description: 'Connexion réussie depuis Abidjan (Cocody). Tout est en ordre.',
      time: 'Hier à 09:12',
      read: true,
      icon: 'fa-solid fa-shield-halved',
      color: 'bg-slate-100 text-slate-700',
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => filter === 'all' || n.type === filter);

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-6 pt-0 bg-slate-50 flex-1">
      {/* Top Header */}
      <section className="px-5 pt-3 pb-3 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </button>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Notifications</h1>
          </div>
          <button
            onClick={markAllRead}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            Tout lire
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pt-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Toutes ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('reservation')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition ${
              filter === 'reservation' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Réservations
          </button>
          <button
            onClick={() => setFilter('promo')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition ${
              filter === 'promo' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Promotions &amp; Deals
          </button>
          <button
            onClick={() => setFilter('system')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition ${
              filter === 'system' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Système
          </button>
        </div>
      </section>

      {/* Notifications List */}
      <section className="p-5 space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-3xl border transition cursor-pointer ${
              item.read ? 'bg-white border-slate-200' : 'bg-blue-50/40 border-blue-200 shadow-xs'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                <i className={`${item.icon} text-base`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">{item.title}</h3>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 ml-2"></span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-snug">{item.description}</p>
                <span className="text-[10px] text-slate-400 font-medium block mt-2">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
