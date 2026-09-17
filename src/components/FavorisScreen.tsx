import React, { useState } from 'react';
import { ScreenName } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onOpenGpsModal: () => void;
}

interface FavoriteItem {
  id: string;
  name: string;
  category: 'restaurant' | 'rooftop' | 'cafe' | 'hotel';
  categoryLabel: string;
  location: string;
  distance: string;
  status: string;
  rating: number;
  reviews: number;
  paymentBadges: string[];
  image: string;
  isFav: boolean;
}

export const FavorisScreen: React.FC<Props> = ({ onNavigate, onOpenGpsModal }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: '1',
      name: 'Le Jardin Gourmand',
      category: 'restaurant',
      categoryLabel: 'Restaurant Franco-Ivoirien',
      location: 'Cocody Ambassades',
      distance: '350 m',
      status: 'Ouvert actuellement',
      rating: 4.9,
      reviews: 128,
      paymentBadges: ['Wave direct', 'Orange Money', 'CB sur place'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdbaAuRk4R3nRX6iIwrKtEK38iIPxrSAn6mRVfWGS1QqEubTXJEkerKlRGMG7kD7wPf8W39Q_Mljh4Go1hJoycs0ZbjiPgfPvUP8NlnETMyabXHH6ECpZdml8TqW3KCjs0vAqCSKnqHdp-j4hfLS4jrjOrPa2W6e7aAHOtLB38MQYLdC1nTDdhKFjkBLTo5j7TD_IWacjf4CFVAeUC-ZTNRD-ikNXYKw6j84vYBanj1BpL3nR-9PSZ0Q',
      isFav: true,
    },
    {
      id: '2',
      name: 'Sky View Rooftop & Lounge',
      category: 'rooftop',
      categoryLabel: 'Rooftop & Bar Tapas',
      location: 'Cocody Val Doyen',
      distance: '600 m',
      status: 'Ouvre à 18h00',
      rating: 4.8,
      reviews: 94,
      paymentBadges: ['Wave direct', 'Orange Money'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATg5IoRL0iIOOfiXELW3RZ7RTgYGAV1GAiy_Vzi-J6N90M1kYRHjHMkmrnotziRAafTYHGa2ujUoYupG8ZNH2WJHP-nrX3ZdbJxXuweyfruklWZMM7soO__Mz7hwaTsw89bfKCYsMtKnzDEv0tUe8HE00lfEzlmF8KlaeH1tiqDCAZ3CwJhrHNqRp43IKunzBIl-KM4pfWCsFQp9BAc1CZ4BRE_nkyjdWK_ZLXNSVpBPl0ROkni0lQWQ',
      isFav: true,
    },
    {
      id: '3',
      name: 'Kola Concept Store & Café',
      category: 'cafe',
      categoryLabel: 'Café & Concept Store',
      location: 'Cocody Danga',
      distance: '1.1 km',
      status: 'Ouvert jusqu’à 20h00',
      rating: 4.7,
      reviews: 53,
      paymentBadges: ['MTN MoMo', 'Wave', 'Espèces'],
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60',
      isFav: true,
    },
    {
      id: '4',
      name: 'Hôtel Résidence Azur',
      category: 'hotel',
      categoryLabel: 'Hôtel Boutique & Suites',
      location: 'Cocody Riviera 3',
      distance: '2.4 km',
      status: 'Service 24/7',
      rating: 4.9,
      reviews: 112,
      paymentBadges: ['Wave direct', 'Orange Money', 'Carte CB'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDupTY9nXzlu2zbwnxPAt9YDF-WAM5gwPTdsa_vIMmPtWs4ZC2yyhr_SalNFWkEQEeFKOreEgjk-LEyNQ-R4dNBLrUWjVniAcYn0Qmkykv9yoeYo7pVzNMc1PsAhkl72I8WZ_Fv6jBppyZyUyCXG6eiywjGID8Ar1qHPJf4x7oX_Y0flDrWR8DrdE9CFoRPs50vv7TGv5bD9XRmIZsEMNgTWDCPTsIMy4kb3Hh3eN70qX1kQW3KOTdYTA',
      isFav: true,
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleFav = (id: string) => {
    setFavorites((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.isFav;
          showToast(next ? 'Lieu conservé dans vos favoris !' : 'Lieu retiré des favoris');
          return { ...item, isFav: next };
        }
        return item;
      })
    );
  };

  const filtered = favorites.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch && item.isFav;
  });

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-6 pt-0 bg-slate-50 flex-1">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl animate-in fade-in duration-200 flex items-center gap-2">
          <i className="fa-solid fa-heart text-rose-400"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <section className="px-5 pt-3 pb-3 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Mes Favoris</h1>
            <p className="text-xs text-slate-500 mt-0.5">Vos lieux et adresses sauvegardés à portée de main</p>
          </div>
          <button
            onClick={() => showToast('Lien de partage copié dans le presse-papier !')}
            className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
            title="Partager la sélection"
          >
            <i className="fa-solid fa-share-nodes text-sm"></i>
          </button>
        </div>

        {/* Search inside favorites */}
        <div className="relative mt-3">
          <i className="fa-solid fa-magnifying-glass text-slate-400 absolute left-3.5 top-3 text-xs"></i>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une pépite enregistrée..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {/* Categories filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pt-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 cursor-pointer transition ${
              activeCategory === 'all' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tous ({favorites.filter((f) => f.isFav).length})
          </button>
          <button
            onClick={() => setActiveCategory('restaurant')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 cursor-pointer transition ${
              activeCategory === 'restaurant' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Restaurants
          </button>
          <button
            onClick={() => setActiveCategory('rooftop')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 cursor-pointer transition ${
              activeCategory === 'rooftop' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Rooftops
          </button>
          <button
            onClick={() => setActiveCategory('cafe')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 cursor-pointer transition ${
              activeCategory === 'cafe' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cafés
          </button>
          <button
            onClick={() => setActiveCategory('hotel')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 cursor-pointer transition ${
              activeCategory === 'hotel' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Hôtels
          </button>
        </div>
      </section>

      {/* Favorites List */}
      <section className="p-5 space-y-4">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-3">
            <i className="fa-regular fa-heart text-3xl text-slate-300"></i>
            <p className="text-sm font-semibold text-slate-700">Aucun favori dans cette catégorie</p>
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Explorer les adresses
            </button>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">{item.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{item.location} • {item.distance}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-emerald-600 font-semibold">{item.status}</span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <div className="flex items-center text-amber-500 text-[10px] font-bold">
                        <i className="fa-solid fa-star mr-1"></i>
                        {item.rating}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleFav(item.id)}
                  className="w-9 h-9 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center cursor-pointer active:scale-90 transition"
                  title="Retirer des favoris"
                >
                  <i className="fa-solid fa-heart text-sm"></i>
                </button>
              </div>

              {/* Payment chips */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] font-semibold text-slate-400">Paiement :</span>
                {item.paymentBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded-full border border-cyan-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Actions row */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('fiche-lieu')}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Voir la fiche
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenGpsModal}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <i className="fa-solid fa-location-arrow text-primary text-[10px]"></i>
                    Itinéraire
                  </button>
                  <button
                    onClick={() => onNavigate('reservation')}
                    className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold flex items-center gap-1 shadow-sm cursor-pointer active:scale-95 transition"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Share all favorites action card */}
        <div className="bg-gradient-to-r from-blue-900 to-primary text-white rounded-3xl p-4 shadow-md flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold">Envie de partager vos plans ?</h4>
            <p className="text-[10px] text-blue-100 mt-0.5">Envoyez votre liste de pépites vérifiées à vos amis.</p>
          </div>
          <button
            onClick={() => showToast('Lien de partage copié dans le presse-papier !')}
            className="px-3.5 py-2 rounded-xl bg-white text-primary font-bold text-xs shadow-sm cursor-pointer active:scale-95 transition shrink-0"
          >
            Partager
          </button>
        </div>
      </section>
    </div>
  );
};
