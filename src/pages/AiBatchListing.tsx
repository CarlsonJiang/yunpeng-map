import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Eye,
  FileText,
  MapPin,
  PackagePlus,
  RefreshCw,
  Scissors,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Ticket,
  Upload,
  Users,
} from 'lucide-react';
import { mockAiBatchListingDrafts } from '@/data/mockData';
import { useToast } from '@/context/ToastContext';
import type { AiBatchListingDraft, ListingKind } from '@/types';

const sampleBatchText = `嘉兴, 特产, 红船粽子礼盒, 南湖老字号手工现裹, 端午拼团, 新人券8元
抚州广昌, 特产, 广昌白莲, 万亩莲田合作社, 产地直发, 满减15元
嘉兴, 活动, 南湖红船研学, 亲子半日活动, 报名送粽子券
西双版纳, 特产, 古树普洱茶样包, 茶农实拍, 2人成团
吐鲁番, 特产, 哈密瓜产地直发, 18度甜现摘现发, 5人成团`;

const kindMeta: Record<ListingKind, { label: string; icon: typeof ShoppingBag; color: string; bg: string }> = {
  specialty: { label: '特产助农', icon: ShoppingBag, color: '#16a34a', bg: '#dcfce7' },
  activity: { label: '人文活动', icon: Calendar, color: '#f97316', bg: '#ffedd5' },
};

