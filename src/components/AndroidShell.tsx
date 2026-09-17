import React, { useState } from 'react';
import { AndroidStatusBar } from './AndroidStatusBar';
import { AndroidNavBar } from './AndroidNavBar';

interface Props {
  children: React.ReactNode;
  onAndroidBack: () => void;
  onAndroidHome: () => void;
  onAndroidRecents: () => void;
  showAppSwitcher: boolean;
  onToggleAppSwitcher: () => void;
}

export const AndroidShell: React.FC<Props> = ({
  children,
  onAndroidBack,
  onAndroidHome,
  onAndroidRecents,
  showAppSwitcher,
  onToggleAppSwitcher,
}) => {
  const [deviceModel, setDeviceModel] = useState<'pixel' | 'galaxy'>('pixel');
  const [viewMode, setViewMode] = useState<'device' | 'fullscreen'>('device');
  const [navStyle, setNavStyle] = useState<'gestures' | 'buttons'>('gestures');

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-0 sm:p-4 text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Ambient background decoration on desktop */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(10,102,194,0.3),rgba(255,255,255,0))]"></div>

      {/* Top Desktop Android Controls & Toolbar */}
      <div className="w-full max-w-xl mb-3 z-20 hidden sm:flex items-center justify-between px-3 py-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 text-xs shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <i className="fa-brands fa-android text-sm"></i>
          </div>
          <div>
            <span className="font-bold text-white block leading-none">Format App Android</span>
            <span className="text-[10px] text-slate-400">
              {deviceModel === 'pixel' ? 'Google Pixel 8 • Android 14' : 'Samsung Galaxy S24 • One UI 6'}
            </span>
          </div>
        </div>

        {/* Device Switcher & Options */}
        <div className="flex items-center gap-1.5">
          {/* Model Switch */}
          <button
            onClick={() => setDeviceModel(deviceModel === 'pixel' ? 'galaxy' : 'pixel')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] transition cursor-pointer flex items-center gap-1"
            title="Changer de modèle Android"
          >
            <i className="fa-solid fa-mobile-screen text-[10px] text-primary"></i>
            <span>{deviceModel === 'pixel' ? 'Pixel 8' : 'Galaxy S24'}</span>
          </button>

          {/* Nav Style Switch */}
          <button
            onClick={() => setNavStyle(navStyle === 'gestures' ? 'buttons' : 'gestures')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] transition cursor-pointer flex items-center gap-1"
            title="Changer le style de navigation Android"
          >
            <i className="fa-solid fa-arrows-split-up-and-left text-[10px] text-amber-400"></i>
            <span>{navStyle === 'gestures' ? 'Gestes' : '3 Boutons'}</span>
          </button>

          {/* Fullscreen vs Device Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'device' ? 'fullscreen' : 'device')}
            className={`px-2.5 py-1 rounded-xl font-medium text-[11px] transition cursor-pointer flex items-center gap-1 ${
              viewMode === 'fullscreen' ? 'bg-primary text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Basculer en plein écran mobile"
          >
            <i className="fa-solid fa-expand text-[10px]"></i>
            <span>{viewMode === 'device' ? 'Cadre' : 'Plein écran'}</span>
          </button>
        </div>
      </div>

      {/* Android Device Outer Wrapper */}
      <div
        className={`relative transition-all duration-300 ${
          viewMode === 'device'
            ? 'w-full max-w-[400px] h-[850px] max-h-[94vh] rounded-[48px] border-[10px] border-slate-900 bg-slate-900 shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)] ring-1 ring-slate-800 flex flex-col'
            : 'w-full max-w-md h-[100dvh] rounded-none border-0 shadow-none flex flex-col'
        }`}
      >
        {/* Hardware details: Side Physical Buttons (Pixel / Galaxy style) */}
        {viewMode === 'device' && (
          <>
            {/* Top Speaker Earpiece Grille */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-800 rounded-full z-40"></div>

            {/* Left side: Volume Rocker */}
            <div className="hidden sm:block absolute -left-[14px] top-28 w-1 h-14 bg-slate-800 rounded-l-md shadow-xs"></div>

            {/* Right side: Power Button */}
            <div className="hidden sm:block absolute -right-[14px] top-32 w-1 h-10 bg-slate-800 rounded-r-md shadow-xs"></div>
          </>
        )}

        {/* Internal Smartphone Display */}
        <div
          className={`w-full h-full bg-slate-50 text-slate-900 overflow-hidden flex flex-col relative ${
            viewMode === 'device' ? 'rounded-[38px]' : 'rounded-none'
          }`}
        >
          {/* 1. Android Status Bar (Fixed at top) */}
          <AndroidStatusBar />

          {/* 2. Main Content Viewport (Flex container for AppHeader, Scrollable Screen, BottomNav) */}
          <div className="flex-1 min-h-0 overflow-hidden relative flex flex-col">
            {children}
          </div>

          {/* 3. Android System Navigation Bar (Gestures or 3 Buttons) */}
          <AndroidNavBar
            navStyle={navStyle}
            onBack={onAndroidBack}
            onHome={onAndroidHome}
            onRecents={onAndroidRecents}
          />
        </div>
      </div>
    </div>
  );
};
