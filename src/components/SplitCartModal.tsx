import React, { useState } from 'react';
import { CartItem, SplitType, UserProfile } from '../types';
import { X, Users, User, Share2, Copy, Check, QrCode } from 'lucide-react';
import { MascotKet } from './MascotKet';

interface SplitCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  profile: UserProfile;
  onUpdateSplitType: (itemId: string, splitType: SplitType) => void;
}

export const SplitCartModal: React.FC<SplitCartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  profile,
  onUpdateSplitType,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Calculate split totals
  let myPortion = 0;
  let roommatePortion = 0;

  cartItems.forEach((item) => {
    const split = item.splitType || 'shared';
    if (split === 'me') {
      myPortion += item.subtotal;
    } else if (split === 'roommate') {
      roommatePortion += item.subtotal;
    } else {
      // 50/50
      myPortion += item.subtotal / 2;
      roommatePortion += item.subtotal / 2;
    }
  });

  const grandTotal = myPortion + roommatePortion;
  const roommateName = profile.roommateName || 'Amigo(a) / Parceiro(a)';

  const handleCopyPix = () => {
    const text = `🛒 Rateio do Supermercado com o Ket:\n\n👤 Minha parte: R$ ${myPortion.toFixed(2).replace('.', ',')}\n👥 Parte de ${roommateName}: R$ ${roommatePortion.toFixed(2).replace('.', ',')}\n💰 Total da compra: R$ ${grandTotal.toFixed(2).replace('.', ',')}\n\n🔑 Chave Pix para acerto: ${profile.pixKey}\n(Calculado sem estresse pelo app Ket!)`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-600/30 border border-orange-500/40 text-orange-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight leading-tight">
                Divisor de Conta do Mercado
              </h3>
              <span className="text-[10px] text-neutral-400">
                Separe o que é seu e o que é rateado
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mascot */}
        <div className="p-3 bg-orange-50/70 border-b border-orange-200">
          <MascotKet
            mood="animado"
            compact
            message={`Toque em cada item para marcar quem paga o quê. Chega de briga pelo queijo na república!`}
          />
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-100 border-b border-neutral-200">
          <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Sua Parte (Eu)</span>
            <div className="text-lg font-black text-orange-600 tabular-nums">
              R$ {myPortion.toFixed(2).replace('.', ',')}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block truncate">
              {roommateName}
            </span>
            <div className="text-lg font-black text-neutral-900 tabular-nums">
              R$ {roommatePortion.toFixed(2).replace('.', ',')}
            </div>
          </div>
        </div>

        {/* Itemized Split Selector */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {cartItems.map((item) => {
            const currentSplit = item.splitType || 'shared';
            return (
              <div
                key={item.id}
                className="p-2.5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <h5 className="text-xs font-bold text-neutral-900 truncate">
                    {item.product.name}
                  </h5>
                  <span className="text-[11px] font-mono font-medium text-neutral-500">
                    R$ {item.subtotal.toFixed(2).replace('.', ',')} ({item.quantity}x)
                  </span>
                </div>

                {/* 3-Way Split Buttons */}
                <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl shrink-0">
                  <button
                    type="button"
                    onClick={() => onUpdateSplitType(item.id, 'me')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      currentSplit === 'me'
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                    title="100% Meu"
                  >
                    Meu
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateSplitType(item.id, 'shared')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      currentSplit === 'shared'
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                    title="50% / 50% Dividido"
                  >
                    50/50
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateSplitType(item.id, 'roommate')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      currentSplit === 'roommate'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                    title={`100% ${roommateName}`}
                  >
                    {roommateName.slice(0, 5)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pix & Share Actions */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-200 space-y-2">
          <button
            onClick={handleCopyPix}
            className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Cobrança Pix Copiada com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Cobrança Pix para {roommateName}</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-800 text-center"
          >
            Concluir Divisão
          </button>
        </div>
      </div>
    </div>
  );
};
