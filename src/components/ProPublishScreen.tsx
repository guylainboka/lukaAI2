import React, { useState } from 'react';
import { ScreenName } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

export const ProPublishScreen: React.FC<Props> = ({ onNavigate }) => {
  const [publishType, setPublishType] = useState<'flash' | 'status' | 'menu'>('flash');
  const [offerType, setOfferType] = useState('Happy Hour');
  const [offerText, setOfferText] = useState('-20% sur la carte tapas et cocktails pour tout paiement direct par Wave.');
  const [duration, setDuration] = useState('Ce soir jusqu’à minuit');
  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const [activeOnMap, setActiveOnMap] = useState(true);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setPublishedSuccess(true);
    setTimeout(() => {
      setPublishedSuccess(false);
      onNavigate('pro-dashboard');
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-6 pt-0 bg-slate-50 flex-1">
      {/* Top bar */}
      <section className="px-5 pt-3 pb-3 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('pro-dashboard')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </button>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">Créer Une Publication</h1>
              <p className="text-[10px] text-emerald-600 font-semibold">Diffusion aux clients à moins de 5 km</p>
            </div>
          </div>
          <span className="text-xs font-bold text-primary bg-blue-50 px-2.5 py-1 rounded-xl">Pro CMS</span>
        </div>

        {/* Segmented Switcher: Offre Flash / Statut / Menu */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl mt-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setPublishType('flash')}
            className={`py-2 rounded-xl transition cursor-pointer ${
              publishType === 'flash' ? 'bg-white text-primary shadow-xs' : 'text-slate-500'
            }`}
          >
            Offre Flash
          </button>
          <button
            type="button"
            onClick={() => setPublishType('status')}
            className={`py-2 rounded-xl transition cursor-pointer ${
              publishType === 'status' ? 'bg-white text-primary shadow-xs' : 'text-slate-500'
            }`}
          >
            Statut
          </button>
          <button
            type="button"
            onClick={() => setPublishType('menu')}
            className={`py-2 rounded-xl transition cursor-pointer ${
              publishType === 'menu' ? 'bg-white text-primary shadow-xs' : 'text-slate-500'
            }`}
          >
            Menu
          </button>
        </div>
      </section>

      {/* Success banner */}
      {publishedSuccess && (
        <div className="mx-5 mt-4 p-4 bg-emerald-500 text-white rounded-2xl shadow-lg flex items-center gap-3 animate-in fade-in duration-300">
          <i className="fa-solid fa-circle-check text-xl"></i>
          <div>
            <h4 className="text-xs font-bold">Offre publiée avec succès !</h4>
            <p className="text-[10px] text-emerald-100">Visible immédiatement sur la carte lukaAI.</p>
          </div>
        </div>
      )}

      {/* Main Publishing Form */}
      <form onSubmit={handlePublish} className="p-5 space-y-5">
        {/* Step 1: Type d'offre */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            1. Type de mise en avant
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Happy Hour', 'Réduction %', 'Menu du Jour', 'Live DJ / Soirée'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setOfferType(type)}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                  offerType === type
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Accroche de l'offre */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            2. Texte de l'annonce
          </label>
          <textarea
            rows={3}
            value={offerText}
            onChange={(e) => setOfferText(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary font-normal"
            placeholder="Décrivez votre offre percutante..."
            required
          ></textarea>
        </div>

        {/* Step 3: Moyens de paiement éligibles */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            3. Paiements éligibles à l'offre
          </label>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1.5 bg-cyan-50 text-cyan-800 border border-cyan-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <i className="fa-solid fa-check text-cyan-600"></i> Wave CI direct
            </span>
            <span className="px-3 py-1.5 bg-orange-50 text-orange-800 border border-orange-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <i className="fa-solid fa-check text-orange-600"></i> Orange Money
            </span>
            <span className="px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <i className="fa-solid fa-check text-slate-500"></i> Tous modes
            </span>
          </div>
        </div>

        {/* Step 4: Durée de validité */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            4. Durée de diffusion
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Ce soir jusqu’à minuit', 'Ce midi uniquement', 'Valable 48h', 'Ce week-end'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuration(d)}
                className={`py-2 px-3 rounded-2xl border text-xs font-semibold transition cursor-pointer ${
                  duration === d
                    ? 'bg-primary text-white border-primary shadow-xs font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Step 5: Photo d'illustration */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            5. Photo d'illustration
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(idx)}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition ${
                  selectedPhoto === idx ? 'border-primary ring-2 ring-primary/20 scale-102' : 'border-slate-200 opacity-70'
                }`}
              >
                <img
                  alt="Illustration"
                  className="w-full h-full object-cover"
                  src={
                    idx === 1
                      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC-kLAgvBhrbIFBcoE60J1tB7JcwQTz70BgOBo6lMTqssssZF9q6rPYHayfI-atXdz71Gg-9-LfvrPzKUXB0-9HX3yQhRdS38Kqg0naF7P-EELSIfAxBhTyiv8BT_nlcPrXRfTEIydqmUWM4c-kDShMc8BgW9pBgjpasttcUCZQ4LXZR-Wt6sa1vEu_95kamEV3hLxmm9CUR0ppWjZ92wwboS2caD4bloKaaobjKhlESW53rBkb8-DXA'
                      : idx === 2
                      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdbaAuRk4R3nRX6iIwrKtEK38iIPxrSAn6mRVfWGS1QqEubTXJEkerKlRGMG7kD7wPf8W39Q_Mljh4Go1hJoycs0ZbjiPgfPvUP8NlnETMyabXHH6ECpZdml8TqW3KCjs0vAqCSKnqHdp-j4hfLS4jrjOrPa2W6e7aAHOtLB38MQYLdC1nTDdhKFjkBLTo5j7TD_IWacjf4CFVAeUC-ZTNRD-ikNXYKw6j84vYBanj1BpL3nR-9PSZ0Q'
                      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuATg5IoRL0iIOOfiXELW3RZ7RTgYGAV1GAiy_Vzi-J6N90M1kYRHjHMkmrnotziRAafTYHGa2ujUoYupG8ZNH2WJHP-nrX3ZdbJxXuweyfruklWZMM7soO__Mz7hwaTsw89bfKCYsMtKnzDEv0tUe8HE00lfEzlmF8KlaeH1tiqDCAZ3CwJhrHNqRp43IKunzBIl-KM4pfWCsFQp9BAc1CZ4BRE_nkyjdWK_ZLXNSVpBPl0ROkni0lQWQ'
                  }
                />
                {selectedPhoto === idx && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                    <i className="fa-solid fa-check"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 6: Switch Activer sur la carte */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Activer le badge sur la carte en direct</h4>
            <p className="text-[10px] text-slate-500">Affiche une icône animée sur votre fiche à Cocody</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveOnMap(!activeOnMap)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
              activeOnMap ? 'bg-primary justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
          </button>
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          className="w-full py-4 bg-primary hover:bg-primary-600 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-primary/25 transition cursor-pointer"
        >
          Publier l’offre maintenant (Gratuit)
        </button>
      </form>
    </div>
  );
};
