import React from 'react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/mockData';
import { X, Sparkles, ArrowRight, ArrowLeftRight, Check, TrendingDown } from 'lucide-react';
import { MascotKet } from './MascotKet';

interface SmartSwapsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onApplySwap: (oldItemId: string, newProduct: Product, newPrice: number) => void;
}

interface SwapOpportunity {
  cartItem: CartItem;
  alternativeProduct: Product;
  alternativePrice: number;
  savings: number;
  reason: string;
}

export const SmartSwapsModal: React.FC<SmartSwapsModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onApplySwap,
}) => {
  if (!isOpen) return null;

  // Detect potential swaps in current cart
  const swapOpportunities: SwapOpportunity[] = [];

  cartItems.forEach((item) => {
    if (item.product.id === 'cafe-especial') {
      // Alternative: Café Tradicional ou Granel com 25% de desconto
      const alt = PRODUCTS.find((p) => p.id === 'cafe-especial')!;
      const altPrice = 14.90;
      const savings = (item.unitPrice - altPrice) * item.quantity;
      if (savings > 0) {
        swapOpportunities.push({
          cartItem: item,
          alternativeProduct: {
            ...alt,
            id: 'cafe-melitta-promo',
            name: 'Café Tradicional Vácuo 500g (Oferta Relâmpago)',
            brand: 'Melitta',
          },
          alternativePrice: altPrice,
          savings,
          reason: 'Marca similar com torra média em oferta no mesmo corredor.',
        });
      }
    } else if (item.product.id === 'nescau-cereal') {
      const altPrice = 7.99;
      const savings = (item.unitPrice - altPrice) * item.quantity;
      swapOpportunities.push({
        cartItem: item,
        alternativeProduct: {
          ...item.product,
          id: 'cereal-integral-economico',
          name: 'Cereal Matinal de Milho Crocante 300g',
          brand: 'Sucrilhos Kelloggs',
        },
        alternativePrice: altPrice,
        savings,
        reason: 'Pacote 42% mais em conta por 100g.',
      });
    } else if (item.product.id === 'mini-protetor-solar') {
      const altPrice = 18.90;
      const savings = (item.unitPrice - altPrice) * item.quantity;
      swapOpportunities.push({
        cartItem: item,
        alternativeProduct: {
          ...item.product,
          id: 'protetor-sundown-promo',
          name: 'Protetor Solar Facial Toque Seco 50ml',
          brand: 'Sundown',
        },
        alternativePrice: altPrice,
        savings,
        reason: 'Mesmo fator de proteção FPS 50 com desconto de gôndola.',
      });
    }
  });

  const totalPotentialSavings = swapOpportunities.reduce((acc, s) => acc + s.savings, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-200" />
            <div>
              <h3 className="text-sm font-black tracking-tight leading-tight">
                Trocas Inteligentes do Ket (Smart Swaps)
              </h3>
              <span className="text-[10px] text-orange-100">
                Substituições para economizar sem perder qualidade
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mascot Advice */}
        <div className="p-3 bg-orange-50/70 border-b border-orange-200">
          <MascotKet
            mood="animado"
            compact
            message={
              swapOpportunities.length > 0
                ? `Encontrei ${swapOpportunities.length} trocas no seu carrinho que podem salvar R$ ${totalPotentialSavings.toFixed(2).replace('.', ',')} no caixa!`
                : 'Seu carrinho já está com ótimas escolhas de melhor custo-benefício!'
            }
          />
        </div>

        {/* Swaps List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {swapOpportunities.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              <Check className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <p className="text-xs font-bold text-neutral-800">Nenhuma troca necessária!</p>
              <p className="text-[11px] mt-0.5">Seus itens atuais já têm o menor preço por unidade disponível no mercado.</p>
            </div>
          ) : (
            swapOpportunities.map((op, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-xs flex flex-col gap-2.5"
              >
                {/* Comparison header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-neutral-700">
                    <ArrowLeftRight className="w-4 h-4 text-orange-600" />
                    <span>Sugestão de Troca:</span>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Economiza R$ {op.savings.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {/* Current Item vs Suggested Item */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Current */}
                  <div className="p-2.5 rounded-xl bg-white border border-neutral-200">
                    <span className="text-[9px] font-bold uppercase text-neutral-400 block mb-0.5">
                      No seu carrinho:
                    </span>
                    <h5 className="font-bold text-neutral-800 text-[11px] leading-tight truncate">
                      {op.cartItem.product.name}
                    </h5>
                    <span className="font-mono text-xs font-semibold text-neutral-600 block mt-1">
                      R$ {op.cartItem.unitPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {/* Alternative */}
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-300">
                    <span className="text-[9px] font-bold uppercase text-emerald-700 block mb-0.5">
                      Alternativa Ket:
                    </span>
                    <h5 className="font-bold text-neutral-900 text-[11px] leading-tight truncate">
                      {op.alternativeProduct.name}
                    </h5>
                    <span className="font-mono text-xs font-black text-emerald-700 block mt-1">
                      R$ {op.alternativePrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-neutral-500 italic">
                  💡 {op.reason}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    onApplySwap(op.cartItem.id, op.alternativeProduct, op.alternativePrice);
                  }}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Trocar e Salvar R$ {op.savings.toFixed(2).replace('.', ',')}</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-md transition-all text-center"
          >
            Manter Minha Lista Atual
          </button>
        </div>
      </div>
    </div>
  );
};
