import React, { useState } from 'react';
import { ScreenName, UserRole } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  userRole: UserRole;
  onSetUserRole: (role: UserRole) => void;
}

export const LoginScreen: React.FC<Props> = ({ onNavigate, userRole, onSetUserRole }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('thomas.kouassi@abidjan.ci');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole === 'manager') {
      onNavigate('pro-dashboard');
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-0 sm:p-6 font-sans text-slate-900 selection:bg-blue-100 selection:text-primary bg-slate-100 min-h-screen">
      {/* MobileDeviceFrame */}
      <div className="relative w-full max-w-[400px] h-[100dvh] sm:h-[844px] bg-white sm:rounded-[44px] sm:shadow-2xl overflow-hidden flex flex-col border-0 sm:border-[8px] sm:border-slate-900">
        {/* iOSStatusBar */}
        <header className="pt-3 px-7 pb-2 flex justify-between items-center z-20 shrink-0 select-none" data-purpose="status-bar">
          <span className="text-[15px] font-semibold tracking-tight text-slate-800">9:41</span>
          <div className="hidden sm:block w-28 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2"></div>
          <div className="flex items-center space-x-2 text-slate-800">
            <svg className="w-4 h-3.5 fill-current" viewBox="0 0 17 12">
              <rect height="4" rx="0.5" width="2.5" x="0" y="8"></rect>
              <rect height="6.5" rx="0.5" width="2.5" x="4" y="5.5"></rect>
              <rect height="9" rx="0.5" width="2.5" x="8" y="3"></rect>
              <rect height="12" rx="0.5" width="2.5" x="12" y="0"></rect>
            </svg>
            <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
              <path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22h-.01v.01h.01v-.01z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <div className="flex items-center">
              <div className="w-6 h-[11.5px] border border-slate-700 rounded-sm p-[1px] flex items-center">
                <div className="h-full w-4 bg-slate-800 rounded-[1px]"></div>
              </div>
              <div className="w-[1.5px] h-[4px] bg-slate-600 rounded-r-sm"></div>
            </div>
          </div>
        </header>

        {/* NavigationTopBar */}
        <nav aria-label="Top navigation" className="px-5 py-2 flex items-center justify-between shrink-0">
          <button
            onClick={() => onNavigate('onboarding')}
            aria-label="Retour"
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <i className="fa-solid fa-chevron-left text-base"></i>
          </button>
          <div className="flex items-center space-x-1">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              luka<span className="text-primary font-bold">AI</span>
            </span>
          </div>
          <div className="w-10"></div>
        </nav>

        {/* MainContentScrollArea */}
        <main className="flex-1 overflow-y-auto px-6 py-2 space-y-5 no-scrollbar">
          {/* Header Intro */}
          <section className="space-y-1" data-purpose="headline-section">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bon retour ! 👋</h1>
            <p className="text-sm font-normal text-slate-500 leading-relaxed">
              Accédez rapidement à vos réservations et activités favorites.
            </p>
          </section>

          {/* UserRoleToggle */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center relative text-xs font-semibold select-none shadow-inner" role="tablist">
            <button
              onClick={() => onSetUserRole('client')}
              aria-selected={userRole === 'client'}
              className={`flex-1 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer ${
                userRole === 'client' ? 'bg-white text-primary shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'
              }`}
              role="tab"
              type="button"
            >
              <i className="fa-solid fa-user text-xs"></i>
              <span>Particulier / Client</span>
            </button>
            <button
              onClick={() => onSetUserRole('manager')}
              aria-selected={userRole === 'manager'}
              className={`flex-1 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer ${
                userRole === 'manager' ? 'bg-white text-primary shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'
              }`}
              role="tab"
              type="button"
            >
              <i className="fa-solid fa-store text-xs"></i>
              <span>Gérant d'établissement</span>
            </button>
          </div>

          {/* AuthenticationForm */}
          <form className="space-y-4" data-purpose="login-form" onSubmit={handleSubmit}>
            {/* Input: Identifier (Email/Phone) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="identifier">
                Numéro ou adresse email
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400">
                  <i className="fa-regular fa-envelope text-base"></i>
                </span>
                <input
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-2xl pl-11 pr-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 font-normal"
                  id="identifier"
                  name="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="ex. 06 12 34 56 78 ou contact@domaine.fr"
                  required
                  type="text"
                />
              </div>
            </div>

            {/* Input: Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="password">
                Mot de passe
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400">
                  <i className="fa-solid fa-lock text-base"></i>
                </span>
                <input
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-2xl pl-11 pr-11 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 font-normal"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                />
                {/* Show/Hide Password Toggle */}
                <button
                  aria-label="Afficher ou masquer le mot de passe"
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none p-1.5 transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-base`}></i>
                </button>
              </div>
            </div>

            {/* Options: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 focus:ring-offset-0 transition"
                  type="checkbox"
                />
                <span className="text-xs font-medium text-slate-600">Se souvenir de moi</span>
              </label>
              <a className="text-xs font-semibold text-primary hover:underline" href="#forgot" onClick={(e) => e.preventDefault()}>
                Mot de passe oublié ?
              </a>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <button
                className="w-full bg-primary hover:bg-primary-600 active:scale-[0.99] text-white font-semibold text-base py-3.5 rounded-2xl shadow-lg shadow-primary/25 transition-all duration-150 flex items-center justify-center cursor-pointer"
                type="submit"
              >
                <span>{userRole === 'manager' ? 'Accéder à mon Établissement' : 'Se connecter'}</span>
                <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
              </button>
            </div>
          </form>

          {/* SocialLoginsSection */}
          <section className="space-y-4" data-purpose="alternative-logins">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-xs uppercase tracking-wider text-slate-400 font-medium">Ou continuer avec</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate(userRole === 'manager' ? 'pro-dashboard' : 'home')}
                className="flex items-center justify-center space-x-2.5 py-3 px-4 border border-slate-200 rounded-2xl hover:bg-slate-50 active:scale-95 transition bg-white text-xs font-semibold text-slate-700 cursor-pointer"
                type="button"
              >
                <i className="fa-brands fa-google text-red-500 text-base"></i>
                <span>Google</span>
              </button>
              <button
                onClick={() => onNavigate(userRole === 'manager' ? 'pro-dashboard' : 'home')}
                className="flex items-center justify-center space-x-2.5 py-3 px-4 border border-slate-200 rounded-2xl hover:bg-slate-50 active:scale-95 transition bg-white text-xs font-semibold text-slate-700 cursor-pointer"
                type="button"
              >
                <i className="fa-brands fa-apple text-black text-lg"></i>
                <span>Apple</span>
              </button>
            </div>
          </section>

          {/* Registration link */}
          <div className="text-center pt-1 pb-2">
            <p className="text-xs text-slate-500">
              Pas encore inscrit ?{' '}
              <button onClick={() => onNavigate('home')} className="font-semibold text-primary hover:underline ml-1 cursor-pointer">
                Créer un compte
              </button>
            </p>
          </div>

          {/* TrustBadgeSection */}
          <aside className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-start space-x-3" data-purpose="security-guarantee">
            <i className="fa-solid fa-shield-halved text-primary text-lg shrink-0 mt-0.5"></i>
            <div className="text-[11px] leading-snug text-slate-700">
              <span className="font-semibold text-slate-900">Paiement 100% sur place</span> — <span className="text-primary font-semibold">lukaAI</span> ne prélève aucun montant en ligne lors de la réservation.
            </div>
          </aside>
        </main>

        {/* iOSHomeIndicator */}
        <footer className="w-full pt-1 pb-2 flex justify-center items-center shrink-0 safe-area-bottom select-none bg-white">
          <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
        </footer>
      </div>
    </div>
  );
};
