import React, { useState } from 'react';
import { ScreenName } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onOpenGpsModal: () => void;
}

interface VenuePin {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: string;
  walkTime: string;
  openStatus: string;
  priceRange: string;
  paymentMethods: string[];
  top: string;
  left: string;
  color: string;
  image: string;
}

const VENUES: VenuePin[] = [
  {
    id: 'jardin-gourmand',
    name: 'Le Jardin Gourmand',
    category: 'Restaurant & Cocktails',
    rating: 4.9,
    reviews: 128,
    distance: '250 m',
    walkTime: '3 min à pied',
    openStatus: 'Ouvert jusqu’à 23h30',
    priceRange: '12 000 - 25 000 FCFA',
    paymentMethods: ['Wave direct', 'Orange Money', 'Scan QR', 'Espèces'],
    top: '38%',
    left: '42%',
    color: '#1DC3F4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdbaAuRk4R3nRX6iIwrKtEK38iIPxrSAn6mRVfWGS1QqEubTXJEkerKlRGMG7kD7wPf8W39Q_Mljh4Go1hJoycs0ZbjiPgfPvUP8NlnETMyabXHH6ECpZdml8TqW3KCjs0vAqCSKnqHdp-j4hfLS4jrjOrPa2W6e7aAHOtLB38MQYLdC1nTDdhKFjkBLTo5j7TD_IWacjf4CFVAeUC-ZTNRD-ikNXYKw6j84vYBanj1BpL3nR-9PSZ0Q'
  },
  {
    id: 'sky-lounge',
    name: 'Sky View Rooftop',
    category: 'Bar lounge vue lagune',
    rating: 4.8,
    reviews: 94,
    distance: '650 m',
    walkTime: '8 min à pied',
    openStatus: 'Ouvert',
    priceRange: '8 000 - 18 000 FCFA',
    paymentMethods: ['Orange Money', 'Wave direct', 'Carte CB'],
    top: '25%',
    left: '70%',
    color: '#FF7900',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATg5IoRL0iIOOfiXELW3RZ7RTgYGAV1GAiy_Vzi-J6N90M1kYRHjHMkmrnotziRAafTYHGa2ujUoYupG8ZNH2WJHP-nrX3ZdbJxXuweyfruklWZMM7soO__Mz7hwaTsw89bfKCYsMtKnzDEv0tUe8HE00lfEzlmF8KlaeH1tiqDCAZ3CwJhrHNqRp43IKunzBIl-KM4pfWCsFQp9BAc1CZ4BRE_nkyjdWK_ZLXNSVpBPl0ROkni0lQWQ'
  },
  {
    id: 'kola-cafe',
    name: 'Kola Concept Store & Café',
    category: 'Café & Concept Store',
    rating: 4.7,
    reviews: 53,
    distance: '1.1 km',
    walkTime: '14 min à pied',
    openStatus: 'Ferme à 20h00',
    priceRange: '3 500 - 9 000 FCFA',
    paymentMethods: ['MTN MoMo', 'Wave direct', 'Espèces'],
    top: '62%',
    left: '26%',
    color: '#FFCC00',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60'
  }
];

