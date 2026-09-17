import React from 'react';
import { ScreenName } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen: (screen: ScreenName) => void;
  currentScreen: ScreenName;
}

interface AppTask {
  id: ScreenName;
  title: string;
  category: string;
  icon: string;
  badge: string;
  color: string;
  previewSnippet: string;
}

const TASKS: AppTask[] = [
  {
    id: 'home',
    title: 'Comparateur de Prix',
    category: 'Accueil & Filtres',
    icon: 'fa-solid fa-scale-balanced',
    badge: 'Mis à jour',
    color: 'bg-primary text-white',
    previewSnippet: 'Comparez les tarifs vérifiés avec Wave et Orange Money.',
  },
  {
    id: 'home-discovery',
    title: 'Vue Découverte',
    category: 'Tendances & Stories',
    icon: 'fa-solid fa-fire',
    badge: 'Live',
    color: 'bg-amber-500 text-white',
    previewSnippet: 'Stories exclusives, happy hours et nouveautés gastronomiques.',
  },
  {
    id: 'carte',
    title: 'Carte & Géolocalisation',
    category: 'Navigation',
    icon: 'fa-solid fa-map-location-dot',
    badge: 'GPS Actif',
    color: 'bg-emerald-600 text-white',
    previewSnippet: 'Pins interactifs, calcul de temps à pied et itinéraires Waze/Maps.',
  },
  {
    id: 'chat-ia',
    title: 'lukaAI Concierge',
    category: 'Intelligence Artificielle',
    icon: 'fa-solid fa-wand-magic-sparkles',
    badge: '3 requêtes restantes',
    color: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
    previewSnippet: 'Recommandations sur mesure pour sorties et restaurants.',
  },
  {
    id: 'fiche-lieu',
    title: 'Fiche Lieu & Menu',
    category: 'Le Jardin Gourmand',
    icon: 'fa-solid fa-utensils',
    badge: '4.9 ★',
    color: 'bg-slate-800 text-white',
    previewSnippet: 'Menu vérifié, ambiance rooftop et réservation directe.',
  },
  {
    id: 'reservation',
    title: 'Réservation Immédiate',
    category: 'Paiement direct',
    icon: 'fa-solid fa-calendar-check',
    badge: 'Acompte Wave',
    color: 'bg-emerald-600 text-white',
    previewSnippet: 'Choix de table, convives et paiement sans commission.',
  },
  {
    id: 'favoris',
    title: 'Mes Favoris & Listes',
    category: 'Enregistrements',
    icon: 'fa-solid fa-heart',
    badge: '4 adresses',
    color: 'bg-rose-500 text-white',
    previewSnippet: 'Adresses coups de cœur enregistrées pour plus tard.',
  },
  {
    id: 'pro-dashboard',
    title: 'Espace Gérant Pro',
    category: 'Gestion d’Établissement',
    icon: 'fa-solid fa-store',
    badge: '284 000 FCFA',
    color: 'bg-slate-900 text-white',
    previewSnippet: 'Chiffre d’affaires, QR codes scannés et publications.',
  },
];

export const AndroidAppSwitcher: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectScreen,
  currentScreen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col p-4 animate-in fade-in duration-200">
      {/* Switcher Header */}
      <div className="flex items-center justify-between py-2 mb-3 text-white border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <i className="fa-brands fa-android text-sm"></i>
          </div>
          <div>
            <h2 className="text-xs font-bold leading-none">Applications récentes</h2>
            <p className="text-[10px] text-slate-400 mt-0.5">lukaAI Android Multitâche</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1"
        >
          <i className="fa-solid fa-xmark text-[10px]"></i>
          <span>Fermer</span>
        </button>
      </div>

      {/* Grid of screens cards */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-6">
        {TASKS.map((task) => {
          const isActive = currentScreen === task.id;
          return (
            <div
              key={task.id}
              onClick={() => {
                onSelectScreen(task.id);
                onClose();
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.98] ${
                isActive
                  ? 'bg-slate-800/90 border-primary ring-2 ring-primary/40 shadow-lg'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${task.color}`}>
                    <i className={`${task.icon} text-xs`}></i>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{task.title}</h3>
                    <span className="text-[10px] text-slate-400">{task.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-medium border border-slate-700">
                    {task.badge}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="Actuel"></span>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-1 bg-slate-950/40 p-2 rounded-xl border border-slate-800/60">
                {task.previewSnippet}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Switcher Actions */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={() => {
            onSelectScreen('home');
            onClose();
          }}
          className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1.5"
        >
          <i className="fa-solid fa-house text-xs"></i>
          <span>Retour à l’accueil</span>
        </button>

        <button
          onClick={onClose}
          className="text-xs text-primary font-bold hover:underline"
        >
          Reprendre l’écran en cours
        </button>
      </div>
    </div>
  );
};
