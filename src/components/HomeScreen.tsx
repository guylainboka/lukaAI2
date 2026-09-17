import React, { useState } from 'react';
import { ScreenName, ProductItem, ShopItem } from '../types';
import { PaymentDisclaimerBanner } from './PaymentDisclaimerBanner';
import { PaymentLogo, PaymentFilterPill, PaymentMethodId } from './PaymentLogo';
import { CATALOG_PRODUCTS, CATALOG_SHOPS } from '../data/catalog';
import { AiComparisonModal } from './AiComparisonModal';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onOpenPaywall: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const HomeScreen: React.FC<Props> = ({ onNavigate, onOpenPaywall, onSelectProduct }) => {
  // Mode : Produits ou Boutiques
  const [comparisonMode, setComparisonMode] = useState<'product' | 'shop'>('product');

  // Multi-selection state (defaults to 2 items for immediate comparison)
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(['prod-1', 'prod-2']);
  const [selectedShopIds, setSelectedShopIds] = useState<string[]>(['shop-1', 'shop-2']);

  // Filters & search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState<PaymentMethodId | 'all'>('all');
  const [selectedSort, setSelectedSort] = useState<'price' | 'rating' | 'proximity'>('price');

  // AI Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // View style
  const [viewMode, setViewMode] = useState<'comparison' | 'browse'>('comparison');

  // Toggle selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProductIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleSelectShop = (id: string) => {
    setSelectedShopIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Get active items
  const selectedProducts = CATALOG_PRODUCTS.filter((p) => selectedProductIds.includes(p.id));
  const selectedShops = CATALOG_SHOPS.filter((s) => selectedShopIds.includes(s.id));

  // Current active selection list
  const activeSelectedItems = comparisonMode === 'product' ? selectedProducts : selectedShops;
  const selectedCount = activeSelectedItems.length;

  // Filtered available items for browsing/adding
  const filteredProducts = CATALOG_PRODUCTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shopName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPayment =
      selectedPaymentFilter === 'all' || p.acceptedPayments.includes(selectedPaymentFilter as any);
    return matchSearch && matchPayment;
  });

  const filteredShops = CATALOG_SHOPS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPayment =
      selectedPaymentFilter === 'all' || s.acceptedPayments.includes(selectedPaymentFilter as any);
    return matchSearch && matchPayment;
  });

  const handleProductDetail = (prodId: string) => {
    if (onSelectProduct) {
      onSelectProduct(prodId);
    }
    onNavigate('product-detail');
  };

  return (
    <div className="flex flex-col w-full px-margin-screen gap-space-md max-w-lg mx-auto pb-20 pt-2">
      {/* Disclaimer explicite sur l'absence de paiement en ligne */}
      <PaymentDisclaimerBanner />

      {/* En-tête Comparateur */}
      <div className="flex items-start justify-between gap-space-xs pt-1">
        <div className="flex flex-col flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm w-fit mb-1 shadow-sm">
            <i className="fa-solid fa-scale-balanced text-secondary-container"></i>
            <span>Comparateur Multi-Sélection &amp; IA</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Comparateur lukaAI
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">
            Sélectionnez 2 ou plusieurs produits ou boutiques et comparez leurs prix et paiements directs
          </p>
        </div>
        <button
          onClick={() => onNavigate('home-discovery')}
          aria-label="Mode Découverte"
          className="w-11 h-11 rounded-xl bg-surface-container-lowest text-primary shadow-sm hover:shadow-md flex items-center justify-center transition-transform active:scale-95 shrink-0 cursor-pointer"
          title="Basculer vers Vue Découverte"
        >
          <i className="fa-solid fa-compass text-lg"></i>
        </button>
      </div>

      {/* ONGLET DE SÉLECTION : COMPARER DES PRODUITS vs DES BOUTIQUES */}
      <div className="flex p-1 bg-surface-container-high rounded-2xl shadow-inner gap-1">
        <button
          type="button"
          onClick={() => setComparisonMode('product')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            comparisonMode === 'product'
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-outline hover:text-on-surface'
          }`}
        >
          <i className="fa-solid fa-bowl-food text-sm"></i>
          <span>Comparer des Produits ({selectedProductIds.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setComparisonMode('shop')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            comparisonMode === 'shop'
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-outline hover:text-on-surface'
          }`}
        >
          <i className="fa-solid fa-store text-sm"></i>
          <span>Comparer des Boutiques ({selectedShopIds.length})</span>
        </button>
      </div>

      {/* BARRE D'ACTION COMPARATIVE & APPEL À L'IA */}
      <div className="bg-gradient-to-r from-blue-900 via-primary to-slate-900 text-white p-4 rounded-3xl shadow-md flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xs font-bold text-amber-300">
              {selectedCount}
            </span>
            <div>
              <span className="text-xs font-extrabold tracking-tight block">
                {selectedCount >= 2
                  ? `${selectedCount} éléments prêts à comparer`
                  : 'Sélectionnez au moins 2 éléments'}
              </span>
              <span className="text-[10px] text-blue-200">
                {comparisonMode === 'product' ? 'Produits & Menus' : 'Établissements & Boutiques'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'comparison' ? 'browse' : 'comparison')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition cursor-pointer"
            >
              <i className={`fa-solid ${viewMode === 'comparison' ? 'fa-plus' : 'fa-table-columns'} mr-1`}></i>
              {viewMode === 'comparison' ? 'Ajouter' : 'Voir Comparatif'}
            </button>
          </div>
        </div>

        {/* Bouton Majeur : Comparer avec l'IA */}
        <button
          type="button"
          disabled={selectedCount < 2}
          onClick={() => setIsAiModalOpen(true)}
          className={`w-full py-2.5 px-4 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            selectedCount >= 2
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 active:scale-98 shadow-amber-500/25'
              : 'bg-white/20 text-white/50 cursor-not-allowed'
          }`}
        >
          <i className="fa-solid fa-wand-magic-sparkles text-sm animate-pulse"></i>
          <span>✨ Comparer avec l'IA lukaAI ({selectedCount} sélectionnés)</span>
        </button>
      </div>

      {/* Recherche & Filtre de Paiement Rapide */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              comparisonMode === 'product'
                ? 'Rechercher un plat, mérou, chambre, café...'
                : 'Rechercher un restaurant, hôtel, rooftop...'
            }
            className="w-full bg-white pl-9 pr-8 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        {/* Filtres logos de paiement acceptés sur place */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] text-slate-500 font-bold uppercase shrink-0 mr-1">
            Paiement sur place :
          </span>
          <button
            type="button"
            onClick={() => setSelectedPaymentFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer border ${
              selectedPaymentFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-primary/40'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span>Tous</span>
          </button>
          <PaymentFilterPill
            id="wave"
            selected={selectedPaymentFilter === 'wave'}
            onClick={() => setSelectedPaymentFilter('wave')}
          />
          <PaymentFilterPill
            id="orange"
            selected={selectedPaymentFilter === 'orange'}
            onClick={() => setSelectedPaymentFilter('orange')}
          />
          <PaymentFilterPill
            id="mtn"
            selected={selectedPaymentFilter === 'mtn'}
            onClick={() => setSelectedPaymentFilter('mtn')}
          />
          <PaymentFilterPill
            id="visa"
            selected={selectedPaymentFilter === 'visa'}
            onClick={() => setSelectedPaymentFilter('visa')}
          />
        </div>
      </div>

      {/* VUE 1 : VIS-À-VIS COMPARATIF MULTI-COLONNES (QUAND AU MOINS 2 SONT SÉLECTIONNÉS) */}
      {viewMode === 'comparison' && selectedCount >= 2 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tableau Comparatif Vis-à-Vis ({selectedCount} éléments)
            </h3>
            <button
              onClick={() => {
                if (comparisonMode === 'product') setSelectedProductIds([]);
                else setSelectedShopIds([]);
              }}
              className="text-[11px] text-rose-600 hover:underline font-semibold"
            >
              Tout désélectionner
            </button>
          </div>

          {/* Grille côte à côte adaptée mobile/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {comparisonMode === 'product'
              ? selectedProducts.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Badge Vainqueur ou index */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase text-primary tracking-wider">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-1">
                            {item.name}
                          </h4>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSelectProduct(item.id)}
                        className="w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400 flex items-center justify-center transition cursor-pointer"
                        title="Retirer de la comparaison"
                      >
                        <i className="fa-solid fa-xmark text-xs"></i>
                      </button>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      {item.badge && (
                        <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-amber-300 font-bold text-[9px] px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                        <i className="fa-solid fa-star text-amber-400 text-[9px]"></i>
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Lignes comparatives */}
                    <div className="space-y-2 text-xs divide-y divide-slate-100 pb-2">
                      {/* Prix */}
                      <div className="flex items-baseline justify-between pt-1">
                        <span className="text-slate-500 text-[11px]">Tarif constaté :</span>
                        <span className="text-base font-extrabold text-primary">{item.formattedPrice}</span>
                      </div>

                      {/* Établissement & Distance */}
                      <div className="flex items-center justify-between pt-1.5">
                        <span className="text-slate-500 text-[11px]">Établissement :</span>
                        <div className="text-right">
                          <span className="font-bold text-slate-800 block text-[11px]">{item.shopName}</span>
                          <span className="text-[10px] text-slate-400">
                            {item.shopLocation.split(',')[0]} ({item.distance})
                          </span>
                        </div>
                      </div>

                      {/* Moyens acceptés sur place */}
                      <div className="pt-1.5">
                        <span className="text-slate-500 text-[10px] block mb-1">
                          Moyens acceptés sur place :
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.acceptedPayments.map((p) => (
                            <PaymentLogo key={p} id={p} size="xs" />
                          ))}
                        </div>
                      </div>

                      {/* Disponibilité */}
                      <div className="flex items-center justify-between pt-1.5">
                        <span className="text-slate-500 text-[11px]">Disponibilité :</span>
                        <span className="font-semibold text-emerald-700 text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded">
                          {item.stock}
                        </span>
                      </div>
                    </div>

                    {/* Actions directes */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => handleProductDetail(item.id)}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition text-center cursor-pointer"
                      >
                        Voir Fiche Produit
                      </button>
                      <button
                        onClick={() => onNavigate('reservation')}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-bold text-[11px] transition text-center cursor-pointer shadow-xs"
                      >
                        Mettre de côté
                      </button>
                    </div>
                  </div>
                ))
              : selectedShops.map((shop, index) => (
                  <div
                    key={shop.id}
                    className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">
                            {shop.category}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-1">
                            {shop.name}
                          </h4>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSelectShop(shop.id)}
                        className="w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400 flex items-center justify-center transition cursor-pointer"
                        title="Retirer de la comparaison"
                      >
                        <i className="fa-solid fa-xmark text-xs"></i>
                      </button>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                      <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                        <i className="fa-solid fa-star text-amber-400 text-[9px]"></i>
                        <span>{shop.rating}</span>
                        <span className="text-slate-300 font-normal">({shop.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Lignes comparatives */}
                    <div className="space-y-2 text-xs divide-y divide-slate-100 pb-2">
                      <div className="flex items-baseline justify-between pt-1">
                        <span className="text-slate-500 text-[11px]">Fourchette prix :</span>
                        <span className="text-sm font-extrabold text-primary">{shop.priceRange}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1.5">
                        <span className="text-slate-500 text-[11px]">Emplacement :</span>
                        <span className="font-semibold text-slate-800 text-[11px]">
                          {shop.location.split(',')[0]} ({shop.distance})
                        </span>
                      </div>

                      <div className="pt-1.5">
                        <span className="text-slate-500 text-[10px] block mb-1">
                          Moyens acceptés sur place :
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {shop.acceptedPayments.map((p) => (
                            <PaymentLogo key={p} id={p} size="xs" />
                          ))}
                        </div>
                      </div>

                      <div className="pt-1.5">
                        <span className="text-slate-500 text-[10px] block">Point fort :</span>
                        <span className="text-slate-700 text-[11px] italic leading-tight block mt-0.5">
                          "{shop.highlight}"
                        </span>
                      </div>
                    </div>

                    {/* Actions directes */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => onNavigate('fiche-lieu')}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition text-center cursor-pointer"
                      >
                        Fiche Établissement
                      </button>
                      <button
                        onClick={() => onNavigate('reservation')}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition text-center cursor-pointer shadow-xs"
                      >
                        Réserver Table
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </section>
      )}

      {/* MESSAGE SI MOINS DE 2 ÉLÉMENTS SÉLECTIONNÉS */}
      {selectedCount < 2 && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 text-center space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-base">
            <i className="fa-solid fa-circle-info"></i>
          </div>
          <h4 className="text-xs font-bold text-amber-900">
            Sélectionnez au moins 2 {comparisonMode === 'product' ? 'produits' : 'boutiques'}
          </h4>
          <p className="text-[11px] text-amber-700 max-w-xs mx-auto">
            Cochez les éléments dans le catalogue ci-dessous pour lancer la comparaison instantanée et obtenir l'analyse IA.
          </p>
          <button
            onClick={() => {
              if (comparisonMode === 'product') setSelectedProductIds(['prod-1', 'prod-2']);
              else setSelectedShopIds(['shop-1', 'shop-2']);
              setViewMode('comparison');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition cursor-pointer"
          >
            Sélectionner les 2 plus populaires
          </button>
        </div>
      )}

      {/* VUE 2 / CATALOGUE POUR AJOUTER / RETIRER DES ÉLÉMENTS AU COMPARATEUR */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {comparisonMode === 'product' ? 'Catalogue Produits & Menus' : 'Boutiques & Établissements'}
            </h3>
            <p className="text-[10px] text-slate-400">
              Cochez pour ajouter ou retirer du comparateur
            </p>
          </div>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
            {comparisonMode === 'product' ? filteredProducts.length : filteredShops.length} disponibles
          </span>
        </div>

        <div className="space-y-2.5">
          {comparisonMode === 'product'
            ? filteredProducts.map((product) => {
                const isSelected = selectedProductIds.includes(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => toggleSelectProduct(product.id)}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/60 border-primary ring-2 ring-primary/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Checkbox */}
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition ${
                          isSelected
                            ? 'bg-primary border-primary text-white'
                            : 'border-slate-300 bg-white text-transparent'
                        }`}
                      >
                        <i className="fa-solid fa-check text-[10px]"></i>
                      </div>

                      {/* Photo */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                      />

                      {/* Infos */}
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-primary uppercase block">
                          {product.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 truncate">{product.name}</h4>
                        <p className="text-[10px] text-slate-500 truncate">
                          {product.shopName} • {product.distance}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {product.acceptedPayments.slice(0, 3).map((p) => (
                            <PaymentLogo key={p} id={p} size="xs" />
                          ))}
                          {product.acceptedPayments.length > 3 && (
                            <span className="text-[9px] text-slate-400 font-bold">
                              +{product.acceptedPayments.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Prix & Bouton détail */}
                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <span className="text-xs font-extrabold text-slate-900 block">
                        {product.formattedPrice}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductDetail(product.id);
                        }}
                        className="text-[10px] font-bold text-primary hover:underline"
                      >
                        Détails &gt;
                      </button>
                    </div>
                  </div>
                );
              })
            : filteredShops.map((shop) => {
                const isSelected = selectedShopIds.includes(shop.id);
                return (
                  <div
                    key={shop.id}
                    onClick={() => toggleSelectShop(shop.id)}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/60 border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Checkbox */}
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition ${
                          isSelected
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 bg-white text-transparent'
                        }`}
                      >
                        <i className="fa-solid fa-check text-[10px]"></i>
                      </div>

                      {/* Photo */}
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                      />

                      {/* Infos */}
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-emerald-700 uppercase block">
                          {shop.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 truncate">{shop.name}</h4>
                        <p className="text-[10px] text-slate-500 truncate">
                          {shop.location.split(',')[0]} • {shop.distance}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {shop.acceptedPayments.slice(0, 3).map((p) => (
                            <PaymentLogo key={p} id={p} size="xs" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Prix */}
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-slate-900 block">{shop.priceRange}</span>
                      <span className="text-[10px] text-amber-500 font-bold flex items-center justify-end gap-0.5">
                        <i className="fa-solid fa-star text-[8px]"></i> {shop.rating}
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>

      {/* MODAL ANALYSE IA COMPARATIVE */}
      <AiComparisonModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        items={activeSelectedItems}
        type={comparisonMode}
        onSelectWinningItem={(item) => {
          if ('price' in item) {
            handleProductDetail(item.id);
          } else {
            onNavigate('fiche-lieu');
          }
        }}
      />
    </div>
  );
};
