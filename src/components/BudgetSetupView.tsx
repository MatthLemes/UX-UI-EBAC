import React, { useState } from 'react';
import { ArrowRight, Wallet, Check } from 'lucide-react';
import { MascotKet } from './MascotKet';

interface BudgetSetupViewProps {
  initialBudget: number;
  onConfirmBudget: (budget: number) => void;
  onSkip: () => void;
}

const PRESET_AMOUNTS = [100, 150, 200, 250, 350, 500];

export const BudgetSetupView: React.FC<BudgetSetupViewProps> = ({
  initialBudget,
  onConfirmBudget,
  onSkip,
}) => {
  const [budgetVal, setBudgetVal] = useState<string>(
    initialBudget > 0 ? initialBudget.toString() : '200'
  );

  const handlePreset = (amount: number) => {
    setBudgetVal(amount.toString());
  };

  const handleContinue = () => {
    const num = parseFloat(budgetVal.replace(',', '.')) || 0;
    onConfirmBudget(num);
  };

  const currentNum = parseFloat(budgetVal.replace(',', '.')) || 0;

  return (
    <div className="min-h-full flex flex-col justify-between p-5 bg-gradient-to-b from-orange-50/40 via-white to-white">
      <div>
        {/* Mascot Message */}
        <MascotKet
          mood="animado"
          message="Qual é a sua meta de gastos hoje? Vou te ajudar a não gastar um centavo a mais!"
          className="mb-6 shadow-sm"
        />

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Wallet className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
            Insira o valor que você <br />
            pretende gastar hoje
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Você pode alterar esse teto a qualquer momento durante a compra.
          </p>
        </div>

        {/* Big Interactive Currency Input */}
        <div className="bg-neutral-50 border-2 border-orange-300 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 rounded-3xl p-5 text-center shadow-xs transition-all mb-4">
          <label htmlFor="budget-input" className="block text-xs uppercase font-bold text-neutral-400 tracking-wider mb-1">
            Seu Saldo Planejado
          </label>
          <div className="flex items-center justify-center gap-1.5 text-neutral-900">
            <span className="text-xl font-bold text-orange-600">R$</span>
            <input
              id="budget-input"
              type="number"
              step="10"
              min="0"
              value={budgetVal}
              onChange={(e) => setBudgetVal(e.target.value)}
              placeholder="0,00"
              className="text-4xl font-extrabold tracking-tight tabular-nums w-48 text-center bg-transparent outline-none text-neutral-900"
              autoFocus
            />
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            {currentNum > 0 ? `Equivale a aprox. ${(currentNum / 750.74 * 100).toFixed(0)}% da cesta básica DIEESE SP` : 'Digite um valor'}
          </span>
        </div>

        {/* Quick Presets */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2 text-center">
            Valores rápidos mais comuns
          </span>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_AMOUNTS.map((amt) => {
              const isSelected = currentNum === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePreset(amt)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}
                >
                  R$ {amt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="space-y-2 pt-4">
        <button
          onClick={handleContinue}
          className="w-full h-13 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 transition-all"
        >
          <span>Continuar com R$ {currentNum > 0 ? currentNum.toFixed(2).replace('.', ',') : '0,00'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onSkip}
          className="w-full py-2.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors text-center"
        >
          Comprar sem definir saldo prévio
        </button>
      </div>
    </div>
  );
};
