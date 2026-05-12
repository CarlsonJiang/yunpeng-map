import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Package, ChevronRight, X } from 'lucide-react';
import type { ProvinceData } from '@/types';
import { getContentsByProvince } from '@/data/mockData';

interface ProvinceTooltipProps {
  province: ProvinceData | null;
  position: { x: number; y: number };
  onClose: () => void;
  onEnter?: (provinceId: string) => void;
}

export default function ProvinceTooltip({ province, position, onClose, onEnter }: ProvinceTooltipProps) {
  if (!province) return null;

  const contents = getContentsByProvince(province.id).slice(0, 3);
  const tags = province.hot ? [province.hot, ...province.products.slice(0, 2)] : province.products.slice(0, 3);
  const viewportWidth = typeof window === 'undefined' ? 430 : window.innerWidth;
  const viewportHeight = typeof window === 'undefined' ? 760 : window.innerHeight;
  const popupWidth = Math.min(260, viewportWidth - 32);
  const left = Math.min(Math.max(position.x, popupWidth / 2 + 12), viewportWidth - popupWidth / 2 - 12);
  const top = Math.min(Math.max(position.y, 220), viewportHeight - 16);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="pointer-events-auto fixed z-[70]"
        style={{
          left,
          top,
          transform: 'translate(-50%, -100%)',
          marginTop: '-12px',
          width: popupWidth,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          className="font-semibold"
          style={{ fontSize: '16px', color: 'var(--text-primary)' }}
        >
          {province.name}
        </h3>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full"
          style={{ background: 'var(--bg-page)' }}
          aria-label="关闭省份弹窗"
        >
          <X size={14} color="var(--text-tertiary)" />
        </button>

        <div className="mt-1 flex items-center gap-3" style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {province.count} 条内容
          </span>
          <span className="flex items-center gap-1">
            <Package size={12} />
            {province.productCount} 件商品
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5"
              style={{
                fontSize: '10px',
                background: 'var(--accent-light)',
                color: 'var(--accent)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {contents.length > 0 && (
          <div className="mt-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
            {contents.map((c) => (
              <img
                key={c.id}
                src={c.coverImage}
                alt={c.title}
                className="h-12 w-12 shrink-0 rounded object-cover"
              />
            ))}
          </div>
        )}

        {/* Enter Province Button */}
        {onEnter && (
          <button
            onClick={() => onEnter(province.id)}
            className="mt-2.5 w-full flex items-center justify-center gap-1 rounded-xl py-2 text-white text-xs font-medium"
            style={{ background: '#e63946' }}
          >
            进入{province.name}
            <ChevronRight size={14} />
          </button>
        )}

        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: '-8px',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid rgba(255,255,255,0.95)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
