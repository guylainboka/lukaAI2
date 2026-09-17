import React, { useState } from 'react';
import { ScreenName, ProductItem } from '../types';
import { CATALOG_PRODUCTS, CATALOG_SHOPS } from '../data/catalog';
import { PaymentLogo } from './PaymentLogo';
import { PaymentDisclaimerBanner } from './PaymentDisclaimerBanner';

interface Props {
  productId?: string;
  onNavigate: (screen: ScreenName) => void;
  onOpenGpsModal: () => void;
  onAddToCompare?: (productId: string) => void;
}

export const ProductDetailScreen: React.FC<Props> = ({
  productId = 'prod-1',
  onNavigate,
  onOpenGpsModal,
  onAddToCompare,
}) => {
  const [selectedProductId, setSelectedProductId] = useState(productId);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCompareAlert, setAddedToCompareAlert] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const product = CATALOG_PRODUCTS.find((p) => p.id === selectedProductId) || CATALOG_PRODUCTS[0];

  const handleCompareClick = () => {
    if (onAddToCompare) {
      onAddToCompare(product.id);
    }
    setAddedToCompareAlert(true);
    setTimeout(() => {
      setAddedToCompareAlert(false);
      onNavigate('home');
    }, 1200);
  };

  // Multiple shops selling this product or alternatives
  const nearbySellers = [
    {
      name: product.shopName,
      location: product.shopLocation,
      distance: product.distance,
      price: product.price,
      formattedPrice: product.formattedPrice,
      payments: product.acceptedPayments,
      stock: product.stock,
      isBestPrice: true,
    },
    {
      name: "L'Oasis du Port",
      location: 'Plateau Rue du Commerce',
      distance: '1.2 km',
      price: product.price + 500,
      formattedPrice: `${(product.price + 500).toLocaleString()} FCFA`,
      payments: ['wave', 'moov', 'mastercard'] as const,
      stock: 'En stock',
      isBestPrice: false,
    },
    {
      name: 'Chez Tantie Awa & Grillades',
      location: 'Marcory Zone 4',
      distance: '3.1 km',
      price: product.price + 1000,
      formattedPrice: `${(product.price + 1000).toLocaleString()} FCFA`,
      payments: ['wave', 'orange', 'mtn'] as const,
      stock: '4 restants',
      isBestPrice: false,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 pt-0 bg-slate-50 flex-1 relative min-h-screen">
      {/* Toast Alerte Ajout au Comparateur */}
      {addedToCompareAlert && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in duration-200">
          <i className="fa-solid fa-check text-emerald-400"></i>
          <span>Produit ajouté au Comparateur ! Redirection...</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200/80 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Retour"
        >
          <i className="fa-solid fa-arrow-left text-sm"></i>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Fiche Produit</span>
          <span className="text-xs font-bold text-slate-900 truncate max-w-[180px]">{product.name}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Favori"
          >
            <i className={`${isLiked ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart text-base`}></i>
          </button>
          <button
            onClick={handleCompareClick}
            className="w-9 h-9 rounded-full flex items-center justify-center text-primary hover:bg-blue-50 transition cursor-pointer"
            title="Ajouter au comparateur"
          >
            <i className="fa-solid fa-code-compare text-sm"></i>
          </button>
        </div>
      </div>

      {/* Disclaimer explicite */}
      <div className="px-4 pt-3">
        <PaymentDisclaimerBanner />
      </div>

      {/* Galerie / Image Principale */}
      <div className="px-4 pt-3">
        <div className="relative w-full h-64 rounded-3xl overflow-hidden bg-slate-900 shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20"></div>

          {/* Badges sur l'image */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            {product.badge && (
              <span className="bg-primary/95 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <i className="fa-solid fa-certificate text-[9px]"></i> {product.badge}
              </span>
            )}
            <span className="bg-emerald-600/90 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <i className="fa-solid fa-circle-check text-[9px]"></i> Produit vérifié
            </span>
          </div>

          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <i className="fa-solid fa-star text-amber-400"></i>
            <span>{product.rating}</span>
            <span className="text-slate-300 font-normal">({product.reviewsCount} avis)</span>
          </div>

          {/* Encart titre & prix sur image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">{product.category}</span>
            <h1 className="text-base font-extrabold leading-snug">{product.name}</h1>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-slate-200">Meilleur prix :</span>
                <span className="text-xl font-extrabold text-amber-300">{product.formattedPrice}</span>
              </div>
              <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md font-medium">
                {product.stock}
              </span>
            </div>
          </div>
        </div>

        {/* Mini carrousel d'autres produits disponibles */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2 pb-1">
          {CATALOG_PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProductId(p.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-bold transition shrink-0 cursor-pointer ${
                p.id === selectedProductId
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <img src={p.image} alt={p.name} className="w-5 h-5 rounded-full object-cover" />
              <span className="truncate max-w-[110px]">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Description & Points Clés */}
      <section className="px-4 mt-3 space-y-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Description du produit</h2>
          <p className="text-xs text-slate-700 leading-relaxed">{product.description}</p>

          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-[11px] font-bold text-slate-800 mb-1.5">Caractéristiques &amp; Préparation :</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded-xl">
                  <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION COMPARATIVE DES BOUTIQUES AYANT CE PRODUIT */}
      <section className="px-4 mt-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Où acheter au meilleur tarif ?
            </h2>
            <p className="text-[10px] text-slate-400">Comparez les prix et les moyens acceptés sur place</p>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
            3 vendeurs vérifiés
          </span>
        </div>

        <div className="space-y-2.5">
          {nearbySellers.map((seller, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-3.5 border shadow-xs transition ${
                seller.isBestPrice ? 'border-primary/50 ring-2 ring-primary/10' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">{seller.name}</span>
                    {seller.isBestPrice && (
                      <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                        Moins cher
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <i className="fa-solid fa-location-dot text-slate-400 text-[9px]"></i>
                    {seller.location} • <span className="font-semibold text-slate-700">{seller.distance}</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-extrabold text-primary block">{seller.formattedPrice}</span>
                  <span className="text-[9px] text-emerald-600 font-medium">{seller.stock}</span>
                </div>
              </div>

              {/* Logos de paiement acceptés pour ce produit dans cette boutique */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[9px] text-slate-400 font-medium mr-0.5">Règlement sur place :</span>
                  {seller.payments.map((pId) => (
                    <PaymentLogo key={pId} id={pId} size="xs" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onOpenGpsModal}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition active:scale-95"
                  >
                    <i className="fa-solid fa-location-arrow text-primary text-[9px]"></i>
                    <span>GPS</span>
                  </button>
                  <button
                    onClick={() => onNavigate('reservation')}
                    className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer transition active:scale-95 shadow-xs"
                  >
                    <i className="fa-regular fa-calendar-check text-[9px]"></i>
                    <span>Mettre de côté</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Avis clients */}
      <section className="px-4 mt-4 space-y-2 mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Avis clients vérifiés</h2>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-primary font-bold text-xs flex items-center justify-center">
                IK
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block leading-tight">Ibrahim K.</span>
                <span className="text-[9px] text-slate-400">Hier à Cocody</span>
              </div>
            </div>
            <div className="text-amber-400 text-[10px] flex items-center gap-0.5">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 italic">
            "Très bien assaisonné, mérou frais et alloco non huileux. Paiement direct par Wave au comptoir en 10 secondes."
          </p>
        </div>
      </section>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-xl max-w-lg mx-auto flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">À partir de</span>
          <span className="text-base font-extrabold text-slate-900 leading-none">{product.formattedPrice}</span>
          <span className="text-[9px] text-emerald-600 block font-bold mt-0.5">0 FCFA débité en ligne</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCompareClick}
            className="px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition active:scale-95"
          >
            <i className="fa-solid fa-code-compare text-primary"></i>
            <span>Comparer</span>
          </button>
          <button
            onClick={onOpenGpsModal}
            className="px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition active:scale-95 shadow-lg shadow-primary/25"
          >
            <i className="fa-solid fa-location-arrow"></i>
            <span>Itinéraire GPS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
