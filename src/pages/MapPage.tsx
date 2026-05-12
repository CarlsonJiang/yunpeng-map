import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronRight, Layers2, Search, ShieldCheck, ShoppingBag, Sparkles, Ticket, Users, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ZoomableChinaMap from '@/components/ZoomableChinaMap';
import { getUnifiedMapLayerItems, provinceData } from '@/data/mockData';
import type { ListingKind, MapLayerItem } from '@/types';

type MapTab = ListingKind | 'all';

const tabConfig: { key: MapTab; label: string; icon: typeof Layers2; color: string }[] = [
  { key: 'all', label: '综合图层', icon: Layers2, color: '#e63946' },
  { key: 'specialty', label: '特产助农', icon: ShoppingBag, color: '#16a34a' },
  { key: 'activity', label: '人文活动', icon: Calendar, color: '#f97316' },
];

export default function MapPage() {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<MapTab>('all');
  const [selectedItem, setSelectedItem] = useState<MapLayerItem | null>(null);

  const layerItems = useMemo(() => getUnifiedMapLayerItems('all'), []);
  const panelItems = useMemo(() => {
    const filtered = activeTab === 'all'
      ? layerItems
      : layerItems.filter(item => item.kind === activeTab);
    return filtered.slice(0, 16);
  }, [activeTab, layerItems]);

  const specialtyCount = layerItems.filter(item => item.kind === 'specialty').length;
  const activityCount = layerItems.filter(item => item.kind === 'activity').length;

  const goToItem = (item: MapLayerItem) => {
    if (item.sourceType === 'product') {
      navigate(`/user/product/${item.sourceId}`);
      return;
    }
    navigate(`/user/province/${item.provinceId}`);
  };

  return (
    <div className="relative min-h-[100dvh] bg-[var(--bg-page)]" style={{ maxWidth: 430, margin: '0 auto' }}>
      <div className="sticky top-0 z-50 bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
            <ArrowLeft size={20} color="var(--text-primary)" />
          </button>
          <div className="text-center">
            <h1 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>神州风采地图</h1>
            <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>特产助农 + 人文活动固定图层</p>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
            <Search size={18} color="var(--text-primary)" />
          </button>
        </div>

        <div className="mt-3 rounded-2xl bg-[var(--bg-page)] p-2">
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
            <Search size={16} color="var(--text-tertiary)" />
            <span className="flex-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>搜索产地、特产、人文活动</span>
            <Sparkles size={15} color="#8b5cf6" />
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {tabConfig.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
                  style={{
                    background: isActive ? tab.color : '#fff',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  <span className="inline-flex items-center gap-1">
                    <Icon size={13} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-3 pt-3">
        <ZoomableChinaMap
          height="56vh"
          selectedProvince={selectedProvince}
          onProvinceSelect={setSelectedProvince}
          layerItems={layerItems}
          activeLayer="all"
          onLayerItemSelect={setSelectedItem}
        />
      </div>

      <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
        {[
          { label: '助农点位', value: specialtyCount, color: '#16a34a', icon: ShoppingBag },
          { label: '人文活动', value: activityCount, color: '#f97316', icon: Calendar },
          { label: 'AI填充', value: '8', color: '#8b5cf6', icon: Sparkles },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl bg-white p-2 text-center">
            <stat.icon size={15} color={stat.color} className="mx-auto" />
            <div className="mt-1 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
            <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
        <button
          onClick={() => setSelectedProvince(null)}
          className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
          style={{
            background: selectedProvince === null ? '#e63946' : '#fff',
            color: selectedProvince === null ? 'white' : '#666',
          }}
        >
          全部省份
        </button>
        {provinceData.filter(p => p.count > 0).slice(0, 18).map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedProvince(p.id)}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
            style={{
              background: selectedProvince === p.id ? '#e63946' : '#fff',
              color: selectedProvince === p.id ? 'white' : '#666',
            }}
          >
            {p.name}·{p.specialty}
          </button>
        ))}
      </div>

      <div className="px-4 pb-28">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>地图结果</h2>
          <button
            onClick={() => navigate('/merchant/ai-batch-listing')}
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: '#8b5cf6' }}
          >
            <Sparkles size={13} /> AI批量上架
          </button>
        </div>
        <div className="space-y-2">
          {panelItems.map((item, index) => {
            const isSpecialty = item.kind === 'specialty';
            const color = isSpecialty ? '#16a34a' : '#f97316';
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => setSelectedItem(item)}
                className="flex w-full gap-3 rounded-2xl bg-white p-3 text-left shadow-sm"
              >
                <img src={item.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${color}18`, color }}>
                      {isSpecialty ? '特产助农' : '人文活动'}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                      {item.provinceName}{item.cityName ? ` · ${item.cityName}` : ''}
                    </span>
                  </div>
                  <h3 className="mt-1 line-clamp-1 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-4" style={{ color: 'var(--text-secondary)' }}>{item.subtitle}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color }}>{item.priceLabel}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>热力 {item.heatValue.toLocaleString()}</span>
                  </div>
                </div>
                <ChevronRight size={16} color="var(--text-tertiary)" className="mt-7" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-x-0 bottom-0 z-[80] mx-auto max-w-[430px] rounded-t-3xl bg-white p-4 shadow-[0_-12px_36px_rgba(15,23,42,0.18)]">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <img src={selectedItem.image} alt="" className="h-16 w-16 rounded-2xl object-cover" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      background: selectedItem.kind === 'specialty' ? '#dcfce7' : '#ffedd5',
                      color: selectedItem.kind === 'specialty' ? '#16a34a' : '#f97316',
                    }}
                  >
                    {selectedItem.statusLabel}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                    {selectedItem.provinceName}{selectedItem.cityName ? ` · ${selectedItem.cityName}` : ''}
                  </span>
                </div>
                <h3 className="mt-1 line-clamp-2 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{selectedItem.title}</h3>
                <p className="mt-1 text-xs font-semibold" style={{ color: 'var(--accent)' }}>{selectedItem.priceLabel}</p>
              </div>
            </div>
            <button onClick={() => setSelectedItem(null)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bg-page)]">
              <X size={16} color="var(--text-secondary)" />
            </button>
          </div>

          <p className="line-clamp-2 text-xs leading-5" style={{ color: 'var(--text-secondary)' }}>{selectedItem.subtitle}</p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-[var(--bg-page)] px-2 py-2">
              <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}><ShieldCheck size={11} /> 溯源</div>
              <div className="mt-1 truncate text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedItem.traceabilityLabel || '活动认证'}</div>
            </div>
            <div className="rounded-xl bg-[var(--bg-page)] px-2 py-2">
              <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}><Users size={11} /> 拼团</div>
              <div className="mt-1 truncate text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedItem.groupLabel || '参与热度高'}</div>
            </div>
            <div className="rounded-xl bg-[var(--bg-page)] px-2 py-2">
              <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}><Ticket size={11} /> 优惠</div>
              <div className="mt-1 truncate text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedItem.couponLabel || '领券可用'}</div>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => goToItem(selectedItem)}
              className="flex-1 rounded-xl py-2.5 text-sm font-bold"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {selectedItem.sourceType === 'product' ? '立即购买' : '查看活动'}
            </button>
            <button
              onClick={() => setSelectedItem(null)}
              className="w-24 rounded-xl py-2.5 text-sm font-semibold"
              style={{ background: 'var(--bg-page)', color: 'var(--text-secondary)' }}
            >
              继续看图
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
