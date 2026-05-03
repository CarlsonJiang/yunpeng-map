import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Phone, CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { mockProducts } from '@/data/mockData';

export default function OrderConfirmPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [name, setName] = useState('张三');
  const [phone, setPhone] = useState('138****8888');
  const [address, setAddress] = useState('北京市朝阳区建国路88号SOHO现代城A座1201');
  const [payment, setPayment] = useState<'wechat' | 'alipay'>('wechat');

  const getProductName = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    return product?.name || productId;
  };

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      showToast('请填写完整的收货信息', 'error');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOrderSuccess(true);
      clearCart();
      setTimeout(() => {
        navigate('/user/home');
      }, 2000);
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[var(--bg-page)] px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full" style={{ background: '#10B98115' }}>
          <CheckCircle size={48} color="#10B981" />
        </div>
        <h2 className="mt-4 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>下单成功</h2>
        <p className="mt-2 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          您的订单已提交，商家将尽快为您发货
        </p>
        <button
          onClick={() => navigate('/user/home')}
          className="mt-6 rounded-full px-8 py-2.5 text-sm font-medium"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          返回首页
        </button>
      </div>
    );
  }

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
        <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>确认订单</h1>
      </div>

      <div className="mx-4 mt-3 space-y-3">
        {/* Address */}
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          <h3 className="flex items-center gap-1 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            <MapPin size={14} color="var(--accent)" /> 收货地址
          </h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <User size={14} color="var(--text-tertiary)" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}
                placeholder="收货人姓名"
              />
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} color="var(--text-tertiary)" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}
                placeholder="手机号码"
              />
            </div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="详细地址"
              rows={2}
              className="w-full resize-none rounded-lg px-3 py-2 text-sm outline-none"
              style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>订单商品</h3>
          <div className="mt-3 space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                <img src={item.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {item.name || getProductName(item.productId)}
                  </p>
                  {item.spec && <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.spec}</p>}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>¥{item.price}</span>
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>x{item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          <h3 className="flex items-center gap-1 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            <CreditCard size={14} color="var(--accent)" /> 支付方式
          </h3>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setPayment('wechat')}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all"
              style={{
                background: payment === 'wechat' ? '#10B98115' : 'var(--bg-page)',
                border: payment === 'wechat' ? '2px solid #10B981' : '2px solid transparent',
                color: payment === 'wechat' ? '#10B981' : 'var(--text-secondary)',
              }}
            >
              微信支付
            </button>
            <button
              onClick={() => setPayment('alipay')}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all"
              style={{
                background: payment === 'alipay' ? '#3B82F615' : 'var(--bg-page)',
                border: payment === 'alipay' ? '2px solid #3B82F6' : '2px solid transparent',
                color: payment === 'alipay' ? '#3B82F6' : 'var(--text-secondary)',
              }}
            >
              支付宝
            </button>
          </div>
        </div>

        {/* Price Summary */}
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>商品合计</span>
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>¥{totalPrice.toFixed(2)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>运费</span>
            <span className="text-sm" style={{ color: '#10B981' }}>免运费</span>
          </div>
          <div className="mt-2 border-t pt-2" style={{ borderColor: 'var(--divider)' }}>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>实付金额</span>
              <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>¥{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-mobile flex items-center justify-between px-4 py-3"
        style={{
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--divider)',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
        }}
      >
        <div>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>实付 </span>
          <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>¥{totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="rounded-full px-8 py-2.5 text-sm font-medium disabled:opacity-50"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          {submitting ? '提交中...' : '立即支付'}
        </button>
      </div>
    </div>
  );
}
