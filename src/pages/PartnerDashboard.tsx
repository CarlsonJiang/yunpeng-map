import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Users, TrendingUp, DollarSign, MapPin,
  BarChart3, Share2, Award
} from 'lucide-react';

const mockData = {
  regionName: '华东地区',
  teamCount: 24,
  totalIncome: 45680,
  monthlyGrowth: 12.5,
  promoteLinks: 3,
  subordinates: 8,
};

const quickActions = [
  { label: '区域管理', icon: MapPin, desc: '管理辖区商家' },
  { label: '团队管理', icon: Users, desc: `${mockData.teamCount}人团队` },
  { label: '收益管理', icon: DollarSign, desc: '查看收益明细' },
  { label: '推广工具', icon: Share2, desc: `${mockData.promoteLinks}个推广链接` },
];

export default function PartnerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-white" style={{ maxWidth: 430, margin: '0 auto' }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3a86ff] to-[#2a9d8f] px-5 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/')} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">合伙人中心</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">李合伙人</h2>
            <p className="text-white/70 text-sm">{mockData.regionName} · 高级合伙人</p>
          </div>
        </div>

        {/* Income Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 bg-white/15 backdrop-blur-sm rounded-2xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs mb-1">本月累计收益</p>
              <p className="text-white text-2xl font-bold">¥{mockData.totalIncome.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-2.5 py-1">
              <TrendingUp className="w-3 h-3 text-white" />
              <span className="text-white text-xs">+{mockData.monthlyGrowth}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 -mt-4">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-elevated)] active:scale-[0.97] transition-transform text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#e8f1ff] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#3a86ff]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{action.label}</p>
                    <p className="text-[11px] text-[var(--text-tertiary)]">{action.desc}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mt-5">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">本月数据</h3>
        <div className="space-y-3">
          {[
            { label: '新增商家', value: '6', change: '+2' },
            { label: '内容转化', value: '234', change: '+45' },
            { label: '团队活跃度', value: '92%', change: '+5%' },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between py-3 border-b border-[var(--divider)]">
              <span className="text-sm text-[var(--text-secondary)]">{s.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--text-primary)]">{s.value}</span>
                <span className="text-xs text-green-500">{s.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--divider)] flex items-center justify-around py-2 z-50" style={{ maxWidth: 430, margin: '0 auto' }}>
        <button onClick={() => navigate('/partner/dashboard')} className="flex flex-col items-center gap-0.5">
          <BarChart3 size={20} color="var(--accent)" />
          <span className="text-[10px]" style={{ color: 'var(--accent)' }}>首页</span>
        </button>
        <button onClick={() => {}} className="flex flex-col items-center gap-0.5">
          <Users size={20} color="var(--text-tertiary)" />
          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>团队</span>
        </button>
        <button onClick={() => {}} className="flex flex-col items-center gap-0.5">
          <DollarSign size={20} color="var(--text-tertiary)" />
          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>收益</span>
        </button>
        <button onClick={() => {}} className="flex flex-col items-center gap-0.5">
          <MapPin size={20} color="var(--text-tertiary)" />
          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>我的</span>
        </button>
      </div>
      <div className="h-16" />
    </div>
  );
}
