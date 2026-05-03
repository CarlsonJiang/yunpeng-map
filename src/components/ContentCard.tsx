import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, MapPin } from 'lucide-react';
import type { ContentItem } from '@/types';
import { getProductById } from '@/data/mockData';
import { Link } from 'react-router-dom';

interface ContentCardProps {
  item: ContentItem;
  index?: number;
}

export default function ContentCard({ item, index = 0 }: ContentCardProps) {
  const [liked, setLiked] = useState(item.isLiked);
  const [likeCount, setLikeCount] = useState(item.likes);

  const primaryProduct = item.relatedProducts.length > 0
    ? getProductById(item.relatedProducts[0].productId)
    : undefined;

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const formatCount = (n: number) => {
    if (n >= 10000) return (n / 10000).toFixed(1) + 'w';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(n);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      className="mb-3 break-inside-avoid"
    >
      <Link
        to={`/user/content/${item.id}`}
        className="block overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-card)] shadow-card transition-all duration-150 ease-out active:scale-[0.98] hover:shadow-lg"
      >
        {/* Image Area */}
        <div className="relative">
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-full object-cover"
            loading="lazy"
            style={{ minHeight: '120px' }}
          />
          {/* Type Badge Overlay */}
          {item.type === 'short_video' && (
            <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
              <Play size={14} color="white" fill="white" />
            </div>
          )}
          {item.isLive && (
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full px-2 py-[2px]" style={{ background: 'var(--accent)' }}>
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              <span style={{ fontSize: '10px', fontWeight: 500, color: 'white' }}>直播中</span>
            </div>
          )}
          {!item.isLive && item.type === 'live_clip' && (
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full px-2 py-[2px]" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <span style={{ fontSize: '10px', fontWeight: 500, color: 'white' }}>直播回放</span>
            </div>
          )}
          {item.duration && item.type !== 'article' && (
            <div className="absolute bottom-2 right-2 rounded px-1 py-[2px]" style={{ background: 'rgba(0,0,0,0.5)', fontSize: '10px', color: 'white' }}>
              {item.duration}
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="p-3">
          <h3
            className="line-clamp-2 font-semibold"
            style={{
              fontSize: '14px',
              lineHeight: 1.4,
              color: 'var(--text-primary)',
            }}
          >
            {item.title}
          </h3>

          {/* Author Row */}
          <div className="mt-2 flex items-center gap-2">
            <img
              src={item.authorAvatar}
              alt={item.author}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span
              className="flex-1 truncate"
              style={{ fontSize: '12px', color: 'var(--text-secondary)' }}
            >
              {item.author}
            </span>
            {primaryProduct && (
              <span
                className="rounded px-1.5 py-[2px]"
                style={{
                  fontSize: '10px',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                }}
              >
                ¥{primaryProduct.price}
              </span>
            )}
          </div>

          {/* Meta Row */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MapPin size={10} color="var(--text-tertiary)" />
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                {item.provinceName}
              </span>
            </div>
            <button
              onClick={handleLike}
              className="flex items-center gap-1"
            >
              <Heart
                size={12}
                color={liked ? 'var(--accent)' : 'var(--text-tertiary)'}
                fill={liked ? 'var(--accent)' : 'none'}
              />
              <span style={{ fontSize: '10px', color: liked ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                {formatCount(likeCount)}
              </span>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
