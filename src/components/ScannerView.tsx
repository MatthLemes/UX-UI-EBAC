import React, { useState, useRef, useEffect } from 'react';
import { Product, Market, CartItem, KetMood } from '../types';
import { PRODUCTS } from '../data/mockData';
import { playBarcodeBeep, playWarningBeep } from '../utils/audio';
import { MascotKet } from './MascotKet';
import scannerBgImg from '../assets/images/scanner_shelf_demo_1790683694240.jpg';
import {
  Camera,
  Flashlight,
  Search,
  Plus,
  Minus,
  Check,
  List,
  Sparkles,
  Barcode,
  Scale,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';

interface ScannerViewProps {
  currentMarket: Market;
  total: number;
  budget: number;
  onAddToCart: (product: Product, quantity: number, price: number) => void;
  onViewCart: () => void;
  onOpenComparator?: () => void;
  onOpenPlannedList?: () => void;
  plannedCount?: number;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  currentMarket,
  total,
  budget,
  onAddToCart,
  onViewCart,
  onOpenComparator,
  onOpenPlannedList,
  plannedCount = 0,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[12]); // Default: Mini Protetor Solar (from original prototype!)
  const [quantity, setQuantity] = useState<number>(1);
  const [weightKg, setWeightKg] = useState<number>(0.85); // For kg products
  const [isScanningActive, setIsScanningActive] = useState<boolean>(true);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recentScannedNotice, setRecentScannedNotice] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Camera handling with fallback
  useEffect(() => {
    let active = true;

    async function startCamera() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setCameraActive(false);
          return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        });
        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        setCameraActive(true);
      } catch (err) {
        // Camera access denied or running inside restricted sandbox
        setCameraActive(false);
        setCameraError('Câmera simulada ativa (modo gôndola interativa).');
      }
    }

    startCamera();

    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleSelectProduct = (prod: Product) => {
    playBarcodeBeep();
    setSelectedProduct(prod);
    setQuantity(1);
    if (prod.unitType === 'kg') {
      setWeightKg(0.85);
    }
    setRecentScannedNotice(`Código de barras ${prod.ean} lido com sucesso!`);
    setTimeout(() => setRecentScannedNotice(null), 3000);
  };

  const getProductPrice = (prod: Product): number => {
    if (prod.marketPrices[currentMarket.id]) {
      return prod.marketPrices[currentMarket.id];
    }
    return prod.defaultPrice;
  };

  const currentUnitPrice = selectedProduct ? getProductPrice(selectedProduct) : 0;
  const currentItemSubtotal = selectedProduct
    ? selectedProduct.unitType === 'kg'
      ? currentUnitPrice * weightKg
      : currentUnitPrice * quantity
    : 0;

  const projectedTotal = total + currentItemSubtotal;
  const remainingBudget = budget > 0 ? budget - total : 0;
  const willExceedBudget = budget > 0 && projectedTotal > budget;

  // Dynamic Mascot Feedback based on Nielsen heuristics
  let mascotMood: KetMood = 'curioso';
  let mascotMsg = 'Aponte para o código de barras ou toque em um produto na prateleira abaixo.';

  if (selectedProduct) {
    if (willExceedBudget) {
      mascotMood = 'alerta';
      const exceedAmt = (projectedTotal - budget).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
      mascotMsg = `Atenção: adicionar ${selectedProduct.name} vai estourar seu teto em R$ ${exceedAmt}!`;
    } else if (remainingBudget > 0 && (projectedTotal / budget) > 0.8) {
      mascotMood = 'cauteloso';
      mascotMsg = `Você está quase no teto (${Math.round((projectedTotal / budget) * 100)}%). Quer mesmo levar este item?`;
    } else {
      mascotMood = 'animado';
      mascotMsg = `${selectedProduct.name} cabe com tranquilidade no seu saldo! Toque em OK para confirmar.`;
    }
  }

  const handleConfirmAdd = () => {
    if (!selectedProduct) return;

    if (willExceedBudget) {
      playWarningBeep();
    } else {
      playBarcodeBeep();
    }

    const qtyToAdd = selectedProduct.unitType === 'kg' ? weightKg : quantity;
    onAddToCart(selectedProduct, qtyToAdd, currentUnitPrice);

    setRecentScannedNotice(`✓ Adicionado: ${selectedProduct.name}`);
    setTimeout(() => setRecentScannedNotice(null), 2500);
  };

  // Filtered products for quick simulation shelf
  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ean.includes(searchTerm)
  );

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-white select-none">
      {/* Dynamic Feedback Banner */}
      <div className="p-3 bg-neutral-800/90 border-b border-neutral-700/80">
        <MascotKet mood={mascotMood} message={mascotMsg} compact />
      </div>

      {/* Camera / Viewfinder Box (Screen 05 & 07 in Matheus's UX case) */}
      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[220px] max-h-[340px]">
        {cameraActive ? (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full">
            <img
              src={scannerBgImg}
              alt="Gôndola de supermercado para escanear"
              className="w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
          </div>
        )}

        {/* Viewfinder Target Reticle */}
        <div className="absolute inset-x-8 inset-y-6 pointer-events-none flex flex-col items-center justify-center">
          <div className="relative w-64 h-48 rounded-2xl border-2 border-white/60 shadow-2xl flex items-center justify-center backdrop-contrast-125">
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br-lg" />

            {/* Animated Laser Scanning Line */}
            {isScanningActive && (
              <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_12px_#ff7a00] animate-scan-laser" />
            )}

            {/* Scan text prompt */}
            <div className="text-center px-4">
              <Barcode className="w-8 h-8 text-white/70 mx-auto mb-1 animate-pulse" />
              <span className="text-[11px] font-bold text-white tracking-wide drop-shadow-md">
                Alinhe o código de barras
              </span>
            </div>
          </div>
        </div>

        {/* Scanner HUD controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          {/* Quick Smart Tools: Comparador & Checklist */}
          <div className="flex items-center gap-1.5">
            {onOpenComparator && (
              <button
                type="button"
                onClick={onOpenComparator}
                className="flex items-center gap-1 text-[11px] font-bold bg-neutral-900/80 hover:bg-neutral-800 text-amber-300 border border-amber-400/40 px-2.5 py-1.5 rounded-xl shadow-md backdrop-blur-md transition-all active:scale-95"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Comparar g/ml</span>
              </button>
            )}

            {onOpenPlannedList && (
              <button
                type="button"
                onClick={onOpenPlannedList}
                className="flex items-center gap-1 text-[11px] font-bold bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-600 px-2.5 py-1.5 rounded-xl shadow-md backdrop-blur-md transition-all active:scale-95"
              >
                <span>Checklist</span>
                {plannedCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-orange-600 text-white text-[9px] flex items-center justify-center font-bold">
                    {plannedCount}
                  </span>
                )}
              </button>
            )}
          </div>

          <button
            onClick={() => setTorchOn(!torchOn)}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              torchOn ? 'bg-orange-500 text-white' : 'bg-black/50 text-white/80 hover:bg-black/70'
            }`}
            title="Lanterna"
            aria-label="Lanterna"
          >
            <Flashlight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Scanned Toast */}
        {recentScannedNotice && (
          <div className="absolute bottom-3 left-4 right-4 bg-orange-600/95 text-white text-xs font-semibold py-1.5 px-3 rounded-xl text-center shadow-lg backdrop-blur-sm animate-fade-in">
            {recentScannedNotice}
          </div>
        )}
      </div>

      {/* Selected Product Bottom Confirmation Drawer (Screen 07 from Matheus Lemes) */}
      {selectedProduct && (
        <div className="bg-white text-neutral-900 rounded-t-3xl p-4 shadow-2xl border-t border-orange-200">
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-2xl bg-orange-50 border border-orange-200 shrink-0">
                {selectedProduct.imageEmoji}
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block">
                  {selectedProduct.brand} · {selectedProduct.category}
                </span>
                <h3 className="text-base font-extrabold text-neutral-900 leading-tight">
                  {selectedProduct.name}
                </h3>
                <span className="text-xs text-neutral-500 font-mono">
                  EAN: {selectedProduct.ean}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-neutral-400 block uppercase font-bold">
                Preço Unit.
              </span>
              <span className="text-base font-extrabold text-neutral-900 tabular-nums">
                R$ {currentUnitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              {selectedProduct.unitType === 'kg' && (
                <span className="text-[10px] text-neutral-500 block">por kg</span>
              )}
            </div>
          </div>

          {/* Quantity or Weight Selector (Autonomy & Fruit/Veg control as researched by Matheus) */}
          <div className="flex items-center justify-between bg-neutral-50 rounded-2xl p-2.5 border border-neutral-200 mb-3">
            <div className="flex items-center gap-1.5">
              {selectedProduct.unitType === 'kg' ? (
                <Scale className="w-4 h-4 text-orange-600" />
              ) : (
                <span className="text-xs font-bold text-neutral-600 uppercase">Quantidade:</span>
              )}
              <span className="text-xs font-semibold text-neutral-800">
                {selectedProduct.unitType === 'kg'
                  ? `${weightKg.toFixed(3).replace('.', ',')} kg (Hortifruti)`
                  : `${quantity} ${quantity === 1 ? 'unidade' : 'unidades'}`}
              </span>
            </div>

            {selectedProduct.unitType === 'kg' ? (
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.05"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                  className="w-24 accent-orange-600"
                />
                <span className="font-mono text-xs font-bold text-neutral-900 tabular-nums w-14 text-right">
                  {weightKg.toFixed(2)}kg
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white border border-neutral-200 text-neutral-700 flex items-center justify-center font-bold hover:bg-neutral-100 active:scale-95 transition-all shadow-xs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-black w-6 text-center tabular-nums">
                  {quantity}x
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white border border-neutral-200 text-neutral-700 flex items-center justify-center font-bold hover:bg-neutral-100 active:scale-95 transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Subtotal of this item */}
          <div className="flex items-center justify-between text-xs text-neutral-600 mb-3 px-1">
            <span>Subtotal deste item:</span>
            <span className="text-sm font-black text-neutral-900 tabular-nums">
              R$ {currentItemSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Action CTAs (OK Confirma + Ver Lista - Screen 07 layout) */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onViewCart}
              className="h-12 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
            >
              <List className="w-4 h-4 text-neutral-600" />
              <span>Ver Lista</span>
            </button>

            <button
              onClick={handleConfirmAdd}
              className="h-12 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 active:scale-[0.98] transition-all"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>OK Adicionar</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Grocery Shelf Simulator for 1-tap scanning test */}
      <div className="bg-neutral-900 border-t border-neutral-800 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-orange-500" />
            Prateleira Virtual (Toque para simular código)
          </span>
          <span className="text-[10px] text-neutral-500">
            {filteredProducts.length} itens disponíveis
          </span>
        </div>

        {/* Quick Search */}
        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar produto por nome ou EAN..."
            className="w-full pl-8 pr-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Scrollable quick product tags */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filteredProducts.slice(0, 8).map((prod) => {
            const isSelected = selectedProduct?.id === prod.id;
            const price = getProductPrice(prod);
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => handleSelectProduct(prod)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs whitespace-nowrap shrink-0 transition-all border ${
                  isSelected
                    ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-600 hover:bg-neutral-750'
                }`}
              >
                <span>{prod.imageEmoji}</span>
                <span className="font-semibold truncate max-w-[110px]">{prod.name}</span>
                <span className="font-mono text-[10px] opacity-80">
                  R${price.toFixed(2)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
