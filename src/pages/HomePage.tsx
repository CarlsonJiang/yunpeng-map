import { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, ChevronDown, Search, Bell, ShoppingBag, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import ZoomableChinaMap from '@/components/ZoomableChinaMap';
import FilterPills from '@/components/FilterPills';
import ContentCard from '@/components/ContentCard';
import { provinceData, mockContentItems, getContentsByProvince, activityData } from '@/data/mockData';
import type { ContentItem } from '@/types';

type HomeTab = 'specialty' | 'activity';

export default function HomePage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [displayItems, setDisplayItems] = useState<ContentItem[]>(mockContentItems);
  const [homeTab, setHomeTab] = useState<HomeTab>('specialty');
  const [isLoading, setIsLoading] = useState(false);
  const waterfallRef = useRef<HTMLDivElement>(null);

  // Get province name for the location pill
  const selectedProvinceData = provinceData.find((p) => p.id === selectedProvince);
  const locationText = selectedProvinceData
    ? `${selectedProvinceData.name}, ${selectedProvinceData.hot || '热门'}`
    : '全国';

  // Filter content based on province + category
  useEffect(() => {
    setIsLoading(true);
    let items = getContentsByProvince(selectedProvince || undefined);

    if (activeCategory !== 'all') {
      if (activeCategory === 'article') {
        items = items.filter((i) => i.type === 'article');
      } else if (activeCategory === 'short_video') {
        items = items.filter((i) => i.type === 'short_video');
      } else if (activeCategory === 'live_clip') {
        items = items.filter((i) => i.type === 'live_clip' || i.isLive);
      } else if (activeCategory === 'product') {
        items = items.filter((i) => i.relatedProducts.length > 0);
      } else {
        // food, craft, scenery - match by tags
        const tagMap: Record<string, string[]> = {
          food: ['美食', '火锅', '茶', '瓜', '蟹', '食'],
          craft: ['非遗', '手工艺', '苏绣', '刺绣', '工艺'],
          scenery: ['云南', '新疆', '风景', '茶园', '风景'],
        };
        const keywords = tagMap[activeCategory] || [];
        items = items.filter((i) =>
          keywords.some(
            (k) =>
              i.tags.some((t) => t.includes(k)) ||
              i.title.includes(k) ||
              i.provinceName.includes(k)
          )
        );
      }
    }

    // Simulate loading delay for realism
    const timer = setTimeout(() => {
      setDisplayItems(items);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [selectedProvince, activeCategory]);

  // Scroll listener for header blur effect
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProvinceSelect = useCallback((provinceId: string | null) => {
    setSelectedProvince(provinceId);
    // Scroll to waterfall after a brief delay
    if (provinceId && waterfallRef.current) {
      setTimeout(() => {
        waterfallRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, []);

  const handleCategoryChange = useCallback((key: string) => {
    setActiveCategory(key);
  }, []);

  const handleClearProvince = useCallback(() => {
    setSelectedProvince(null);
  }, []);

  return (
    <Layout showNav={false} showBottomNav={true}>
      {/* Sticky Header */}
      <header
        className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-mobile items-center justify-between px-4 transition-all duration-300"
        style={{
          height: '52px',
          background: headerScrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
          backdropFilter: headerScrolled ? 'blur(8px)' : 'none',
          borderBottom: headerScrolled ? '1px solid var(--divider)' : '1px solid transparent',
        }}
      >
        <div
          className="flex items-center gap-1 rounded-full px-3 py-1.5"
          style={{ background: 'rgba(255,255,255,0.8)' }}
        >
          <MapPin size={14} color="var(--accent)" />
          <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
            {locationText}
          </span>
          <ChevronDown size={14} color="var(--text-tertiary)" />
        </div>
        <div className="flex items-center gap-3">
          <button className="relative active:scale-[0.96]" style={{ transition: 'transform 100ms' }}>
            <Search size={22} color="var(--text-primary)" />
          </button>
          <button className="relative active:scale-[0.96]" style={{ transition: 'transform 100ms' }}>
            <Bell size={22} color="var(--text-primary)" />
            <span
              className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full"
              style={{ background: 'var(--accent)' }}
            />
          </button>
        </div>
      </header>

      {/* Interactive Map */}
      <ZoomableChinaMap
        height="50vh"
        selectedProvince={selectedProvince}
        onProvinceSelect={handleProvinceSelect}
      />

      {/* Tab Switcher: 人文活动 / 各地特产 */}
      <div className="flex px-4 pt-3 pb-1 bg-white border-b border-[var(--divider)]">
        <button
          onClick={() => setHomeTab('specialty')}
          className="flex-1 pb-2.5 text-center text-sm font-medium relative transition-colors"
          style={{ color: homeTab === 'specialty' ? '#e63946' : 'var(--text-tertiary)' }}
        >
          <div className="flex items-center justify-center gap-1.5">
            <ShoppingBag size={15} />
            各地特产
          </div>
          {homeTab === 'specialty' && (
            <motion.div layoutId="homeTab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#e63946] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setHomeTab('activity')}
          className="flex-1 pb-2.5 text-center text-sm font-medium relative transition-colors"
          style={{ color: homeTab === 'activity' ? '#e63946' : 'var(--text-tertiary)' }}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Calendar size={15} />
            人文活动
          </div>
          {homeTab === 'activity' && (
            <motion.div layoutId="homeTab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#e63946] rounded-full" />
          )}
        </button>
      </div>

      {/* Activity List when tab is activity */}
      {homeTab === 'activity' && (
        <div className="px-4 pt-3 pb-6">
          <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--divider)' }}>
            <h2 className="font-semibold" style={{ fontSize: '16px', color: 'var(--text-primary)' }}>热门活动</h2>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{activityData.length} 个活动</span>
          </div>
          <div className="mt-3 space-y-3">
            {activityData.slice(0, 8).map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
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
                    <span className="text-[11px] text-[var(--text-tertiary)]">· {activity.time}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] text-[var(--text-tertiary)]">{activity.provinceName} · {activity.cityName || ''}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Pills */}
      <FilterPills
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        activeProvince={selectedProvinceData?.name}
        onClearProvince={handleClearProvince}
      />

      {/* Content Waterfall */}
      <div ref={waterfallRef} className="px-4 pb-6">
        <div
          className="flex items-center justify-between py-2"
          style={{ borderBottom: '1px solid var(--divider)' }}
        >
          <h2
            className="font-semibold"
            style={{ fontSize: '16px', color: 'var(--text-primary)' }}
          >
            {selectedProvinceData ? `${selectedProvinceData.name}精选` : '发现好内容'}
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            {displayItems.length} 条内容
          </span>
        </div>

        {/* Masonry Layout */}
        <div
          className="mt-3"
          style={{
            columnCount: 2,
            columnGap: '12px',
          }}
        >
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="mb-3 break-inside-avoid rounded-[var(--radius-lg)] bg-[var(--bg-elevated)]"
                  style={{ height: i % 2 === 0 ? '200px' : '260px' }}
                >
                  <div
                    className="h-full w-full animate-shimmer rounded-[var(--radius-lg)]"
                    style={{
                      background:
                        'linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%)',
                      backgroundSize: '200% 100%',
                    }}
                  />
                </div>
              ))}
            </>
          ) : displayItems.length > 0 ? (
            displayItems.map((item, index) => (
              <ContentCard key={item.id} item={item} index={index} />
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center py-12">
              <div
                className="mb-3 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <Search size={28} color="var(--text-tertiary)" />
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                暂无相关内容
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }} className="mt-1">
                试试切换其他分类或地区
              </p>
            </div>
          )}
        </div>

        {/* Infinite scroll loader stub */}
        {!isLoading && displayItems.length > 0 && (
          <div className="flex items-center justify-center py-4">
            <div
              className="h-5 w-5 animate-spin rounded-full border-2"
              style={{
                borderColor: 'var(--divider)',
                borderTopColor: 'var(--accent)',
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
