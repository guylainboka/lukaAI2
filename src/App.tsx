import React, { useState } from 'react';
import { ScreenName, UserRole } from './types';
import { OnboardingScreen } from './components/OnboardingScreen';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { HomeDiscoveryScreen } from './components/HomeDiscoveryScreen';
import { ExplorerScreen } from './components/ExplorerScreen';
import { CarteScreen } from './components/CarteScreen';
import { FicheLieuScreen } from './components/FicheLieuScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { ReservationScreen } from './components/ReservationScreen';
import { ChatIaScreen } from './components/ChatIaScreen';
import { FavorisScreen } from './components/FavorisScreen';
import { CompteScreen } from './components/CompteScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ProDashboardScreen } from './components/ProDashboardScreen';
import { ProPublishScreen } from './components/ProPublishScreen';
import { ProProfileScreen } from './components/ProProfileScreen';
import { AppHeader } from './components/AppHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { PaywallModal } from './components/PaywallModal';
import { GpsModal } from './components/GpsModal';
import { AndroidShell } from './components/AndroidShell';
import { AndroidAppSwitcher } from './components/AndroidAppSwitcher';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-1');
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [history, setHistory] = useState<ScreenName[]>(['home']);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);
  const [showScreenSwitcher, setShowScreenSwitcher] = useState(false);

  const navigateTo = (screen: ScreenName) => {
    if (screen !== currentScreen) {
      setHistory((prev) => [...prev, screen]);
    }
    setCurrentScreen(screen);
  };

  // Android System Navigation handlers
  const handleAndroidBack = () => {
    if (showScreenSwitcher) {
      setShowScreenSwitcher(false);
      return;
    }
    if (isPaywallOpen) {
      setIsPaywallOpen(false);
      return;
    }
    if (isGpsModalOpen) {
      setIsGpsModalOpen(false);
      return;
    }

    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current
      const prevScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else if (currentScreen !== 'home') {
      setCurrentScreen('home');
      setHistory(['home']);
    }
  };

  const handleAndroidHome = () => {
    if (showScreenSwitcher) setShowScreenSwitcher(false);
    if (isPaywallOpen) setIsPaywallOpen(false);
    if (isGpsModalOpen) setIsGpsModalOpen(false);

    const targetHome = userRole === 'manager' ? 'pro-dashboard' : 'home';
    setCurrentScreen(targetHome);
    setHistory([targetHome]);
  };

  const handleAndroidRecents = () => {
    setShowScreenSwitcher((prev) => !prev);
  };

  const screensList: { id: ScreenName; label: string; icon: string; category: string }[] = [
    { id: 'onboarding', label: '1. Onboarding (Pay Everywhere)', icon: 'fa-solid fa-mobile-screen', category: 'Démarrage' },
    { id: 'login', label: '2. Connexion / Login', icon: 'fa-solid fa-right-to-bracket', category: 'Démarrage' },
    { id: 'home', label: '3. Accueil - Comparateur de Prix', icon: 'fa-solid fa-scale-balanced', category: 'Client' },
    { id: 'home-discovery', label: '4. Accueil - Découverte & Catégories', icon: 'fa-solid fa-compass', category: 'Client' },
    { id: 'explorer', label: '5. Explorer - Liste & Carte', icon: 'fa-solid fa-magnifying-glass-location', category: 'Client' },
    { id: 'carte', label: '6. Plein écran Carte interactive', icon: 'fa-solid fa-map-location-dot', category: 'Client' },
    { id: 'fiche-lieu', label: '7. Fiche Lieu - Le Jardin Gourmand', icon: 'fa-solid fa-store', category: 'Client' },
    { id: 'product-detail', label: '7b. Fiche Produit (Détail & Vendeurs)', icon: 'fa-solid fa-bowl-food', category: 'Client' },
    { id: 'reservation', label: '8. Réserver une table (Détail)', icon: 'fa-regular fa-calendar-check', category: 'Client' },
    { id: 'chat-ia', label: '9. Concierge Chat IA (lukaAI)', icon: 'fa-solid fa-wand-magic-sparkles', category: 'Client' },
    { id: 'favoris', label: '10. Mes Favoris (Adresses)', icon: 'fa-solid fa-heart', category: 'Client' },
    { id: 'compte', label: '11. Mon Compte (Profil Client)', icon: 'fa-solid fa-user', category: 'Client' },
    { id: 'notifications', label: '12. Notifications', icon: 'fa-regular fa-bell', category: 'Client' },
    { id: 'pro-dashboard', label: '13. Dashboard Pro (Gérant)', icon: 'fa-solid fa-chart-pie', category: 'Mode Pro' },
    { id: 'pro-publish', label: '14. Créer Une Publication (CMS)', icon: 'fa-solid fa-pen-to-square', category: 'Mode Pro' },
    { id: 'pro-profile', label: '15. Profil Établissement Pro', icon: 'fa-solid fa-wallet', category: 'Mode Pro' },
  ];

  // Screens that show the top AppHeader
  const showAppHeader = [
    'home',
    'home-discovery',
    'explorer',
    'favoris',
    'compte',
    'notifications',
    'pro-dashboard',
    'pro-publish',
    'pro-profile',
  ].includes(currentScreen);

  // Screens that show the bottom tab navigation bar
  const showBottomNav = [
    'home',
    'home-discovery',
    'explorer',
    'carte',
    'favoris',
    'compte',
    'pro-dashboard',
    'pro-publish',
    'pro-profile',
  ].includes(currentScreen);

  const getHeaderTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Accueil';
      case 'home-discovery':
        return 'Découverte';
      case 'explorer':
        return 'Explorer';
      case 'favoris':
        return 'Favoris';
      case 'compte':
        return 'Compte';
      case 'notifications':
        return 'Notifications';
      case 'pro-dashboard':
        return 'Tableau de bord';
      case 'pro-publish':
        return 'Publication';
      case 'pro-profile':
        return 'Profil Pro';
      default:
        return 'lukaAI';
    }
  };

  return (
    <AndroidShell
      onAndroidBack={handleAndroidBack}
      onAndroidHome={handleAndroidHome}
      onAndroidRecents={handleAndroidRecents}
      showAppSwitcher={showScreenSwitcher}
      onToggleAppSwitcher={() => setShowScreenSwitcher((prev) => !prev)}
    >
      {/* 1. Android In-App Header (When enabled) */}
      {showAppHeader && (
        <AppHeader
          title={getHeaderTitle()}
          onNavigate={navigateTo}
          showBack={['home-discovery', 'notifications'].includes(currentScreen)}
          backTarget="home"
          onOpenPaywall={() => setIsPaywallOpen(true)}
        />
      )}

      {/* 2. Scrollable / Interactive Screen Viewport */}
      <div className="flex-1 min-h-0 overflow-y-auto relative no-scrollbar flex flex-col bg-slate-50">
        {currentScreen === 'onboarding' && <OnboardingScreen onNavigate={navigateTo} />}
        {currentScreen === 'login' && (
          <LoginScreen
            onNavigate={navigateTo}
            userRole={userRole}
            onSetUserRole={setUserRole}
          />
        )}
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={navigateTo}
            onOpenPaywall={() => setIsPaywallOpen(true)}
            onSelectProduct={(id) => {
              setSelectedProductId(id);
              navigateTo('product-detail');
            }}
          />
        )}
        {currentScreen === 'home-discovery' && <HomeDiscoveryScreen onNavigate={navigateTo} />}
        {currentScreen === 'explorer' && (
          <ExplorerScreen
            onNavigate={navigateTo}
            onOpenGpsModal={() => setIsGpsModalOpen(true)}
          />
        )}
        {currentScreen === 'carte' && (
          <CarteScreen
            onNavigate={navigateTo}
            onOpenGpsModal={() => setIsGpsModalOpen(true)}
          />
        )}
        {currentScreen === 'fiche-lieu' && (
          <FicheLieuScreen
            onNavigate={navigateTo}
            onOpenGpsModal={() => setIsGpsModalOpen(true)}
          />
        )}
        {currentScreen === 'product-detail' && (
          <ProductDetailScreen
            productId={selectedProductId}
            onNavigate={navigateTo}
            onOpenGpsModal={() => setIsGpsModalOpen(true)}
            onAddToCompare={(id) => {
              setSelectedProductId(id);
            }}
          />
        )}
        {currentScreen === 'reservation' && <ReservationScreen onNavigate={navigateTo} />}
        {currentScreen === 'chat-ia' && (
          <ChatIaScreen
            onNavigate={navigateTo}
            onOpenGpsModal={() => setIsGpsModalOpen(true)}
            onOpenPaywall={() => setIsPaywallOpen(true)}
          />
        )}
        {currentScreen === 'favoris' && (
          <FavorisScreen
            onNavigate={navigateTo}
            onOpenGpsModal={() => setIsGpsModalOpen(true)}
          />
        )}
        {currentScreen === 'compte' && (
          <CompteScreen
            onNavigate={navigateTo}
            onOpenPaywall={() => setIsPaywallOpen(true)}
            userRole={userRole}
            onSetUserRole={setUserRole}
          />
        )}
        {currentScreen === 'notifications' && <NotificationsScreen onNavigate={navigateTo} />}
        {currentScreen === 'pro-dashboard' && (
          <ProDashboardScreen
            onNavigate={navigateTo}
            onSetUserRole={setUserRole}
          />
        )}
        {currentScreen === 'pro-publish' && <ProPublishScreen onNavigate={navigateTo} />}
        {currentScreen === 'pro-profile' && (
          <ProProfileScreen
            onNavigate={navigateTo}
            onSetUserRole={setUserRole}
          />
        )}
      </div>

      {/* 3. In-App Tab Bar (Docked right above the Android navigation bar) */}
      {showBottomNav && (
        <BottomNavBar
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          userRole={userRole}
        />
      )}

      {/* 4. Android Multitasking App Switcher */}
      <AndroidAppSwitcher
        isOpen={showScreenSwitcher}
        onClose={() => setShowScreenSwitcher(false)}
        onSelectScreen={(screen) => {
          if (screen.startsWith('pro-')) {
            setUserRole('manager');
          } else if (screen !== 'login') {
            setUserRole('client');
          }
          navigateTo(screen);
        }}
        currentScreen={currentScreen}
      />

      {/* 5. Modals contained cleanly within the Android device shell */}
      <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} />
      <GpsModal isOpen={isGpsModalOpen} onClose={() => setIsGpsModalOpen(false)} />

      {/* Floating Quick Android Screen Switcher pill button */}
      <div className="absolute top-10 right-3 z-40">
        <button
          onClick={() => setShowScreenSwitcher(!showScreenSwitcher)}
          className="bg-slate-900/90 hover:bg-slate-950 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 border border-white/20 active:scale-95 transition cursor-pointer"
          title="Toutes les pages"
        >
          <i className="fa-brands fa-android text-emerald-400 text-[11px]"></i>
          <span>Écrans ({screensList.length + 1})</span>
        </button>
      </div>
    </AndroidShell>
  );
}
