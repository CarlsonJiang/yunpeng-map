import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { mockProducts } from '@/data/mockData';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, totalPrice } = useCart();
  const { showToast } = useToast();

  const getProductImage = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    return product?.image || '/product-tea-1.jpg';
  };

  const getProductName = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    return product?.name || productId;
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      showToast('购物车为空', 'info');
      return;
    }
    navigate('/user/order-confirm');
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center gap-3 bg-[var(--bg-card)] px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: 'var(--bg-page)' }}
        >
          <ArrowLeft size={18} color="var(--text-primary)" />
        </button>
        <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          购物车 ({items.length})
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag size={64} color="var(--text-tertiary)" strokeWidth={1} />
          <p className="mt-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>购物车还是空的</p>
          <button
            onClick={() => navigate('/user/home')}
            className="mt-4 rounded-full px-6 py-2 text-sm font-medium"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            去逛逛
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="mx-4 mt-3 space-y-2">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3 rounded-xl p-3"
                style={{ background: 'var(--bg-card)' }}
              >
                <img
                  src={item.image || getProductImage(item.productId)}
                  alt=""
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {item.name || getProductName(item.productId)}
                  </p>
                  {item.spec && (
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.spec}</p>
                  )}
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                      ¥{item.price}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ background: 'var(--bg-page)' }}
                      >
                        {item.quantity <= 1 ? (
                          <Trash2 size={12} color="var(--text-tertiary)" />
                        ) : (
                          <Minus size={12} color="var(--text-secondary)" />
                        )}
                      </button>
                      <span className="w-6 text-center text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ background: 'var(--bg-page)' }}
                      >
                        <Plus size={12} color="var(--text-secondary)" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Checkout Bar */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-mobile flex items-center justify-between px-4 py-3"
            style={{
              background: 'var(--bg-card)',
              borderTop: '1px solid var(--divider)',
              paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
            }}
          >
            <div>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>合计 </span>
              <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>¥{totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="rounded-full px-6 py-2.5 text-sm font-medium"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              结算 ({items.reduce((s, i) => s + i.quantity, 0)})
            </button>
          </div>
        </>
      )}
    </div>
  );
}
