import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Star, Eye, Search } from 'lucide-react';
import { mockContentItems } from '@/data/mockData';
import type { ContentStatus } from '@/types';
import { useToast } from '@/context/ToastContext';

type ReviewAction = 'pass' | 'reject' | 'recommend';

export default function AdminContentReview() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<ContentStatus | 'all'>('reviewing');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewed, setReviewed] = useState<Record<string, ReviewAction>>({});

  const filtered = mockContentItems.filter((c) => {
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (searchQuery && !c.title.includes(searchQuery)) return false;
    return true;
  });

  const selected = mockContentItems.find((c) => c.id === selectedId);

  const handleReview = (contentId: string, action: ReviewAction) => {
    setReviewed((prev) => ({ ...prev, [contentId]: action }));
    const msg = action === 'pass' ? '已通过审核' : action === 'reject' ? '已拒绝' : '已标记推荐';
    showToast(msg, action === 'reject' ? 'error' : 'success');
    if (action === 'pass' || action === 'reject') {
      setTimeout(() => {
        setSelectedId(null);
      }, 300);
    }
  };

  const statusFilters: { key: ContentStatus | 'all'; label: string }[] = [
    { key: 'reviewing', label: '待审核' },
    { key: 'published', label: '已通过' },
    { key: 'rejected', label: '已拒绝' },
    { key: 'all', label: '全部' },
  ];

  const typeLabels: Record<string, string> = {
    article: '图文',
    short_video: '短视频',
    live_clip: '直播',
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg-card)] px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: 'var(--bg-page)' }}
          >
            <ArrowLeft size={18} color="var(--text-primary)" />
          </button>
          <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>内容审核</h1>
        </div>

        {/* Search */}
        <div className="mt-3 flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full px-3 py-2" style={{ background: 'var(--bg-page)' }}>
            <Search size={16} color="var(--text-tertiary)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索内容..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="mt-2 flex gap-1">
          {statusFilters.map((s) => (
            <button
              key={s.key}
              onClick={() => setFilterStatus(s.key)}
              className="rounded-full px-3 py-1 text-xs font-medium transition-all"
              style={{
                background: filterStatus === s.key ? 'var(--accent)' : 'var(--bg-page)',
                color: filterStatus === s.key ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-3 pb-6">
        {selected ? (
          /* Detail View */
          <div className="space-y-3">
            <button
              onClick={() => setSelectedId(null)}
              className="flex items-center gap-1 text-xs font-medium"
              style={{ color: 'var(--accent)' }}
            >
              <ArrowLeft size={14} /> 返回列表
            </button>

            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)' }}>
              <img src={selected.coverImage} alt="" className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <span
                    className="rounded px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      background: selected.type === 'article' ? '#3B82F615' : '#EF444415',
                      color: selected.type === 'article' ? '#3B82F6' : '#EF4444',
                    }}
                  >
                    {typeLabels[selected.type]}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{selected.provinceName}</span>
                </div>
                <h2 className="mt-2 text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selected.title}</h2>
                <div className="mt-2 flex items-center gap-2">
                  <img src={selected.authorAvatar} alt="" className="h-6 w-6 rounded-full" />
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{selected.author}</span>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{selected.authorTitle}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                  {selected.content}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-2 py-0.5 text-[10px]" style={{ background: 'var(--bg-page)', color: 'var(--text-tertiary)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleReview(selected.id, 'pass')}
                className="flex items-center justify-center gap-1 rounded-xl py-3 text-sm font-medium"
                style={{ background: '#10B98115', color: '#10B981' }}
              >
                <CheckCircle size={16} /> 通过
              </button>
              <button
                onClick={() => handleReview(selected.id, 'reject')}
                className="flex items-center justify-center gap-1 rounded-xl py-3 text-sm font-medium"
                style={{ background: '#EF444415', color: '#EF4444' }}
              >
                <XCircle size={16} /> 拒绝
              </button>
              <button
                onClick={() => handleReview(selected.id, 'recommend')}
                className="flex items-center justify-center gap-1 rounded-xl py-3 text-sm font-medium"
                style={{ background: '#F59E0B15', color: '#F59E0B' }}
              >
                <Star size={16} /> 推荐
              </button>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-2">
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>共 {filtered.length} 条内容</p>
            {filtered.map((content) => {
              const reviewAction = reviewed[content.id];
              return (
                <button
                  key={content.id}
                  onClick={() => setSelectedId(content.id)}
                  className="flex w-full items-start gap-3 rounded-xl p-3 text-left"
                  style={{ background: 'var(--bg-card)' }}
                >
                  <img src={content.coverImage} alt="" className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                        style={{
                          background: content.type === 'article' ? '#3B82F615' : content.type === 'short_video' ? '#EF444415' : '#F59E0B15',
                          color: content.type === 'article' ? '#3B82F6' : content.type === 'short_video' ? '#EF4444' : '#F59E0B',
                        }}
                      >
                        {typeLabels[content.type]}
                      </span>
                      {reviewAction && (
                        <span
                          className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                          style={{
                            background: reviewAction === 'pass' ? '#10B98115' : reviewAction === 'reject' ? '#EF444415' : '#F59E0B15',
                            color: reviewAction === 'pass' ? '#10B981' : reviewAction === 'reject' ? '#EF4444' : '#F59E0B',
                          }}
                        >
                          {reviewAction === 'pass' ? '已通过' : reviewAction === 'reject' ? '已拒绝' : '已推荐'}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{content.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <img src={content.authorAvatar} alt="" className="h-4 w-4 rounded-full" />
                      <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{content.author}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>👁 {content.views.toLocaleString()}</span>
                      <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>❤ {content.likes.toLocaleString()}</span>
                    </div>
                  </div>
                  <Eye size={16} color="var(--text-tertiary)" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
