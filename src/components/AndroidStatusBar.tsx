import React, { useState, useEffect } from 'react';

export const AndroidStatusBar: React.FC = () => {
  const [time, setTime] = useState('12:45');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-8 px-5 flex items-center justify-between bg-white/95 backdrop-blur-md select-none z-50 shrink-0 text-slate-800 text-[11px] font-semibold border-b border-slate-100/50">
      {/* Left side: Clock & Notification Icons */}
      <div className="flex items-center gap-2">
        <span className="font-bold tracking-tight">{time}</span>
        <div className="flex items-center gap-1 text-[9px] text-primary">
          <i className="fa-solid fa-wand-magic-sparkles" title="lukaAI actif"></i>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="GPS en direct"></span>
        </div>
      </div>

      {/* Center: Camera Punch-Hole */}
      <div className="w-3.5 h-3.5 rounded-full bg-black ring-2 ring-slate-800 flex items-center justify-center shadow-inner">
        <div className="w-1 h-1 rounded-full bg-blue-950/60"></div>
      </div>

      {/* Right side: Android 14 System status icons */}
      <div className="flex items-center gap-1.5 text-[10px]">
        <span className="text-[9px] font-bold text-slate-500">5G</span>
        <i className="fa-solid fa-signal text-[10px] text-slate-800"></i>
        <i className="fa-solid fa-wifi text-[10px] text-slate-800"></i>
        <div className="flex items-center gap-0.5">
          <span className="text-[9px] font-bold">98%</span>
          <i className="fa-solid fa-battery-full text-[12px] text-slate-800"></i>
        </div>
      </div>
    </div>
  );
};
