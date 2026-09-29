import React, { useState } from 'react';
import { ShoppingTrip } from '../types';
import {
  History,
  Calendar,
  ShoppingBag,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Search,
  Check,
  FileCheck,
} from 'lucide-react';

interface HistoryViewProps {
  trips: ShoppingTrip[];
  onBack: () => void;
  onReuseTrip?: (trip: ShoppingTrip) => void;
  onOpenProfile?: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ trips, onBack, onReuseTrip, onOpenProfile }) => {
  const [expandedTripId, setExpandedTripId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const totalSavedAllTime = trips.reduce((acc, t) => acc + t.savings, 0);
  const totalSpentAllTime = trips.reduce((acc, t) => acc + t.total, 0);

  const filteredTrips = trips.filter(
    (t) =>
      t.market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.date.includes(searchTerm) ||
      t.items.some((i) => i.product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full bg-neutral-50 text-neutral-900 select-none overflow-y-auto">
      {/* Top Bar */}
      <div className="p-4 bg-white border-b border-neutral-200 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-700"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-extrabold text-neutral-900">Histórico de Compras</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-500">
            {trips.length} {trips.length === 1 ? 'ida' : 'idas'}
          </span>
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              aria-label="Acessar Perfil"
              className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full bg-neutral-100 hover:bg-orange-50 border border-neutral-200 hover:border-orange-300 text-xs font-bold text-neutral-800 transition-all shadow-xs"
              title="Acessar Perfil"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center font-black text-[10px]">
                M
              </div>
              <span className="text-[11px] text-orange-950 font-extrabold">Perfil</span>
            </button>
          )}
        </div>
      </div>

      {/* Aggregate Stats Card */}
      <div className="p-4 pb-2">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
            Economia Total Acumulada
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-sm font-bold text-orange-400">R$</span>
            <span className="text-2xl font-black text-white tabular-nums">
              {totalSavedAllTime.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-700/80 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-neutral-400 text-[10px] block">Gasto Total Acumulado</span>
              <span className="font-bold text-white tabular-nums">
                R$ {totalSpentAllTime.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 text-[10px] block">Média por Ida ao Mercado</span>
              <span className="font-bold text-white tabular-nums">
                R$ {trips.length ? (totalSpentAllTime / trips.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 py-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por mercado, data ou produto..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-orange-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Trips List */}
      <div className="flex-1 px-4 pb-6 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 px-1 pt-1">
          <span>Compras Registradas</span>
          <span>{filteredTrips.length} resultados</span>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="text-center py-10 text-neutral-400">
            <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-xs">Nenhuma compra encontrada para essa busca.</p>
          </div>
        ) : (
          filteredTrips.map((trip) => {
            const isExpanded = expandedTripId === trip.id;
            return (
              <div
                key={trip.id}
                className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden hover:border-orange-200 transition-all"
              >
                {/* Main Card Header */}
                <div
                  onClick={() => setExpandedTripId(isExpanded ? null : trip.id)}
                  className="p-3.5 flex flex-col gap-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: trip.market.logoBg }}
                      />
                      <h4 className="text-xs font-bold text-neutral-900">{trip.market.name}</h4>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{trip.date}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-neutral-400 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400 ml-1" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100">
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{trip.items.length || 6} produtos</span>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-neutral-900 tabular-nums text-sm block">
                        R$ {trip.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600">
                        Economizou R$ {trip.savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Items Drawer */}
                {isExpanded && (
                  <div className="p-3.5 bg-neutral-50/80 border-t border-neutral-100 text-xs space-y-2">
                    <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                      Itens desta compra:
                    </span>

                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {trip.items.length > 0 ? (
                        trip.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-1.5 bg-white rounded-lg border border-neutral-200/70 text-[11px]"
                          >
                            <span className="font-semibold text-neutral-800 truncate max-w-[180px]">
                              {item.product.name} ({item.quantity}x)
                            </span>
                            <span className="font-mono text-neutral-700 font-bold tabular-nums">
                              R$ {item.subtotal.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-neutral-400 italic">
                          Itens de compra básica DIEESE arquivados.
                        </p>
                      )}
                    </div>

                    {/* Actions on this past trip */}
                    {onReuseTrip && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onReuseTrip(trip);
                          }}
                          className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reutilizar esta Lista no Próximo Mercado</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
