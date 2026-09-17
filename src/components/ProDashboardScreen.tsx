import React, { useState } from 'react';
import { ScreenName, UserRole } from '../types';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onSetUserRole: (role: UserRole) => void;
}

const WEEKLY_DATA = [
  { day: 'Lun', date: '11 Sept', vues: 240, itineraires: 38, conversion: '15.8%' },
  { day: 'Mar', date: '12 Sept', vues: 290, itineraires: 46, conversion: '15.9%' },
  { day: 'Mer', date: '13 Sept', vues: 310, itineraires: 52, conversion: '16.7%' },
  { day: 'Jeu', date: '14 Sept', vues: 380, itineraires: 68, conversion: '17.8%' },
  { day: 'Ven', date: '15 Sept', vues: 520, itineraires: 96, conversion: '18.4%' },
  { day: 'Sam', date: '16 Sept', vues: 640, itineraires: 124, conversion: '19.3%' },
  { day: 'Dim', date: '17 Sept', vues: 580, itineraires: 110, conversion: '18.9%' },
];

const MONTHLY_DATA = [
  { day: 'Sem 1', date: '1-7 Sept', vues: 1650, itineraires: 280, conversion: '16.9%' },
  { day: 'Sem 2', date: '8-14 Sept', vues: 2100, itineraires: 375, conversion: '17.8%' },
  { day: 'Sem 3', date: '15-21 Sept', vues: 2450, itineraires: 440, conversion: '17.9%' },
  { day: 'Sem 4', date: '22-28 Sept', vues: 2960, itineraires: 534, conversion: '18.0%' },
];

