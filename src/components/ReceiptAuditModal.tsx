import React, { useState } from 'react';
import { ReceiptAudit, CartItem, Market } from '../types';
import { X, QrCode, ShieldAlert, CheckCircle2, FileText, AlertTriangle, ArrowRight } from 'lucide-react';
import { MascotKet } from './MascotKet';

interface ReceiptAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  market: Market;
}

export const ReceiptAuditModal: React.FC<ReceiptAuditModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  market,
}) => {
  const [isAudited, setIsAudited] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsAudited(true);
    }, 1200);
  };

  // Calculate simulated cashier total with 1 real discrepancy (frequent in Brazilian retail)
  const shelfTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const registerTotal = shelfTotal + 2.50; // Cashier charged R$ 2.50 more on one item

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-600/30 border border-orange-500/40 text-orange-400 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight leading-tight">
                Auditor de Cupom Fiscal (NFC-e)
              </h3>
              <span className="text-[10px] text-neutral-400">
                Auditoria Procon: Preço da Gôndola vs Caixa
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
            mood={isAudited ? 'alerta' : 'curioso'}
            compact
            message={
              isAudited
                ? 'Eita! O caixa cobrou R$ 2,50 a mais do que o anunciado na gôndola. Pelo Código de Defesa do Consumidor, você tem direito ao menor preço!'
                : 'Escaneie o QR Code no rodapé da sua nota fiscal emitida no caixa para auditar divergências de preço.'
            }
          />
        </div>

        {/* Body Content */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {!isAudited ? (
            <div className="space-y-4 text-center py-4">
              <div className="relative mx-auto w-48 h-48 rounded-2xl border-2 border-dashed border-orange-400 bg-orange-50/50 flex flex-col items-center justify-center p-4">
                <QrCode className={`w-20 h-20 text-orange-600 ${isScanning ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-bold text-neutral-800 mt-2">
                  {isScanning ? 'Lendo NFC-e / Danfe...' : 'Aponte para o QR Code da Nota'}
                </span>
                <span className="text-[10px] text-neutral-500">
                  (Nota Fiscal Eletrônica Estadual)
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs text-neutral-600">
                <h5 className="font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-orange-600" />
                  Como funciona a Auditoria Ket?
                </h5>
                <p className="text-[11px] leading-relaxed">
                  O Ket compara o valor que você escaneou na prateleira física com a chave transmitida pela Secretaria da Fazenda (SEFAZ). Se o mercado cobrar a mais por esquecer de atualizar o sistema, você é avisado na hora!
                </p>
              </div>

              <button
                type="button"
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 active:scale-98 transition-all"
              >
                <QrCode className="w-4 h-4" />
                <span>{isScanning ? 'Auditando cupom...' : 'Escanear / Simular QR Code do Cupom'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Divergence alert banner */}
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-900">
                <div className="flex items-center gap-2 font-black text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Divergência de Preço Detectada no Caixa!</span>
                </div>
                <p className="text-[11px] mt-1 text-red-700">
                  Diferença total cobrada a mais: <strong className="text-red-900 font-extrabold">+ R$ 2,50</strong>.
                </p>
              </div>

              {/* Price comparison breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total na Gôndola (Ket)</span>
                  <div className="text-base font-black text-neutral-900 tabular-nums">
                    R$ {shelfTotal.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-red-50/70 border border-red-200">
                  <span className="text-[10px] uppercase font-bold text-red-700 block">Total Cobrado no Caixa</span>
                  <div className="text-base font-black text-red-700 tabular-nums">
                    R$ {registerTotal.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </div>

              {/* Specific item discrepancy */}
              <div className="p-3 rounded-xl bg-white border border-neutral-200 text-xs">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                  Item com preço irregular:
                </span>
                <div className="flex items-center justify-between font-bold text-neutral-900">
                  <span>Leite UHT Integral 1L</span>
                  <span className="text-red-600">+ R$ 2,50 a mais</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-1">
                  <span>Preço anunciado na etiqueta: R$ 4,99</span>
                  <span>Registrado no caixa: R$ 7,49</span>
                </div>
              </div>

              {/* Legal Protection Card */}
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-snug">
                <span className="font-bold block mb-0.5">⚖️ Art. 35 do CDC (Lei nº 8.078/1990):</span>
                Em caso de divergência entre o valor anunciado na gôndola e o cobrado no caixa, o consumidor tem o direito de pagar o <strong>menor valor</strong>. Mostre essa tela ao fiscal ou gerente do {market.name}.
              </div>

              <button
                type="button"
                onClick={() => {
                  alert(`Relatório de Divergência copiado!\nSupermercado: ${market.name}\nItem: Leite Integral 1L\nEtiqueta: R$ 4,99 | Caixa: R$ 7,49\nDiferença: R$ 2,50 a ser estornada.`);
                }}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-md transition-all text-center"
              >
                Gerar Comprovante para Atendimento ao Cliente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
