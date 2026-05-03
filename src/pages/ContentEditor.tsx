import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image, Video, Link2, Tag, MapPin } from 'lucide-react';
import { mockContentItems, mockProducts } from '@/data/mockData';
import { useToast } from '@/context/ToastContext';
import type { ContentType } from '@/types';

export default function ContentEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const isNew = id === 'new';

  const existing = isNew ? null : mockContentItems.find((c) => c.id === id);

  const [title, setTitle] = useState(existing?.title || '');
  const [content, setContent] = useState(existing?.content || '');
  const [type, setType] = useState<ContentType>(existing?.type || 'article');
  const [province, setProvince] = useState(existing?.provinceName || '');
  const [tags, setTags] = useState(existing?.tags.join(', ') || '');
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    existing?.relatedProducts.map((r) => r.productId) || []
  );
  const [saving, setSaving] = useState(false);

  const typeOptions: { key: ContentType; label: string; icon: typeof Image }[] = [
    { key: 'article', label: '图文', icon: Image },
    { key: 'short_video', label: '短视频', icon: Video },
    { key: 'live_clip', label: '直播', icon: Video },
  ];

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((p) => p !== productId) : [...prev, productId]
    );
  };

  const handleSave = () => {
    if (!title.trim()) {
      showToast('请输入标题', 'error');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast(isNew ? '内容发布成功' : '内容更新成功', 'success');
      navigate('/merchant/content');
    }, 800);
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-[var(--bg-card)] px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/merchant/content')}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: 'var(--bg-page)' }}
          >
            <ArrowLeft size={18} color="var(--text-primary)" />
          </button>
          <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {isNew ? '发布内容' : '编辑内容'}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium disabled:opacity-50"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          <Save size={14} />
          {saving ? '保存中...' : '保存'}
        </button>
      </div>

      <div className="mx-4 mt-3 space-y-3 pb-6">
        {/* Type Selector */}
        <div className="rounded-xl p-3" style={{ background: 'var(--bg-card)' }}>
          <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>内容类型</label>
          <div className="mt-2 flex gap-2">
            {typeOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setType(opt.key)}
                className="flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-xs font-medium transition-all"
                style={{
                  background: type === opt.key ? 'var(--accent)' : 'var(--bg-page)',
                  color: type === opt.key ? '#fff' : 'var(--text-secondary)',
                }}
              >
                <opt.icon size={14} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="rounded-xl p-3" style={{ background: 'var(--bg-card)' }}>
          <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>标题</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入吸引人的标题..."
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm outline-none"
            style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Cover Image */}
        <div className="rounded-xl p-3" style={{ background: 'var(--bg-card)' }}>
          <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>封面图</label>
          <button
            onClick={() => showToast('图片上传功能演示', 'info')}
            className="mt-2 flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed"
            style={{ borderColor: 'var(--divider)', background: 'var(--bg-page)' }}
          >
            {existing?.coverImage ? (
              <img src={existing.coverImage} alt="" className="h-full w-full rounded-lg object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <Image size={24} color="var(--text-tertiary)" />
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>点击上传封面</span>
              </div>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="rounded-xl p-3" style={{ background: 'var(--bg-card)' }}>
          <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>正文内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享你的故事、知识或经验..."
            rows={6}
            className="mt-1 w-full resize-none rounded-lg px-3 py-2 text-sm outline-none"
            style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Province */}
        <div className="rounded-xl p-3" style={{ background: 'var(--bg-card)' }}>
          <label className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            <MapPin size={12} /> 关联地区
          </label>
          <input
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="如：云南、四川..."
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm outline-none"
            style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Tags */}
        <div className="rounded-xl p-3" style={{ background: 'var(--bg-card)' }}>
          <label className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            <Tag size={12} /> 话题标签
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="用逗号分隔，如：普洱茶, 云南, 非遗..."
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm outline-none"
            style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Related Products */}
        <div className="rounded-xl p-3" style={{ background: 'var(--bg-card)' }}>
          <label className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            <Link2 size={12} /> 关联商品（最多8件）
          </label>
          <div className="mt-2 space-y-2">
            {mockProducts.slice(0, 8).map((product) => (
              <button
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all"
                style={{
                  background: selectedProducts.includes(product.id) ? 'var(--accent)15' : 'var(--bg-page)',
                  border: selectedProducts.includes(product.id) ? '1px solid var(--accent)' : '1px solid transparent',
                }}
              >
                <img src={product.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{product.name}</p>
                  <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>¥{product.price}</span>
                </div>
                {selectedProducts.includes(product.id) && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: 'var(--accent)' }}>
                    <span className="text-xs text-white">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