export const ProDashboardScreen: React.FC<Props> = ({ onNavigate, onSetUserRole }) => {
  const [isOpenToClients, setIsOpenToClients] = useState(true);
  const [reservation1Confirmed, setReservation1Confirmed] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<'week' | 'month'>('week');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  const activeChartData = chartPeriod === 'week' ? WEEKLY_DATA : MONTHLY_DATA;
  const totalVues = activeChartData.reduce((acc, curr) => acc + curr.vues, 0);
  const totalItineraires = activeChartData.reduce((acc, curr) => acc + curr.itineraires, 0);
  const avgConversion = ((totalItineraires / totalVues) * 100).toFixed(1);

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-6 pt-0 bg-slate-50 flex-1">
      {/* Header bar */}
      <section className="px-5 pt-3 pb-4 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
              PRO
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold text-slate-900 tracking-tight">Le Jardin Gourmand</h1>
                <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                  Vérifié
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Cocody Ambassades • Marcelle Koffi (Gérante)</p>
            </div>
          </div>

          <button
            onClick={() => {
              onSetUserRole('client');
              onNavigate('home');
            }}
            className="text-xs font-bold text-primary bg-blue-50 px-2.5 py-1 rounded-xl hover:bg-blue-100 transition cursor-pointer"
          >
            Vue Client
          </button>
        </div>

        {/* Live Status Switch */}
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOpenToClients ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
              }`}
            ></span>
            <span className="text-xs font-bold text-slate-800">
              {isOpenToClients ? 'Établissement OUVERT aux clients' : 'Établissement FERMÉ'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpenToClients(!isOpenToClients)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
              isOpenToClients ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
          </button>
        </div>
      </section>

      {/* 0% Commission Guarantee */}
      <section className="px-5 mt-4">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-4 shadow-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-lg shrink-0">
            <i className="fa-solid fa-handshake"></i>
          </div>
          <div>
            <h3 className="text-xs font-bold">0% de commission lukaAI</h3>
            <p className="text-[10px] text-emerald-100 mt-0.5 leading-snug">
              Vos clients règlent 100% de l’addition en direct à votre caisse via Wave, Orange Money ou Carte.
            </p>
          </div>
        </div>
      </section>

      {/* Stats & Live Impact */}
      <section className="px-5 mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Impact en direct aujourd'hui</h2>
          <span className="text-[10px] text-primary font-bold">Temps réel</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <p className="text-[10px] text-slate-400 font-semibold">Vues fiche</p>
            <p className="text-lg font-extrabold text-slate-900 mt-1">348</p>
            <span className="text-[9px] text-emerald-600 font-bold">+18% hier</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <p className="text-[10px] text-slate-400 font-semibold">Itinéraires GPS</p>
            <p className="text-lg font-extrabold text-primary mt-1">62</p>
            <span className="text-[9px] text-emerald-600 font-bold">+9 clients</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <p className="text-[10px] text-slate-400 font-semibold">Réservations</p>
            <p className="text-lg font-extrabold text-amber-600 mt-1">8</p>
            <span className="text-[9px] text-slate-400 font-semibold">24 couverts</span>
          </div>
        </div>

        {/* SECTION RECHARTS : Graphique Simplifié Vues & Clics Itinéraire */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                  Vues de la fiche vs Clics Itinéraire GPS
                </h3>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Mesure les clients qui consultent votre profil et lancent le GPS pour venir
              </p>
            </div>

            {/* Sélecteurs Période & Type */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              {/* Période */}
              <div className="flex bg-slate-100 p-0.5 rounded-xl text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setChartPeriod('week')}
                  className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                    chartPeriod === 'week' ? 'bg-white text-primary shadow-xs' : 'text-slate-500'
                  }`}
                >
                  7 jours
                </button>
                <button
                  type="button"
                  onClick={() => setChartPeriod('month')}
                  className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                    chartPeriod === 'month' ? 'bg-white text-primary shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Mois
                </button>
              </div>

              {/* Type de graphe */}
              <div className="flex bg-slate-100 p-0.5 rounded-xl text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setChartType('area')}
                  title="Vue courbes lissées"
                  className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                    chartType === 'area' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <i className="fa-solid fa-chart-area"></i>
                </button>
                <button
                  type="button"
                  onClick={() => setChartType('bar')}
                  title="Vue barres"
                  className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                    chartType === 'bar' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <i className="fa-solid fa-chart-column"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Graphique Recharts interactif */}
          <div className="w-full h-52 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={activeChartData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVues" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorItineraires" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '11px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    }}
                    labelStyle={{ fontWeight: 'bold', color: '#93c5fd', marginBottom: '2px' }}
                    formatter={(value: any, name: any) => {
                      if (name === 'vues') return [`${value} vues`, '👁️ Vues de la fiche'];
                      if (name === 'itineraires') return [`${value} clics`, '📍 Clics Itinéraire GPS'];
                      return [value, name];
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="vues"
                    name="vues"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorVues)"
                  />
                  <Area
                    type="monotone"
                    dataKey="itineraires"
                    name="itineraires"
                    stroke="#059669"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorItineraires)"
                  />
                </AreaChart>
              ) : (
                <BarChart data={activeChartData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '11px',
                    }}
                    labelStyle={{ fontWeight: 'bold', color: '#93c5fd' }}
                  />
                  <Bar dataKey="vues" name="Vues" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="itineraires" name="Itinéraires" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Légende & Totaux période */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-100">
              <span className="text-[10px] font-semibold text-blue-700 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Total Vues
              </span>
              <p className="text-sm font-extrabold text-blue-900 mt-0.5">{totalVues.toLocaleString()}</p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-[10px] font-semibold text-emerald-700 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Itinéraires GPS
              </span>
              <p className="text-sm font-extrabold text-emerald-900 mt-0.5">{totalItineraires.toLocaleString()}</p>
            </div>
            <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-100">
              <span className="text-[10px] font-semibold text-amber-800 flex items-center justify-center gap-1">
                <i className="fa-solid fa-person-walking text-[10px]"></i> Taux Visite
              </span>
              <p className="text-sm font-extrabold text-amber-900 mt-0.5">{avgConversion}%</p>
            </div>
          </div>
        </div>

        {/* Payment Mix Progress Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Mix des encaissements sur place</span>
            <span className="text-[10px] text-slate-400">Ce mois</span>
          </div>

          {/* Bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="bg-cyan-500 h-full" style={{ width: '58%' }} title="Wave 58%"></div>
            <div className="bg-orange-500 h-full" style={{ width: '32%' }} title="Orange Money 32%"></div>
            <div className="bg-slate-800 h-full" style={{ width: '10%' }} title="Carte TPE 10%"></div>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="flex items-center gap-1 font-bold text-cyan-800">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Wave (58%)
            </span>
            <span className="flex items-center gap-1 font-bold text-orange-800">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> OM (32%)
            </span>
            <span className="flex items-center gap-1 font-bold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-slate-800"></span> TPE (10%)
            </span>
          </div>
        </div>
      </section>

      {/* Quick Management Shortcuts */}
      <section className="px-5 mt-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Gestion rapide</h3>
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => onNavigate('pro-publish')}
            className="p-3 bg-white rounded-2xl border border-slate-200 text-center hover:border-primary transition cursor-pointer shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-1.5 text-sm">
              <i className="fa-solid fa-bullhorn"></i>
            </div>
            <span className="text-xs font-bold text-slate-800 block">Offre Flash</span>
            <span className="text-[9px] text-slate-400">Attirer des clients</span>
          </button>

          <button
            onClick={() => onNavigate('pro-profile')}
            className="p-3 bg-white rounded-2xl border border-slate-200 text-center hover:border-primary transition cursor-pointer shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-1.5 text-sm">
              <i className="fa-solid fa-wallet"></i>
            </div>
            <span className="text-xs font-bold text-slate-800 block">Paiements</span>
            <span className="text-[9px] text-slate-400">Wave &amp; Mobile</span>
          </button>

          <button
            onClick={() => onNavigate('reservation')}
            className="p-3 bg-white rounded-2xl border border-slate-200 text-center hover:border-primary transition cursor-pointer shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center mx-auto mb-1.5 text-sm">
              <i className="fa-regular fa-calendar-check"></i>
            </div>
            <span className="text-xs font-bold text-slate-800 block">Réservations</span>
            <span className="text-[9px] text-slate-400">Gérer les tables</span>
          </button>
        </div>
      </section>

      {/* Réservations du soir */}
      <section className="px-5 mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Réservations du soir (2)</h3>
          <span className="text-xs font-semibold text-primary cursor-pointer">Tout voir</span>
        </div>

        {/* Resa 1 */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary text-white font-extrabold text-xs flex items-center justify-center">
                TK
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">M. Thomas Kouassi</h4>
                <p className="text-[10px] text-slate-400">Terrasse Jardin • 2 couverts</p>
              </div>
            </div>
            <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-lg">20h00</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-[10px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              Règlement prévu : Wave
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Appel du client : +225 07 88 42 00')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] cursor-pointer"
              >
                <i className="fa-solid fa-phone mr-1"></i> Appeler
              </button>
              <button
                type="button"
                onClick={() => setReservation1Confirmed(!reservation1Confirmed)}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] cursor-pointer transition ${
                  reservation1Confirmed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-primary text-white hover:bg-primary-600 shadow-xs'
                }`}
              >
                {reservation1Confirmed ? '✓ Confirmée' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>

        {/* Resa 2 */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center">
                AD
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Mme Awa Diallo</h4>
                <p className="text-[10px] text-slate-400">Salle climatisée • 4 couverts</p>
              </div>
            </div>
            <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-lg">20h30</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-[10px] font-semibold text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
              Règlement prévu : Orange Money
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              ✓ Confirmée
            </span>
          </div>
        </div>
      </section>

      {/* AI Pro Recommendation Advice */}
      <section className="px-5 mt-5">
        <div className="bg-amber-50 border border-amber-200/80 rounded-3xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
            <i className="fa-solid fa-lightbulb"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-950">Conseil lukaAI Concierge Pro</h4>
            <p className="text-[11px] text-amber-900/90 mt-1 leading-relaxed">
              L'IA préconise de lancer une offre dessert ou cocktail vers 21h30 pour les clients présents à Cocody afin de booster votre ticket moyen de fin de soirée.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
