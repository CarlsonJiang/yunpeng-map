import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, ShoppingBag, Calendar, Flame, Package, Camera, Heart, Share2, ChevronRight } from 'lucide-react';
import { cityData, getActivitiesByCity, getProductsByCity } from '@/data/mockData';

type TabKey = 'specialty' | 'activity';

export default function CityDetailPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('specialty');
  const [checkedIn, setCheckedIn] = useState(false);

  const city = cityData.find(c => c.id === cityId);
  if (!city) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center" style={{ maxWidth: 430, margin: '0 auto' }}>
        <p className="text-[var(--text-tertiary)]">城市未找到</p>
      </div>
    );
  }

  const activities = getActivitiesByCity(city.id);
  const products = getProductsByCity(city.id);

  const handleCheckIn = () => {
    setCheckedIn(true);
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)]" style={{ maxWidth: 430, margin: '0 auto' }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <img src={city.coverImage} alt={city.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-6">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <Share2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-white/80" />
              <span className="text-white/80 text-xs">{city.provinceName}</span>
            </div>
            <h1 className="text-2xl font-bold text-white">{city.name}</h1>
            <p className="text-white/70 text-xs mt-1">{city.description}</p>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats + Check-in */}
      <div className="px-4 -mt-3 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-around">
            {[
              { icon: Package, label: '特产', value: city.specialtyCount },
              { icon: Calendar, label: '活动', value: city.activityCount },
              { icon: Flame, label: '热力值', value: activities.reduce((s, a) => s + a.heatValue, 0) },
            ].map(s => (
              <div key={s.label} className="text-center">
                <s.icon size={18} className="mx-auto text-[#e63946]" />
                <p className="text-sm font-bold mt-1 text-[var(--text-primary)]">{s.value.toLocaleString()}</p>
                <p className="text-[10px] text-[var(--text-tertiary)]">{s.label}</p>
              </div>
            ))}
            <button
              onClick={handleCheckIn}
              className="text-center"
              disabled={checkedIn}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center mx-auto ${checkedIn ? 'bg-green-100' : 'bg-[#fef2f2]'}`}>
                <Camera size={18} className={checkedIn ? 'text-green-500' : 'text-[#e63946]'} />
              </div>
              <p className={`text-[10px] mt-1 ${checkedIn ? 'text-green-500 font-medium' : 'text-[var(--text-tertiary)]'}`}>
                {checkedIn ? '已打卡' : '打卡'}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Hot Tags */}
      <div className="flex gap-2 px-4 mt-3 overflow-x-auto">
        {city.products.map(p => (
          <span key={p} className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-white border border-[#eee] text-[var(--text-secondary)]">
            {p}
          </span>
        ))}
      </div>

      {/* Tab Switcher */}
      <div className="sticky top-0 z-40 bg-[var(--bg-page)] mt-3">
        <div className="flex px-4 pt-2 pb-0 bg-white border-b border-[var(--divider)]">
          <button
            onClick={() => setActiveTab('specialty')}
            className="flex-1 pb-3 text-center text-sm font-medium relative transition-colors"
            style={{ color: activeTab === 'specialty' ? '#e63946' : 'var(--text-tertiary)' }}
          >
            <div className="flex items-center justify-center gap-1.5">
              <ShoppingBag size={16} />
              城市特产
            </div>
            {activeTab === 'specialty' && (
              <motion.div layoutId="cityTab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#e63946] rounded-full" />
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
              <motion.div layoutId="cityTab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#e63946] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'specialty' ? (
        <div className="px-4 pt-4 pb-6">
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
              <p className="text-sm text-[var(--text-tertiary)]">该城市暂无特产</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">更多好物正在路上</p>
            </div>
          )}
        </div>
      ) : (
        <div className="px-4 pt-4 pb-6">
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
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-[11px] text-[var(--text-tertiary)]">
                        <Heart size={12} />
                        助力
                      </button>
                      <button className="flex items-center gap-1 text-[11px] text-[var(--text-tertiary)]">
                        <Share2 size={12} />
                        分享
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Calendar className="w-10 h-10 text-[var(--text-tertiary)] mx-auto mb-2" />
              <p className="text-sm text-[var(--text-tertiary)]">该城市暂无活动</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">精彩活动即将上线</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
