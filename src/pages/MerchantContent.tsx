import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Filter, Edit3, BarChart3, Trash2, Sparkles } from 'lucide-react';
import { mockContentItems } from '@/data/mockData';
import type { ContentStatus, ContentType } from '@/types';
import { useToast } from '@/context/ToastContext';

const statusFilter: { key: ContentStatus | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'published', label: '已发布' },
  { key: 'reviewing', label: '审核中' },
  { key: 'draft', label: '草稿' },
];

const typeFilter: { key: ContentType | 'all'; label: string }[] = [
  { key: 'all', label: '全部类型' },
  { key: 'article', label: '图文' },
  { key: 'short_video', label: '短视频' },
  { key: 'live_clip', label: '直播' },
];

export default function MerchantContent() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [status, setStatus] = useState<ContentStatus | 'all'>('all');
  const [type, setType] = useState<ContentType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockContentItems.filter((c) => {
    if (status !== 'all' && c.status !== status) return false;
    if (type !== 'all' && c.type !== type) return false;
    if (searchQuery && !c.title.includes(searchQuery)) return false;
    return true;
  });

  const handleDelete = () => {
    showToast('内容已删除', 'success');
  };

  const typeColors: Record<ContentType, { bg: string; text: string; label: string }> = {
    article: { bg: '#3B82F615', text: '#3B82F6', label: '图文' },
    short_video: { bg: '#EF444415', text: '#EF4444', label: '短视频' },
    live_clip: { bg: '#F59E0B15', text: '#F59E0B', label: '直播' },
  };

  const statusColors: Record<ContentStatus, { color: string; label: string }> = {
    published: { color: '#10B981', label: '已发布' },
    reviewing: { color: '#F59E0B', label: '审核中' },
    draft: { color: 'var(--text-tertiary)', label: '草稿' },
    archived: { color: 'var(--text-tertiary)', label: '已归档' },
    rejected: { color: '#EF4444', label: '已拒绝' },
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg-card)] px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/merchant/dashboard')}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: 'var(--bg-page)' }}
          >
            <ArrowLeft size={18} color="var(--text-primary)" />
          </button>
          <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>内容管理</h1>
        </div>

        {/* Search */}
        <div className="mt-3 flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full px-3 py-2" style={{ background: 'var(--bg-page)' }}>
            <Search size={16} color="var(--text-tertiary)" />
            <input
              type="text"
              placeholder="搜索内容标题..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: showFilters ? 'var(--accent)' : 'var(--bg-page)' }}
          >
            <Filter size={16} color={showFilters ? '#fff' : 'var(--text-secondary)'} />
          </button>
          <button
            onClick={() => navigate('/merchant/ai-batch-listing')}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: '#8B5CF6' }}
            title="AI批量上架"
          >
            <Sparkles size={16} color="#fff" />
          </button>
          <button
            onClick={() => navigate('/merchant/content/edit/new')}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: 'var(--accent)' }}
          >
            <Plus size={18} color="#fff" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-2 space-y-2 pb-2">
            <div className="flex gap-1">
              {statusFilter.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setStatus(s.key)}
                  className="rounded-full px-3 py-1 text-xs font-medium transition-all"
                  style={{
                    background: status === s.key ? 'var(--accent)' : 'var(--bg-page)',
                    color: status === s.key ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {typeFilter.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setType(t.key)}
                  className="rounded-full px-3 py-1 text-xs font-medium transition-all"
                  style={{
                    background: type === t.key ? 'var(--accent)' : 'var(--bg-page)',
                    color: type === t.key ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content List */}
      <div className="mx-4 mt-3 space-y-2 pb-6">
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>共 {filtered.length} 条内容</p>
        {filtered.map((content) => {
          const tc = typeColors[content.type];
          const sc = statusColors[content.status];
          return (
            <div
              key={content.id}
              className="rounded-xl p-3"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="flex items-start gap-3">
                <img src={content.coverImage} alt="" className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                      style={{ background: tc.bg, color: tc.text }}
                    >
                      {tc.label}
                    </span>
                    <span className="text-[10px]" style={{ color: sc.color }}>{sc.label}</span>
                  </div>
                  <p className="mt-1 truncate text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {content.title}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{content.provinceName}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>👁 {content.views.toLocaleString()}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>❤ {content.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 border-t" style={{ borderColor: 'var(--divider)', paddingTop: '8px' }}>
                <button
                  onClick={() => navigate(`/merchant/content/edit/${content.id}`)}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium"
                  style={{ background: 'var(--bg-page)', color: 'var(--text-secondary)' }}
                >
                  <Edit3 size={12} /> 编辑
                </button>
                <button
                  onClick={() => navigate('/merchant/content/analytics')}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium"
                  style={{ background: 'var(--bg-page)', color: 'var(--text-secondary)' }}
                >
                  <BarChart3 size={12} /> 数据
                </button>
                <button
                  onClick={handleDelete}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium"
                  style={{ background: '#EF444415', color: '#EF4444' }}
                >
                  <Trash2 size={12} /> 删除
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
