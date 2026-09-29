import React, { useState } from 'react';
import { PlannedItem, CartItem } from '../types';
import { Check, Plus, Trash2, CheckSquare, Square, ShoppingCart, Sparkles, X } from 'lucide-react';
import { MascotKet } from './MascotKet';

interface PlannedListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  plannedItems: PlannedItem[];
  cartItems: CartItem[];
  onAddPlannedItem: (name: string) => void;
  onTogglePlannedItem: (id: string) => void;
  onRemovePlannedItem: (id: string) => void;
}

export const PlannedListDrawer: React.FC<PlannedListDrawerProps> = ({
  isOpen,
  onClose,
  plannedItems,
  cartItems,
  onAddPlannedItem,
  onTogglePlannedItem,
  onRemovePlannedItem,
}) => {
  const [newItemName, setNewItemName] = useState('');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    onAddPlannedItem(newItemName.trim());
    setNewItemName('');
  };

  const checkedCount = plannedItems.filter((i) => i.checked).length;
  const totalPlanned = plannedItems.length;

  // Detect impulse buys (items in cart that don't match any planned items)
  const impulseItems = cartItems.filter((cart) => {
    const cartName = cart.product.name.toLowerCase();
    return !plannedItems.some((p) =>
      cartName.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(cart.product.category)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-orange-500" />
            <div>
              <h3 className="text-sm font-black tracking-tight">Lista de Casa (Planejamento)</h3>
              <span className="text-[10px] text-neutral-400">
                {checkedCount} de {totalPlanned} itens já no carrinho
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mascot Tip */}
        <div className="p-3 bg-orange-50/70 border-b border-orange-200">
          <MascotKet
            mood={impulseItems.length > 2 ? 'cauteloso' : 'animado'}
            compact
            message={
              impulseItems.length > 0
                ? `Você adicionou ${impulseItems.length} item(ns) fora da sua lista original. Fique atento para não extrapolar o saldo!`
                : 'Maravilha! Você está seguindo a risca a listinha planejada em casa.'
            }
          />
        </div>

        {/* Quick Add Form */}
        <form onSubmit={handleAdd} className="p-3 border-b border-neutral-200 flex gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Ex: Arroz, Café, Sabonete..."
            className="flex-1 px-3 py-2 bg-neutral-100 border border-neutral-300 rounded-xl text-xs text-neutral-900 focus:bg-white focus:border-orange-500 outline-none"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar</span>
          </button>
        </form>

        {/* List of planned items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {plannedItems.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs">Sua lista planejada está vazia.</p>
              <p className="text-[11px] mt-0.5">Adicione o que você precisa comprar antes de ir aos corredores!</p>
            </div>
          ) : (
            plannedItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                  item.checked
                    ? 'bg-neutral-50 border-neutral-200 opacity-60'
                    : 'bg-white border-neutral-200 hover:border-orange-200 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onTogglePlannedItem(item.id)}
                  className="flex items-center gap-2.5 flex-1 text-left min-w-0"
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                      item.checked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-neutral-300 bg-white hover:border-orange-400'
                    }`}
                  >
                    {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span
                    className={`text-xs font-semibold truncate ${
                      item.checked ? 'line-through text-neutral-400' : 'text-neutral-800'
                    }`}
                  >
                    {item.name}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onRemovePlannedItem(item.id)}
                  className="p-1 text-neutral-400 hover:text-red-500 rounded-lg"
                  aria-label={`Remover ${item.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}

          {/* Impulse items section */}
          {impulseItems.length > 0 && (
            <div className="mt-4 pt-3 border-t border-dashed border-neutral-200">
              <span className="text-[10px] font-bold uppercase text-amber-700 block mb-1">
                Itens fora da lista (compras por impulso):
              </span>
              <div className="space-y-1">
                {impulseItems.map((imp) => (
                  <div key={imp.id} className="text-[11px] text-neutral-600 flex justify-between bg-amber-50/60 px-2.5 py-1 rounded-lg">
                    <span>{imp.product.name}</span>
                    <span className="font-mono font-semibold">R$ {imp.subtotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-md transition-all text-center"
          >
            Continuar Escaneando
          </button>
        </div>
      </div>
    </div>
  );
};
