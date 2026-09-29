import React, { useState } from 'react';
import { X, Scale, Calculator, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { MascotKet } from './MascotKet';

interface UnitPriceComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnitPriceComparatorModal: React.FC<UnitPriceComparatorModalProps> = ({ isOpen, onClose }) => {
  // Option A
  const [nameA, setNameA] = useState('Opção A (Ex: Embalagem Maior)');
  const [priceA, setPriceA] = useState<string>('24.90');
  const [qtyA, setQtyA] = useState<string>('1600'); // grams or ml
  const [unitA, setUnitA] = useState<'g' | 'ml' | 'un'>('g');

  // Option B
  const [nameB, setNameB] = useState('Opção B (Ex: Embalagem Menor)');
  const [priceB, setPriceB] = useState<string>('13.50');
  const [qtyB, setQtyB] = useState<string>('800'); // grams or ml

  if (!isOpen) return null;

  const numPriceA = parseFloat(priceA.replace(',', '.')) || 0;
  const numQtyA = parseFloat(qtyA.replace(',', '.')) || 1;
  const numPriceB = parseFloat(priceB.replace(',', '.')) || 0;
  const numQtyB = parseFloat(qtyB.replace(',', '.')) || 1;

  // Normalized price per 1000 units (kg or L or 100 units)
  const rateA = numQtyA > 0 ? (numPriceA / numQtyA) * 1000 : 0;
  const rateB = numQtyB > 0 ? (numPriceB / numQtyB) * 1000 : 0;

  const diffPct = rateA > 0 && rateB > 0
    ? Math.abs(((rateA - rateB) / Math.max(rateA, rateB)) * 100).toFixed(1)
    : '0';

  const winner = rateA < rateB ? 'A' : rateB < rateA ? 'B' : 'equal';
  const unitLabel = unitA === 'g' ? 'kg' : unitA === 'ml' ? 'litro' : '100 un';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-orange-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight leading-tight">
                Comparador de Embalagens & Reduflação
              </h3>
              <span className="text-[10px] text-orange-100">
                Descubra qual produto realmente compensa por kg ou litro
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 text-xs">
          {/* Unit selector */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 uppercase">Comparar por:</span>
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setUnitA('g')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  unitA === 'g' ? 'bg-orange-600 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Gramas (g / kg)
              </button>
              <button
                type="button"
                onClick={() => setUnitA('ml')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  unitA === 'ml' ? 'bg-orange-600 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Mililitros (ml / L)
              </button>
            </div>
          </div>

          {/* Cards for Option A and Option B */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Option A */}
            <div className={`p-3 rounded-2xl border transition-all ${winner === 'A' ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-200' : 'bg-neutral-50 border-neutral-200'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-neutral-800 text-[11px]">Opção A</span>
                {winner === 'A' && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-600 text-white">
                    Mais Barato!
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <div>
                  <label className="text-[10px] text-neutral-400 font-bold block">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={priceA}
                    onChange={(e) => setPriceA(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900"
                    placeholder="24.90"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 font-bold block">Peso/Volume ({unitA})</label>
                  <input
                    type="number"
                    step="10"
                    value={qtyA}
                    onChange={(e) => setQtyA(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900"
                    placeholder="1600"
                  />
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-neutral-200/80 text-right">
                <span className="text-[9px] text-neutral-400 block">Custo por {unitLabel}:</span>
                <span className="text-xs font-black text-neutral-900 tabular-nums">
                  R$ {rateA.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Option B */}
            <div className={`p-3 rounded-2xl border transition-all ${winner === 'B' ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-200' : 'bg-neutral-50 border-neutral-200'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-neutral-800 text-[11px]">Opção B</span>
                {winner === 'B' && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-600 text-white">
                    Mais Barato!
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <div>
                  <label className="text-[10px] text-neutral-400 font-bold block">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={priceB}
                    onChange={(e) => setPriceB(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900"
                    placeholder="13.50"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 font-bold block">Peso/Volume ({unitA})</label>
                  <input
                    type="number"
                    step="10"
                    value={qtyB}
                    onChange={(e) => setQtyB(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900"
                    placeholder="800"
                  />
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-neutral-200/80 text-right">
                <span className="text-[9px] text-neutral-400 block">Custo por {unitLabel}:</span>
                <span className="text-xs font-black text-neutral-900 tabular-nums">
                  R$ {rateB.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* Verdict by Ket */}
          <MascotKet
            mood={winner === 'equal' ? 'pensativo' : 'animado'}
            compact
            message={
              winner === 'equal'
                ? 'Ambas as opções têm exatamente o mesmo custo por quantidade!'
                : `A Opção ${winner} é ${diffPct}% mais econômica por ${unitLabel}! Vale a pena levar ela.`
            }
          />

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all text-center"
          >
            Entendi, Voltar para as Compras
          </button>
        </div>
      </div>
    </div>
  );
};