export default function AiBatchListing() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [sourceText, setSourceText] = useState(sampleBatchText);
  const [drafts, setDrafts] = useState<AiBatchListingDraft[]>(mockAiBatchListingDrafts);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    mockAiBatchListingDrafts.filter(draft => draft.status !== 'needs_review').map(draft => draft.id)
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const stats = useMemo(() => {
    const usable = drafts.filter(draft => draft.status !== 'needs_review');
    return {
      total: drafts.length,
      products: drafts.filter(draft => draft.kind === 'specialty').length,
      activities: drafts.filter(draft => draft.kind === 'activity').length,
      ready: usable.length,
      mapPoints: usable.length,
      risk: drafts.length - usable.length,
    };
  }, [drafts]);

  const toggleSelected = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const generateDrafts = () => {
    setIsGenerating(true);
    setSelectedIds([]);
    setTimeout(() => {
      setDrafts(mockAiBatchListingDrafts);
      setSelectedIds(mockAiBatchListingDrafts.filter(draft => draft.status !== 'needs_review').map(draft => draft.id));
      setIsGenerating(false);
      showToast('AI 已生成批量上架草稿', 'success');
    }, 650);
  };

  const publishSelected = () => {
    if (selectedIds.length === 0) {
      showToast('请选择可上架草稿', 'error');
      return;
    }
    setDrafts(prev => prev.map(draft => (
      selectedIds.includes(draft.id) && draft.status !== 'needs_review'
        ? { ...draft, status: 'published' }
        : draft
    )));
    showToast(`已模拟上架 ${selectedIds.length} 条内容`, 'success');
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]">
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
            <div>
              <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>AI批量上架</h1>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>特产、活动、内容、地图点位一批生成</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/user/map')}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: 'var(--bg-page)' }}
            title="查看地图"
          >
            <MapPin size={16} color="var(--text-secondary)" />
          </button>
        </div>
      </div>

      <div className="mx-4 mt-3 grid grid-cols-5 gap-2">
        {[
          { label: '草稿', value: stats.total, icon: FileText, color: '#3B82F6' },
          { label: '特产', value: stats.products, icon: ShoppingBag, color: '#16A34A' },
          { label: '活动', value: stats.activities, icon: Calendar, color: '#F97316' },
          { label: '点位', value: stats.mapPoints, icon: MapPin, color: '#8B5CF6' },
          { label: '待审', value: stats.risk, icon: AlertTriangle, color: '#EF4444' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl p-2 text-center" style={{ background: 'var(--bg-card)' }}>
            <stat.icon size={15} color={stat.color} className="mx-auto" />
            <div className="mt-1 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
            <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 rounded-xl p-3" style={{ background: 'var(--bg-card)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef2ff]">
              <Sparkles size={16} color="#4f46e5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>批量素材</h2>
              <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>CSV、表格文案、商家素材均可进入同一生成队列</p>
            </div>
          </div>
          <Upload size={17} color="var(--text-tertiary)" />
        </div>
        <textarea
          value={sourceText}
          onChange={(event) => setSourceText(event.target.value)}
          rows={6}
          className="mt-3 w-full resize-none rounded-xl px-3 py-2 text-xs leading-5 outline-none"
          style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}
        />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={generateDrafts}
            disabled={isGenerating || !sourceText.trim()}
            className="flex items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-semibold disabled:opacity-50"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {isGenerating ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
            {isGenerating ? '生成中' : 'AI生成草稿'}
          </button>
          <button
            onClick={publishSelected}
            className="flex items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-semibold"
            style={{ background: '#16a34a', color: '#fff' }}
          >
            <Send size={15} />
            一键上架
          </button>
        </div>
      </div>

      <div className="mx-4 mt-3 grid grid-cols-4 gap-2">
        {[
          { label: '标题详情', icon: FileText, color: '#3B82F6' },
          { label: '地图点位', icon: MapPin, color: '#8B5CF6' },
          { label: '溯源码', icon: ShieldCheck, color: '#16A34A' },
          { label: '营销券', icon: Ticket, color: '#F97316' },
        ].map(item => (
          <div key={item.label} className="rounded-xl px-2 py-3 text-center" style={{ background: 'var(--bg-card)' }}>
            <item.icon size={17} color={item.color} className="mx-auto" />
            <div className="mt-1 text-[11px] font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 space-y-3 pb-8">
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            已选 {selectedIds.length} 条，可上架 {stats.ready} 条
          </p>
          <button
            onClick={() => setSelectedIds(drafts.filter(draft => draft.status !== 'needs_review').map(draft => draft.id))}
            className="text-xs font-medium"
            style={{ color: 'var(--accent)' }}
          >
            选择全部可上架
          </button>
        </div>

        {drafts.map(draft => {
          const meta = kindMeta[draft.kind];
          const KindIcon = meta.icon;
          const isBlocked = draft.status === 'needs_review';
          const isSelected = selectedIds.includes(draft.id);

          return (
            <div key={draft.id} className="rounded-xl p-3" style={{ background: 'var(--bg-card)' }}>
              <div className="flex gap-3">
                <button
                  onClick={() => !isBlocked && toggleSelected(draft.id)}
                  disabled={isBlocked}
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border disabled:opacity-40"
                  style={{
                    background: isSelected ? 'var(--accent)' : 'transparent',
                    borderColor: isSelected ? 'var(--accent)' : 'var(--divider)',
                  }}
                >
                  {isSelected && <CheckCircle2 size={15} color="#fff" />}
                </button>
                <img src={draft.assets.coverImage} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{ background: meta.bg, color: meta.color }}
                    >
                      <KindIcon size={11} /> {meta.label}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{
                        background: isBlocked ? '#fef2f2' : '#ecfdf5',
                        color: isBlocked ? '#ef4444' : '#16a34a',
                      }}
                    >
                      {isBlocked ? '待复核' : draft.status === 'published' ? '已上架' : '可上架'}
                    </span>
                  </div>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {draft.generatedTitle}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-4" style={{ color: 'var(--text-secondary)' }}>
                    {draft.generatedContent}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg px-2 py-2" style={{ background: 'var(--bg-page)' }}>
                  <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                    <MapPin size={11} /> 地图点位
                  </div>
                  <div className="mt-0.5 text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {draft.provinceName}·{draft.cityName} / 热力 {draft.mapPoint.heatValue.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-lg px-2 py-2" style={{ background: 'var(--bg-page)' }}>
                  <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                    <ShieldCheck size={11} /> 溯源
                  </div>
                  <div className="mt-0.5 truncate text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {draft.traceability.confidence}% · {draft.traceability.code}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="flex items-center gap-1 rounded-full bg-[#fef2f2] px-2 py-1 text-[10px] font-medium text-[#e63946]">
                  <PackagePlus size={11} /> {draft.priceLabel}
                </span>
                {draft.groupLabel && (
                  <span className="flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2 py-1 text-[10px] font-medium text-[#16a34a]">
                    <Users size={11} /> {draft.groupLabel}
                  </span>
                )}
                {draft.bargainLabel && (
                  <span className="flex items-center gap-1 rounded-full bg-[#fff7ed] px-2 py-1 text-[10px] font-medium text-[#f97316]">
                    <Scissors size={11} /> {draft.bargainLabel}
                  </span>
                )}
                <span className="flex items-center gap-1 rounded-full bg-[#eef2ff] px-2 py-1 text-[10px] font-medium text-[#4f46e5]">
                  <Ticket size={11} /> {draft.couponLabel}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-[#f8fafc] px-2 py-1 text-[10px] font-medium text-[#64748b]">
                  <Eye size={11} /> 素材 {draft.assets.sourceImages}图/{draft.assets.videoClips}视频
                </span>
              </div>

              {draft.riskNotes.length > 0 && (
                <div className="mt-2 rounded-lg px-2 py-2 text-[11px] leading-4" style={{ background: '#fff7ed', color: '#c2410c' }}>
                  {draft.riskNotes.join('；')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
