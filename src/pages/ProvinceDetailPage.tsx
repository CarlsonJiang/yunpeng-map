import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, ShoppingBag, Calendar, ChevronRight, Flame, Package } from 'lucide-react';
import { provinceData, getCitiesByProvince, getActivitiesByProvince, getProductsByProvince, getContentsByProvince } from '@/data/mockData';

type TabKey = 'specialty' | 'activity';

export default function ProvinceDetailPage() {
  const { provinceId } = useParams<{ provinceId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('specialty');

  const province = provinceData.find(p => p.id === provinceId);
  if (!province) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center" style={{ maxWidth: 430, margin: '0 auto' }}>
        <p className="text-[var(--text-tertiary)]">省份未找到</p>
      </div>
    );
  }

  const cities = getCitiesByProvince(province.id);
  const activities = getActivitiesByProvince(province.id);
  const products = getProductsByProvince(province.id);
  const contents = getContentsByProvince(province.id);

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]" style={{ maxWidth: 430, margin: '0 auto' }}>
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#e63946] via-[#e63946] to-[#f4a261] px-5 pt-6 pb-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />

        <div className="flex items-center justify-between mb-5 relative">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">{province.name}</h1>
          <div className="w-8" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-white/80" />
            <span className="text-white/80 text-sm">{province.hot}</span>
          </div>
          <p className="text-white/70 text-xs leading-relaxed">
            {province.count} 条内容 · {province.productCount} 件商品 · {cities.length} 个城市
          </p>
        </motion.div>

        {/* Stats */}
        <div className="flex gap-3 mt-4">
          {[
            { icon: Package, label: '特产', value: products.length },
            { icon: Calendar, label: '活动', value: activities.length },
            { icon: Flame, label: '热力值', value: activities.reduce((s, a) => s + a.heatValue, 0) },
          ].map(s => (
            <div key={s.label} className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
              <p className="text-white font-bold text-base">{s.value.toLocaleString()}</p>
              <p className="text-white/70 text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="sticky top-0 z-40 bg-white border-b border-[var(--divider)]">
        <div className="flex px-4 pt-3 pb-0">
          <button
            onClick={() => setActiveTab('specialty')}
            className="flex-1 pb-3 text-center text-sm font-medium relative transition-colors"
            style={{ color: activeTab === 'specialty' ? '#e63946' : 'var(--text-tertiary)' }}
          >
            <div className="flex items-center justify-center gap-1.5">
              <ShoppingBag size={16} />
              各地特产
            </div>
            {activeTab === 'specialty' && (
              <motion.div layoutId="provinceTab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#e63946] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className="flex-1 pb-3 text-center text-sm font-medium relative transition-colors"
            style={{ color: activeTab === 'activity' ? '#e63946' : 'var(--text-tertiary)' }}
          >
            <div className="flex items-center justify-center gap-1.5">
              <Calendar size={16} />
              人文活动
            </div>
            {activeTab === 'activity' && (
              <motion.div layoutId="provinceTab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#e63946] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
          {province.name} · 热门城市
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {cities.map((city, i) => (
            <motion.button
              key={city.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/user/city/${city.id}`)}
              className="relative overflow-hidden rounded-2xl text-left active:scale-[0.98] transition-transform"
              style={{ background: 'white', border: '1px solid #eee' }}
            >
              <div className="h-24 overflow-hidden">
                <img src={city.coverImage} alt={city.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-3">
                <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">{city.name}</h4>
                <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 line-clamp-1">{city.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#fef2f2] text-[#e63946]">
                    {city.hotSpecialty}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#e8f1ff] text-[#3a86ff]">
                    {city.hotActivity}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'specialty' ? (
        <div className="px-4 pt-4 pb-6">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            {province.name} · 特产好物
          </h3>
          {products.length > 0 ? (
            <div className="space-y-3">
              {products.map((product, i) => (
                <motion.button
                  key={product.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => navigate(`/user/product/${product.id}`)}
                  className="w-full flex gap-3 p-3 rounded-2xl bg-white border border-[#eee] text-left active:scale-[0.99] transition-transform"
                >
                  <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-semibold text-[var(--text-primary)] line-clamp-1">{product.name}</h4>
                    <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{product.merchant}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[#e63946] font-bold text-base">¥{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-[11px] text-[var(--text-tertiary)] line-through">¥{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] text-[var(--text-tertiary)]">已售 {product.sales}</span>
                      <span className="text-[10px] text-[var(--text-tertiary)]">· 评分 {product.rating}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#d0d0d0] shrink-0 self-center" />
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Package className="w-10 h-10 text-[var(--text-tertiary)] mx-auto mb-2" />
              <p className="text-sm text-[var(--text-tertiary)]">该省份暂无特产</p>
            </div>
          )}
        </div>
      ) : (
        <div className="px-4 pt-4 pb-6">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            {province.name} · 人文活动
          </h3>
          {activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-3 rounded-2xl bg-white border border-[#eee]"
                >
                  <div className="flex gap-3">
                    <img src={activity.coverImage} alt={activity.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-[13px] font-semibold text-[var(--text-primary)] line-clamp-1">{activity.title}</h4>
                        {activity.isHot && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#fef2f2] text-[#e63946] shrink-0">热门</span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 line-clamp-2">{activity.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[11px] text-[var(--text-tertiary)]">
                          {activity.price > 0 ? `¥${activity.price}` : '免费'}
                        </span>
                        <span className="text-[11px] text-[var(--text-tertiary)]">· {activity.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-[#f5f5f5]">
                    <div className="flex items-center gap-1">
                      <Flame size={12} className="text-[#e63946]" />
                      <span className="text-[11px] text-[#e63946] font-medium">热力值 {activity.heatValue}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-[var(--text-tertiary)]">{activity.participants}/{activity.maxParticipants}人</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Calendar className="w-10 h-10 text-[var(--text-tertiary)] mx-auto mb-2" />
              <p className="text-sm text-[var(--text-tertiary)]">该省份暂无活动</p>
            </div>
          )}
        </div>
      )}

      {/* Related Content */}
      {contents.length > 0 && (
        <div className="px-4 pb-6">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            {province.name} · 精彩内容
          </h3>
          <div className="space-y-3">
            {contents.slice(0, 3).map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/user/content/${item.id}`)}
                className="w-full flex gap-3 p-3 rounded-2xl bg-white border border-[#eee] text-left active:scale-[0.99] transition-transform"
              >
                <img src={item.coverImage} alt={item.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-semibold text-[var(--text-primary)] line-clamp-2">{item.title}</h4>
                  <p className="text-[11px] text-[var(--text-tertiary)] mt-1">{item.author} · {item.views.toLocaleString()} 阅读</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
