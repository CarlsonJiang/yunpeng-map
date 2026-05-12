// Core Type Definitions for 云蓬地图小程序

// ─── Province ─────────────────────────────────────────
export interface ProvinceData {
  id: string;
  name: string;
  count: number;
  productCount: number;
  hot: string;
  specialty: string;
  products: string[];
  x: number;
  y: number;
  region: 'north' | 'northeast' | 'east' | 'central' | 'south' | 'southwest' | 'northwest';
  labelDir: 'left' | 'right' | 'top' | 'bottom';
  productImage?: string;
  description?: string;
  coverImage?: string;
  cities?: CityData[];
  activities?: ActivityData[];
}

// ─── City ─────────────────────────────────────────
export interface CityData {
  id: string;
  name: string;
  provinceId: string;
  provinceName: string;
  description: string;
  coverImage: string;
  specialtyCount: number;
  activityCount: number;
  hotSpecialty: string;
  hotActivity: string;
  products: string[];
  x: number;
  y: number;
}

// ─── Activity ─────────────────────────────────────────
export interface ActivityData {
  id: string;
  title: string;
  provinceId: string;
  provinceName: string;
  cityId?: string;
  cityName?: string;
  type: 'picking' | 'market' | 'farming' | 'festival' | 'craft' | 'other';
  coverImage: string;
  images: string[];
  description: string;
  time: string;
  location: string;
  price: number;
  originalPrice?: number;
  participants: number;
  maxParticipants: number;
  isHot: boolean;
  heatValue: number;
  tags: string[];
  merchant: string;
  merchantAvatar: string;
}

// ─── Product ─────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  province: string;
  provinceName: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  description: string;
  specs: { label: string; value: string }[];
  rating: number;
  sales: number;
  merchant: string;
  merchantAvatar: string;
  contentSource?: string; // 关联的内容ID
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  spec?: string;
  contentSource?: string;
}

// ─── Content ─────────────────────────────────────────
export type ContentType = 'article' | 'short_video' | 'live_clip';
export type ContentStatus = 'draft' | 'reviewing' | 'published' | 'archived' | 'rejected';

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  province: string;
  provinceName: string;
  coverImage: string;
  mediaUrl?: string;      // 视频/直播URL
  content: string;        // 富文本正文
  summary: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  authorTitle?: string;   // 如「云南茶农」「非遗传承人」
  publishTime: string;
  views: number;
  likes: number;
  isLiked: boolean;
  comments: number;
  shares: number;
  tags: string[];
  status: ContentStatus;
  duration?: string;     // 视频时长，如 "03:24"
  isLive?: boolean;      // 是否正在直播
  // 带货关联
  relatedProducts: RelatedProduct[];
}

export interface RelatedProduct {
  productId: string;
  highlightText?: string;  // 推荐话术，如「视频同款」
  displayPosition: 'floating' | 'inline';
}

// ─── AI Batch Listing / Map Layer ─────────────────────────
export type ListingKind = 'specialty' | 'activity';

export interface TraceabilityInfo {
  origin: string;
  producer: string;
  certification: string;
  code: string;
  confidence: number;
}

export interface AiBatchListingDraft {
  id: string;
  kind: ListingKind;
  provinceId: string;
  provinceName: string;
  cityName: string;
  title: string;
  sellingPoint: string;
  generatedTitle: string;
  generatedContent: string;
  priceLabel: string;
  groupLabel?: string;
  bargainLabel?: string;
  couponLabel: string;
  traceability: TraceabilityInfo;
  mapPoint: {
    x: number;
    y: number;
    heatValue: number;
  };
  assets: {
    coverImage: string;
    sourceImages: number;
    videoClips: number;
  };
  tags: string[];
  status: 'ready' | 'needs_review' | 'published';
  riskNotes: string[];
  linkedProductId?: string;
  linkedActivityId?: string;
}

export interface MapLayerItem {
  id: string;
  kind: ListingKind;
  title: string;
  subtitle: string;
  provinceId: string;
  provinceName: string;
  cityName?: string;
  x: number;
  y: number;
  image: string;
  heatValue: number;
  priceLabel: string;
  statusLabel: string;
  traceabilityLabel?: string;
  couponLabel?: string;
  groupLabel?: string;
  sourceId: string;
  sourceType: 'product' | 'activity';
  tags: string[];
}

// ─── Content Comment ─────────────────────────────────
export interface ContentComment {
  id: string;
  contentId: string;
  userName: string;
  userAvatar: string;
  content: string;
  time: string;
  likes: number;
}

// ─── User ──────────────────────────────────────────────
export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: string;
  points: number;
  followings: number;
  followers: number;
  likes: number;
  collections: string[];  // 收藏的内容ID
  history: string[];      // 浏览历史内容ID
}

// ─── Merchant / B端 ──────────────────────────────────
export interface MerchantProfile {
  id: string;
  name: string;
  avatar: string;
  province: string;
  rating: number;
  totalSales: number;
  totalContent: number;
  totalProducts: number;
  monthlyIncome: number;
  contents: ContentItem[];
  products: Product[];
}

// ─── Analytics ─────────────────────────────────────────
export interface ContentAnalytics {
  contentId: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  clickThrough: number;    // 商品点击数
  conversions: number;     // 转化订单数
  conversionRate: number;  // 转化率
  revenue: number;         // 带货收入
  dailyTrend: { date: string; views: number; clicks: number }[];
  productPerformance: {
    productId: string;
    productName: string;
    clicks: number;
    orders: number;
    revenue: number;
  }[];
}
