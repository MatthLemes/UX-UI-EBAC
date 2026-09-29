import React from 'react';
import { ScreenId } from '../types';
import { ScanLine, ShoppingBag, Store, History, User } from 'lucide-react';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  itemCount: number;
  onNavigate: (screen: ScreenId) => void;
  onOpenCaseStudy: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  itemCount,
  onNavigate,
  onOpenCaseStudy,
}) => {
  const tabs = [
    {
      id: 'scanner' as ScreenId,
      label: 'Escanear',
      icon: ScanLine,
    },
    {
      id: 'cart_list' as ScreenId,
      label: 'Lista',
      icon: ShoppingBag,
      badge: itemCount,
    },
    {
      id: 'market_select' as ScreenId,
      label: 'Mercado',
      icon: Store,
    },
    {
      id: 'history' as ScreenId,
      label: 'Histórico',
      icon: History,
    },
    {
      id: 'profile' as ScreenId,
      label: 'Perfil',
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="Navegação Principal"
      className="sticky bottom-0 z-40 w-full bg-white/95 backdrop-blur-md border-t border-neutral-200 px-1 py-1 shadow-lg"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          const IconComponent = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive ? 'text-orange-600 font-bold' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <div className="relative">
                <IconComponent className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : ''}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2.5 bg-orange-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
