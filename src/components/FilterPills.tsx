
import { motion } from 'framer-motion';

const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'article', label: '图文' },
  { key: 'short_video', label: '短视频' },
  { key: 'live_clip', label: '直播' },
  { key: 'product', label: '好物' },
  { key: 'food', label: '美食' },
  { key: 'craft', label: '手艺' },
  { key: 'scenery', label: '风景' },
];

interface FilterPillsProps {
  activeCategory: string;
  onCategoryChange: (key: string) => void;
  activeProvince?: string | null;
  onClearProvince?: () => void;
}

export default function FilterPills({
  activeCategory,
  onCategoryChange,
  activeProvince,
  onClearProvince,
}: FilterPillsProps) {
  return (
    <div
      className="sticky top-[52px] z-40 flex gap-2 overflow-x-auto bg-[var(--bg-page)] px-4 py-3 scrollbar-hide"
      style={{ borderBottom: '1px solid var(--divider)' }}
    >
      {activeProvince && (
        <motion.button
          layout
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={onClearProvince}
          className="shrink-0 rounded-full px-3.5 py-1.5 font-medium"
          style={{
            fontSize: '12px',
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
          }}
        >
          📍 {activeProvince} ✕
        </motion.button>
      )}
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.key;
        return (
          <button
            key={cat.key}
            onClick={() => onCategoryChange(cat.key)}
            className="shrink-0 rounded-full px-3.5 py-1.5 font-medium transition-all duration-150 active:scale-[0.96]"
            style={{
              fontSize: '12px',
              background: isActive ? 'var(--text-primary)' : 'var(--bg-card)',
              color: isActive ? 'white' : 'var(--text-secondary)',
              border: isActive ? 'none' : '1px solid var(--divider)',
              boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
