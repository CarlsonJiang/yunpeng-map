import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingBag, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import ZoomableChinaMap from '@/components/ZoomableChinaMap';
import { provinceData, activityData } from '@/data/mockData';

type MapTab = 'specialty' | 'activity';

export default function MapPage() {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<MapTab>('specialty');

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]" style={{ maxWidth: 430, margin: '0 auto' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3">
        <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
          <ArrowLeft size={20} color="var(--text-primary)" />
        </button>
        <h1 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>云蓬地图</h1>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
          <Search size={18} color="var(--text-primary)" />
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex px-4 pt-2 pb-1 bg-white border-b border-[var(--divider)]">
        <button
          onClick={() => setActiveTab('specialty')}
          className="flex-1 pb-2.5 text-center text-sm font-medium relative transition-colors"
          style={{ color: activeTab === 'specialty' ? '#e63946' : 'var(--text-tertiary)' }}
        >
          <div className="flex items-center justify-center gap-1.5">
            <ShoppingBag size={15} />
            各地特产
          </div>
          {activeTab === 'specialty' && (
            <motion.div layoutId="mapTab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#e63946] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className="flex-1 pb-2.5 text-center text-sm font-medium relative transition-colors"
          style={{ color: activeTab === 'activity' ? '#e63946' : 'var(--text-tertiary)' }}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Calendar size={15} />
            人文活动
          </div>
          {activeTab === 'activity' && (
            <motion.div layoutId="mapTab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#e63946] rounded-full" />
          )}
        </button>
      </div>

      {/* Map */}
      <ZoomableChinaMap
        height="58vh"
        selectedProvince={selectedProvince}
        onProvinceSelect={setSelectedProvince}
      />

      {/* Province Quick Select */}
      <div className="flex gap-2 overflow-x-auto px-4 py-2 bg-white border-b border-[var(--divider)]">
        <button
          onClick={() => setSelectedProvince(null)}
          className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
          style={{
            background: selectedProvince === null ? '#e63946' : '#f5f5f5',
            color: selectedProvince === null ? 'white' : '#666',
          }}
        >
          全部
        </button>
        {provinceData.filter(p => p.count > 0).map(p => (
          <button
            key={p.id}
            onClick={() => { setSelectedProvince(p.id); navigate(`/user/province/${p.id}`); }}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
            style={{
              background: selectedProvince === p.id ? '#e63946' : '#f5f5f5',
              color: selectedProvince === p.id ? 'white' : '#666',
            }}
          >
            {p.name}·{p.specialty}
          </button>
        ))}
      </div>

      {/* Activity list when tab is activity */}
      {activeTab === 'activity' && (
        <div className="px-4 pt-3 pb-6">
          <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--divider)' }}>
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>热门活动</h2>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{activityData.length} 个活动</span>
          </div>
          <div className="mt-3 space-y-3">
            {activityData.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex gap-3 p-3 rounded-2xl bg-white border border-[#eee]"
              >
                <img src={activity.coverImage} alt={activity.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-[13px] font-semibold text-[var(--text-primary)] line-clamp-1">{activity.title}</h4>
                    {activity.isHot && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#fef2f2] text-[#e63946] shrink-0">热门</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 line-clamp-1">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] text-[#e63946] font-medium">{activity.price > 0 ? `¥${activity.price}` : '免费'}</span>
                    <span className="text-[11px] text-[var(--text-tertiary)]">· {activity.provinceName} · {activity.cityName || ''}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      <div className="px-4 py-4 text-center">
        <p className="text-xs text-[var(--text-tertiary)]">点击省份查看详情，双击进入省份页面</p>
      </div>
    </div>
  );
}
