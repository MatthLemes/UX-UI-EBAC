import React from 'react';
import { Market } from '../types';
import { ShoppingBag, Store, HelpCircle, ArrowLeft } from 'lucide-react';

interface HeaderHUDProps {
  total: number;
  budget: number;
  market: Market | null;
  itemCount: number;
  onOpenCart?: () => void;
  onOpenMarketSelect?: () => void;
  onOpenCaseStudy?: () => void;
  onBack?: () => void;
  showBack?: boolean;
  currentScreenTitle?: string;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  total,
  budget,
  market,
  itemCount,
  onOpenCart,
  onOpenMarketSelect,
  onOpenCaseStudy,
  onBack,
  showBack = false,
  currentScreenTitle,
}) => {
  const remaining = budget > 0 ? budget - total : 0;
  const percentUsed = budget > 0 ? (total / budget) * 100 : 0;

  // Visual status based on Nielsen Heuristics feedback defined in Matheus Lemes' research
  let statusColor = 'bg-emerald-500';
  let balanceTextClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (percentUsed >= 100) {
    statusColor = 'bg-red-500';
    balanceTextClass = 'text-red-700 bg-red-50 border-red-200';
  } else if (percentUsed >= 80) {
    statusColor = 'bg-amber-500';
    balanceTextClass = 'text-amber-700 bg-amber-50 border-amber-200';
  }

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-4 py-2.5 shadow-xs">
      {/* Top micro bar */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              aria-label="Voltar"
              className="p-1.5 -ml-1 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-orange-600">KET</span>
              <span className="text-[11px] font-medium text-neutral-400">· Smart Market</span>
            </div>
          )}

          {currentScreenTitle && (
            <span className="text-xs font-semibold text-neutral-700 truncate pl-1 border-l border-neutral-200">
              {currentScreenTitle}
            </span>
          )}

          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Offline Ativo</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {market && onOpenMarketSelect && (
            <button
              onClick={onOpenMarketSelect}
              className="flex items-center gap-1 text-[11px] font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 px-2 py-1 rounded-md transition-colors"
              title="Trocar mercado"
            >
              <Store className="w-3.5 h-3.5 text-orange-600" />
              <span className="max-w-[85px] truncate">{market.name}</span>
            </button>
          )}

          {onOpenCaseStudy && (
            <button
              onClick={onOpenCaseStudy}
              aria-label="Ver case de UX e pesquisa EBAC"
              className="flex items-center gap-1 text-[11px] font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 px-2 py-1 rounded-md transition-colors border border-orange-200/60"
              title="Estudo de Caso UX/UI de Matheus Lemes"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Case UX</span>
            </button>
          )}

          {onOpenCart && (
            <button
              onClick={onOpenCart}
              aria-label={`Ver lista com ${itemCount} itens`}
              className="relative p-1.5 text-neutral-700 hover:text-orange-600 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Prominent High-Contrast Financial HUD (Solves Usability Test issue: Ícaro finding total) */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        {/* Total do Carrinho */}
        <div className="bg-neutral-900 text-white rounded-xl p-2.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] uppercase font-semibold tracking-wider text-neutral-400">
            <span>Total Carrinho</span>
            <span>{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xs text-orange-400 font-semibold">R$</span>
            <span className="text-xl font-extrabold tabular-nums tracking-tight leading-none text-white">
              {formatBRL(total)}
            </span>
          </div>
        </div>

        {/* Saldo / Orçamento Definido */}
        <div className={`rounded-xl p-2.5 border shadow-xs flex flex-col justify-between ${balanceTextClass}`}>
          <div className="flex items-center justify-between text-[10px] uppercase font-semibold tracking-wider opacity-80">
            <span>{budget > 0 ? (remaining < 0 ? 'Excedeu Teto' : 'Saldo Restante') : 'Sem Teto'}</span>
            {budget > 0 && (
              <span className="font-mono text-[10px]">
                {Math.round(percentUsed)}%
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xs font-semibold">R$</span>
            <span className="text-xl font-extrabold tabular-nums tracking-tight leading-none">
              {budget > 0 ? (remaining < 0 ? `-${formatBRL(Math.abs(remaining))}` : formatBRL(remaining)) : '---'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar visual indicating budget consumption */}
      {budget > 0 && (
        <div className="w-full bg-neutral-100 rounded-full h-1 mt-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${statusColor}`}
            style={{ width: `${Math.min(100, Math.max(0, percentUsed))}%` }}
          />
        </div>
      )}
    </header>
  );
};