export const CarteScreen: React.FC<Props> = ({ onNavigate, onOpenGpsModal }) => {
  const [selectedVenue, setSelectedVenue] = useState<VenuePin>(VENUES[0]);
  const [filterMode, setFilterMode] = useState<string>('all');
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full flex-1 overflow-hidden bg-slate-900 select-none">
      {/* Map Vector/Image Canvas */}
      <div className="absolute inset-0 bg-[#0c192c] overflow-hidden">
        {/* Stylized vector map lines & grid */}
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1e3a5f" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Roads & Laguna curves */}
            <path d="M -50 200 Q 150 160 300 280 T 600 350" fill="none" stroke="#1d4ed8" strokeWidth="12" opacity="0.6" />
            <path d="M 50 -50 Q 180 200 220 500 T 260 900" fill="none" stroke="#2563eb" strokeWidth="8" opacity="0.5" />
            <path d="M 200 100 Q 350 220 500 210" fill="none" stroke="#0284c7" strokeWidth="6" opacity="0.7" />
            <path d="M 0 500 Q 200 480 350 620" fill="none" stroke="#0369a1" strokeWidth="10" opacity="0.5" />
            {/* Water body / Lagune Ébrié simulation */}
            <path d="M 280 400 C 400 420, 480 550, 600 580 L 600 900 L 220 900 Z" fill="#082f49" opacity="0.7" />
          </svg>
        </div>

        {/* User live position pulsating blue dot */}
        <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-primary/20 animate-ping absolute -top-3 -left-3"></div>
          <div className="w-6 h-6 rounded-full bg-primary border-3 border-white shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>

        {/* Interactive Map Markers */}
        {VENUES.map((venue) => {
          const isSelected = selectedVenue.id === venue.id;
          return (
            <div
              key={venue.id}
              onClick={() => setSelectedVenue(venue)}
              style={{ top: venue.top, left: venue.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 ${
                isSelected ? 'scale-115 z-30' : 'hover:scale-105 opacity-95'
              }`}
            >
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white font-bold text-xs shadow-xl border-2 border-white backdrop-blur-md transition"
                style={{ backgroundColor: venue.color }}
              >
                <i className="fa-solid fa-location-dot text-[11px]"></i>
                <span className="truncate max-w-[120px]">{venue.name}</span>
                <span className="text-[10px] bg-white/30 px-1 py-0.2 rounded font-mono">
                  {venue.distance}
                </span>
              </div>
              {/* Pointer pin triangle */}
              <div
                className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] mx-auto -mt-[1px]"
                style={{ borderTopColor: venue.color }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Floating Top Controls Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-safe px-4 pointer-events-auto">
        <div className="flex items-center gap-2 pt-2">
          {/* Back button */}
          <button
            onClick={() => onNavigate('home')}
            className="w-11 h-11 rounded-2xl bg-white/95 text-slate-800 shadow-lg flex items-center justify-center active:scale-95 transition cursor-pointer backdrop-blur-md"
            aria-label="Retour"
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>

          {/* Search bar inside map */}
          <div className="flex-1 h-11 bg-white/95 rounded-2xl shadow-lg px-3.5 flex items-center gap-2 backdrop-blur-md">
            <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
            <input
              placeholder="Chercher autour de vous..."
              className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
            />
            <span className="text-[10px] font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-md">
              Cocody
            </span>
          </div>

          {/* Filter button */}
          <button
            onClick={() => onNavigate('explorer')}
            className="w-11 h-11 rounded-2xl bg-white/95 text-slate-800 shadow-lg flex items-center justify-center active:scale-95 transition cursor-pointer backdrop-blur-md"
            title="Vue Liste"
          >
            <i className="fa-solid fa-list-ul text-sm"></i>
          </button>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-md cursor-pointer transition ${
              filterMode === 'all' ? 'bg-primary text-white' : 'bg-white/90 text-slate-800 hover:bg-white'
            }`}
          >
            Tout
          </button>
          <button
            onClick={() => setFilterMode('wave')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 transition ${
              filterMode === 'wave' ? 'bg-cyan-500 text-white' : 'bg-white/90 text-cyan-800 hover:bg-white'
            }`}
          >
            <i className="fa-solid fa-water text-[9px]"></i>
            Wave direct
          </button>
          <button
            onClick={() => setFilterMode('om')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 transition ${
              filterMode === 'om' ? 'bg-orange-500 text-white' : 'bg-white/90 text-orange-800 hover:bg-white'
            }`}
          >
            <i className="fa-solid fa-wallet text-[9px]"></i>
            Orange Money
          </button>
          <button
            onClick={() => setFilterMode('momo')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 transition ${
              filterMode === 'momo' ? 'bg-yellow-500 text-white' : 'bg-white/90 text-yellow-900 hover:bg-white'
            }`}
          >
            <i className="fa-solid fa-mobile-screen text-[9px]"></i>
            MTN MoMo
          </button>
        </div>
      </div>

      {/* Right Side Map Floating Utilities */}
      <div className="absolute right-4 top-36 z-30 flex flex-col gap-2.5">
        {/* Recenter button */}
        <button
          onClick={() => {
            setSelectedVenue(VENUES[0]);
          }}
          className="w-11 h-11 rounded-2xl bg-white/95 text-primary shadow-xl flex items-center justify-center active:scale-95 transition cursor-pointer backdrop-blur-md"
          title="Recentrer ma position"
        >
          <i className="fa-solid fa-location-crosshairs text-base"></i>
        </button>

        {/* Traffic/Layers button */}
        <button
          onClick={() => {
            alert('Vue satellite et trafic en temps réel activés via lukaAI Pro.');
          }}
          className="w-11 h-11 rounded-2xl bg-white/95 text-slate-700 shadow-xl flex items-center justify-center active:scale-95 transition cursor-pointer backdrop-blur-md"
          title="Changer de calque"
        >
          <i className="fa-solid fa-layer-group text-sm"></i>
        </button>
      </div>

      {/* Interactive Bottom Sheet for Selected Venue */}
      <div className="absolute bottom-16 left-0 right-0 z-40 p-4 max-w-lg mx-auto pointer-events-auto">
        <div className="bg-white rounded-3xl p-4 shadow-2xl border border-slate-200/80 space-y-3.5 animate-in slide-in-from-bottom duration-300">
          {/* Header & Quick actions */}
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  alt={selectedVenue.name}
                  className="w-full h-full object-cover"
                  src={selectedVenue.image}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">{selectedVenue.name}</h3>
                  <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                    Vérifié
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{selectedVenue.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-emerald-600 font-semibold">{selectedVenue.openStatus}</span>
                  <span className="text-[10px] text-slate-400">•</span>
                  <div className="flex items-center text-amber-500 text-[10px] font-bold">
                    <i className="fa-solid fa-star mr-1"></i>
                    {selectedVenue.rating}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-rose-500 transition cursor-pointer"
            >
              <i className={`${isLiked ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart text-sm`}></i>
            </button>
          </div>

          {/* Metrics bar */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Distance</p>
              <p className="text-xs font-bold text-slate-800">{selectedVenue.distance}</p>
            </div>
            <div className="border-x border-slate-200">
              <p className="text-[10px] text-slate-400 font-medium">À pied</p>
              <p className="text-xs font-bold text-primary">{selectedVenue.walkTime}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Budget moyen</p>
              <p className="text-xs font-bold text-slate-800 truncate">{selectedVenue.priceRange}</p>
            </div>
          </div>

          {/* Payment acceptance badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-semibold text-slate-400">Accepté :</span>
            {selectedVenue.paymentMethods.map((pm, i) => (
              <span
                key={i}
                className="text-[10px] font-bold bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded-md border border-cyan-200"
              >
                {pm}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => onNavigate('fiche-lieu')}
              className="w-full py-2.5 px-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-circle-info text-primary"></i>
              <span>Détails &amp; Menu</span>
            </button>
            <button
              onClick={onOpenGpsModal}
              className="w-full py-2.5 px-3 rounded-2xl bg-primary hover:bg-primary-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-primary/25 cursor-pointer"
            >
              <i className="fa-solid fa-location-arrow"></i>
              <span>Itinéraire GPS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
