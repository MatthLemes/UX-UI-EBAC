import React, { useState } from 'react';
import { X, ExternalLink, BookOpen, Layers, Users, Palette, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import ketAvatarImg from '../assets/images/ket_mascot_avatar_1790683656514.jpg';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'persona' | 'heuristics' | 'usability' | 'design_system'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-orange-100">
                EBAC · British School of Creative Arts & Tech (2022 - 2023)
              </span>
              <h2 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                UX/UI Case: App Ket para Supermercados
              </h2>
              <span className="text-xs text-orange-100">
                Autor original: Matheus Lemes (Publicado no Medium em 05/06/2023)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 p-2 bg-neutral-100 border-b border-neutral-200 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            01. O Desafio & Desk Research
          </button>
          <button
            onClick={() => setActiveTab('persona')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'persona'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            02. Persona & O Mascote Ket
          </button>
          <button
            onClick={() => setActiveTab('usability')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'usability'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            03. Testes com 3 Usuários
          </button>
          <button
            onClick={() => setActiveTab('heuristics')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'heuristics'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            04. Heurísticas de Nielsen
          </button>
          <button
            onClick={() => setActiveTab('design_system')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'design_system'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            05. Design System
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-neutral-700 leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200">
                <h4 className="font-bold text-neutral-900 text-sm mb-1">
                  Storytelling: O problema do consumidor no mercado físico
                </h4>
                <p>
                  "Sabe quando você vai ao supermercado pegando os itens e de repente se pega pensando:
                  <em> 'Nossa, quanto tudo isso vai custar? Tenho dinheiro suficiente? Esses itens são realmente necessários?'</em>"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <h5 className="font-bold text-neutral-900 mb-1 flex items-center gap-1.5 text-xs">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    Dados DIEESE (Cesta Básica)
                  </h5>
                  <p className="text-[11px] text-neutral-600">
                    Em setembro de 2022, a cesta básica em SP atingiu R$ 750,74 com alta de 11,48%. Os brasileiros adotam estratégias diárias com calculadoras de celular para não extrapolar no caixa.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <h5 className="font-bold text-neutral-900 mb-1 flex items-center gap-1.5 text-xs">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    Por que apps como Rappi e iFood falham no mercado físico?
                  </h5>
                  <p className="text-[11px] text-neutral-600">
                    O consumidor quer <strong>autonomia</strong>: escolher a maturação da fruta, o formato do legume por peso (hortifruti) e checar se embalagens não estão amassadas ou vencidas. O Ket traz o cálculo automático direto para a mão do cliente na gôndola.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'persona' && (
            <div className="space-y-3.5">
              <div className="flex items-center gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-orange-400 bg-orange-100 shrink-0">
                  <img
                    src={ketAvatarImg}
                    alt="Mascote Ket"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">O Mascote: Ket (Market + Cat)</h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5">
                    "Ket vem de 'market' e a pronúncia soa como 'cat'. Gatos são inteligentes, urbanos, curiosos, calculam seus pulos, mas às vezes também erram. Um mascote antropomórfico como o Urso da Coca-Cola ou o Pinguim do Ponto Frio."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="font-bold text-neutral-900 block mb-1">Dados Demográficos</span>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-neutral-600">
                    <li>25 a 30 anos</li>
                    <li>Região Sudeste (SP/RJ/MG)</li>
                    <li>Renda média, atento ao orçamento</li>
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="font-bold text-neutral-900 block mb-1">Comportamento & Voz Ativa</span>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-neutral-600">
                    <li>Jovial, direto e amigável ("Eae!")</li>
                    <li>Decisões rápidas sem estresse</li>
                    <li>Valoriza controle e economia real</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'usability' && (
            <div className="space-y-3">
              <h4 className="font-bold text-neutral-900 text-sm">
                Resultados dos Testes de Usabilidade (EBAC)
              </h4>
              <p className="text-[11px] text-neutral-600">
                Tarefas testadas: Escanear 01 produto ➔ Clicar em "Ver lista após Scan" ➔ Abrir lista e conferir Valor Total.
              </p>

              <div className="overflow-x-auto border border-neutral-200 rounded-2xl shadow-xs">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-neutral-100 text-neutral-700 font-bold uppercase text-[9px] border-b">
                    <tr>
                      <th className="p-2.5">Usuário</th>
                      <th className="p-2.5">Humor</th>
                      <th className="p-2.5">Tempo</th>
                      <th className="p-2.5">Erro Identificado</th>
                      <th className="p-2.5">Como Solucionamos no App</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    <tr className="hover:bg-neutral-50">
                      <td className="p-2.5 font-bold">Rai</td>
                      <td className="p-2.5">Pensativo 🤔</td>
                      <td className="p-2.5 font-mono">31s</td>
                      <td className="p-2.5 text-neutral-600">Clicou nos cantos acima</td>
                      <td className="p-2.5 text-emerald-700 font-medium">Header fixo com breadcrumb e botão voltar evidente.</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-2.5 font-bold">Lewi</td>
                      <td className="p-2.5">Animado 😸</td>
                      <td className="p-2.5 font-mono">16s</td>
                      <td className="p-2.5 text-neutral-600">Nenhum erro</td>
                      <td className="p-2.5 text-emerald-700 font-medium">Fluxo direto aprovado de ponta a ponta.</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-2.5 font-bold">Ícaro</td>
                      <td className="p-2.5">Cauteloso 😼</td>
                      <td className="p-2.5 font-mono">12s</td>
                      <td className="p-2.5 text-orange-700 font-medium">Demorou achar o preço final no canto superior</td>
                      <td className="p-2.5 text-emerald-700 font-medium">Criamos o HUD escuro de alto contraste com R$ gigante e som de bip.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'heuristics' && (
            <div className="space-y-3">
              <h4 className="font-bold text-neutral-900 text-sm">
                Aplicação das Heurísticas de Nielsen
              </h4>
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="font-bold text-neutral-900">#1 Visibilidade do Status do Sistema:</span>
                  <p className="text-neutral-600 mt-0.5">
                    O app mostra o percentual do orçamento consumido em tempo real com mudança de cor (Verde ➔ Laranja ➔ Vermelho) e áudio de confirmação.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="font-bold text-neutral-900">#3 Controle e Liberdade do Usuário:</span>
                  <p className="text-neutral-600 mt-0.5">
                    Possibilidade de ajustar o peso do hortifruti em KG a qualquer momento, diminuir quantidades ou remover itens com 1 toque.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="font-bold text-neutral-900">#5 Prevenção de Erros:</span>
                  <p className="text-neutral-600 mt-0.5">
                    Alerta do Mascote Ket antes de ultrapassar o limite, permitindo desconsiderar itens supérfluos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'design_system' && (
            <div className="space-y-3">
              <h4 className="font-bold text-neutral-900 text-sm">
                Design System: Cores e Tipografia (Matheus Lemes)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-xl bg-[#FF6B00] text-white text-center">
                  <span className="text-[10px] block opacity-80">Primary</span>
                  <strong className="text-xs">#FF6B00</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FFA900] text-neutral-900 text-center">
                  <span className="text-[10px] block opacity-80">Secondary</span>
                  <strong className="text-xs">#FFA900</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#10B981] text-white text-center">
                  <span className="text-[10px] block opacity-80">Success</span>
                  <strong className="text-xs">#10B981</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#EF4444] text-white text-center">
                  <span className="text-[10px] block opacity-80">Danger</span>
                  <strong className="text-xs">#EF4444</strong>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
                <span className="font-bold text-neutral-900 block mb-1">Tipografia: Inter & Plus Jakarta Sans</span>
                <p className="text-neutral-600 text-[11px]">
                  Hierarquia rigorosa de 12px a 48px, com <code>tabular-nums</code> para alinhar preços decimais em R$ de acordo com as diretrizes do case study.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Link to Medium */}
        <div className="p-3.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-xs">
          <span className="text-neutral-500 text-[11px]">
            © Matheus Lemes · Todos os direitos reservados
          </span>
          <a
            href="https://medium.com/@matheusribeirolemes15/ux-ui-case-mobile-app-for-automatic-calculations-in-supermarkets-5022d98ebbd9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-orange-600 font-bold hover:underline"
          >
            <span>Ver Artigo Completo no Medium</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
