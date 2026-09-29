import React from 'react';
import { CartItem, Market } from '../types';
import { Trash2, Plus, Minus, ScanLine, ArrowRight, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';
import { MascotKet } from './MascotKet';

interface CartListViewProps {
  items: CartItem[];
  market: Market;
  total: number;
  budget: number;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onReturnToScanner: () => void;
  onProceedToCheckout: () => void;
  onOpenSplitCart?: () => void;
  onOpenSmartSwaps?: () => void;
}

export const CartListView: React.FC<CartListViewProps> = ({
  items,
  market,
  total,
  budget,
  onUpdateQuantity,
  onRemoveItem,
  onReturnToScanner,
  onProceedToCheckout,
  onOpenSplitCart,
  onOpenSmartSwaps,
}) => {
  const remaining = budget > 0 ? budget - total : 0;
  const isOverBudget = budget > 0 && remaining < 0;

  // Calculate essential vs non-essential breakdown from Matheus's storytelling:
  // "Are these items really necessary?"
  const essentialTotal = items
    .filter((i) => i.product.isEssential)
    .reduce((sum, i) => sum + i.subtotal, 0);
  const superfluousTotal = total - essentialTotal;

  let mascotMood = 'animado';
  let mascotMessage = 'Sua lista está bem organizada! Veja os itens abaixo.';

  if (isOverBudget) {
    mascotMood = 'alerta';
    mascotMessage = `Atenção: você ultrapassou seu orçamento por R$ ${Math.abs(remaining).toFixed(2).replace('.', ',')}. Dica: considere remover os itens não essenciais destacados!`;
  } else if (remaining < budget * 0.2 && budget > 0) {
    mascotMood = 'cauteloso';
    mascotMessage = 'Cuidado! Resta menos de 20% do saldo pretendido. Mantenha o foco no essencial.';
  }

  return (
    <div className="flex flex-col h-full bg-neutral-50 text-neutral-900">
      {/* Mascot Insight Message */}
      <div className="p-3 bg-white border-b border-neutral-200">
        <MascotKet mood={mascotMood as any} message={mascotMessage} compact />
      </div>

      {/* Spending Breakdown Pill / Mindful Shopping Bar & Smart Actions */}
      {items.length > 0 && (
        <div className="bg-neutral-100 border-b border-neutral-200 px-4 py-2 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-700">Composição:</span>
              <span className="text-emerald-700 font-medium">
                Básicos: R$ {essentialTotal.toFixed(2).replace('.', ',')}
              </span>
              {superfluousTotal > 0 && (
                <>
                  <span className="text-neutral-300">·</span>
                  <span className="text-amber-700 font-medium">
                    Extras: R$ {superfluousTotal.toFixed(2).replace('.', ',')}
                  </span>
                </>
              )}
            </div>
            <span className="text-neutral-400 font-mono text-[11px]">
              {items.length} {items.length === 1 ? 'item' : 'itens'}
            </span>
          </div>

          {/* Quick Action Badges: Split Cart & Smart Swaps */}
          <div className="flex items-center gap-2 pt-1">
            {onOpenSplitCart && (
              <button
                type="button"
                onClick={onOpenSplitCart}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-neutral-300 text-neutral-700 hover:border-orange-400 hover:text-orange-600 text-[11px] font-bold shadow-2xs transition-all"
              >
                <span>👥 Dividir Conta (Rateio Pix)</span>
              </button>
            )}

            {onOpenSmartSwaps && (
              <button
                type="button"
                onClick={onOpenSmartSwaps}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-100/80 border border-orange-200 text-orange-800 hover:bg-orange-200 text-[11px] font-bold shadow-2xs transition-all"
              >
                <Sparkles className="w-3 h-3 text-orange-600" />
                <span>Trocas do Ket</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Items Scrollable List (Screen 06 in Matheus Lemes) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {items.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl border border-dashed border-neutral-300">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">Carrinho Vazio</h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs">
              Você ainda não escaneou nenhum produto. Volte para o leitor de código de barras para começar!
            </p>
            <button
              onClick={onReturnToScanner}
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20"
            >
              Abrir Escâner
            </button>
          </div>
        ) : (
          items.map((item) => {
            const isKg = item.product.unitType === 'kg';
            return (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-2xl border border-neutral-200/90 shadow-xs flex items-center justify-between gap-3 hover:border-orange-200 transition-all"
              >
                {/* Product info */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl p-1.5 rounded-xl bg-neutral-100 shrink-0">
                    {item.product.imageEmoji}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-neutral-900 truncate">
                        {item.product.name}
                      </h4>
                      {!item.product.isEssential && (
                        <span className="text-[9px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200 shrink-0">
                          extra
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      R$ {item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      {isKg ? '/kg' : ' un'} · {item.product.brand}
                    </p>
                  </div>
                </div>

                {/* Subtotal & Controls */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-neutral-900 tabular-nums block">
                      R$ {item.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {isKg ? `${item.quantity.toFixed(3)}kg` : `${item.quantity}x`}
                    </span>
                  </div>

                  {/* Quantity adjustments */}
                  <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
                    <button
                      onClick={() => {
                        if (isKg) {
                          onUpdateQuantity(item.id, Math.max(0.1, item.quantity - 0.2));
                        } else if (item.quantity > 1) {
                          onUpdateQuantity(item.id, item.quantity - 1);
                        } else {
                          onRemoveItem(item.id);
                        }
                      }}
                      aria-label="Diminuir quantidade"
                      className="w-6 h-6 rounded-lg bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-200 active:scale-90 transition-all text-xs font-bold shadow-2xs"
                    >
                      {item.quantity === 1 && !isKg ? (
                        <Trash2 className="w-3 h-3 text-red-500" />
                      ) : (
                        <Minus className="w-3 h-3" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (isKg) {
                          onUpdateQuantity(item.id, item.quantity + 0.2);
                        } else {
                          onUpdateQuantity(item.id, item.quantity + 1);
                        }
                      }}
                      aria-label="Aumentar quantidade"
                      className="w-6 h-6 rounded-lg bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-200 active:scale-90 transition-all text-xs font-bold shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Sticky Bottom Actions Bar (Screen 06 from Matheus Lemes) */}
      <div className="p-4 bg-white border-t border-neutral-200 shadow-xl space-y-3">
        {/* Subtotal & Budget Recap */}
        <div className="flex items-center justify-between px-1">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
              {budget > 0 ? (isOverBudget ? 'Limite Ultrapassado' : 'Saldo Restante') : 'Preço Total'}
            </span>
            <span
              className={`text-lg font-black tabular-nums ${
                isOverBudget ? 'text-red-600' : 'text-emerald-700'
              }`}
            >
              {budget > 0
                ? isOverBudget
                  ? `- R$ ${Math.abs(remaining).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                  : `R$ ${remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                : `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
              Total Carrinho
            </span>
            <span className="text-lg font-black text-neutral-900 tabular-nums">
              R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* 2 Bottom Buttons (Finalizar + Voltar a Escanear) */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onReturnToScanner}
            className="h-12 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
          >
            <ScanLine className="w-4 h-4 text-orange-600" />
            <span>Voltar a Escanear</span>
          </button>

          <button
            onClick={onProceedToCheckout}
            disabled={items.length === 0}
            className={`h-12 rounded-2xl text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all ${
              items.length > 0
                ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/30'
                : 'bg-neutral-400 cursor-not-allowed'
            }`}
          >
            <span>Finalizar Compra</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
