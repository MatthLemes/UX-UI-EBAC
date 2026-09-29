import React, { useState } from 'react';
import { UserProfile, ShoppingTrip } from '../types';
import ketAvatarImg from '../assets/images/ket_mascot_avatar_1790683656514.jpg';
import ketCelebrationImg from '../assets/images/ket_celebrating_1790683668177.jpg';
import { MascotKet } from './MascotKet';
import {
  User,
  Mail,
  MapPin,
  Wallet,
  PiggyBank,
  Award,
  Key,
  Trash2,
  UserPlus,
  RefreshCw,
  LogOut,
  Edit3,
  Check,
  AlertTriangle,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  trips: ShoppingTrip[];
  onUpdateProfile: (updated: UserProfile) => void;
  onClearHistory: () => void;
  onDeleteAccount: () => void;
  onCreateNewUser: (name: string, email: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  trips,
  onUpdateProfile,
  onClearHistory,
  onDeleteAccount,
  onCreateNewUser,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editCity, setEditCity] = useState(profile.city);
  const [editPixKey, setEditPixKey] = useState(profile.pixKey);
  const [editRoommate, setEditRoommate] = useState(profile.roommateName);
  const [editMonthlyBudget, setEditMonthlyBudget] = useState(profile.monthlyBudget.toString());

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const totalSaved = trips.reduce((sum, t) => sum + t.savings, 0);
  const savingsPctOfCestaBasica = Math.min(100, (totalSaved / profile.savingsGoal) * 100);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name: editName,
      email: editEmail,
      city: editCity,
      pixKey: editPixKey,
      roommateName: editRoommate,
      monthlyBudget: parseFloat(editMonthlyBudget) || profile.monthlyBudget,
    });
    setIsEditing(false);
  };

  const handleCreateNewUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    onCreateNewUser(newUserName.trim(), newUserEmail.trim());
    setShowNewUserModal(false);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50 text-neutral-900 select-none overflow-y-auto">
      {/* Profile Header */}
      <div className="p-5 bg-gradient-to-b from-orange-500 to-orange-600 text-white relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-200">
            Meu Perfil & Preferências
          </span>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1 text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancelar' : 'Editar'}</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/80 shadow-md bg-white shrink-0">
            <img
              src={ketAvatarImg}
              alt="Avatar do Usuário"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-black tracking-tight leading-tight truncate">
              {profile.name}
            </h2>
            <p className="text-xs text-orange-100 flex items-center gap-1.5 mt-0.5 truncate">
              <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span className="truncate">{profile.email}</span>
            </p>
            <p className="text-[11px] text-orange-200 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{profile.city}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Edit Form Drawer */}
        {isEditing && (
          <form
            onSubmit={handleSaveProfile}
            className="p-4 bg-white rounded-3xl border border-orange-300 shadow-sm space-y-3 animate-fade-in"
          >
            <h4 className="text-xs font-black uppercase text-orange-600 tracking-wider">
              Editar Dados Pessoais
            </h4>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Nome Completo</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-900 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Email</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-900 outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Cidade / UF</label>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-900 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Teto Mensal (R$)</label>
                <input
                  type="number"
                  value={editMonthlyBudget}
                  onChange={(e) => setEditMonthlyBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-900 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Chave Pix para Rateio</label>
              <input
                type="text"
                value={editPixKey}
                onChange={(e) => setEditPixKey(e.target.value)}
                placeholder="CPF, Email, Telefone ou Aleatória"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-900 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Nome do(a) Parceiro(a) de Rateio</label>
              <input
                type="text"
                value={editRoommate}
                onChange={(e) => setEditRoommate(e.target.value)}
                placeholder="Ex: Luiza, República, Amor"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-900 outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl text-xs font-semibold"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Gamification: Cofrinho do Ket */}
        <div className="p-4 bg-white rounded-3xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <PiggyBank className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-neutral-900 uppercase tracking-tight">
                  Cofrinho do Ket · Gamificação
                </h4>
                <span className="text-[10px] font-semibold text-emerald-600">
                  Nível 3: Mestre da Gôndola 🏆
                </span>
              </div>
            </div>
            <span className="text-xs font-extrabold text-neutral-900 tabular-nums">
              R$ {totalSaved.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Progress Bar towards 1 DIEESE Basket */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-neutral-500">
              <span>Meta: 1 Cesta Básica DIEESE (R$ {profile.savingsGoal.toFixed(2).replace('.', ',')})</span>
              <span className="font-bold text-neutral-800">{savingsPctOfCestaBasica.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${savingsPctOfCestaBasica}%` }}
              />
            </div>
          </div>

          {/* Unlocked Badges */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-neutral-100 text-center">
            <div className="p-2 rounded-xl bg-orange-50 text-[10px] font-semibold text-orange-800">
              <span className="text-base block">🐱</span>
              Primeiro Pulo
            </div>
            <div className="p-2 rounded-xl bg-emerald-50 text-[10px] font-semibold text-emerald-800">
              <span className="text-base block">🎯</span>
              Dentro do Teto
            </div>
            <div className="p-2 rounded-xl bg-amber-50 text-[10px] font-semibold text-amber-800">
              <span className="text-base block">⚖️</span>
              Anti-Reduflação
            </div>
          </div>
        </div>

        {/* Rateio & Pix Settings */}
        <div className="p-4 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-2.5">
          <h4 className="text-xs font-black uppercase text-neutral-400 tracking-wider">
            Configurações de Rateio
          </h4>

          <div className="flex items-center justify-between text-xs py-1 border-b border-neutral-100">
            <span className="text-neutral-500">Chave Pix padrão:</span>
            <span className="font-mono font-bold text-neutral-900 truncate max-w-[170px]">
              {profile.pixKey}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-b border-neutral-100">
            <span className="text-neutral-500">Parceiro(a) frequente:</span>
            <span className="font-bold text-neutral-900">
              {profile.roommateName}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-neutral-500">Teto mensal estipulado:</span>
            <span className="font-bold text-orange-600">
              R$ {profile.monthlyBudget.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        {/* Account Management Actions */}
        <div className="p-4 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <h4 className="text-xs font-black uppercase text-neutral-400 tracking-wider mb-2">
            Gerenciamento de Conta
          </h4>

          {/* Create new / Switch user */}
          <button
            type="button"
            onClick={() => setShowNewUserModal(true)}
            className="w-full p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-left flex items-center justify-between text-xs font-bold text-neutral-800 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <UserPlus className="w-4 h-4 text-orange-600" />
              <span>Criar Nova Conta / Alternar Usuário</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          {/* Clear trip history */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Deseja limpar todo o histórico de compras anteriores? O perfil será mantido.')) {
                onClearHistory();
              }
            }}
            className="w-full p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-left flex items-center justify-between text-xs font-bold text-neutral-800 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-neutral-600" />
              <span>Limpar Histórico de Compras</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          {/* Delete Account (Critical Feature Requested) */}
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="w-full p-3 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 text-left flex items-center justify-between text-xs font-bold text-red-700 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>Apagar Minha Conta e Todos os Dados</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-red-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-black text-neutral-900 leading-tight">
                Apagar Conta Permanentemente?
              </h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Essa ação é irreversível. Todos os seus dados de perfil ({profile.name}), compras salvas, cofrinho do Ket e preferências serão excluídos do dispositivo.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  onDeleteAccount();
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-bold shadow-md transition-all text-center"
              >
                Sim, Apagar Minha Conta
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-2xl text-xs font-semibold transition-all text-center"
              >
                Cancelar e Manter Conta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New User Modal */}
      {showNewUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateNewUserSubmit}
            className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-neutral-200 space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-neutral-900">Criar Nova Conta Ket</h3>
              <button
                type="button"
                onClick={() => setShowNewUserModal(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              Cadastre um novo usuário para testar ou compartilhar o celular com outra pessoa.
            </p>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Nome</label>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Ex: Larissa Silva"
                required
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-900 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Email</label>
              <input
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="Ex: larissa@email.com"
                required
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-900 outline-none focus:border-orange-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl text-xs font-bold shadow-md transition-all"
              >
                Cadastrar e Entrar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
