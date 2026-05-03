import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Package, TrendingUp, Eye, Heart, ShoppingBag, Plus, BarChart3, Settings, ChevronRight } from 'lucide-react';
import { mockContentItems, mockProducts } from '@/data/mockData';
import { useToast } from '@/context/ToastContext';

export default function MerchantDashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'product'>('overview');

  const myContents = mockContentItems.slice(0, 8);
  const myProducts = mockProducts.slice(0, 6);

  const totalViews = myContents.reduce((sum, c) => sum + c.views, 0);
  const totalLikes = myContents.reduce((sum, c) => sum + c.likes, 0);
  const totalSales = mockProducts.reduce((sum, p) => sum + p.sales, 0);
  const totalRevenue = mockProducts.reduce((sum, p) => sum + p.price * p.sales * 0.3, 0);

  const tabs = [
    { key: 'overview' as const, label: '概览', icon: TrendingUp },
    { key: 'content' as const, label: '内容', icon: FileText },
    { key: 'product' as const, label: '商品', icon: Package },
  ];

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg-card)] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: 'var(--bg-page)' }}
            >
              <ArrowLeft size={18} color="var(--text-primary)" />
            </button>
            <div>
              <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>商家中心</h1>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>云茶记 · 云南茶农</p>
            </div>
          </div>
          <button
            onClick={() => showToast('设置功能开发中', 'info')}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: 'var(--bg-page)' }}
          >
            <Settings size={16} color="var(--text-secondary)" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mx-4 mt-3 grid grid-cols-4 gap-2">
        {[
          { label: '总曝光', value: `${(totalViews / 10000).toFixed(1)}万`, icon: Eye, color: '#3B82F6' },
          { label: '总点赞', value: `${(totalLikes / 10000).toFixed(1)}万`, icon: Heart, color: '#EF4444' },
          { label: '总销量', value: totalSales.toLocaleString(), icon: ShoppingBag, color: '#10B981' },
          { label: '预估收入', value: `¥${(totalRevenue / 10000).toFixed(1)}万`, icon: TrendingUp, color: '#F59E0B' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center rounded-xl p-2.5"
            style={{ background: 'var(--bg-card)' }}
          >
            <stat.icon size={16} color={stat.color} />
            <span className="mt-1 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</span>
            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
        {[
          { label: '发布内容', icon: Plus, path: '/merchant/content/edit/new', color: '#3B82F6' },
          { label: '内容管理', icon: FileText, path: '/merchant/content', color: '#10B981' },
          { label: '数据分析', icon: BarChart3, path: '/merchant/content/analytics', color: '#F59E0B' },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-1 rounded-xl py-3"
            style={{ background: 'var(--bg-card)' }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: `${action.color}15` }}
            >
              <action.icon size={20} color={action.color} />
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="mx-4 mt-4 flex gap-1 rounded-xl p-1" style={{ background: 'var(--bg-card)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium transition-all"
            style={{
              background: activeTab === tab.key ? 'var(--accent)' : 'transparent',
              color: activeTab === tab.key ? '#fff' : 'var(--text-secondary)',
            }}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mx-4 mt-3 pb-6">
        {activeTab === 'overview' && (
          <div className="space-y-3">
            {/* Content Performance */}
            <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>内容表现</h3>
                <button onClick={() => setActiveTab('content')} className="flex items-center text-xs" style={{ color: 'var(--accent)' }}>
                  查看全部 <ChevronRight size={14} />
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {myContents.slice(0, 3).map((content) => (
                  <div
                    key={content.id}
                    className="flex items-center gap-3 rounded-lg p-2"
                    style={{ background: 'var(--bg-page)' }}
                  >
                    <img src={content.coverImage} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{content.title}</p>
                      <div className="mt-0.5 flex items-center gap-3">
                        <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>👁 {content.views.toLocaleString()}</span>
                        <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>❤ {content.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Products */}
            <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>热销商品</h3>
                <button onClick={() => setActiveTab('product')} className="flex items-center text-xs" style={{ color: 'var(--accent)' }}>
                  查看全部 <ChevronRight size={14} />
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {myProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 rounded-lg p-2"
                    style={{ background: 'var(--bg-page)' }}
                  >
                    <img src={product.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{product.name}</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>¥{product.price}</span>
                        <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>已售 {product.sales.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-2">
            {myContents.map((content) => (
              <button
                key={content.id}
                onClick={() => navigate(`/merchant/content/edit/${content.id}`)}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left"
                style={{ background: 'var(--bg-card)' }}
              >
                <img src={content.coverImage} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{content.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px]"
                      style={{
                        background: content.type === 'article' ? '#3B82F615' : content.type === 'short_video' ? '#EF444415' : '#F59E0B15',
                        color: content.type === 'article' ? '#3B82F6' : content.type === 'short_video' ? '#EF4444' : '#F59E0B',
                      }}
                    >
                      {content.type === 'article' ? '图文' : content.type === 'short_video' ? '短视频' : '直播'}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{content.provinceName}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>👁 {content.views.toLocaleString()}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>❤ {content.likes.toLocaleString()}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>💬 {content.comments}</span>
                  </div>
                </div>
                <ChevronRight size={16} color="var(--text-tertiary)" />
              </button>
            ))}
          </div>
        )}

        {activeTab === 'product' && (
          <div className="space-y-2">
            {myProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl p-3"
                style={{ background: 'var(--bg-card)' }}
              >
                <img src={product.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{product.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>¥{product.price}</span>
                    <span className="text-xs line-through" style={{ color: 'var(--text-tertiary)' }}>¥{product.originalPrice}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--bg-page)', color: 'var(--text-tertiary)' }}>{product.category}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>已售 {product.sales.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
