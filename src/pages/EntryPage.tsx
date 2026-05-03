import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Store, Users, ShieldCheck,
  ChevronRight, MapPin, TrendingUp, Award
} from 'lucide-react';

type Role = 'consumer' | 'merchant' | 'partner' | 'admin';

interface RoleCard {
  key: Role;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  route: string;
  features: string[];
}

const roles: RoleCard[] = [
  {
    key: 'consumer',
    title: '消费者',
    subtitle: '发现各地好物',
    icon: ShoppingBag,
    color: '#e63946',
    bgColor: '#fef2f2',
    route: '/user/home',
    features: ['地图探索', '内容发现', '好物购买'],
  },
  {
    key: 'merchant',
    title: '商家',
    subtitle: '内容带货管理',
    icon: Store,
    color: '#2a9d8f',
    bgColor: '#e6f7f5',
    route: '/merchant/dashboard',
    features: ['内容管理', '商品关联', '数据分析'],
  },
  {
    key: 'partner',
    title: '合伙人',
    subtitle: '区域推广运营',
    icon: Users,
    color: '#3a86ff',
    bgColor: '#e8f1ff',
    route: '/partner/dashboard',
    features: ['区域管理', '团队运营', '收益统计'],
  },
  {
    key: 'admin',
    title: '平台运营',
    subtitle: '系统管理审核',
    icon: ShieldCheck,
    color: '#f4a261',
    bgColor: '#fff4e6',
    route: '/admin/content',
    features: ['内容审核', '用户管理', '数据报表'],
  },
];

const stats = [
  { label: '覆盖省份', value: '23', icon: MapPin },
  { label: '优质内容', value: '37+', icon: TrendingUp },
  { label: '认证商家', value: '21+', icon: Award },
];

export default function EntryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)] flex flex-col" style={{ maxWidth: 430, margin: '0 auto' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#e63946] via-[#e63946] to-[#f4a261] px-6 pt-12 pb-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/80 text-sm font-medium">v2.0 地图获客版</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            云蓬地图
          </h1>
          <p className="text-white/80 text-sm leading-relaxed">
            以地图为载体，助农为核心<br />
            发现中国各地风物好物与人文活动
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-4 mt-6"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <s.icon className="w-3 h-3 text-white/70" />
                <span className="text-white/70 text-[10px]">{s.label}</span>
              </div>
              <div className="text-white font-bold text-lg">{s.value}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Role Selection */}
      <div className="flex-1 px-5 py-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-[var(--text-tertiary)] mb-4 font-medium"
        >
          选择您的身份进入
        </motion.p>

        <div className="space-y-3">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.08, duration: 0.35 }}
                className="w-full text-left rounded-2xl border transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: 'white',
                  borderColor: '#e8e8e8',
                  padding: '16px',
                }}
                onClick={() => navigate(role.route)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: role.bgColor }}
                  >
                    <Icon className="w-6 h-6" style={{ color: role.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-[15px] font-semibold text-[var(--text-primary)]">
                        {role.title}
                      </h3>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: role.bgColor, color: role.color }}
                      >
                        {role.subtitle}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-1.5">
                      {role.features.map((f) => (
                        <span key={f} className="text-[11px] text-[var(--text-tertiary)]">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 shrink-0 text-[#d0d0d0]" />
                </div>
              </motion.button>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-[var(--text-tertiary)] mt-8">
          云蓬地图 v2.0 · 军创助农地图获客平台
        </p>
      </div>
    </div>
  );
}
