import React from 'react';
import { KetMood } from '../types';
import ketAvatarImg from '../assets/images/ket_mascot_avatar_1790683656514.jpg';
import ketCelebrationImg from '../assets/images/ket_celebrating_1790683668177.jpg';

interface MascotKetProps {
  mood?: KetMood;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  compact?: boolean;
  className?: string;
}

const MOOD_DATA: Record<KetMood, { label: string; badgeColor: string; defaultMsg: string; emoji: string }> = {
  animado: {
    label: 'Animado',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    defaultMsg: 'Bora economizar! Cada centavo conta na listinha.',
    emoji: '😸',
  },
  cauteloso: {
    label: 'Cauteloso',
    badgeColor: 'text-orange-700 bg-orange-50 border-orange-200',
    defaultMsg: 'Opa, atenção! Seu saldo tá diminuindo rápido.',
    emoji: '😼',
  },
  pensativo: {
    label: 'Pensativo',
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    defaultMsg: 'Será que esse item é mesmo necessário hoje?',
    emoji: '🤔',
  },
  alerta: {
    label: 'Alerta',
    badgeColor: 'text-red-700 bg-red-50 border-red-200',
    defaultMsg: 'Eita! Você está prestes a ultrapassar o orçamento estipulado!',
    emoji: '🙀',
  },
  vitorioso: {
    label: 'Vitorioso',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    defaultMsg: 'Arrasou! Economia garantida sem passar aperto no caixa.',
    emoji: '🎉',
  },
  curioso: {
    label: 'Curioso',
    badgeColor: 'text-neutral-700 bg-neutral-100 border-neutral-200',
    defaultMsg: 'Aponte a câmera pro código de barras para eu somar!',
    emoji: '🐾',
  },
};

export const MascotKet: React.FC<MascotKetProps> = ({
  mood = 'curioso',
  message,
  size = 'md',
  compact = false,
  className = '',
}) => {
  const current = MOOD_DATA[mood];
  const displayMsg = message || current.defaultMsg;
  const isVictory = mood === 'vitorioso';

  if (compact) {
    return (
      <div className={`flex items-center gap-2 p-2 rounded-xl bg-orange-50/80 border border-orange-200/70 text-xs text-neutral-800 ${className}`}>
        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-orange-300 shadow-xs">
          <img
            src={isVictory ? ketCelebrationImg : ketAvatarImg}
            alt="Mascote Ket"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 leading-snug">
          <span className="font-semibold text-orange-900 mr-1">Ket:</span>
          <span>{displayMsg}</span>
        </div>
      </div>
    );
  }

  const imageSizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  }[size];

  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-orange-200/80 shadow-xs ${className}`}>
      <div className="relative shrink-0">
        <div className={`${imageSizeClasses} rounded-2xl overflow-hidden border-2 border-orange-400/80 shadow-sm bg-orange-100`}>
          <img
            src={isVictory ? ketCelebrationImg : ketAvatarImg}
            alt="Mascote Ket o gato urbanista de mercado"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <span
          className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full px-1 shadow-xs border border-orange-200"
          title={current.label}
        >
          {current.emoji}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-neutral-900 tracking-tight">Ket</span>
            <span className="text-[11px] text-neutral-500 font-normal">· seu parceiro de compras</span>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${current.badgeColor}`}>
            {current.label}
          </span>
        </div>
        <p className="text-xs text-neutral-700 leading-relaxed font-normal">
          {displayMsg}
        </p>
      </div>
    </div>
  );
};
