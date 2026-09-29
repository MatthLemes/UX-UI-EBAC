import React, { useState } from 'react';
import { Market } from '../types';
import { MARKETS } from '../data/mockData';
import { MapPin, Search, Check, Sparkles, Navigation, ArrowRight } from 'lucide-react';
import { MascotKet } from './MascotKet';

interface MarketSelectViewProps {
  currentMarket: Market;
  onSelectMarket: (market: Market) => void;
  onProceedToScanner: () => void;
}

export const MarketSelectView: React.FC<MarketSelectViewProps> = ({
  currentMarket,
  onSelectMarket,
  onProceedToScanner,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMarkets = MARKETS.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.chain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-full flex flex-col justify-between p-4 bg-gradient-to-b from-orange-50/30 via-white to-white">
      <div>
        <MascotKet
          mood="curioso"
          message={`Identifiquei que você está perto do ${currentMarket.name}! É aqui mesmo que vamos às compras?`}
          className="mb-4"
        />

        {/* Current Detected Market Card (Screen 03 in Matheus's case study) */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl p-4 shadow-md mb-5 border border-neutral-700/50">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-orange-600/30 text-orange-400 border border-orange-500/30">
                <Navigation className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                  Mercado Detectado por GPS
                </span>
                <h3 className="text-lg font-black tracking-tight text-white leading-tight">
                  {currentMarket.name}
                </h3>
              </div>
            </div>
            <span className="text-[11px] font-semibold bg-white/10 px-2 py-0.5 rounded-full text-white/90">
              {currentMarket.distance}
            </span>
          </div>

          <p className="text-xs text-neutral-300 mt-2.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">{currentMarket.address}</span>
          </p>

          <div className="mt-3.5 pt-3 border-t border-neutral-700 flex items-center justify-between text-xs text-neutral-300">
            <div className="flex items-center gap-1">
              <span className="text-amber-400 font-bold">★ {currentMarket.rating}</span>
              <span className="text-neutral-500">· {currentMarket.type}</span>
            </div>
            {currentMarket.hasPromoApp && (
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Descontos ativos hoje
              </span>
            )}
          </div>
        </div>

        {/* Search input for alternative markets (Screen 04) */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="market-search" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Ou selecione outro mercado
            </label>
            <span className="text-[11px] text-neutral-400">
              {filteredMarkets.length} disponíveis
            </span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="market-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por nome, rede ou bairro..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-100/80 border border-neutral-200 rounded-xl text-xs text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
            />
          </div>
        </div>

        {/* Market List */}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {filteredMarkets.map((m) => {
            const isSelected = m.id === currentMarket.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectMarket(m)}
                className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-orange-50/70 border-orange-400 ring-2 ring-orange-200/60 shadow-xs'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-xs"
                    style={{ backgroundColor: m.logoBg, color: m.colorText }}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-neutral-900 truncate">
                        {m.name}
                      </h4>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        ({m.type})
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate">{m.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-medium text-neutral-500">
                    {m.distance}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Start Scanning CTA */}
      <div className="pt-4 mt-auto">
        <button
          onClick={onProceedToScanner}
          className="w-full h-13 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 transition-all"
        >
          <span>Confirmar e Começar a Escanear</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
