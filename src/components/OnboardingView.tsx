import React from 'react';
import { Sparkles, ScanLine, Calculator, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import ketAvatarImg from '../assets/images/ket_mascot_avatar_1790683656514.jpg';

interface OnboardingViewProps {
  onStart: () => void;
  onOpenCaseStudy: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onStart, onOpenCaseStudy }) => {
  return (
    <div className="min-h-full flex flex-col justify-between p-5 bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30">
      {/* Top Brand Hero */}
      <div className="text-center pt-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>Case UX/UI por Matheus Lemes</span>
        </div>

        <div className="relative mx-auto w-32 h-32 mb-4">
          <div className="w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-orange-400 to-amber-500">
            <img
              src={ketAvatarImg}
              alt="Ket - Mascote do App"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-neutral-900 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md border-2 border-white">
            Eae! :D
          </div>
        </div>

        <h1 className="text-2xl font-black tracking-tight text-neutral-900 leading-tight">
          Cálculos automáticos <br />
          <span className="text-orange-600">no supermercado</span>
        </h1>

        <p className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-xs mx-auto">
          Um facilitador para quem não fica confortável calculando de cabeça enquanto escolhe os produtos na gôndola.
        </p>
      </div>

      {/* 3 Core Value Pillars from Matheus's Case Study */}
      <div className="space-y-2.5 my-6">
        <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-neutral-100 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <ScanLine className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">Escaner de Código de Barras</h3>
            <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
              Leia o código direto da gôndola ou digite o peso do hortifruti para somar em tempo real.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-neutral-100 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">Controle de Saldo & Teto de Gastos</h3>
            <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
              Defina quanto pretende gastar e o Ket avisa com cores e alertas amigáveis antes de estourar.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-neutral-100 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">Autonomia no Mercado Físico</h3>
            <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
              Você escolhe as melhores frutas e embalagens sem surpresas com a conta final no caixa.
            </p>
          </div>
        </div>
      </div>

      {/* Action Zone */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={onStart}
          className="w-full h-13 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 transition-all"
        >
          <span>Iniciar Minhas Compras</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenCaseStudy}
          className="w-full h-11 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <HeartHandshake className="w-3.5 h-3.5 text-orange-600" />
          <span>Ver Case UX/UI & Pesquisa EBAC</span>
        </button>

        <p className="text-center text-[10px] text-neutral-400 pt-1">
          Baseado na pesquisa DIEESE e personas de consumo brasileiro · Matheus Lemes
        </p>
      </div>
    </div>
  );
};
