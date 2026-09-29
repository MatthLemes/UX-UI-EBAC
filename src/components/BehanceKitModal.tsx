import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Smartphone,
  FileText,
  Layers,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Scale,
  Users,
  ShieldAlert,
  Sparkles,
  Lock,
  Play,
  Video,
} from 'lucide-react';
import ketOfficialImg from '../assets/images/ket_official_supermarket_1790697750637.jpg';
import behanceHeroImg from '../assets/images/behance_hero_mockup_1790695552913.jpg';
import phoneVideoSlideImg from '../assets/images/phone_video_mockup_slide_1790697720414.jpg';

interface BehanceKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BehanceKitModal: React.FC<BehanceKitModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const slides = [
    {
      id: 'capa',
      title: '01. Capa Principal do Projeto',
      subtitle: 'Banner de abertura com mockups limpos para o topo do Behance',
    },
    {
      id: 'problema',
      title: '02. Contexto & Desk Research (DIEESE)',
      subtitle: 'O desafio da inflação e dos cálculos mentais nos supermercados brasileiros',
    },
    {
      id: 'mascote',
      title: '03. Persona & O Mascote Ket (Versão Oficial Mercado)',
      subtitle: 'Ket com jaqueta jeans, avental de mercado, bloco de notas e tênis laranja',
    },
    {
      id: 'fluxo',
      title: '04. Telas Principais do Aplicativo',
      subtitle: 'Boas-vindas, teto de gastos, leitor com laser e lista de compras',
    },
    {
      id: 'video',
      title: '05. Demonstração em Vídeo do Aplicativo (Mockup Centralizado)',
      subtitle: 'Smartphone centralizado em 16:9 pronto para sobreposição do vídeo do protótipo',
    },
    {
      id: 'funcionalidades',
      title: '06. Resolução de Problemas & Inovações',
      subtitle: 'Comparador de reduflação (g/ml), divisor Pix e auditor de cupom NFC-e',
    },
    {
      id: 'usabilidade',
      title: '07. Testes de Usabilidade com Usuários',
      subtitle: 'Resultados dos testes com Rai, Lewi e Ícaro da pesquisa EBAC',
    },
    {
      id: 'design_system',
      title: '08. Design System & Tipografia',
      subtitle: 'Cores oficiais, tipografia Inter e números tabulares para moeda',
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const behanceDescriptionText = `
# KET · Mobile App for Automatic Supermarket Calculations
UX/UI Case Study & Design System by Matheus Lemes (EBAC)

## 1. Problem Statement
When shopping at Brazilian supermarkets, consumers frequently face price anxiety due to high inflation.
According to DIEESE data, the basic food basket in São Paulo reached R$ 750.74 (+11.48% variation).
Many consumers struggle with mental math in the aisles, wondering:
- "How much did all this cost?"
- "Do I have enough money for checkout?"
- "Are these items really necessary?"

## 2. Benchmark Limitation
While online grocery apps (Rappi, iFood) exist, they eliminate the consumer's autonomy over fresh fruits and vegetables (inspecting ripeness, weight per kg) and checking expiration dates of physical items.
Ket brings the automatic calculator directly into the physical supermarket aisle.

## 3. Brand Identity: The Mascot Ket
Ket is derived from "Market" + "Cat".
The mascot is an intelligent, urban, curious orange tabby cat wearing a denim jacket over an orange shirt, a supermarket staff apron with a checklist notepad, rolled cargo pants, and orange sneakers.
Active Voice: Casual, jovial, direct, and supportive ("Eae! Bora economizar!").

## 4. Key Solutions Implemented
- Dynamic High-Contrast Financial HUD (Solves visibility issue from usability testing)
- In-aisle Barcode Scanner & Hortifruti Weight Support (kg/g)
- Unit Price & Shrinkflation Comparator (g vs ml vs kg)
- Integrated Home Checklist with Impulse Purchase Alert
- Roommate & Couple Bill Splitter with 1-Click Pix Billing for WhatsApp
- NFC-e Cashier Receipt Auditor (Consumer Protection Code Art. 35)
- 100% Offline-First Architecture for Supermarket Basements

## 5. Usability Testing (EBAC)
Tested with 3 real users (Rai, Lewi, Ícaro):
- Rai: Needed clearer back actions -> Solved with consistent navigation.
- Lewi: Completed tasks smoothly in 16s.
- Ícaro: Took longer to locate the total in early wireframes -> Solved with the ultra-high contrast dark HUD.

Designed by Matheus Lemes · Brazil (EBAC).
  `.trim();

  const handleCopyText = () => {
    navigator.clipboard?.writeText(behanceDescriptionText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 text-white rounded-3xl shadow-2xl border border-neutral-700 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Admin Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-800 border-b border-neutral-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600/30 border border-orange-500/50 flex items-center justify-center text-orange-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-600 text-white">
                  Painel do Criador & Administrador
                </span>
                <span className="text-xs text-neutral-400">Matheus Lemes</span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
                Kit de Apresentação de Telas para o Behance
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar (Download PDF & Copy Copywriting) */}
        <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <a
              href="/ket-case-study-behance.pdf"
              download="ket-case-study-behance.pdf"
              className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Baixar PDF Horizontal do Case (.PDF)</span>
            </a>

            <a
              href="/ket-case-study-behance.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl font-semibold flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-orange-400" />
              <span>Abrir PDF em Nova Aba</span>
            </a>

            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl font-semibold flex items-center gap-1.5 transition-all"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  <span className="text-emerald-400">Texto Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copiar Texto Formatado</span>
                </>
              )}
            </button>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 text-xs">
              Slide <strong>{currentSlide + 1}</strong> de {slides.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Viewer (16:9 Presentation Format) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950 flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative min-h-[380px] flex flex-col justify-between">
            {/* Slide Title Bar */}
            <div className="px-5 py-3 border-b border-neutral-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                  {slides[currentSlide].title}
                </span>
                <p className="text-neutral-400 text-[11px] mt-0.5">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
            </div>

            {/* Slide Content Rendering */}
            <div className="p-6 flex-1 flex flex-col justify-center">
              {/* SLIDE 1: CAPA OFICIAL */}
              {currentSlide === 0 && (
                <div className="relative rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950 group">
                  <img
                    src={behanceHeroImg}
                    alt="Capa Oficial Behance Ket App"
                    className="w-full h-auto object-cover max-h-[340px]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 right-3">
                    <a
                      href={behanceHeroImg}
                      download="01-capa-behance-ket.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-black/80 hover:bg-orange-600 text-white text-xs font-bold rounded-xl backdrop-blur-md flex items-center gap-1.5 transition-colors shadow-lg"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar Imagem da Capa (1920x1080)</span>
                    </a>
                  </div>
                </div>
              )}

              {/* SLIDE 2: DESK RESEARCH */}
              {currentSlide === 1 && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-500/30">
                    <span className="text-[10px] font-bold uppercase text-orange-400 tracking-wider">
                      Desk Research · O Cenário Brasileiro
                    </span>
                    <h3 className="text-lg font-black text-white mt-1">
                      Inflação, Cesta Básica e Ansiedade no Caixa
                    </h3>
                    <p className="text-neutral-300 mt-2 leading-relaxed">
                      "Sabe quando você vai ao supermercado pegando os itens e de repente se pega pensando:
                      <em> 'Nossa, quanto tudo isso vai custar? Tenho dinheiro suficiente? Esses itens são realmente necessários?'</em>"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700">
                      <span className="text-[10px] font-bold uppercase text-orange-400">Dados DIEESE (SP)</span>
                      <div className="text-2xl font-black text-white mt-1">R$ 750,74</div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Custo da cesta básica com variação positiva de +11,48%. Consumidores usam celulares como calculadora nos corredores.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700">
                      <span className="text-[10px] font-bold uppercase text-orange-400">A Limitação do Online</span>
                      <div className="text-2xl font-black text-white mt-1">Autonomia</div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Apps de entrega (Rappi/iFood) tiram o controle de escolher o peso e a maturação do hortifruti e evitar embalagens amassadas.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: MASCOTE KET OFICIAL */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-48 h-48 rounded-3xl overflow-hidden border-2 border-orange-500 bg-neutral-800 shadow-xl mb-2">
                      <img
                        src={ketOfficialImg}
                        alt="Ket Mascote Oficial do Mercado"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <a
                      href={ketOfficialImg}
                      download="03-mascote-ket-oficial.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-orange-400 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Baixar Imagem Oficial do Ket
                    </a>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-orange-400 tracking-wider">
                        A Identidade Visual do Mascote
                      </span>
                      <h4 className="text-base font-black text-white mt-0.5">
                        Ket · O Gato do Mercado
                      </h4>
                      <p className="text-neutral-300 text-[11px] mt-1 leading-relaxed">
                        Gato laranja malhado com pelagem vibrante, piscando o olho com simpatia. Veste jaqueta jeans estilosa sobre gola polo laranja, avental de mercado com crachá e bloco de notas, calça cargo e tênis esportivo laranja.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-800 border border-neutral-700">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                        Voz Ativa da Marca
                      </span>
                      <p className="text-[11px] text-orange-300 italic">
                        "Eae! Não esquece as compras da semana! Bora clicar aqui e economizar sem susto no caixa!"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: FLUXO DE TELAS PRINCIPAIS */}
              {currentSlide === 3 && (
                <div className="space-y-3 text-xs">
                  <span className="text-[10px] font-bold uppercase text-orange-400 tracking-wider block">
                    Fluxo do Usuário no Mercado Físico
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700">
                      <span className="text-xs font-bold text-orange-400 block">Tela 01</span>
                      <span className="text-white font-extrabold text-[11px] block mt-0.5">Boas-Vindas</span>
                      <p className="text-[10px] text-neutral-400 mt-1">Eae! Bem-vindo de volta :D</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700">
                      <span className="text-xs font-bold text-orange-400 block">Tela 02</span>
                      <span className="text-white font-extrabold text-[11px] block mt-0.5">Definir Saldo</span>
                      <p className="text-[10px] text-neutral-400 mt-1">Teto pretendido (R$ 200,00)</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700">
                      <span className="text-xs font-bold text-orange-400 block">Tela 05 & 07</span>
                      <span className="text-white font-extrabold text-[11px] block mt-0.5">Scanner com Laser</span>
                      <p className="text-[10px] text-neutral-400 mt-1">Código de barras + Hortifruti (KG)</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700">
                      <span className="text-xs font-bold text-orange-400 block">Tela 06</span>
                      <span className="text-white font-extrabold text-[11px] block mt-0.5">Minha Lista</span>
                      <p className="text-[10px] text-neutral-400 mt-1">HUD de alto contraste (Ícaro test)</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-neutral-850 border border-neutral-750 text-[11px] text-neutral-300 flex items-center justify-between">
                    <span>💡 Interface desenvolvida para uso rápido com apenas uma das mãos no carrinho.</span>
                  </div>
                </div>
              )}

              {/* SLIDE 5: NOVO SLIDE DE VÍDEO (SMARTPHONE CENTRALIZADO) */}
              {currentSlide === 4 && (
                <div className="relative rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950 flex flex-col items-center justify-center p-2 min-h-[300px]">
                  <div className="relative w-full max-h-[320px] flex items-center justify-center">
                    <img
                      src={phoneVideoSlideImg}
                      alt="Mockup Celular Centralizado para Vídeo do App"
                      className="w-full h-auto object-cover max-h-[310px] rounded-xl"
                      referrerPolicy="no-referrer"
                    />

                    {/* Overlay badge indicating video placeholder */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px] rounded-xl text-center p-4">
                      <div className="w-14 h-14 rounded-full bg-orange-600/90 text-white flex items-center justify-center shadow-2xl border-2 border-white/60 mb-2 animate-pulse">
                        <Play className="w-6 h-6 ml-0.5 fill-white" />
                      </div>
                      <span className="text-xs font-extrabold text-white tracking-wide uppercase bg-black/60 px-3 py-1 rounded-full border border-white/20">
                        Área de Vídeo do App / Protótipo
                      </span>
                      <span className="text-[11px] text-orange-200 mt-1 max-w-sm">
                        Mockup centralizado em proporção 16:9 ideal para sobreposição de gravação de tela no Behance
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <a
                      href={phoneVideoSlideImg}
                      download="05-slide-video-mockup-celular.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-black/80 hover:bg-orange-600 text-white text-xs font-bold rounded-xl backdrop-blur-md flex items-center gap-1.5 transition-colors shadow-lg"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar Imagem do Mockup de Vídeo (16:9)</span>
                    </a>
                  </div>
                </div>
              )}

              {/* SLIDE 6: RESOLUÇÃO DE PROBLEMAS & INOVAÇÕES */}
              {currentSlide === 5 && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-neutral-800 border border-neutral-700">
                    <div className="flex items-center gap-2 mb-1 text-orange-400 font-bold">
                      <Scale className="w-4 h-4" />
                      <span>Anti-Reduflação (g/ml)</span>
                    </div>
                    <p className="text-[11px] text-neutral-300">
                      Compara automaticamente embalagens de tamanhos diferentes (ex: sabão 1,6kg vs 800g) e aponta a opção com menor custo por kg/litro.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-800 border border-neutral-700">
                    <div className="flex items-center gap-2 mb-1 text-orange-400 font-bold">
                      <Users className="w-4 h-4" />
                      <span>Divisor de Conta Pix</span>
                    </div>
                    <p className="text-[11px] text-neutral-300">
                      Separa os itens em "100% Meu", "50/50" ou "Roommate" e gera cobrança Pix instantânea para envio no WhatsApp.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-800 border border-neutral-700">
                    <div className="flex items-center gap-2 mb-1 text-orange-400 font-bold">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Auditor de Caixa (NFC-e)</span>
                    </div>
                    <p className="text-[11px] text-neutral-300">
                      Lê o QR Code do cupom fiscal do caixa e confere com a gôndola. Pelo Art. 35 do CDC, o consumidor tem direito ao menor preço anunciado.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-800 border border-neutral-700">
                    <div className="flex items-center gap-2 mb-1 text-orange-400 font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>100% Offline-First</span>
                    </div>
                    <p className="text-[11px] text-neutral-300">
                      Funciona perfeitamente nos subsolos de hipermercados e atacarejos sem depender de sinal 4G/5G.
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 7: TESTES DE USABILIDADE */}
              {currentSlide === 6 && (
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-orange-400 tracking-wider">
                      Resultados dos Testes com 3 Usuários Reais (EBAC)
                    </span>
                  </div>

                  <div className="border border-neutral-700 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-neutral-800 text-neutral-300 font-bold uppercase text-[9px] border-b border-neutral-700">
                        <tr>
                          <th className="p-2.5">Usuário</th>
                          <th className="p-2.5">Humor</th>
                          <th className="p-2.5">Tempo</th>
                          <th className="p-2.5">Ajuste Aplicado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800 text-neutral-300">
                        <tr>
                          <td className="p-2.5 font-bold text-white">Rai</td>
                          <td className="p-2.5">Pensativo 🤔</td>
                          <td className="p-2.5 font-mono">31s</td>
                          <td className="p-2.5 text-orange-300">Barra inferior fixa e botão voltar evidente.</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-white">Lewi</td>
                          <td className="p-2.5">Animado 😸</td>
                          <td className="p-2.5 font-mono">16s</td>
                          <td className="p-2.5 text-emerald-400">Fluxo validado sem intercorrências.</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-white">Ícaro</td>
                          <td className="p-2.5">Cauteloso 😼</td>
                          <td className="p-2.5 font-mono">12s</td>
                          <td className="p-2.5 text-orange-300">HUD escuro com Saldo e Total em destaque gigante.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[11px] text-neutral-400 italic">
                    Aplicação direta das Heurísticas de Nielsen (#1 Visibilidade do Status, #3 Liberdade do Usuário, #5 Prevenção de Erros).
                  </p>
                </div>
              )}

              {/* SLIDE 8: DESIGN SYSTEM */}
              {currentSlide === 7 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-orange-400 tracking-wider block mb-2">
                      Paleta de Cores & Semântica
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-3 rounded-xl bg-[#FF6B00] text-white">
                        <span className="text-[10px] block opacity-80">Primary</span>
                        <strong className="text-xs">#FF6B00</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-[#FFA900] text-neutral-950">
                        <span className="text-[10px] block opacity-80">Secondary</span>
                        <strong className="text-xs">#FFA900</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-[#10B981] text-white">
                        <span className="text-[10px] block opacity-80">Success</span>
                        <strong className="text-xs">#10B981</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-[#EF4444] text-white">
                        <span className="text-[10px] block opacity-80">Alert</span>
                        <strong className="text-xs">#EF4444</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-800 border border-neutral-700">
                    <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                      Tipografia Oficial: Inter & Plus Jakarta Sans
                    </span>
                    <p className="text-neutral-300 text-[11px]">
                      Uso de <code className="text-orange-400">tabular-nums</code> para alinhar perfeitamente valores em Real (R$) e evitar saltos visuais durante o escaneamento na gôndola.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Slide Footer */}
            <div className="px-5 py-3 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between text-xs text-neutral-500">
              <span>Projeto KET · Matheus Lemes · EBAC (2022-2023)</span>
              <button
                type="button"
                onClick={handleNext}
                className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1"
              >
                <span>Próximo Slide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs">
          <span className="text-neutral-500 text-[11px]">
            Área de uso exclusivo do Administrador para publicação de portfólio.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
