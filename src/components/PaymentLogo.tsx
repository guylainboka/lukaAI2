import React from 'react';

export type PaymentMethodId =
  | 'wave'
  | 'orange'
  | 'mtn'
  | 'moov'
  | 'airtel'
  | 'mpesa'
  | 'visa'
  | 'mastercard'
  | 'paypal';

export interface PaymentMethodData {
  id: PaymentMethodId;
  name: string;
  category: 'mobile_money' | 'card' | 'wallet';
  shortName: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  badgeDesc: string;
}

export const PAYMENT_METHODS: Record<PaymentMethodId, PaymentMethodData> = {
  wave: {
    id: 'wave',
    name: 'Wave',
    category: 'mobile_money',
    shortName: 'Wave',
    bgColor: 'bg-[#1DC3F4]',
    textColor: 'text-white',
    borderColor: 'border-[#17a8d4]',
    badgeDesc: 'QR Code & Scan sur place',
  },
  orange: {
    id: 'orange',
    name: 'Orange Money',
    category: 'mobile_money',
    shortName: 'Orange',
    bgColor: 'bg-black',
    textColor: 'text-white',
    borderColor: 'border-orange-500/40',
    badgeDesc: 'Code marchand & QR',
  },
  mtn: {
    id: 'mtn',
    name: 'MTN MoMo',
    category: 'mobile_money',
    shortName: 'MTN',
    bgColor: 'bg-[#FFCC00]',
    textColor: 'text-black',
    borderColor: 'border-amber-400',
    badgeDesc: 'Mobile Money direct',
  },
  moov: {
    id: 'moov',
    name: 'Moov Africa',
    category: 'mobile_money',
    shortName: 'Moov',
    bgColor: 'bg-[#005CA9]',
    textColor: 'text-white',
    borderColor: 'border-blue-700',
    badgeDesc: 'Moov Money sur place',
  },
  airtel: {
    id: 'airtel',
    name: 'Airtel Money',
    category: 'mobile_money',
    shortName: 'Airtel',
    bgColor: 'bg-[#E31B23]',
    textColor: 'text-white',
    borderColor: 'border-red-600',
    badgeDesc: 'Paiement sans contact',
  },
  mpesa: {
    id: 'mpesa',
    name: 'M-Pesa',
    category: 'mobile_money',
    shortName: 'M-Pesa',
    bgColor: 'bg-[#E11A27]',
    textColor: 'text-white',
    borderColor: 'border-red-700',
    badgeDesc: 'Paiement M-Pesa sur place',
  },
  visa: {
    id: 'visa',
    name: 'Carte Visa',
    category: 'card',
    shortName: 'Visa',
    bgColor: 'bg-[#1A1F71]',
    textColor: 'text-white',
    borderColor: 'border-blue-900',
    badgeDesc: 'TPE Carte Bancaire',
  },
  mastercard: {
    id: 'mastercard',
    name: 'Mastercard',
    category: 'card',
    shortName: 'Mastercard',
    bgColor: 'bg-white',
    textColor: 'text-slate-900',
    borderColor: 'border-slate-200',
    badgeDesc: 'TPE Carte Bancaire',
  },
  paypal: {
    id: 'paypal',
    name: 'PayPal',
    category: 'wallet',
    shortName: 'PayPal',
    bgColor: 'bg-[#003087]',
    textColor: 'text-white',
    borderColor: 'border-blue-800',
    badgeDesc: 'Compte bancaire / QR',
  },
};

interface LogoProps {
  id: PaymentMethodId;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const PaymentLogo: React.FC<LogoProps> = ({ id, size = 'md', showLabel = false }) => {
  const method = PAYMENT_METHODS[id];
  if (!method) return null;

  const sizeClasses = {
    xs: 'h-4 w-auto text-[9px]',
    sm: 'h-5 w-auto text-[10px]',
    md: 'h-7 w-auto text-xs',
    lg: 'h-9 w-auto text-sm',
  };

  const renderVectorIcon = () => {
    switch (id) {
      case 'visa':
        return (
          <div className="flex items-center font-black tracking-tight italic font-sans">
            <span className="text-amber-400 -mr-0.5">V</span>
            <span className="text-[#1A1F71] font-extrabold tracking-wider">ISA</span>
          </div>
        );

      case 'mastercard':
        return (
          <div className="flex items-center relative w-6 h-4">
            <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] absolute left-0"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]/90 absolute left-2.5"></div>
          </div>
        );

      case 'paypal':
        return (
          <div className="flex items-center gap-0.5">
            <span className="font-extrabold text-[#003087] italic text-xs">Pay</span>
            <span className="font-extrabold text-[#0079C1] italic text-xs">Pal</span>
          </div>
        );

      case 'wave':
        return (
          <div className="flex items-center gap-1">
            {/* Cute Wave Penguin glyph */}
            <div className="w-4 h-4 rounded-full bg-[#1DC3F4] text-white flex items-center justify-center font-bold text-[10px]">
              🐧
            </div>
            <span className="font-bold text-[#1DC3F4] tracking-tight">wave</span>
          </div>
        );

      case 'orange':
        return (
          <div className="flex items-center gap-1 bg-black px-1.5 py-0.5 rounded">
            <div className="flex items-center text-[10px] font-black">
              <span className="text-white">↗</span>
              <span className="text-[#FF7900]">↘</span>
            </div>
            <span className="text-[10px] font-bold text-white tracking-tighter leading-none">
              orange
            </span>
          </div>
        );

      case 'mtn':
        return (
          <div className="bg-[#FFCC00] px-1.5 py-0.5 rounded-full border border-black/20 flex items-center justify-center">
            <span className="font-black text-black text-[9px] tracking-tight">MTN</span>
          </div>
        );

      case 'moov':
        return (
          <div className="flex items-center gap-1 bg-[#005CA9] px-1.5 py-0.5 rounded">
            <span className="text-white font-bold text-[9px] tracking-tight">Moov</span>
            <span className="text-orange-400 font-semibold text-[9px]">Africa</span>
          </div>
        );

      case 'airtel':
        return (
          <div className="bg-[#E31B23] px-1.5 py-0.5 rounded flex items-center gap-1">
            <span className="text-white font-bold text-[9px]">airtel</span>
          </div>
        );

      case 'mpesa':
        return (
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded bg-[#E11A27] text-white flex items-center justify-center text-[8px] font-bold">
              📱
            </div>
            <span className="text-[#E11A27] font-extrabold text-[10px] tracking-tight">m-pesa</span>
          </div>
        );

      default:
        return <span>{method.shortName}</span>;
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border shadow-2xs font-medium bg-white border-slate-200 ${sizeClasses[size]}`}
      title={`${method.name} - ${method.badgeDesc}`}
    >
      {renderVectorIcon()}
      {showLabel && <span className="text-slate-700 font-semibold">{method.shortName}</span>}
    </div>
  );
};

interface BadgeProps {
  id: PaymentMethodId;
  selected?: boolean;
  onClick?: () => void;
  count?: number;
}

export const PaymentFilterPill: React.FC<BadgeProps> = ({
  id,
  selected = false,
  onClick,
  count,
}) => {
  const method = PAYMENT_METHODS[id];
  if (!method) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer select-none active:scale-95 border ${
        selected
          ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-primary/40'
          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
      }`}
    >
      <PaymentLogo id={id} size="xs" />
      <span>{method.shortName}</span>
      {count !== undefined && (
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
            selected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};
