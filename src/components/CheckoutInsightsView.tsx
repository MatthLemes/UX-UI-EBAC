import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CartItem, Market } from '../types';
import { MARKETS } from '../data/mockData';
import ketCelebrationImg from '../assets/images/ket_celebrating_1790683668177.jpg';
import {
  PiggyBank,
  Share2,
  BookmarkCheck,
  History,
  Store,
  PlusCircle,
  TrendingDown,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface CheckoutInsightsViewProps {
  items: CartItem[];
  market: Market;
  total: number;
  budget: number;
  onAddMoreProducts: () => void;
  onViewHistory: () => void;
  onViewMarkets: () => void;
  onSaveList: () => void;
  onOpenReceiptAudit?: () => void;
}

export const CheckoutInsightsView: React.FC<CheckoutInsightsViewProps> = ({
  items,
  market,
  total,
  budget,
  onAddMoreProducts,
  onViewHistory,
  onViewMarkets,
  onSaveList,
  onOpenReceiptAudit,
}) => {
  // Calculate savings compared to max price or average Brazilian market benchmark
  const calculatedSavings = items.reduce((acc, item) => {
    // Difference between highest price across markets and current market price
    const prices = Object.values(item.product.marketPrices);
    const maxPrice = Math.max(...prices, item.product.defaultPrice * 1.15);
    return acc + Math.max(0, (maxPrice - item.unitPrice) * item.quantity);
  }, 0);

  const displaySavings = Math.max(14.8, calculatedSavings);

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF7A00', '#10B981', '#3B82F6', '#F59E0B'],
      });
    } catch {
      // ignore
    }
  }, []);

  // Comparison with other Brazilian markets for the exact same basket
  const otherMarketComparisons = MARKETS.filter((m) => m.id !== market.id).map((other) => {
    const otherTotal = items.reduce((sum, item) => {
      const p = item.product.marketPrices[other.id] || item.product.defaultPrice;
      return sum + p * item.quantity;
    }, 0);
    const diff = otherTotal - total;
    return {
      market: other,
      total: otherTotal,
      diff,
    };
  });

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-orange-50/70 via-white to-white overflow-y-auto p-4 select-none">
      {/* Top Victory Header (Screen 08 in Matheus Lemes) */}
      <div className="text-center pt-2 pb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2 shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Compra Finalizada com Sucesso!
        </span>

        <h2 className="text-sm uppercase font-bold text-neutral-500 tracking-wider">
          Você Economizou:
        </h2>
        <div className="text-3xl font-black text-emerald-600 tracking-tight tabular-nums mt-0.5">
          R$ {displaySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} !!
        </div>

        {/* Mascot Ket Celebrating with Piggy Bank Image */}
        <div className="relative mx-auto w-36 h-36 my-3">
          <div className="w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-orange-100">
            <img
              src={ketCelebrationImg}
              alt="Ket comemorando com cofrinho"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-2 right-2 bg-orange-600 text-white p-2 rounded-2xl shadow-md border-2 border-white">
            <PiggyBank className="w-5 h-5" />
          </div>
        </div>

        {/* Quote from Matheus Lemes' Screen 08 */}
        <div className="bg-white rounded-2xl p-3.5 border border-orange-200 shadow-xs max-w-xs mx-auto text-center">
          <p className="text-xs text-neutral-800 font-semibold leading-relaxed">
            Mês passado você gastou <span className="text-orange-600 font-bold">R$ 400,00</span> com produtos similares na mesma região!
          </p>
          <span className="text-[11px] text-neutral-500 mt-1 block">
            Hoje seu total foi de <strong className="text-neutral-900">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> ({items.length} itens).
          </span>
        </div>
      </div>

      {/* Benchmark: Quanto você pagaria em outros mercados? */}
      <div className="bg-white rounded-2xl p-3.5 border border-neutral-200/90 shadow-xs mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-orange-600" />
            <h3 className="text-xs font-bold text-neutral-900">Comparativo no seu bairro</h3>
          </div>
          <span className="text-[10px] text-neutral-400">Mesma cesta</span>
        </div>

        <div className="space-y-2">
          {otherMarketComparisons.slice(0, 3).map((comp) => {
            const isCheaper = comp.diff < 0;
            return (
              <div
                key={comp.market.id}
                className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 text-xs border border-neutral-100"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: comp.market.logoBg }}
                  />
                  <span className="font-semibold text-neutral-800 truncate max-w-[120px]">
                    {comp.market.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-neutral-600 tabular-nums">
                    R$ {comp.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isCheaper
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {isCheaper ? `-${Math.abs(comp.diff).toFixed(2)}` : `+${comp.diff.toFixed(2)}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid of Action Buttons from Matheus Lemes' Screen 08 */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <button
          onClick={onSaveList}
          className="p-3.5 rounded-2xl bg-white border border-neutral-200 hover:border-orange-300 hover:bg-orange-50/40 text-neutral-800 flex flex-col items-center justify-center gap-1.5 text-center shadow-xs transition-all"
        >
          <BookmarkCheck className="w-5 h-5 text-orange-600" />
          <span className="text-xs font-bold leading-tight">Salvar listinha de compras</span>
        </button>

        <button
          onClick={onViewHistory}
          className="p-3.5 rounded-2xl bg-white border border-neutral-200 hover:border-orange-300 hover:bg-orange-50/40 text-neutral-800 flex flex-col items-center justify-center gap-1.5 text-center shadow-xs transition-all"
        >
          <History className="w-5 h-5 text-orange-600" />
          <span className="text-xs font-bold leading-tight">Histórico de gastos</span>
        </button>

        <button
          onClick={onAddMoreProducts}
          className="p-3.5 rounded-2xl bg-white border border-neutral-200 hover:border-orange-300 hover:bg-orange-50/40 text-neutral-800 flex flex-col items-center justify-center gap-1.5 text-center shadow-xs transition-all"
        >
          <PlusCircle className="w-5 h-5 text-orange-600" />
          <span className="text-xs font-bold leading-tight">Adicionar mais produtos</span>
        </button>

        <button
          onClick={onViewMarkets}
          className="p-3.5 rounded-2xl bg-white border border-neutral-200 hover:border-orange-300 hover:bg-orange-50/40 text-neutral-800 flex flex-col items-center justify-center gap-1.5 text-center shadow-xs transition-all"
        >
          <Store className="w-5 h-5 text-orange-600" />
          <span className="text-xs font-bold leading-tight">Pesquisar mercados</span>
        </button>
      </div>

      {/* NFC-e Receipt Audit Banner */}
      {onOpenReceiptAudit && (
        <button
          type="button"
          onClick={onOpenReceiptAudit}
          className="w-full p-3 rounded-2xl bg-orange-50 border border-orange-300 hover:bg-orange-100/70 text-orange-950 flex items-center justify-between gap-2 shadow-xs transition-all mb-3 text-left"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-orange-600 text-white shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-extrabold text-orange-900 leading-tight">
                Auditar Cupom Fiscal do Caixa (NFC-e)
              </h4>
              <p className="text-[11px] text-orange-800 mt-0.5">
                Escaneie o QR Code para checar se o caixa cobrou o preço certo da gôndola.
              </p>
            </div>
          </div>
          <span className="text-xs font-black text-orange-600 shrink-0">
            Auditar →
          </span>
        </button>
      )}

      {/* Share / WhatsApp Receipt */}
      <button
        onClick={() => {
          const text = `🛒 Minha compra no ${market.name} com o app Ket:\n${items
            .map((i) => `• ${i.product.name} (${i.quantity}x): R$ ${i.subtotal.toFixed(2)}`)
            .join('\n')}\n\n💰 Total: R$ ${total.toFixed(2)}\n🎉 Economia estimada: R$ ${displaySavings.toFixed(2)}`;
          navigator.clipboard?.writeText(text);
          alert('Resumo da compra copiado para a área de transferência! Cole no WhatsApp.');
        }}
        className="w-full py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all mb-2"
      >
        <Share2 className="w-4 h-4 text-orange-400" />
        <span>Compartilhar Comprovante no WhatsApp</span>
      </button>
    </div>
  );
};
