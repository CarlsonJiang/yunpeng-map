import { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark,
  ShoppingBag, ChevronRight, Send, Play, MapPin
} from 'lucide-react';
import { getContentById, getProductById, getCommentsByContentId } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function ContentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const content = id ? getContentById(id) : undefined;
  const comments = id ? getCommentsByContentId(id) : [];
  const [liked, setLiked] = useState(content?.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(content?.likes ?? 0);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!content) {
    return (
      <div className="min-h-[100dvh] bg-[var(--bg-page)] flex flex-col items-center justify-center" style={{ maxWidth: 430, margin: '0 auto' }}>
        <p className="text-[var(--text-secondary)]">内容不存在</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[var(--accent)] text-sm">返回</button>
      </div>
    );
  }

  const relatedProducts = content.relatedProducts
    .map(rp => {
      const p = getProductById(rp.productId);
      return p ? { ...p, highlightText: rp.highlightText } : undefined;
    })
    .filter(Boolean) as (ReturnType<typeof getProductById> & { highlightText?: string })[];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleAddToCart = (product: NonNullable<ReturnType<typeof getProductById>>) => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      contentSource: content.id,
    });
    showToast('已加入购物车');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: content.title, url: window.location.href });
    } else {
      showToast('链接已复制');
    }
  };

  const formatCount = (n: number) => {
    if (n >= 10000) return (n / 10000).toFixed(1) + 'w';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(n);
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]" style={{ maxWidth: 430, margin: '0 auto' }}>
      {/* Top Nav */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
          <ArrowLeft size={20} color="var(--text-primary)" />
        </button>
        <div className="flex items-center gap-3">
          <button onClick={handleShare} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
            <Share2 size={18} color="var(--text-primary)" />
          </button>
          <button onClick={() => setBookmarked(!bookmarked)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
            <Bookmark size={18} color={bookmarked ? 'var(--accent)' : 'var(--text-primary)'} fill={bookmarked ? 'var(--accent)' : 'none'} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="pb-32">
        {/* Cover Image / Video */}
        <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
          <img
            src={content.coverImage}
            alt={content.title}
            className="h-full w-full object-cover"
          />
          {content.type === 'short_video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm">
                <Play size={24} color="white" fill="white" />
              </div>
            </div>
          )}
          {content.isLive && (
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: 'var(--accent)' }}>
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              <span className="text-xs font-medium text-white">直播中</span>
            </div>
          )}
          {content.duration && (
            <div className="absolute bottom-3 right-3 rounded-md px-2 py-1 text-xs font-medium text-white" style={{ background: 'rgba(0,0,0,0.6)' }}>
              {content.duration}
            </div>
          )}
        </div>

        {/* Title & Meta */}
        <div className="px-4 pt-4">
          <h1 className="text-lg font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
            {content.title}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <img src={content.authorAvatar} alt={content.author} className="h-9 w-9 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{content.author}</p>
              {content.authorTitle && (
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{content.authorTitle}</p>
              )}
            </div>
            <button className="rounded-full px-3 py-1 text-xs font-medium text-white" style={{ background: 'var(--accent)' }}>
              + 关注
            </button>
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <MapPin size={12} />
            <span>{content.provinceName}</span>
            <span>·</span>
            <span>{content.publishTime}</span>
            <span>·</span>
            <span>{formatCount(content.views)} 浏览</span>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {content.tags.map(tag => (
              <span key={tag} className="rounded-full px-2.5 py-1 text-xs" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-4 flex items-center justify-around border-y border-[var(--divider)] px-4 py-3">
          <button onClick={handleLike} className="flex items-center gap-1.5">
            <Heart size={20} color={liked ? 'var(--accent)' : 'var(--text-secondary)'} fill={liked ? 'var(--accent)' : 'none'} />
            <span className="text-sm font-medium" style={{ color: liked ? 'var(--accent)' : 'var(--text-secondary)' }}>{formatCount(likeCount)}</span>
          </button>
          <button onClick={() => setShowComments(true)} className="flex items-center gap-1.5">
            <MessageCircle size={20} color="var(--text-secondary)" />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{formatCount(content.comments)}</span>
          </button>
          <button onClick={handleShare} className="flex items-center gap-1.5">
            <Share2 size={20} color="var(--text-secondary)" />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{formatCount(content.shares)}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="px-4 py-4">
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
            {content.content}
          </p>
        </div>

        {/* Related Content */}
        <div className="px-4 pb-4">
          <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>相关内容推荐</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-32 shrink-0">
                <div className="aspect-[3/4] rounded-xl bg-[var(--bg-elevated)]" />
                <p className="mt-1.5 text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>精彩内容推荐</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Product Tag */}
      <AnimatePresence>
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[100]"
            style={{ maxWidth: 430, margin: '0 auto' }}
          >
            {/* Expanded Sheet */}
            <AnimatePresence>
              {showAllProducts && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl"
                  style={{ maxHeight: '60vh' }}
                >
                  <div className="flex items-center justify-between px-4 py-3">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>相关商品 ({relatedProducts.length})</h3>
                    <button onClick={() => setShowAllProducts(false)} className="text-xs" style={{ color: 'var(--text-tertiary)' }}>关闭</button>
                  </div>
                  <div className="max-h-[50vh] overflow-y-auto px-4 pb-6">
                    {relatedProducts.map(p => (
                      <div key={p.id} className="mb-3 flex items-center gap-3 rounded-xl bg-[var(--bg-elevated)] p-3">
                        <img src={p.image} alt={p.name} className="h-16 w-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                          {p.highlightText && <p className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>{p.highlightText}</p>}
                          <p className="mt-1 text-sm font-bold" style={{ color: 'var(--accent)' }}>¥{p.price}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="rounded-full px-3 py-1.5 text-xs font-medium text-white"
                            style={{ background: 'var(--accent)' }}
                          >
                            加购
                          </button>
                          <Link
                            to={`/user/product/${p.id}`}
                            className="rounded-full px-3 py-1.5 text-xs font-medium text-center"
                            style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}
                          >
                            详情
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed Tag */}
            {!showAllProducts && (
              <div className="mx-4 mb-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl">
                <img src={relatedProducts[0].image} alt={relatedProducts[0].name} className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{relatedProducts[0].highlightText || '视频同款'}</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{relatedProducts[0].name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold" style={{ color: 'var(--accent)' }}>¥{relatedProducts[0].price}</p>
                  <button
                    onClick={() => handleAddToCart(relatedProducts[0])}
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ background: 'var(--accent)' }}
                  >
                    <ShoppingBag size={14} color="white" />
                  </button>
                  {relatedProducts.length > 1 && (
                    <button onClick={() => setShowAllProducts(true)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-elevated)]">
                      <ChevronRight size={14} color="var(--text-secondary)" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comments Bottom Sheet */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/40"
            onClick={() => setShowComments(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white"
              style={{ maxHeight: '70vh', maxWidth: 430, margin: '0 auto' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--divider)]">
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>评论 ({content.comments})</h3>
                <button onClick={() => setShowComments(false)} className="text-xs" style={{ color: 'var(--text-tertiary)' }}>关闭</button>
              </div>
              <div className="max-h-[50vh] overflow-y-auto px-4 py-2">
                {comments.length > 0 ? comments.map(c => (
                  <div key={c.id} className="flex gap-3 py-3 border-b border-[var(--divider)]">
                    <img src={c.userAvatar} alt={c.userName} className="h-8 w-8 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{c.userName}</p>
                      <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{c.content}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        <span>{c.time}</span>
                        <span className="flex items-center gap-1"><Heart size={10} />{c.likes}</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="py-8 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>暂无评论，来抢沙发吧</p>
                )}
              </div>
              <div className="flex items-center gap-2 border-t border-[var(--divider)] px-4 py-3">
                <input
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="写下你的评论..."
                  className="flex-1 rounded-full bg-[var(--bg-elevated)] px-4 py-2 text-sm outline-none"
                  style={{ color: 'var(--text-primary)' }}
                />
                <button className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: 'var(--accent)' }}>
                  <Send size={16} color="white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
