import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ShoppingBag, Heart, MapPin, Settings,
  ChevronRight, User, CreditCard, Bell, HelpCircle,
  LogOut, Users
} from 'lucide-react';
import { useState } from 'react';

const menuGroups = [
  {
    title: '我的服务',
    items: [
      { icon: ShoppingBag, label: '我的订单', desc: '查看全部订单', route: '/user/cart' },
      { icon: Heart, label: '我的收藏', desc: '3 件收藏', route: '' },
      { icon: MapPin, label: '收货地址', desc: '管理地址', route: '' },
      { icon: CreditCard, label: '优惠券', desc: '2 张可用', route: '' },
    ],
  },
  {
    title: '更多功能',
    items: [
      { icon: Users, label: '切换身份', desc: '消费者 / 商家 / 合伙人 / 运营', route: '/' },
      { icon: Bell, label: '消息通知', desc: '', route: '' },
      { icon: HelpCircle, label: '帮助中心', desc: '', route: '' },
      { icon: Settings, label: '设置', desc: '', route: '' },
    ],
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [showRoleSwitch, setShowRoleSwitch] = useState(false);

  const handleMenuClick = (route: string) => {
    if (route) {
      navigate(route);
    }
  };

  const roles = [
    { key: 'consumer', title: '消费者', route: '/user/home', color: '#e63946', bg: '#fef2f2' },
    { key: 'merchant', title: '商家', route: '/merchant/dashboard', color: '#2a9d8f', bg: '#e6f7f5' },
    { key: 'partner', title: '合伙人', route: '/partner/dashboard', color: '#3a86ff', bg: '#e8f1ff' },
    { key: 'admin', title: '平台运营', route: '/admin/content', color: '#f4a261', bg: '#fff4e6' },
  ];

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]" style={{ maxWidth: 430, margin: '0 auto' }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#e63946] to-[#f4a261] px-5 pt-6 pb-8">
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">个人中心</h1>
          <button onClick={() => navigate('/')} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20">
            <LogOut className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">探索者</h2>
            <p className="text-white/70 text-sm">ID: 888888 · 普通会员</p>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mt-5"
        >
          {[
            { label: '收藏', value: '3' },
            { label: '足迹', value: '12' },
            { label: '订单', value: '5' },
          ].map(s => (
            <div key={s.label} className="flex-1 bg-white/15 rounded-xl px-3 py-2.5 text-center">
              <p className="text-white font-bold text-lg">{s.value}</p>
              <p className="text-white/70 text-[10px]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Menu Groups */}
      <div className="px-4 -mt-3">
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-4">
            <h3 className="text-xs text-[var(--text-tertiary)] mb-2 px-1">{group.title}</h3>
            <div className="bg-white rounded-2xl shadow-sm">
              {group.items.map((item, ii) => {
                const Icon = item.icon;
                const isLast = ii === group.items.length - 1;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.label === '切换身份') {
                        setShowRoleSwitch(true);
                      } else {
                        handleMenuClick(item.route);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${!isLast ? 'border-b border-[var(--divider)]' : ''}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center shrink-0">
                      <Icon size={18} color="var(--text-primary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                      {item.desc && <p className="text-[11px] text-[var(--text-tertiary)]">{item.desc}</p>}
                    </div>
                    <ChevronRight size={16} color="var(--text-tertiary)" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Role Switch Bottom Sheet */}
      {showRoleSwitch && (
        <div
          className="fixed inset-0 z-[200] bg-black/40"
          onClick={() => setShowRoleSwitch(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-5"
            style={{ maxWidth: 430, margin: '0 auto' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[var(--text-primary)]">切换身份</h3>
              <button onClick={() => setShowRoleSwitch(false)} className="text-sm text-[var(--text-tertiary)]">关闭</button>
            </div>
            <div className="space-y-3">
              {roles.map(role => (
                <button
                  key={role.key}
                  onClick={() => { setShowRoleSwitch(false); navigate(role.route); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-[0.98]"
                  style={{ borderColor: '#e8e8e8', background: role.bg }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: role.bg }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ background: role.color }} />
                  </div>
                  <span className="flex-1 text-left text-sm font-medium text-[var(--text-primary)]">{role.title}</span>
                  <ChevronRight size={16} color="var(--text-tertiary)" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      <div className="h-6" />
    </div>
  );
}
