/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Product,
  Market,
  CartItem,
  ShoppingTrip,
  ScreenId,
  PlannedItem,
  UserProfile,
  SplitType,
} from './types';
import { MARKETS, PRODUCTS, INITIAL_PAST_TRIPS } from './data/mockData';
import { HeaderHUD } from './components/HeaderHUD';
import { BottomNavBar } from './components/BottomNavBar';
import { OnboardingView } from './components/OnboardingView';
import { BudgetSetupView } from './components/BudgetSetupView';
import { MarketSelectView } from './components/MarketSelectView';
import { ScannerView } from './components/ScannerView';
import { CartListView } from './components/CartListView';
import { CheckoutInsightsView } from './components/CheckoutInsightsView';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';
import { CaseStudyModal } from './components/CaseStudyModal';
import { UnitPriceComparatorModal } from './components/UnitPriceComparatorModal';
import { PlannedListDrawer } from './components/PlannedListDrawer';
import { SplitCartModal } from './components/SplitCartModal';
import { SmartSwapsModal } from './components/SmartSwapsModal';
import { ReceiptAuditModal } from './components/ReceiptAuditModal';
import { BehanceKitModal } from './components/BehanceKitModal';
import ketAvatarImg from './assets/images/ket_mascot_avatar_1790683656514.jpg';
import {
  Smartphone,
  Maximize2,
  BookOpen,
  Download,
} from 'lucide-react';

