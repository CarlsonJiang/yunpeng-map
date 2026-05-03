import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Heart, Share2, ShoppingCart, Star, MapPin,
  ChevronRight, Plus, Minus, Truck, ShieldCheck, BadgeCheck
} from 'lucide-react';
import { getProductById, getContentById } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const product = id ? getProductById(id) : undefined;
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[100dvh] bg-[var(--bg-page)] flex flex-col items-center justify-center" style={{ maxWidth: 430, margin: '0 auto' }}>
        <p className="text-[var(--text-secondary)]">商品不存在</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[var(--accent)] text-sm">返回</button>
      </div>
    );
  }

  const contentSource = product.contentSource ? getContentById(product.contentSource) : undefined;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      spec: selectedSpec || undefined,
      contentSource: product.contentSource,
    });
    showToast('已加入购物车');
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]" style={{ maxWidth: 430, margin: '0 auto' }}>
      {/* Top Nav */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
          <ArrowLeft size={20} color="var(--text-primary)" />
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => setLiked(!liked)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
            <Heart size={18} color={liked ? 'var(--accent)' : 'var(--text-primary)'} fill={liked ? 'var(--accent)' : 'none'} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
            <Share2 size={18} color="var(--text-primary)" />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        {contentSource && (
          <Link
            to={`/user/content/${contentSource.id}`}
            className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-md"
          >
            <BadgeCheck size={14} color="var(--accent)" />
            <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>来自「{contentSource.title.substring(0, 8)}...」</span>
          </Link>
        )}
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 py-4 rounded-t-2xl -mt-3 relative z-10">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>¥{product.price}</span>
          <span className="text-sm line-through" style={{ color: 'var(--text-tertiary)' }}>¥{product.originalPrice}</span>
          <span className="ml-auto rounded px-1.5 py-0.5 text-xs" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            {Math.round((1 - product.price / product.originalPrice) * 100)}% 省
          </span>
        </div>

        <h1 className="mt-2 text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{product.name}</h1>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={12} color={i <= Math.floor(product.rating) ? '#f4a261' : '#e0e0e0'} fill={i <= Math.floor(product.rating) ? '#f4a261' : 'none'} />
            ))}
            <span className="ml-1 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{product.rating}</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>已售 {product.sales}</span>
        </div>

        {/* Merchant Info */}
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-[var(--bg-elevated)] p-3">
          <img src={product.merchantAvatar} alt={product.merchant} className="h-10 w-10 rounded-full object-cover" />
          <div className="flex-1">
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{product.merchant}</p>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{product.provinceName} · {product.category}</p>
          </div>
          <ChevronRight size={16} color="var(--text-tertiary)" />
        </div>

        {/* Spec Selector */}
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>选择规格</p>
          <div className="flex flex-wrap gap-2">
            {product.specs.map(spec => (
              <button
                key={spec.value}
                onClick={() => setSelectedSpec(spec.value)}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-all"
                style={{
                  background: selectedSpec === spec.value ? 'var(--accent)' : 'var(--bg-elevated)',
                  color: selectedSpec === spec.value ? 'white' : 'var(--text-secondary)',
                }}
              >
                {spec.value}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>数量</p>
          <div className="flex items-center gap-3">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-elevated)] active:scale-95">
              <Minus size={14} color="var(--text-primary)" />
            </button>
            <span className="w-6 text-center text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-elevated)] active:scale-95">
              <Plus size={14} color="var(--text-primary)" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-4 border-t border-[var(--divider)] pt-4">
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>商品详情</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>

          <div className="mt-3 space-y-2">
            {product.specs.map(spec => (
              <div key={spec.label} className="flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{spec.label}</span>
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Tags */}
        <div className="mt-4 flex gap-2">
          {[
            { icon: Truck, label: '48小时发货' },
            { icon: ShieldCheck, label: '品质保证' },
            { icon: MapPin, label: product.provinceName },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1 rounded-full bg-[var(--bg-elevated)] px-2.5 py-1">
              <Icon size={12} color="var(--text-tertiary)" />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--divider)] px-4 py-3" style={{ maxWidth: 430, margin: '0 auto' }}>
        <div className="flex items-center gap-3">
          <Link to="/user/cart" className="flex flex-col items-center justify-center w-12">
            <ShoppingCart size={20} color="var(--text-primary)" />
            <span className="text-[10px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>购物车</span>
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-full py-3 text-sm font-bold text-white"
            style={{ background: 'var(--accent)' }}
          >
            加入购物车
          </button>
          <button className="flex-1 rounded-full py-3 text-sm font-bold text-white" style={{ background: '#f4a261' }}>
            立即购买
          </button>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
}
