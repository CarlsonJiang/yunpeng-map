import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, TrendingUp, Flame } from 'lucide-react';
import ContentCard from '@/components/ContentCard';
import { mockContentItems } from '@/data/mockData';
import type { ContentItem } from '@/types';

const hotTopics = ['早茶文化', '非遗工艺', '雪山日落', '海鲜市场', '手工银饰', '火锅底料', '早茶点心', '扎染布艺'];

export default function ExplorePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayItems, setDisplayItems] = useState<ContentItem[]>(mockContentItems);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    { key: 'all', label: '全部' },
    { key: 'article', label: '图文' },
    { key: 'short_video', label: '短视频' },
    { key: 'live_clip', label: '直播' },
    { key: 'food', label: '美食' },
    { key: 'craft', label: '手艺' },
    { key: 'scenery', label: '风景' },
  ];

  useEffect(() => {
    let items = [...mockContentItems];
    if (activeCategory !== 'all') {
      if (activeCategory === 'article') items = items.filter(i => i.type === 'article');
      else if (activeCategory === 'short_video') items = items.filter(i => i.type === 'short_video');
      else if (activeCategory === 'live_clip') items = items.filter(i => i.type === 'live_clip' || i.isLive);
      else if (activeCategory === 'food') items = items.filter(i => i.tags.some(t => /美食|早茶|火锅|海鲜|螺蛳粉|面食|腊肉|牛肉丸|双皮奶|热干面|茶叶|水果|甜品|酒/.test(t)));
      else if (activeCategory === 'craft') items = items.filter(i => i.tags.some(t => /非遗|手工艺|苏绣|银饰|扎染|木偶戏|藏香|文创/.test(t)));
      else if (activeCategory === 'scenery') items = items.filter(i => i.tags.some(t => /风景|日出|日落|山水|高原|草原|雪山/.test(t)));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q)) ||
        i.provinceName.includes(q)
      );
    }
    setDisplayItems(items);
  }, [activeCategory, searchQuery]);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setShowBackToTop(scrollRef.current.scrollTop > 400);
    }
  }, []);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--bg-page)]" style={{ maxWidth: 430, margin: '0 auto' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md px-4 pt-3 pb-2 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-elevated)] active:scale-95 transition-transform">
            <ArrowLeft size={20} color="var(--text-primary)" />
          </button>
          <div className="flex flex-1 items-center gap-2 rounded-full bg-[var(--bg-elevated)] px-3 py-2">
            <Search size={16} color="var(--text-tertiary)" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索内容、话题、地区..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        {/* Hot Topics */}
        {!searchQuery && (
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {hotTopics.map(topic => (
              <button
                key={topic}
                onClick={() => setSearchQuery(topic)}
                className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
              >
                <Flame size={12} color="var(--accent)" />
                {topic}
              </button>
            ))}
          </div>
        )}

        {/* Category Pills */}
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                background: activeCategory === cat.key ? 'var(--accent)' : 'var(--bg-elevated)',
                color: activeCategory === cat.key ? 'white' : 'var(--text-secondary)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Waterfall */}
      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-3 pt-3">
        {displayItems.length > 0 ? (
          <div className="columns-2 gap-3">
            {displayItems.map((item, i) => (
              <ContentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Search size={48} color="var(--text-tertiary)" opacity={0.3} />
            <p className="mt-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>没有找到相关内容</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-2 text-sm" style={{ color: 'var(--accent)' }}>
              查看全部内容
            </button>
          </div>
        )}
        <div className="h-8" />
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
        >
          <TrendingUp size={18} color="var(--text-primary)" />
        </motion.button>
      )}
    </div>
  );
}
