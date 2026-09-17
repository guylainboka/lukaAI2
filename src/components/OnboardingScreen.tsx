import React from 'react';
import { ScreenName } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

export const OnboardingScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="h-full flex items-center justify-center p-0 sm:p-4 bg-slate-200 min-h-screen">
      {/* MobileDeviceFrame */}
      <div className="mobile-frame w-full max-w-[414px] min-h-[852px] h-[100dvh] bg-white relative flex flex-col justify-between overflow-hidden shadow-2xl sm:rounded-[48px] border-0 sm:border-[8px] sm:border-slate-900 font-sans">
        {/* TopBar (iOS Status Bar) */}
        <header className="w-full pt-3 px-7 flex justify-between items-center z-20 shrink-0 select-none">
          <span className="text-[15px] font-semibold tracking-tight text-slate-900">9:41</span>
          <div className="h-4 w-24 bg-slate-900 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-2 text-slate-900 text-xs">
            <i className="fa-solid fa-signal text-[11px]"></i>
            <i className="fa-solid fa-wifi text-[12px]"></i>
            <i className="fa-solid fa-battery-full text-[14px]"></i>
          </div>
        </header>

        {/* BrandHeader */}
        <section className="px-7 pt-4 flex items-center justify-between z-10 shrink-0" data-purpose="app-branding-nav">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-600/30">
              <i className="fa-solid fa-location-dot text-lg"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-950 leading-none">
                luka<span className="text-brand-600">AI</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 mt-1">PAY EVERYWHERE</span>
            </div>
          </div>
          {/* Skip Button */}
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-semibold text-slate-400 hover:text-slate-800 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-100"
            type="button"
          >
            Passer
          </button>
        </section>

        {/* InteractiveGraphicCanvas */}
        <section className="flex-1 flex flex-col justify-center px-6 py-2 relative" data-purpose="hero-illustration">
          {/* Background Ambient Glow Shapes */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-50 rounded-full filter blur-3xl opacity-70 pointer-events-none"></div>
          
          {/* Main Visual Mockup Container */}
          <div className="relative w-full max-w-[340px] mx-auto bg-gradient-to-b from-slate-50/90 to-blue-50/40 rounded-3xl p-4 border border-slate-100 shadow-card-soft">
            {/* Search & Filter Visual Simulation */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 text-xs">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <span className="text-xs font-medium text-slate-700">Cafés &amp; Rooftops acceptant</span>
              </div>
              <span className="text-[10px] font-bold bg-brand-600 text-white px-2 py-0.5 rounded-md">Wave</span>
            </div>

            {/* Featured Spot Card */}
            <div
              onClick={() => onNavigate('fiche-lieu')}
              className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-3 relative overflow-hidden cursor-pointer hover:border-brand-500/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <i className="fa-solid fa-mug-saucer text-lg"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">Le Terrou Lounge</h4>
                      <span className="inline-flex items-center text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span>Ouvert
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Almadies • 450 m</p>
                  </div>
                </div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 bg-amber-50/80 px-1.5 py-0.5 rounded-md text-amber-500">
                  <i className="fa-solid fa-star text-[10px]"></i>
                  <span className="text-[11px] font-bold text-amber-800">4.9</span>
                </div>
              </div>

              {/* Direct Payment Acceptance Badges */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Paiements sur place</span>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F9FF] text-[#0089BA] border border-[#B3EEFF]">
                    Wave
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF4EB] text-[#D35400] border border-[#FFD9B3]">
                    OM
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                    <i className="fa-solid fa-credit-card text-[9px]"></i>
                    CB
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Second Item: Hotel preview */}
            <div className="mt-2.5 bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-slate-100 flex items-center justify-between opacity-85">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-hotel"></i>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Radisson Blu Seaside</p>
                  <p className="text-[10px] text-slate-400 font-medium">Hôtel • Wave &amp; Carte Acceptés</p>
                </div>
              </div>
              <span className="text-emerald-500 font-bold text-xs flex items-center gap-1">
                <i className="fa-solid fa-check text-[11px]"></i> Vérifié
              </span>
            </div>
          </div>
        </section>

        {/* ContentAndActions */}
        <section className="px-7 pb-8 pt-2 flex flex-col justify-end bg-white z-10" data-purpose="onboarding-controls">
          <div className="text-center sm:text-left mb-6">
            <h1 className="text-[26px] leading-[1.25] font-extrabold tracking-tight text-slate-950 mb-3">
              Trouvez où payer avec votre <span className="text-brand-600">Mobile Money</span>
            </h1>
            <p className="text-sm font-normal leading-relaxed text-slate-500">
              Repérez en temps réel les restaurants, commerces et services partenaires qui acceptent Wave, Orange Money ou carte directement au comptoir.
            </p>
          </div>

          {/* Pagination & Action Button Row */}
          <div className="flex items-center justify-between pt-2">
            {/* Pagination Indicator Dots */}
            <div className="flex items-center gap-1.5" data-purpose="carousel-pagination">
              <span className="w-6 h-2 rounded-full bg-brand-600 transition-all"></span>
              <span className="w-2 h-2 rounded-full bg-slate-200"></span>
              <span className="w-2 h-2 rounded-full bg-slate-200"></span>
            </div>
            {/* Next / CTA Circular Button with Font Awesome Arrow */}
            <button
              onClick={() => onNavigate('home')}
              aria-label="Étape suivante"
              className="group w-14 h-14 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-floating hover:bg-brand-700 active:scale-95 transition-all transform cursor-pointer"
              type="button"
            >
              <i className="fa-solid fa-arrow-right text-lg transform group-hover:translate-x-0.5 transition-transform"></i>
            </button>
          </div>

          {/* Bottom Account Login Link */}
          <div className="text-center mt-6 pt-2">
            <button
              onClick={() => onNavigate('login')}
              className="text-xs text-slate-400 font-medium hover:text-slate-900 transition-colors cursor-pointer"
              type="button"
            >
              Vous avez déjà un compte ? <span className="font-bold text-brand-600 underline underline-offset-2">Se connecter</span>
            </button>
          </div>
        </section>

        {/* iOSHomeIndicator */}
        <div className="w-full pb-2 pt-0 flex justify-center items-center shrink-0">
          <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