const INITIAL_PROFILE: UserProfile = {
  name: 'Matheus Lemes',
  email: 'matheusribeirolemes15@gmail.com',
  city: 'São Paulo, SP',
  monthlyBudget: 800,
  pixKey: 'matheusribeirolemes15@gmail.com',
  roommateName: 'Larissa / República',
  createdAt: 'Jun/2023',
  savingsGoal: 750.74, // DIEESE SP basic basket
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('onboarding');
  const [previousScreen, setPreviousScreen] = useState<ScreenId>('onboarding');
  const [market, setMarket] = useState<Market>(MARKETS[0]);
  const [budget, setBudget] = useState<number>(200);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => [
    {
      id: 'pre-1',
      product: PRODUCTS[0], // Nescau Cereal
      quantity: 1,
      unitPrice: 11.49,
      subtotal: 11.49,
      addedAt: Date.now() - 60000,
      splitType: 'shared',
    },
    {
      id: 'pre-2',
      product: PRODUCTS[1], // Café Pilão
      quantity: 1,
      unitPrice: 19.90,
      subtotal: 19.90,
      addedAt: Date.now() - 30000,
      splitType: 'me',
    },
    {
      id: 'pre-3',
      product: PRODUCTS[2], // Leite Integral
      quantity: 2,
      unitPrice: 5.49,
      subtotal: 10.98,
      addedAt: Date.now() - 10000,
      splitType: 'shared',
    },
  ]);
  const [trips, setTrips] = useState<ShoppingTrip[]>(INITIAL_PAST_TRIPS);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState<boolean>(false);
  const [isMobileFrameActive, setIsMobileFrameActive] = useState<boolean>(true);

  // New Modals State
  const [isComparatorOpen, setIsComparatorOpen] = useState<boolean>(false);
  const [isPlannedListOpen, setIsPlannedListOpen] = useState<boolean>(false);
  const [isSplitCartOpen, setIsSplitCartOpen] = useState<boolean>(false);
  const [isSmartSwapsOpen, setIsSmartSwapsOpen] = useState<boolean>(false);
  const [isReceiptAuditOpen, setIsReceiptAuditOpen] = useState<boolean>(false);
  const [isBehanceKitOpen, setIsBehanceKitOpen] = useState<boolean>(false);

  const [plannedItems, setPlannedItems] = useState<PlannedItem[]>([
    { id: 'plan-1', name: 'Nescau Cereal', checked: true },
    { id: 'plan-2', name: 'Café Torrado', checked: true },
    { id: 'plan-3', name: 'Leite Integral', checked: true },
    { id: 'plan-4', name: 'Pão de Forma', checked: false },
    { id: 'plan-5', name: 'Banana Prata', checked: false },
  ]);

  // Calculate cart total
  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  // Add product to cart
  const handleAddToCart = (product: Product, quantity: number, price: number) => {
    // Auto check matching planned item
    setPlannedItems((prev) =>
      prev.map((p) => {
        if (
          product.name.toLowerCase().includes(p.name.toLowerCase()) ||
          p.name.toLowerCase().includes(product.name.toLowerCase())
        ) {
          return { ...p, checked: true };
        }
        return p;
      })
    );

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.product.id === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          subtotal: newQty * price,
        };
        return updated;
      }
      return [
        {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          quantity,
          unitPrice: price,
          subtotal: quantity * price,
          addedAt: Date.now(),
          splitType: 'shared',
        },
        ...prev,
      ];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.unitPrice,
            }
          : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  // Update split type for cart item
  const handleUpdateSplitType = (itemId: string, splitType: SplitType) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, splitType } : i))
    );
  };

  // Apply smart swap
  const handleApplySwap = (oldItemId: string, newProduct: Product, newPrice: number) => {
    setCartItems((prev) =>
      prev.map((i) => {
        if (i.id === oldItemId) {
          return {
            ...i,
            product: newProduct,
            unitPrice: newPrice,
            subtotal: i.quantity * newPrice,
          };
        }
        return i;
      })
    );
    setIsSmartSwapsOpen(false);
  };

  // Finish shopping trip & save to history
  const handleFinalizeTrip = () => {
    if (cartItems.length === 0) return;

    const newTrip: ShoppingTrip = {
      id: `trip-${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      market,
      budget,
      items: [...cartItems],
      total,
      savings: Math.max(12.5, total * 0.12),
      status: 'completed',
    };

    setTrips((prev) => [newTrip, ...prev]);
    setCurrentScreen('checkout_insights');
  };

  // Reuse past trip
  const handleReuseTrip = (trip: ShoppingTrip) => {
    setCartItems(trip.items.length > 0 ? [...trip.items] : [...cartItems]);
    setMarket(trip.market);
    setBudget(trip.budget || 200);
    setCurrentScreen('cart_list');
  };

  // Reset cart for a new shopping trip
  const handleResetForNewTrip = () => {
    setCartItems([]);
    setCurrentScreen('budget_setup');
  };

  // Account Management
  const handleClearHistory = () => {
    setTrips([]);
    alert('Histórico de compras limpo com sucesso.');
  };

  const handleDeleteAccount = () => {
    // Irreversible account deletion
    setCartItems([]);
    setTrips([]);
    setPlannedItems([]);
    setProfile({
      name: 'Novo Usuário',
      email: '',
      city: 'São Paulo, SP',
      monthlyBudget: 500,
      pixKey: '',
      roommateName: 'Amigo(a)',
      createdAt: 'Novo',
      savingsGoal: 750.74,
    });
    setCurrentScreen('onboarding');
    alert('Sua conta e todos os dados foram apagados com sucesso.');
  };

  const handleCreateNewUser = (name: string, email: string) => {
    setProfile({
      name,
      email,
      city: 'São Paulo, SP',
      monthlyBudget: 600,
      pixKey: email,
      roommateName: 'Parceiro(a)',
      createdAt: new Date().toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
      savingsGoal: 750.74,
    });
    setCartItems([]);
    setTrips([]);
    setCurrentScreen('budget_setup');
  };

  const handleOpenProfile = () => {
    if (currentScreen !== 'profile') {
      setPreviousScreen(currentScreen);
      setCurrentScreen('profile');
    } else {
      setCurrentScreen(previousScreen);
    }
  };

  const handleBackFromProfile = () => {
    setCurrentScreen(previousScreen);
  };

  // Determine screen header title
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'onboarding':
        return '';
      case 'budget_setup':
        return 'Definir Teto';
      case 'market_select':
        return 'Localização';
      case 'scanner':
        return 'Leitor de Gôndola';
      case 'cart_list':
        return 'Minha Lista';
      case 'checkout_insights':
        return 'Resumo & Economia';
      case 'history':
        return 'Histórico';
      case 'profile':
        return 'Perfil';
    }
  };

  const showHeaderHUD =
    currentScreen !== 'onboarding' &&
    currentScreen !== 'history' &&
    currentScreen !== 'profile';

  const showBottomNav =
    currentScreen !== 'onboarding' &&
    currentScreen !== 'budget_setup' &&
    currentScreen !== 'checkout_insights';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-0 md:p-6 font-sans">
      {/* Desktop Companion Topbar / Showcase Banner */}
      <div className="hidden md:flex items-center justify-between w-full max-w-4xl mb-4 px-2 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-black text-sm text-orange-500 tracking-tight">
            <span className="text-xl">🐱</span>
            <span>KET · SUPERMERCADO</span>
          </div>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-400">
            Case de UX/UI por <strong>Matheus Lemes</strong> (EBAC)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCaseStudyOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-500/30 rounded-xl font-bold transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ver Pesquisa EBAC</span>
          </button>

          <button
            onClick={() => setIsMobileFrameActive(!isMobileFrameActive)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl transition-all"
            title="Alternar modo tela cheia / moldura mobile"
          >
            {isMobileFrameActive ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expandir Tela</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Moldura Mobile</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container: Mobile Frame or Full Fluid Responsive */}
      <div
        className={`w-full transition-all duration-300 flex flex-col bg-white text-neutral-900 overflow-hidden shadow-2xl relative ${
          isMobileFrameActive
            ? 'max-w-[420px] h-[100dvh] md:h-[860px] md:max-h-[92vh] md:rounded-[44px] md:border-[10px] md:border-neutral-800'
            : 'max-w-2xl h-[100dvh] md:h-[880px] md:rounded-3xl md:border border-neutral-700'
        }`}
      >
        {/* Mobile Top Speaker & Dynamic Island simulation (desktop only) */}
        {isMobileFrameActive && (
          <div className="hidden md:flex justify-center items-center pt-2 pb-1 bg-white select-none relative z-50">
            <div className="w-24 h-4 bg-neutral-900 rounded-full flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-950" />
            </div>
          </div>
        )}

        {/* Global Financial HUD & Status Bar */}
        {showHeaderHUD && (
          <HeaderHUD
            total={total}
            budget={budget}
            market={market}
            itemCount={cartItems.length}
            currentScreenTitle={getScreenTitle()}
            showBack={currentScreen !== 'scanner' && currentScreen !== 'market_select'}
            onBack={() => {
              if (currentScreen === 'cart_list') setCurrentScreen('scanner');
              else if (currentScreen === 'budget_setup') setCurrentScreen('onboarding');
              else if (currentScreen === 'market_select') setCurrentScreen('scanner');
            }}
            onOpenCart={() => setCurrentScreen('cart_list')}
            onOpenMarketSelect={() => setCurrentScreen('market_select')}
            onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
            onOpenProfile={handleOpenProfile}
          />
        )}

        {/* Screen Content Flow */}
        <main className="flex-1 overflow-y-auto relative flex flex-col">
          {currentScreen === 'onboarding' && (
            <OnboardingView
              onStart={() => setCurrentScreen('budget_setup')}
              onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
              onOpenProfile={handleOpenProfile}
            />
          )}

          {currentScreen === 'budget_setup' && (
            <BudgetSetupView
              initialBudget={budget}
              onConfirmBudget={(val) => {
                setBudget(val);
                setCurrentScreen('market_select');
              }}
              onSkip={() => {
                setBudget(0);
                setCurrentScreen('market_select');
              }}
            />
          )}

          {currentScreen === 'market_select' && (
            <MarketSelectView
              currentMarket={market}
              onSelectMarket={(newMarket) => setMarket(newMarket)}
              onProceedToScanner={() => setCurrentScreen('scanner')}
            />
          )}

          {currentScreen === 'scanner' && (
            <ScannerView
              currentMarket={market}
              total={total}
              budget={budget}
              onAddToCart={handleAddToCart}
              onViewCart={() => setCurrentScreen('cart_list')}
              onOpenComparator={() => setIsComparatorOpen(true)}
              onOpenPlannedList={() => setIsPlannedListOpen(true)}
              plannedCount={plannedItems.filter((i) => !i.checked).length}
            />
          )}

          {currentScreen === 'cart_list' && (
            <CartListView
              items={cartItems}
              market={market}
              total={total}
              budget={budget}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onReturnToScanner={() => setCurrentScreen('scanner')}
              onProceedToCheckout={handleFinalizeTrip}
              onOpenSplitCart={() => setIsSplitCartOpen(true)}
              onOpenSmartSwaps={() => setIsSmartSwapsOpen(true)}
            />
          )}

          {currentScreen === 'checkout_insights' && (
            <CheckoutInsightsView
              items={cartItems}
              market={market}
              total={total}
              budget={budget}
              onAddMoreProducts={() => setCurrentScreen('scanner')}
              onViewHistory={() => setCurrentScreen('history')}
              onViewMarkets={() => setCurrentScreen('market_select')}
              onSaveList={handleResetForNewTrip}
              onOpenReceiptAudit={() => setIsReceiptAuditOpen(true)}
            />
          )}

          {currentScreen === 'history' && (
            <HistoryView
              trips={trips}
              onBack={() => setCurrentScreen('scanner')}
              onReuseTrip={handleReuseTrip}
              onOpenProfile={handleOpenProfile}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileView
              profile={profile}
              trips={trips}
              onUpdateProfile={(updated) => setProfile(updated)}
              onClearHistory={handleClearHistory}
              onDeleteAccount={handleDeleteAccount}
              onCreateNewUser={handleCreateNewUser}
              onOpenBehanceKit={() => setIsBehanceKitOpen(true)}
              onBack={handleBackFromProfile}
            />
          )}
        </main>

        {/* Bottom Tab Bar */}
        {showBottomNav && (
          <BottomNavBar
            currentScreen={currentScreen}
            itemCount={cartItems.length}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
          />
        )}
      </div>

      {/* Case Study Modal with Complete EBAC UX Research */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />

      {/* Unit Price Comparator Modal (Reduflação / Custo por Grama/Litro) */}
      <UnitPriceComparatorModal
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
      />

      {/* Planned Shopping List Checklist Drawer */}
      <PlannedListDrawer
        isOpen={isPlannedListOpen}
        onClose={() => setIsPlannedListOpen(false)}
        plannedItems={plannedItems}
        cartItems={cartItems}
        onAddPlannedItem={(name) =>
          setPlannedItems((prev) => [
            ...prev,
            { id: `plan-${Date.now()}`, name, checked: false },
          ])
        }
        onTogglePlannedItem={(id) =>
          setPlannedItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
          )
        }
        onRemovePlannedItem={(id) =>
          setPlannedItems((prev) => prev.filter((i) => i.id !== id))
        }
      />

      {/* Split Cart Modal (Divisão de Conta / Rateio Pix) */}
      <SplitCartModal
        isOpen={isSplitCartOpen}
        onClose={() => setIsSplitCartOpen(false)}
        cartItems={cartItems}
        profile={profile}
        onUpdateSplitType={handleUpdateSplitType}
      />

      {/* Smart Swaps Modal (Trocas Econômicas do Ket) */}
      <SmartSwapsModal
        isOpen={isSmartSwapsOpen}
        onClose={() => setIsSmartSwapsOpen(false)}
        cartItems={cartItems}
        onApplySwap={handleApplySwap}
      />

      {/* Receipt Audit Modal (Auditor de Caixa NFC-e / Danfe Procon) */}
      <ReceiptAuditModal
        isOpen={isReceiptAuditOpen}
        onClose={() => setIsReceiptAuditOpen(false)}
        cartItems={cartItems}
        market={market}
      />

      {/* Behance Kit & Project Download Modal */}
      <BehanceKitModal
        isOpen={isBehanceKitOpen}
        onClose={() => setIsBehanceKitOpen(false)}
      />
    </div>
  );
}
