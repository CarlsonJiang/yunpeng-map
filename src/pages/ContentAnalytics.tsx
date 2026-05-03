import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Eye, Heart, MessageCircle, Share2, ShoppingBag, ChevronDown } from 'lucide-react';
import { mockContentItems, mockProducts } from '@/data/mockData';

const timeRanges = ['近7天', '近30天', '近90天', '全部'];

export default function ContentAnalytics() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('近7天');
  const [showRangePicker, setShowRangePicker] = useState(false);

  const totalViews = mockContentItems.reduce((sum, c) => sum + c.views, 0);
  const totalLikes = mockContentItems.reduce((sum, c) => sum + c.likes, 0);
  const totalComments = mockContentItems.reduce((sum, c) => sum + c.comments, 0);
  const totalShares = mockContentItems.reduce((sum, c) => sum + c.shares, 0);
  const totalProductClicks = Math.floor(totalViews * 0.08);
  const totalConversions = Math.floor(totalViews * 0.02);
  const conversionRate = ((totalConversions / totalViews) * 100).toFixed(2);

  const topContent = [...mockContentItems].sort((a, b) => b.views - a.views).slice(0, 5);
  const topProducts = [...mockProducts].sort((a, b) => b.sales - a.sales).slice(0, 5);

  // Generate mock daily trend data
  const days = timeRange === '近7天' ? 7 : timeRange === '近30天' ? 30 : 90;

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg-card)] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/merchant/dashboard')}
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: 'var(--bg-page)' }}
            >
              <ArrowLeft size={18} color="var(--text-primary)" />
            </button>
            <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>内容数据分析</h1>
          </div>
          <button
            onClick={() => setShowRangePicker(!showRangePicker)}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium"
            style={{ background: 'var(--bg-page)', color: 'var(--text-secondary)' }}
          >
            {timeRange} <ChevronDown size={12} />
          </button>
        </div>
        {showRangePicker && (
          <div className="absolute right-4 top-14 z-50 rounded-xl py-1 shadow-lg" style={{ background: 'var(--bg-card)' }}>
            {timeRanges.map((r) => (
              <button
                key={r}
                onClick={() => { setTimeRange(r); setShowRangePicker(false); }}
                className="block w-full px-4 py-2 text-left text-sm"
                style={{ color: timeRange === r ? 'var(--accent)' : 'var(--text-primary)' }}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mx-4 mt-3 space-y-3 pb-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: '总曝光', value: `${(totalViews / 10000).toFixed(1)}万`, icon: Eye, color: '#3B82F6' },
            { label: '总点赞', value: `${(totalLikes / 10000).toFixed(1)}万`, icon: Heart, color: '#EF4444' },
            { label: '评论数', value: totalComments.toLocaleString(), icon: MessageCircle, color: '#10B981' },
            { label: '分享数', value: totalShares.toLocaleString(), icon: Share2, color: '#F59E0B' },
            { label: '商品点击', value: totalProductClicks.toLocaleString(), icon: ShoppingBag, color: '#8B5CF6' },
            { label: '转化率', value: `${conversionRate}%`, icon: TrendingUp, color: '#EC4899' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-xl p-3"
              style={{ background: 'var(--bg-card)' }}
            >
              <stat.icon size={16} color={stat.color} />
              <span className="mt-1 text-base font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</span>
              <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Conversion Funnel */}
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>转化漏斗</h3>
          <div className="mt-3 space-y-2">
            {[
              { label: '内容曝光', value: totalViews, max: totalViews, color: '#3B82F6' },
              { label: '有效阅读', value: Math.floor(totalViews * 0.65), max: totalViews, color: '#10B981' },
              { label: '商品点击', value: totalProductClicks, max: totalViews, color: '#F59E0B' },
              { label: '下单转化', value: totalConversions, max: totalViews, color: '#EF4444' },
            ].map((step) => (
              <div key={step.label} className="flex items-center gap-3">
                <span className="w-16 text-xs" style={{ color: 'var(--text-secondary)' }}>{step.label}</span>
                <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: 'var(--bg-page)' }}>
                  <div
                    className="flex h-full items-center justify-end rounded-full px-2 text-[10px] font-medium text-white transition-all"
                    style={{
                      width: `${(step.value / step.max) * 100}%`,
                      background: step.color,
                      minWidth: step.value > 0 ? '40px' : '0',
                    }}
                  >
                    {step.value > 0 && step.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Chart */}
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>曝光趋势</h3>
          <div className="mt-3 flex items-end gap-[2px] h-24">
            {Array.from({ length: Math.min(days, 30) }, (_, i) => {
              const h = Math.floor((Math.random() * 0.8 + 0.2) * 100);
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all"
                  style={{
                    height: `${h}%`,
                    background: h > 70 ? 'var(--accent)' : 'var(--accent)60',
                    opacity: 0.7 + (h / 100) * 0.3,
                  }}
                />
              );
            })}
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{days}天前</span>
            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>今天</span>
          </div>
        </div>

        {/* Top Content */}
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>热门内容 TOP5</h3>
          <div className="mt-3 space-y-2">
            {topContent.map((content, index) => (
              <div key={content.id} className="flex items-center gap-3 rounded-lg p-2" style={{ background: 'var(--bg-page)' }}>
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    background: index < 3 ? 'var(--accent)' : 'var(--bg-card)',
                    color: index < 3 ? '#fff' : 'var(--text-tertiary)',
                  }}
                >
                  {index + 1}
                </span>
                <img src={content.coverImage} alt="" className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{content.title}</p>
                  <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>👁 {content.views.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>商品表现 TOP5</h3>
          <div className="mt-3 space-y-2">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-3 rounded-lg p-2" style={{ background: 'var(--bg-page)' }}>
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    background: index < 3 ? '#10B981' : 'var(--bg-card)',
                    color: index < 3 ? '#fff' : 'var(--text-tertiary)',
                  }}
                >
                  {index + 1}
                </span>
                <img src={product.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{product.name}</p>
                  <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>已售 {product.sales.toLocaleString()}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>¥{(product.price * product.sales * 0.3).toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
