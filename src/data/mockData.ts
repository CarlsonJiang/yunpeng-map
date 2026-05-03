import type {
  ProvinceData, Product, ContentItem, ContentComment, ContentAnalytics, ContentType, CityData, ActivityData
} from '@/types';

// ─── Province Data ─────────────────────────────────────────
export const provinceData: ProvinceData[] = [
  { id: 'beijing', name: '北京', count: 3, productCount: 25, hot: '京味', specialty: '北京烤鸭', products: ['北京烤鸭', '果脯', '二锅头', '茯苓夹饼'], x: 67.0, y: 39.3, region: 'north', labelDir: 'top', productImage: '/product-beijing.jpg', description: '六朝古都，烤鸭飘香' },
  { id: 'tianjin', name: '天津', count: 2, productCount: 20, hot: '津味', specialty: '狗不理包子', products: ['狗不理包子', '桂发祥麻花', '沙窝萝卜', '板栗'], x: 68.1, y: 41.2, region: 'north', labelDir: 'right', productImage: '/product-tianjin.jpg', description: '津门故里，麻花飘香' },
  { id: 'hebei', name: '河北', count: 2, productCount: 24, hot: '冀味', specialty: '驴肉火烧', products: ['驴肉火烧', '迁西板栗', '衡水老白干', '雪花梨'], x: 64.3, y: 43.9, region: 'north', labelDir: 'left', productImage: '/product-hebei.jpg', description: '燕赵大地，板栗之乡' },
  { id: 'shanxi', name: '山西', count: 2, productCount: 27, hot: '晋味', specialty: '平遥牛肉', products: ['平遥牛肉', '老陈醋', '汾酒', '太谷饼'], x: 61.1, y: 44.9, region: 'north', labelDir: 'left', productImage: '/product-shanxi.jpg', description: '表里山河，醋香千年' },
  { id: 'neimenggu', name: '内蒙古', count: 2, productCount: 35, hot: '草原', specialty: '风干牛肉', products: ['风干牛肉', '奶酪', '马奶酒', '羊肉'], x: 60.3, y: 37.1, region: 'north', labelDir: 'bottom', productImage: '/product-xinjiang.jpg', description: '天苍苍野茫茫，牛羊肥壮' },
  { id: 'liaoning', name: '辽宁', count: 2, productCount: 30, hot: '辽味', specialty: '大连海参', products: ['大连海参', '丹东草莓', '盘锦大米', '老边饺子'], x: 77.0, y: 34.7, region: 'northeast', labelDir: 'right', productImage: '/product-liaoning.jpg', description: '辽东半岛，海鲜之都' },
  { id: 'jilin', name: '吉林', count: 2, productCount: 22, hot: '吉味', specialty: '长白山人参', products: ['长白山人参', '延边冷面', '通化葡萄酒', '黑木耳'], x: 79.7, y: 29.6, region: 'northeast', labelDir: 'right', description: '白山松水，人参之乡' },
  { id: 'heilongjiang', name: '黑龙江', count: 3, productCount: 28, hot: '黑土', specialty: '五常大米', products: ['五常大米', '哈尔滨红肠', '蓝莓', '松子'], x: 81.6, y: 24.9, region: 'northeast', labelDir: 'right', description: '黑土粮仓，大米飘香' },
  { id: 'shanghai', name: '上海', count: 3, productCount: 32, hot: '海派', specialty: '南翔小笼包', products: ['南翔小笼包', '五香豆', '高桥松饼', '蝴蝶酥'], x: 74.3, y: 60.5, region: 'east', labelDir: 'right', description: '魔都上海，小笼飘香' },
  { id: 'jiangsu', name: '江苏', count: 3, productCount: 52, hot: '苏味', specialty: '阳澄湖大闸蟹', products: ['阳澄湖大闸蟹', '碧螺春', '盐水鸭', '苏绣'], x: 70.4, y: 58.3, region: 'east', labelDir: 'left', productImage: '/product-jiangsu.jpg', description: '鱼米之乡，蟹肥菊黄' },
  { id: 'zhejiang', name: '浙江', count: 3, productCount: 45, hot: '浙味', specialty: '西湖龙井', products: ['西湖龙井', '金华火腿', '绍兴黄酒', '嘉兴粽子'], x: 72.4, y: 65.6, region: 'east', labelDir: 'right', productImage: '/product-zhejiang.jpg', description: '人间天堂，龙井茶香' },
  { id: 'anhui', name: '安徽', count: 2, productCount: 30, hot: '徽味', specialty: '黄山毛峰', products: ['黄山毛峰', '宣纸', '徽墨酥', '符离集烧鸡'], x: 68.3, y: 59.0, region: 'east', labelDir: 'left', description: '徽风皖韵，毛峰茶香' },
  { id: 'fujian', name: '福建', count: 4, productCount: 38, hot: '闽味', specialty: '武夷岩茶', products: ['武夷岩茶', '铁观音', '佛跳墙', '桂圆'], x: 71.1, y: 72.8, region: 'east', labelDir: 'right', productImage: '/product-fujian.jpg', description: '八闽大地，岩茶飘香' },
  { id: 'jiangxi', name: '江西', count: 2, productCount: 27, hot: '赣味', specialty: '景德镇瓷器', products: ['景德镇瓷器', '赣南脐橙', '瓦罐汤', '庐山云雾茶'], x: 66.3, y: 69.2, region: 'east', labelDir: 'left', description: '物华天宝，瓷都千年' },
  { id: 'shandong', name: '山东', count: 3, productCount: 48, hot: '鲁味', specialty: '德州扒鸡', products: ['德州扒鸡', '烟台苹果', '章丘大葱', '东阿阿胶'], x: 67.9, y: 47.1, region: 'east', labelDir: 'right', productImage: '/product-shandong.jpg', description: '齐鲁大地，扒鸡飘香' },
  { id: 'henan', name: '河南', count: 2, productCount: 40, hot: '豫味', specialty: '信阳毛尖', products: ['信阳毛尖', '烩面', '道口烧鸡', '杜康酒'], x: 63.1, y: 51.7, region: 'central', labelDir: 'left', description: '中原大地，毛尖茶香' },
  { id: 'hubei', name: '湖北', count: 2, productCount: 36, hot: '鄂味', specialty: '热干面', products: ['热干面', '洪湖莲藕', '鸭脖', '鱼糕'], x: 64.0, y: 61.9, region: 'central', labelDir: 'left', productImage: '/product-hubei.jpg', description: '千湖之省，热干面香' },
  { id: 'hunan', name: '湖南', count: 3, productCount: 34, hot: '湘味', specialty: '臭豆腐', products: ['臭豆腐', '剁椒', '腊肉', '东江鱼'], x: 60.7, y: 69.2, region: 'central', labelDir: 'left', description: '湘辣天下，臭豆腐香' },
  { id: 'guangdong', name: '广东', count: 5, productCount: 41, hot: '粤味', specialty: '广式腊肠', products: ['广式腊肠', '潮汕牛肉丸', '新会陈皮', '荔枝'], x: 62.6, y: 80.2, region: 'south', labelDir: 'right', productImage: '/product-guangdong.jpg', description: '食在广东，腊肠飘香' },
  { id: 'guangxi', name: '广西', count: 3, productCount: 33, hot: '桂味', specialty: '柳州螺蛳粉', products: ['柳州螺蛳粉', '桂林米粉', '罗汉果', '沙田柚'], x: 55.4, y: 80.9, region: 'south', labelDir: 'left', productImage: '/product-guangxi.jpg', description: '山水甲天下，螺蛳粉香' },
  { id: 'hainan', name: '海南', count: 2, productCount: 18, hot: '琼味', specialty: '文昌鸡', products: ['文昌鸡', '椰子糖', '兴隆咖啡', '黄灯笼椒'], x: 57.4, y: 89.6, region: 'south', labelDir: 'right', description: '天涯海角，文昌鸡香' },
  { id: 'chongqing', name: '重庆', count: 3, productCount: 30, hot: '渝味', specialty: '火锅底料', products: ['火锅底料', '酸辣粉', '泡椒凤爪', '合川桃片'], x: 52.9, y: 64.4, region: 'southwest', labelDir: 'left', description: '山城火锅，麻辣鲜香' },
  { id: 'sichuan', name: '四川', count: 4, productCount: 50, hot: '川味', specialty: '郫县豆瓣', products: ['郫县豆瓣', '火锅底料', '腊肉', '花椒'], x: 49.4, y: 61.7, region: 'southwest', labelDir: 'left', productImage: '/product-sichuan.jpg', description: '天府之国，豆瓣飘香' },
  { id: 'guizhou', name: '贵州', count: 3, productCount: 26, hot: '黔味', specialty: '老干妈', products: ['老干妈', '茅台酒', '酸汤鱼底料', '刺梨'], x: 53.1, y: 71.6, region: 'southwest', labelDir: 'left', description: '多彩贵州，辣酱飘香' },
  { id: 'yunnan', name: '云南', count: 4, productCount: 44, hot: '滇味', specialty: '普洱茶', products: ['普洱茶', '鲜花饼', '过桥米线', '松茸'], x: 47.4, y: 75.5, region: 'southwest', labelDir: 'left', productImage: '/product-yunnan.jpg', description: '彩云之南，普洱茶香' },
  { id: 'xizang', name: '西藏', count: 2, productCount: 28, hot: '藏味', specialty: '藏红花', products: ['藏红花', '牦牛肉干', '青稞酒', '冬虫夏草'], x: 30.9, y: 64.1, region: 'southwest', labelDir: 'right', description: '雪域高原，藏药珍贵' },
  { id: 'shaanxi', name: '陕西', count: 3, productCount: 32, hot: '陕味', specialty: '肉夹馍', products: ['肉夹馍', '凉皮', '苹果', '兵马俑文创'], x: 56.3, y: 52.9, region: 'northwest', labelDir: 'right', productImage: '/product-shaanxi.jpg', description: '三秦大地，肉夹馍香' },
  { id: 'gansu', name: '甘肃', count: 2, productCount: 20, hot: '陇味', specialty: '兰州百合', products: ['兰州百合', '牛肉面', '枸杞', '黄花菜'], x: 49.0, y: 48.5, region: 'northwest', labelDir: 'top', description: '河西走廊，百合甘甜' },
  { id: 'qinghai', name: '青海', count: 2, productCount: 15, hot: '青味', specialty: '冬虫夏草', products: ['冬虫夏草', '黑枸杞', '牦牛肉', '青稞酒'], x: 46.1, y: 47.3, region: 'northwest', labelDir: 'top', description: '三江源头，虫草珍贵' },
  { id: 'ningxia', name: '宁夏', count: 2, productCount: 18, hot: '宁味', specialty: '宁夏枸杞', products: ['宁夏枸杞', '贺兰山葡萄酒', '滩羊肉', '甘草'], x: 52.6, y: 42.7, region: 'northwest', labelDir: 'right', description: '塞上江南，枸杞红艳' },
  { id: 'xinjiang', name: '新疆', count: 4, productCount: 42, hot: '新味', specialty: '和田大枣', products: ['和田大枣', '哈密瓜', '葡萄干', '核桃'], x: 25.9, y: 34.7, region: 'northwest', labelDir: 'right', productImage: '/content-thumb-xinjiang-fruit-1.jpg', description: '丝路明珠，瓜果飘香' },
  { id: 'taiwan', name: '台湾', count: 2, productCount: 22, hot: '台味', specialty: '凤梨酥', products: ['凤梨酥', '高山茶', '牛轧糖', '太阳饼'], x: 73.6, y: 78.7, region: 'east', labelDir: 'right', description: '宝岛台湾，凤梨酥甜' },
  { id: 'hongkong', name: '香港', count: 2, productCount: 16, hot: '港味', specialty: '蛋挞', products: ['蛋挞', '奶茶', '老婆饼', '鸡仔饼'], x: 63.9, y: 82.1, region: 'south', labelDir: 'right', description: '东方之珠，蛋挞飘香' },
  { id: 'macao', name: '澳门', count: 1, productCount: 12, hot: '澳味', specialty: '杏仁饼', products: ['杏仁饼', '葡挞', '猪肉干', '花生糖'], x: 62.9, y: 82.3, region: 'south', labelDir: 'left', description: '濠江风情，杏仁饼香' },
];

// ─── Products ──────────────────────────────────────────────
export const mockProducts: Product[] = [
  {
    id: 'p1', name: '云南普洱熟茶饼 357g', province: 'yunnan', provinceName: '云南',
    category: '茶叶', price: 168, originalPrice: 268,
    image: '/product-tea-1.jpg', images: ['/product-tea-1.jpg', '/product-tea-2.jpg'],
    description: '产自云南西双版纳勐海县，选用百年古树春茶原料，传统工艺发酵，茶汤红浓透亮，口感醇厚回甘。',
    specs: [{ label: '规格', value: '357g/饼' }, { label: '年份', value: '2024年春' }, { label: '等级', value: '特级' }],
    rating: 4.9, sales: 3420, merchant: '云茶记', merchantAvatar: '/avatar-merchant-1.jpg',
    contentSource: 'c1'
  },
  {
    id: 'p2', name: '新疆哈密瓜 2个装', province: 'xinjiang', provinceName: '新疆',
    category: '水果', price: 59, originalPrice: 89,
    image: '/product-hami-1.jpg', images: ['/product-hami-1.jpg'],
    description: '产自新疆吐鲁番，日照充足昼夜温差大，甜度高达18度，皮薄肉厚，汁水丰盈。',
    specs: [{ label: '规格', value: '2个装（约4kg）' }, { label: '产地', value: '新疆吐鲁番' }, { label: '储存', value: '常温/冷藏' }],
    rating: 4.8, sales: 5670, merchant: '西域果园', merchantAvatar: '/avatar-merchant-3.jpg',
    contentSource: 'c3'
  },
  {
    id: 'p3', name: '苏绣手工刺绣手帕', province: 'jiangsu', provinceName: '江苏',
    category: '手工艺', price: 128, originalPrice: 198,
    image: '/product-embroidery-1.jpg', images: ['/product-embroidery-1.jpg'],
    description: '苏州非遗传承人手工绣制，双面绣工艺，图案精美，可收藏可实用。',
    specs: [{ label: '材质', value: '真丝' }, { label: '尺寸', value: '28×28cm' }, { label: '工艺', value: '双面绣' }],
    rating: 4.9, sales: 890, merchant: '苏绣坊', merchantAvatar: '/avatar-merchant-2.jpg',
    contentSource: 'c5'
  },
  {
    id: 'p4', name: '四川手工火锅底料 500g', province: 'sichuan', provinceName: '四川',
    category: '调味品', price: 35, originalPrice: 49,
    image: '/content-thumb-sichuan-1.jpg', images: ['/content-thumb-sichuan-1.jpg'],
    description: '正宗重庆老火锅配方，牛油熬制，麻辣鲜香，一袋可供4-6人食用。',
    specs: [{ label: '规格', value: '500g/袋' }, { label: '辣度', value: '中辣' }, { label: '保质期', value: '12个月' }],
    rating: 4.7, sales: 12500, merchant: '蜀味坊', merchantAvatar: '/avatar-merchant-2.jpg',
    contentSource: 'c7'
  },
  {
    id: 'p5', name: '武夷山大红袍 250g', province: 'fujian', provinceName: '福建',
    category: '茶叶', price: 288, originalPrice: 388,
    image: '/product-tea-1.jpg', images: ['/product-tea-1.jpg', '/product-tea-2.jpg'],
    description: '产自武夷山核心产区，岩骨花香，传统炭焙工艺，耐泡度高。',
    specs: [{ label: '规格', value: '250g/盒' }, { label: '等级', value: '一级' }, { label: '产地', value: '武夷山' }],
    rating: 4.8, sales: 2100, merchant: '岩韵茶庄', merchantAvatar: '/avatar-merchant-1.jpg',
    contentSource: 'c9'
  },
  {
    id: 'p6', name: '阳澄湖大闸蟹 8只装', province: 'jiangsu', provinceName: '江苏',
    category: '水产', price: 398, originalPrice: 598,
    image: '/product-hami-1.jpg', images: ['/product-hami-1.jpg'],
    description: '正宗阳澄湖产区，膏满黄肥，鲜活到家，死蟹包赔。',
    specs: [{ label: '规格', value: '公4.5两+母3.5两 各4只' }, { label: '配送', value: '顺丰冷链' }, { label: '季节', value: '秋季限定' }],
    rating: 4.9, sales: 3200, merchant: '蟹将军', merchantAvatar: '/avatar-merchant-2.jpg',
    contentSource: 'c10'
  },
  {
    id: 'p7', name: '潮汕手工牛肉丸 500g', province: 'guangdong', provinceName: '广东',
    category: '食品', price: 68, originalPrice: 88,
    image: '/product-hami-1.jpg', images: ['/product-hami-1.jpg'],
    description: '汕头老字号手工制作，选用新鲜黄牛肉，传统捶打工艺，口感弹牙有嚼劲。',
    specs: [{ label: '规格', value: '500g/袋' }, { label: '口味', value: '原味' }, { label: '保存', value: '冷冻' }],
    rating: 4.8, sales: 8900, merchant: '老陈丸店', merchantAvatar: '/avatar-merchant-2.jpg',
    contentSource: 'c11'
  },
  {
    id: 'p8', name: '从化桂味荔枝 3斤装', province: 'guangdong', provinceName: '广东',
    category: '水果', price: 89, originalPrice: 128,
    image: '/product-hami-1.jpg', images: ['/product-hami-1.jpg'],
    description: '从化核心产区，现摘现发，桂味荔枝果肉晶莹剔透，甜度高带桂花香。',
    specs: [{ label: '规格', value: '3斤装' }, { label: '品种', value: '桂味' }, { label: '配送', value: '顺丰冷链' }],
    rating: 4.9, sales: 12300, merchant: '从化果农阿强', merchantAvatar: '/avatar-merchant-3.jpg',
    contentSource: 'c13'
  },
  {
    id: 'p9', name: '湘西农家腊肉 500g', province: 'hunan', provinceName: '湖南',
    category: '食品', price: 58, originalPrice: 78,
    image: '/product-xinjiang.jpg', images: ['/product-xinjiang.jpg'],
    description: '湘西农家自制，柏树枝慢火熏制四十天，肥而不腻，腊香浓郁。',
    specs: [{ label: '规格', value: '500g' }, { label: '部位', value: '五花肉' }, { label: '工艺', value: '柏枝熏制' }],
    rating: 4.7, sales: 6700, merchant: '湘西张婶', merchantAvatar: '/avatar-merchant-1.jpg',
    contentSource: 'c15'
  },
  {
    id: 'p10', name: '兵马俑Q版文创礼盒', province: 'shaanxi', provinceName: '陕西',
    category: '文创', price: 128, originalPrice: 168,
    image: '/product-embroidery-1.jpg', images: ['/product-embroidery-1.jpg'],
    description: '兵马俑博物馆官方授权，Q版造型文具套装，含笔记本、书签、胶带。',
    specs: [{ label: '内容', value: '笔记本+书签+胶带' }, { label: '材质', value: '再生纸' }, { label: '授权', value: '博物馆正版' }],
    rating: 4.9, sales: 4500, merchant: '文创设计师小李', merchantAvatar: '/avatar-merchant-2.jpg',
    contentSource: 'c16'
  },
  {
    id: 'p11', name: '烟台红富士苹果 5斤装', province: 'shandong', provinceName: '山东',
    category: '水果', price: 39, originalPrice: 55,
    image: '/product-hami-1.jpg', images: ['/product-hami-1.jpg'],
    description: '烟台核心产区，自然成熟不打蜡，脆甜多汁，果肉细腻。',
    specs: [{ label: '规格', value: '5斤装' }, { label: '果径', value: '80mm+' }, { label: '产地', value: '烟台' }],
    rating: 4.8, sales: 23400, merchant: '王大叔果园', merchantAvatar: '/avatar-merchant-3.jpg',
    contentSource: 'c18'
  },
  {
    id: 'p12', name: '青岛鲜活大虾 2斤装', province: 'shandong', provinceName: '山东',
    category: '水产', price: 128, originalPrice: 168,
    image: '/product-hami-1.jpg', images: ['/product-hami-1.jpg'],
    description: '青岛码头直供，鲜活速冻，肉质紧实弹牙，白灼清蒸皆宜。',
    specs: [{ label: '规格', value: '2斤装' }, { label: '品种', value: '对虾' }, { label: '配送', value: '顺丰冷链' }],
    rating: 4.9, sales: 15600, merchant: '青岛海鲜姐', merchantAvatar: '/avatar-merchant-2.jpg',
    contentSource: 'c19'
  },
  {
    id: 'p13', name: '柳州螺蛳粉 3袋装', province: 'guangxi', provinceName: '广西',
    category: '食品', price: 35, originalPrice: 45,
    image: '/product-xinjiang.jpg', images: ['/product-xinjiang.jpg'],
    description: '正宗柳州风味，酸笋、腐竹、花生配料齐全，汤底浓郁鲜美。',
    specs: [{ label: '规格', value: '3袋装' }, { label: '口味', value: '原味' }, { label: '保质期', value: '6个月' }],
    rating: 4.7, sales: 45600, merchant: '柳州螺妹', merchantAvatar: '/avatar-merchant-2.jpg',
    contentSource: 'c22'
  },
  {
    id: 'p14', name: '苗族手工银饰手镯', province: 'guizhou', provinceName: '贵州',
    category: '手工艺', price: 268, originalPrice: 358,
    image: '/product-embroidery-1.jpg', images: ['/product-embroidery-1.jpg'],
    description: '西江千户苗寨银匠手工锻制，999纯银，传统苗族图腾纹饰。',
    specs: [{ label: '材质', value: '999纯银' }, { label: '工艺', value: '手工锻制' }, { label: '款式', value: '开口可调' }],
    rating: 4.9, sales: 2300, merchant: '龙师傅银坊', merchantAvatar: '/avatar-merchant-1.jpg',
    contentSource: 'c24'
  },
  {
    id: 'p15', name: '茅台镇酱香白酒 500ml', province: 'guizhou', provinceName: '贵州',
    category: '酒类', price: 198, originalPrice: 298,
    image: '/product-tea-1.jpg', images: ['/product-tea-1.jpg'],
    description: '茅台镇核心产区，五年窖藏，酱香浓郁，口感绵柔。',
    specs: [{ label: '规格', value: '500ml' }, { label: '度数', value: '53度' }, { label: '年份', value: '五年窖藏' }],
    rating: 4.8, sales: 8900, merchant: '酒乡探秘', merchantAvatar: '/avatar-merchant-1.jpg',
    contentSource: 'c25'
  },
  {
    id: 'p16', name: '大连即食海参 10只装', province: 'liaoning', provinceName: '辽宁',
    category: '水产', price: 298, originalPrice: 398,
    image: '/product-hami-1.jpg', images: ['/product-hami-1.jpg'],
    description: '大连长海县深海养殖，三年参龄，肉质厚实，营养丰富。',
    specs: [{ label: '规格', value: '10只装' }, { label: '参龄', value: '三年' }, { label: '工艺', value: '即食' }],
    rating: 4.9, sales: 6700, merchant: '海参老赵', merchantAvatar: '/avatar-merchant-3.jpg',
    contentSource: 'c29'
  },
  {
    id: 'p17', name: '内蒙古羔羊肉 2斤装', province: 'neimenggu', provinceName: '内蒙古',
    category: '肉类', price: 128, originalPrice: 168,
    image: '/product-xinjiang.jpg', images: ['/product-xinjiang.jpg'],
    description: '锡林郭勒草原放养羔羊，肉质鲜嫩无膻味，适合涮烤炖。',
    specs: [{ label: '规格', value: '2斤装' }, { label: '品种', value: '羔羊' }, { label: '部位', value: '羊腿肉' }],
    rating: 4.8, sales: 11200, merchant: '草原牧民巴特尔', merchantAvatar: '/avatar-merchant-3.jpg',
    contentSource: 'c30'
  },
  {
    id: 'p18', name: '西藏天然藏香 50支装', province: 'xizang', provinceName: '西藏',
    category: '香道', price: 68, originalPrice: 88,
    image: '/product-tea-2.jpg', images: ['/product-tea-2.jpg'],
    description: '拉萨传统藏香坊手工制作，天然香料无添加，安神静心。',
    specs: [{ label: '规格', value: '50支/盒' }, { label: '香长', value: '21cm' }, { label: '燃烧', value: '约45分钟' }],
    rating: 4.9, sales: 5600, merchant: '次仁藏香', merchantAvatar: '/avatar-merchant-1.jpg',
    contentSource: 'c32'
  },
  {
    id: 'p19', name: '西湖明前龙井 100g', province: 'zhejiang', provinceName: '浙江',
    category: '茶叶', price: 238, originalPrice: 328,
    image: '/product-tea-1.jpg', images: ['/product-tea-1.jpg', '/product-tea-2.jpg'],
    description: '杭州西湖龙井村明前采摘，一芽一叶，豆香浓郁，汤色嫩绿。',
    specs: [{ label: '规格', value: '100g/罐' }, { label: '等级', value: '特级' }, { label: '采摘', value: '明前' }],
    rating: 4.9, sales: 7800, merchant: '龙井茶农', merchantAvatar: '/avatar-merchant-1.jpg',
    contentSource: 'c33'
  },
  {
    id: 'p20', name: '大理白族扎染桌布', province: 'yunnan', provinceName: '云南',
    category: '手工艺', price: 158, originalPrice: 218,
    image: '/product-embroidery-1.jpg', images: ['/product-embroidery-1.jpg'],
    description: '大理周城村手工扎染，板蓝根天然染料，每一块图案独一无二。',
    specs: [{ label: '尺寸', value: '90x90cm' }, { label: '材质', value: '棉麻' }, { label: '工艺', value: '手工扎染' }],
    rating: 4.8, sales: 3400, merchant: '段氏扎染', merchantAvatar: '/avatar-merchant-2.jpg',
    contentSource: 'c35'
  },
  {
    id: 'p21', name: '新会十年陈皮 100g', province: 'guangdong', provinceName: '广东',
    category: '茶叶', price: 168, originalPrice: 238,
    image: '/product-tea-1.jpg', images: ['/product-tea-1.jpg'],
    description: '新会核心产区，自然陈化十年，柑香醇厚，泡水回甘持久。',
    specs: [{ label: '规格', value: '100g/罐' }, { label: '年份', value: '十年' }, { label: '产地', value: '新会' }],
    rating: 4.9, sales: 6700, merchant: '新会陈皮佬', merchantAvatar: '/avatar-merchant-1.jpg',
    contentSource: 'c37'
  },
];

// ─── Content Items ─────────────────────────────────────────
export const mockContentItems: ContentItem[] = [
  {
    id: 'c1', title: '云南普洱茶园晨雾：一杯茶里的三百年时光', type: 'article',
    province: 'yunnan', provinceName: '云南',
    coverImage: '/content-thumb-yunnan-tea-1.jpg',
    content: '清晨六点，西双版纳的晨雾还未散去，布朗族茶农岩温叫已经穿梭在古茶园中。这片海拔1800米的古茶林，树龄大多超过三百年...\n\n普洱茶的魅力不仅在于它的口感，更在于它承载的时光。一饼好的普洱，从采摘到压制，再到岁月的陈化，至少需要五年的等待...\n\n「做茶和做人一样，急不得。」岩温叫说。他的手粗糙有力，却在揉捻茶叶时轻柔得像在抚摸婴儿...',
    summary: '探访西双版纳百年古茶园，记录布朗族茶农岩温叫的一天，讲述普洱茶从采摘到压制的完整工艺。',
    author: '岩温叫', authorId: 'm1', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '云南茶农 · 三代制茶',
    publishTime: '2025-04-20', views: 12450, likes: 2340, isLiked: false, comments: 186, shares: 520,
    tags: ['普洱茶', '云南', '非遗工艺', '古树茶'],
    status: 'published',
    relatedProducts: [{ productId: 'p1', highlightText: '视频同款茶饼', displayPosition: 'floating' }]
  },
  {
    id: 'c2', title: '手工炒茶全过程：铁锅里的舞蹈', type: 'short_video',
    province: 'yunnan', provinceName: '云南',
    coverImage: '/content-thumb-yunnan-tea-2.jpg', mediaUrl: 'https://example.com/video1.mp4',
    duration: '03:24',
    content: '手工炒茶是普洱茶制作中最关键的环节。高温铁锅，双手翻飞，茶叶在师傅手中跳跃，散发出迷人的香气...',
    summary: '实拍手工炒茶全过程，看茶叶如何在200℃铁锅中完成蜕变。',
    author: '云茶记', authorId: 'm1', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '云南茶农 · 三代制茶',
    publishTime: '2025-04-18', views: 8960, likes: 1560, isLiked: false, comments: 98, shares: 340,
    tags: ['炒茶', '手工制茶', '普洱茶', '云南'],
    status: 'published',
    relatedProducts: [{ productId: 'p1', highlightText: '同款原料', displayPosition: 'floating' }]
  },
  {
    id: 'c3', title: '吐鲁番葡萄架下的甜蜜时光：哈密瓜的一生', type: 'article',
    province: 'xinjiang', provinceName: '新疆',
    coverImage: '/content-thumb-xinjiang-fruit-1.jpg',
    content: '七月的吐鲁番，地表温度超过60℃，但葡萄架下却是一片清凉。在这片看似贫瘠的土地上，孕育着中国最甜的哈密瓜...\n\n「我们的瓜，甜是因为阳光足、温差大。」维吾尔族瓜农买买提笑着说。他每天凌晨四点起床，给瓜地浇水...',
    summary: '深入吐鲁番哈密瓜种植基地，记录从播种到采摘的完整周期，探寻新疆瓜果甜蜜的奥秘。',
    author: '买买提', authorId: 'm3', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '新疆瓜农 · 吐鲁番',
    publishTime: '2025-04-15', views: 15600, likes: 3200, isLiked: true, comments: 245, shares: 780,
    tags: ['哈密瓜', '新疆', '吐鲁番', '甜蜜水果'],
    status: 'published',
    relatedProducts: [{ productId: 'p2', highlightText: '产地直发', displayPosition: 'floating' }]
  },
  {
    id: 'c4', title: '新疆水果直播专场：从果园到你的餐桌', type: 'live_clip',
    province: 'xinjiang', provinceName: '新疆',
    coverImage: '/content-thumb-xinjiang-fruit-2.jpg', mediaUrl: 'https://example.com/live1.mp4',
    duration: '45:20', isLive: false,
    content: '昨晚的直播回放来了！我们深入吐鲁番哈密瓜核心产区，现场切开刚摘的哈密瓜，汁水直接飙到镜头上...',
    summary: '直播回放：深入吐鲁番哈密瓜产地，现场试吃、果农访谈、限时福利。',
    author: '西域果园', authorId: 'm3', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '新疆果农合作社',
    publishTime: '2025-04-14', views: 23100, likes: 4500, isLiked: false, comments: 567, shares: 1200,
    tags: ['直播回放', '新疆水果', '哈密瓜', '产地直发'],
    status: 'published',
    relatedProducts: [{ productId: 'p2', highlightText: '直播特惠价', displayPosition: 'floating' }]
  },
  {
    id: 'c5', title: '苏绣传承：一针一线绣出千年江南', type: 'article',
    province: 'jiangsu', provinceName: '江苏',
    coverImage: '/content-thumb-suzhou-1.jpg',
    content: '在苏州平江路的一间老宅里，62岁的绣娘周阿姨正在绣一幅牡丹。她的手指灵活地穿梭在丝线之间，一针一线，一丝不苟...\n\n苏绣是中国四大名绣之首，以「平、齐、细、密、匀、顺、和、光」八字诀闻名。一幅精品苏绣，短则数月，长则数年...',
    summary: '走进苏州非遗工坊，记录苏绣传承人周阿姨的日常，展现这门千年技艺的魅力。',
    author: '周阿姨', authorId: 'm2', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '苏绣非遗传承人',
    publishTime: '2025-04-12', views: 8900, likes: 2100, isLiked: false, comments: 156, shares: 430,
    tags: ['苏绣', '非遗', '苏州', '手工艺'],
    status: 'published',
    relatedProducts: [{ productId: 'p3', highlightText: '传承人手作', displayPosition: 'floating' }]
  },
  {
    id: 'c6', title: '西安回民街美食图鉴：从清晨到深夜的烟火气', type: 'article',
    province: 'shaanxi', provinceName: '陕西',
    coverImage: '/content-thumb-shaanxi-1.jpg',
    content: '清晨五点，回民街的第一缕烟火升起。老白家泡馍馆的师傅已经开始熬汤，骨汤翻滚，香气四溢...\n\n从肉夹馍到羊肉泡馍，从凉皮到甑糕，这条不到一公里的街道，承载着西安人最质朴的味觉记忆...',
    summary: '深入西安回民街，记录从早到晚的美食故事，探寻关中饮食文化的根脉。',
    author: '老陕味道', authorId: 'm4', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '美食探店达人',
    publishTime: '2025-04-10', views: 18900, likes: 4200, isLiked: true, comments: 312, shares: 890,
    tags: ['西安美食', '回民街', '陕西', '烟火气'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c7', title: '火锅底料熬制揭秘：为什么重庆火锅那么香？', type: 'short_video',
    province: 'sichuan', provinceName: '四川',
    coverImage: '/content-thumb-sichuan-1.jpg', mediaUrl: 'https://example.com/video2.mp4',
    duration: '05:12',
    content: '重庆火锅的灵魂在于底料。牛油、辣椒、花椒、豆瓣，二十多种香料在铁锅中熬煮四个小时...',
    summary: '实拍重庆老火锅底料熬制全过程，揭秘麻辣鲜香背后的秘密配方。',
    author: '蜀味坊', authorId: 'm5', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '重庆火锅底料厂',
    publishTime: '2025-04-08', views: 25600, likes: 5600, isLiked: false, comments: 423, shares: 1560,
    tags: ['火锅', '重庆', '底料', '美食揭秘'],
    status: 'published',
    relatedProducts: [{ productId: 'p4', highlightText: '视频同款底料', displayPosition: 'floating' }]
  },
  {
    id: 'c8', title: '武夷岩茶采摘季：上山采茶的一天', type: 'article',
    province: 'fujian', provinceName: '福建',
    coverImage: '/content-thumb-yunnan-tea-1.jpg',
    content: '清明前后，武夷山的茶农们迎来了最忙碌的采茶季。海拔800米的岩茶产区，云雾缭绕，空气清新...\n\n「采茶要采一芽两叶，这样的茶叶做出来的岩茶香高味醇。」茶农老李边说边熟练地采摘着...',
    summary: '跟随武夷山茶农上山采茶，记录岩茶采摘标准和制作流程。',
    author: '岩韵茶庄', authorId: 'm6', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '武夷山茶农',
    publishTime: '2025-04-05', views: 7200, likes: 1450, isLiked: false, comments: 89, shares: 280,
    tags: ['武夷岩茶', '福建', '采茶', '春茶'],
    status: 'published',
    relatedProducts: [{ productId: 'p5', highlightText: '春茶上市', displayPosition: 'floating' }]
  },
  {
    id: 'c9', title: '直播间专场：岩韵茶庄春茶品鉴会', type: 'live_clip',
    province: 'fujian', provinceName: '福建',
    coverImage: '/content-thumb-live-1.jpg', mediaUrl: 'https://example.com/live2.mp4',
    duration: '62:15', isLive: true,
    content: '正在直播中！岩韵茶庄春茶品鉴会，现场冲泡2025年头春大红袍，讲解岩茶品鉴技巧，直播间专享福利价...',
    summary: '直播回放：岩韵茶庄2025春茶品鉴会，现场冲泡、讲解、福利放送。',
    author: '岩韵茶庄', authorId: 'm6', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '武夷山茶农',
    publishTime: '2025-04-01', views: 34200, likes: 7800, isLiked: false, comments: 890, shares: 2300,
    tags: ['直播', '岩茶', '春茶', '品鉴'],
    status: 'published',
    relatedProducts: [{ productId: 'p5', highlightText: '直播专享价', displayPosition: 'floating' }]
  },
  {
    id: 'c10', title: '阳澄湖大闸蟹：一只蟹的成名之路', type: 'article',
    province: 'jiangsu', provinceName: '江苏',
    coverImage: '/content-thumb-xinjiang-fruit-1.jpg',
    content: '九月团脐十月尖。每年秋风一起，阳澄湖的大闸蟹就开始肥美了...\n\n阳澄湖蟹农老钱凌晨三点就起床了，他要赶在天亮前把昨晚下笼的蟹收上来。一只正宗的阳澄湖大闸蟹，从蟹苗到成蟹，需要18个月的精心养殖...',
    summary: '深入阳澄湖产区，记录大闸蟹养殖全过程，教你如何挑选正宗阳澄湖大闸蟹。',
    author: '蟹将军', authorId: 'm7', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '阳澄湖蟹农',
    publishTime: '2025-03-28', views: 21300, likes: 5100, isLiked: false, comments: 378, shares: 980,
    tags: ['大闸蟹', '阳澄湖', '江苏', '秋季美食'],
    status: 'published',
    relatedProducts: [{ productId: 'p6', highlightText: '蟹季限定', displayPosition: 'floating' }]
  },
  {
    id: 'c11', title: '潮汕牛肉丸：一颗丸子的百年传承', type: 'short_video',
    province: 'guangdong', provinceName: '广东',
    coverImage: '/content-thumb-xinjiang-fruit-1.jpg', mediaUrl: 'https://example.com/video3.mp4',
    duration: '04:18',
    content: '清晨五点的汕头，老陈已经开始了一天的忙碌。他的家族三代人都在做牛肉丸，从选肉到捶打，每一个步骤都不能马虎...',
    summary: '实拍潮汕手工牛肉丸制作全过程，感受百年传承的匠心。',
    author: '老陈丸店', authorId: 'm10', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '汕头老字号 · 三代丸匠',
    publishTime: '2025-04-22', views: 32100, likes: 6800, isLiked: false, comments: 520, shares: 1890,
    tags: ['潮汕牛肉丸', '广东', '手工', '非遗'],
    status: 'published',
    relatedProducts: [{ productId: 'p7', highlightText: '手工现打', displayPosition: 'floating' }]
  },
  {
    id: 'c12', title: '广式早茶文化：一盅两件的慢生活', type: 'article',
    province: 'guangdong', provinceName: '广东',
    coverImage: '/content-thumb-shaanxi-1.jpg',
    content: '「得闲饮茶」是广东人最常挂在嘴边的一句话。早茶不仅仅是一顿饭，更是一种生活方式...\n\n虾饺、烧卖、凤爪、叉烧包，每一笼点心背后都有几十年的手艺传承。我们在广州老字号「点都德」蹲点三天，记录下了最正宗的早茶文化...',
    summary: '深入广州老字号茶楼，记录广式早茶的完整体验和文化故事。',
    author: '粤食记', authorId: 'm11', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '美食探店博主 · 广州',
    publishTime: '2025-04-21', views: 28400, likes: 5400, isLiked: true, comments: 412, shares: 1230,
    tags: ['广式早茶', '广东', '美食', '慢生活'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c13', title: '从化荔枝采摘季直播：果园现场发', type: 'live_clip',
    province: 'guangdong', provinceName: '广东',
    coverImage: '/content-thumb-xinjiang-fruit-2.jpg', mediaUrl: 'https://example.com/live3.mp4',
    duration: '38:45', isLive: true,
    content: '正在直播中！从化荔枝核心产区，现场采摘、现场打包、现场发货！桂味、糯米糍、妃子笑，三种口味任你选择...',
    summary: '直播：深入从化荔枝园，现场采摘打包，限时福利价。',
    author: '从化果农阿强', authorId: 'm12', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '从化果农 · 直发',
    publishTime: '2025-04-20', views: 45200, likes: 8900, isLiked: false, comments: 678, shares: 2340,
    tags: ['荔枝', '广东', '直播', '从化'],
    status: 'published',
    relatedProducts: [{ productId: 'p8', highlightText: '直播特价', displayPosition: 'floating' }]
  },
  {
    id: 'c14', title: '顺德双皮奶：一碗甜品里的匠心', type: 'short_video',
    province: 'guangdong', provinceName: '广东',
    coverImage: '/content-thumb-shaanxi-1.jpg', mediaUrl: 'https://example.com/video13.mp4',
    duration: '03:30',
    content: '双皮奶是顺德最著名的甜品之一，已有上百年的历史。正宗的双皮奶要用本地水牛奶制作，经过两次结皮才能做出那层标志性的奶皮...',
    summary: '实拍顺德最正宗的双皮奶制作过程，感受甜品背后的匠心。',
    author: '顺德甜品师', authorId: 'm35', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '甜品匠人 · 顺德',
    publishTime: '2025-03-28', views: 23400, likes: 5200, isLiked: false, comments: 378, shares: 1120,
    tags: ['双皮奶', '顺德', '广东', '甜品'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c15', title: '广东陈皮：时间沉淀的岭南味道', type: 'article',
    province: 'guangdong', provinceName: '广东',
    coverImage: '/content-thumb-yunnan-tea-2.jpg',
    content: '「一两陈皮一两金，百年陈皮胜黄金。」新会陈皮是广东最著名的特产之一，越陈越香...\n\n陈皮制作看似简单，实则大有学问。从选柑、开皮、翻皮到晒制、陈化，每一步都影响着最终的品质...',
    summary: '深入新会陈皮产区，记录陈皮从鲜果到陈皮的完整制作过程。',
    author: '新会陈皮佬', authorId: 'm36', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '陈皮匠人 · 新会',
    publishTime: '2025-03-27', views: 14500, likes: 3200, isLiked: false, comments: 234, shares: 670,
    tags: ['陈皮', '新会', '广东', '传统'],
    status: 'published',
    relatedProducts: [{ productId: 'p21', highlightText: '十年陈皮', displayPosition: 'floating' }]
  },
  {
    id: 'c16', title: '长沙臭豆腐：闻着臭吃着香的秘密', type: 'short_video',
    province: 'hunan', provinceName: '湖南',
    coverImage: '/content-thumb-sichuan-1.jpg', mediaUrl: 'https://example.com/video4.mp4',
    duration: '03:56',
    content: '为什么臭豆腐闻着那么臭，吃起来却那么香？我们来到长沙火宫殿，跟随做了四十年臭豆腐的刘师傅，揭秘这道湖南名小吃的制作工艺...',
    summary: '实拍长沙臭豆腐制作全过程，揭秘臭与香的奇妙转化。',
    author: '刘师傅臭豆腐', authorId: 'm13', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '火宫殿传人',
    publishTime: '2025-04-19', views: 19800, likes: 4200, isLiked: false, comments: 312, shares: 890,
    tags: ['臭豆腐', '长沙', '湖南', '小吃'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c17', title: '湘西腊肉：烟熏火燎中的年味儿', type: 'article',
    province: 'hunan', provinceName: '湖南',
    coverImage: '/content-thumb-xinjiang-fruit-1.jpg',
    content: '每年冬至过后，湘西的山寨里就开始弥漫着柏树枝和橘皮混合的香气。那是家家户户开始熏制腊肉的信号...\n\n「好的腊肉要熏足四十天。」张婶说。她的腊肉秘方是从外婆那里传下来的，选用当地土猪肉，抹盐腌制七天，然后挂在灶房上方，用柏树枝慢火熏制...',
    summary: '深入湘西山寨，记录传统腊肉熏制工艺，寻回记忆中的年味儿。',
    author: '湘西张婶', authorId: 'm14', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '湘西农妇 · 腊肉达人',
    publishTime: '2025-04-18', views: 15600, likes: 3800, isLiked: false, comments: 256, shares: 670,
    tags: ['湘西腊肉', '湖南', '年货', '传统工艺'],
    status: 'published',
    relatedProducts: [{ productId: 'p9', highlightText: '农家自制', displayPosition: 'floating' }]
  },
  {
    id: 'c18', title: '兵马俑文创：让千年文物走进生活', type: 'article',
    province: 'shaanxi', provinceName: '陕西',
    coverImage: '/content-thumb-shaanxi-1.jpg',
    content: '在兵马俑博物馆的文创店里，我们看到了一群特殊的「兵马俑」——Q版造型的文具、茶具、手机壳...\n\n「我们想让年轻人用另一种方式记住历史。」文创设计师小李说。她的团队花了两年时间，把兵马俑的形象重新设计，既保留了历史感，又充满了时尚感...',
    summary: '探访兵马俑文创设计团队，看千年文物如何变身潮流单品。',
    author: '文创设计师小李', authorId: 'm15', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '文创设计师 · 西安',
    publishTime: '2025-04-17', views: 12300, likes: 2900, isLiked: false, comments: 198, shares: 560,
    tags: ['兵马俑', '文创', '陕西', '国潮'],
    status: 'published',
    relatedProducts: [{ productId: 'p10', highlightText: '博物馆同款', displayPosition: 'floating' }]
  },
  {
    id: 'c19', title: '西安面食地图：一碗面里的千年古都', type: 'short_video',
    province: 'shaanxi', provinceName: '陕西',
    coverImage: '/content-thumb-shaanxi-1.jpg', mediaUrl: 'https://example.com/video5.mp4',
    duration: '05:32',
    content: 'Biangbiang面、油泼面、臊子面、蘸水面...西安的面食种类多达上百种。我们跑遍全城，找到了最地道的十家面馆...',
    summary: '跑遍西安城，寻找最地道的十家面馆，记录面食背后的城市记忆。',
    author: '面食猎人', authorId: 'm16', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '美食博主 · 西安',
    publishTime: '2025-04-16', views: 22100, likes: 5100, isLiked: true, comments: 389, shares: 1020,
    tags: ['西安面食', '陕西', '美食地图', 'Biangbiang面'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c20', title: '成都茶馆：一把竹椅里的慢时光', type: 'article',
    province: 'sichuan', provinceName: '四川',
    coverImage: '/content-thumb-suzhou-1.jpg',
    content: '成都的茶馆文化已经有上千年的历史。一把竹椅、一杯盖碗茶、一盘瓜子，就是成都人一下午的标配...\n\n在人民公园的鹤鸣茶社，我们遇到了已经喝了六十年茶的王大爷。他说：「茶要慢慢品，日子要慢慢过。」...',
    summary: '探访成都百年茶社，记录茶馆里的百态人生和慢生活方式。',
    author: '鹤鸣茶社', authorId: 'm19', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '百年茶社 · 成都',
    publishTime: '2025-04-13', views: 17600, likes: 4100, isLiked: false, comments: 298, shares: 890,
    tags: ['成都茶馆', '四川', '慢生活', '盖碗茶'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c21', title: '川西高原：追一场雪山下的日落', type: 'short_video',
    province: 'sichuan', provinceName: '四川',
    coverImage: '/content-thumb-yunnan-tea-1.jpg', mediaUrl: 'https://example.com/video6.mp4',
    duration: '06:45',
    content: '海拔4500米的川西高原，贡嘎雪山在夕阳下呈现出金色的光芒。这是摄影师们最向往的画面...',
    summary: '实拍川西高原贡嘎雪山日落，记录大自然最震撼的瞬间。',
    author: '山野摄影师', authorId: 'm20', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '风光摄影师 · 川西',
    publishTime: '2025-04-12', views: 28900, likes: 7300, isLiked: true, comments: 412, shares: 1890,
    tags: ['川西', '贡嘎雪山', '风景', '日落'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c22', title: '柳州螺蛳粉：一碗粉里的江湖', type: 'short_video',
    province: 'guangxi', provinceName: '广西',
    coverImage: '/content-thumb-sichuan-1.jpg', mediaUrl: 'https://example.com/video7.mp4',
    duration: '04:22',
    content: '螺蛳粉的臭，是一种让人上瘾的臭。酸笋的发酵味、螺蛳的鲜味、辣椒油的香味混合在一起...',
    summary: '实拍柳州最地道的螺蛳粉制作过程，揭秘这碗「臭名远扬」的美食。',
    author: '柳州螺妹', authorId: 'm21', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '螺蛳粉传人 · 柳州',
    publishTime: '2025-04-11', views: 34500, likes: 8100, isLiked: false, comments: 567, shares: 2100,
    tags: ['螺蛳粉', '柳州', '广西', '美食'],
    status: 'published',
    relatedProducts: [{ productId: 'p13', highlightText: '正宗柳州', displayPosition: 'floating' }]
  },
  {
    id: 'c23', title: '桂林山水：二十元背后的风景', type: 'article',
    province: 'guangxi', provinceName: '广西',
    coverImage: '/content-thumb-yunnan-tea-2.jpg',
    content: '二十元人民币背面的图案，就取自桂林漓江的黄布倒影。我们沿着漓江徒步三天，用镜头记录下这被誉为「山水甲天下」的美景...\n\n清晨的漓江，薄雾笼罩，竹筏缓缓划过水面，渔夫撑着竹竿，鸬鹚站在船头...',
    summary: '沿漓江徒步三天，记录桂林山水最美的一面。',
    author: '山水行者', authorId: 'm22', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '旅行摄影师 · 桂林',
    publishTime: '2025-04-10', views: 23400, likes: 5600, isLiked: false, comments: 389, shares: 1450,
    tags: ['桂林', '漓江', '广西', '风景'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c24', title: '黔东南苗寨：千年银饰的叮当声', type: 'article',
    province: 'guizhou', provinceName: '贵州',
    coverImage: '/content-thumb-suzhou-1.jpg',
    content: '西江千户苗寨，是中国最大的苗族聚居村寨。这里的银饰锻制技艺已经有上千年的历史...\n\n「每一件银饰都是一个故事。」苗族银匠龙师傅说。他做银饰已经四十年了，每一种图腾都铭记于心...',
    summary: '深入西江千户苗寨，记录苗族银饰锻制技艺和背后的文化故事。',
    author: '龙师傅银坊', authorId: 'm23', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '苗族银匠 · 四十载',
    publishTime: '2025-04-09', views: 14500, likes: 3200, isLiked: false, comments: 234, shares: 780,
    tags: ['苗族银饰', '贵州', '非遗', '西江苗寨'],
    status: 'published',
    relatedProducts: [{ productId: 'p14', highlightText: '手工锻制', displayPosition: 'floating' }]
  },
  {
    id: 'c25', title: '贵州茅台镇：酱香白酒的诞生地', type: 'live_clip',
    province: 'guizhou', provinceName: '贵州',
    coverImage: '/content-thumb-live-1.jpg', mediaUrl: 'https://example.com/live5.mp4',
    duration: '48:30', isLive: false,
    content: '茅台镇，这个位于赤水河边的小镇，却是中国酱香白酒的圣地。我们走进酒厂，从选粮到发酵，完整记录一瓶好酒的诞生过程...',
    summary: '直播回放：走进茅台镇酒厂，完整记录酱香白酒酿造全过程。',
    author: '酒乡探秘', authorId: 'm24', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '白酒文化博主 · 茅台',
    publishTime: '2025-04-08', views: 26700, likes: 4900, isLiked: false, comments: 378, shares: 1120,
    tags: ['茅台', '白酒', '贵州', '酱香'],
    status: 'published',
    relatedProducts: [{ productId: 'p15', highlightText: '酒厂直供', displayPosition: 'floating' }]
  },
  {
    id: 'c26', title: '武汉热干面：一碗面的城市记忆', type: 'short_video',
    province: 'hubei', provinceName: '湖北',
    coverImage: '/content-thumb-shaanxi-1.jpg', mediaUrl: 'https://example.com/video8.mp4',
    duration: '03:45',
    content: '热干面是武汉人的命。每天早上，数以万计的武汉人端着纸碗，站在路边嗦一碗热干面，然后开始一天的工作...',
    summary: '实拍武汉最地道的三家热干面老店，记录这座城市最真实的味道。',
    author: '武汉吃货团', authorId: 'm25', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '美食探店 · 武汉',
    publishTime: '2025-04-07', views: 19800, likes: 4300, isLiked: false, comments: 312, shares: 890,
    tags: ['热干面', '武汉', '湖北', '早餐'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c27', title: '土楼里的客家年味：团圆的味道', type: 'article',
    province: 'fujian', provinceName: '福建',
    coverImage: '/content-thumb-yunnan-tea-1.jpg',
    content: '福建土楼，是世界文化遗产，也是客家人的精神家园。每年春节，scattered在世界各地的土楼后裔都会回到这里团聚...\n\n「过年一定要回到土楼，这才是团圆。」身在马来西亚的华侨黄先生，每年都要飞回来参加家族的春节聚会...',
    summary: '春节期间深入福建土楼，记录客家团圆饭和独特的年俗文化。',
    author: '土楼人家', authorId: 'm26', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '土楼守护者 · 永定',
    publishTime: '2025-04-06', views: 16700, likes: 3800, isLiked: false, comments: 256, shares: 920,
    tags: ['土楼', '福建', '客家', '年味'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c28', title: '泉州木偶戏：指尖上的千年艺术', type: 'short_video',
    province: 'fujian', provinceName: '福建',
    coverImage: '/content-thumb-suzhou-1.jpg', mediaUrl: 'https://example.com/video9.mp4',
    duration: '05:18',
    content: '泉州提线木偶戏，是中国最古老的戏剧形式之一。一根根细线连接着木偶的全身，艺人通过手指的微妙动作，让木偶做出各种生动的表情...',
    summary: '实拍泉州提线木偶戏表演和幕后训练，记录这项濒危非遗技艺。',
    author: '木偶传承人', authorId: 'm27', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '木偶戏艺人 · 泉州',
    publishTime: '2025-04-05', views: 12300, likes: 2900, isLiked: false, comments: 198, shares: 670,
    tags: ['木偶戏', '泉州', '福建', '非遗'],
    status: 'published',
    relatedProducts: [{ productId: 'p5', highlightText: '非遗好物', displayPosition: 'floating' }]
  },
  {
    id: 'c29', title: '烟台苹果园：红富士的甜蜜日记', type: 'article',
    province: 'shandong', provinceName: '山东',
    coverImage: '/content-thumb-xinjiang-fruit-1.jpg',
    content: '十月的烟台，漫山遍野都是红彤彤的苹果。这里的红富士以其脆甜多汁闻名全国...\n\n「我们的苹果不催熟、不打蜡，自然成熟。」果农王大叔说。他种的苹果树已经三十年了，每年秋天都是他最忙碌也最开心的时节...',
    summary: '深入烟台苹果园，记录红富士从开花到采摘的完整生长周期。',
    author: '王大叔果园', authorId: 'm17', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '烟台果农 · 三十年种植',
    publishTime: '2025-04-15', views: 18700, likes: 3600, isLiked: false, comments: 278, shares: 780,
    tags: ['烟台苹果', '山东', '红富士', '果园'],
    status: 'published',
    relatedProducts: [{ productId: 'p11', highlightText: '现摘现发', displayPosition: 'floating' }]
  },
  {
    id: 'c30', title: '青岛海鲜市场：凌晨四点的烟火气', type: 'live_clip',
    province: 'shandong', provinceName: '山东',
    coverImage: '/content-thumb-xinjiang-fruit-2.jpg', mediaUrl: 'https://example.com/live4.mp4',
    duration: '52:10', isLive: false,
    content: '凌晨四点的青岛团岛市场，是一天中最热闹的时候。刚从渔船上卸下来的海鲜被整齐地码在摊位上...',
    summary: '直播回放：凌晨四点探访青岛最大海鲜市场，感受渔港的烟火气。',
    author: '青岛海鲜姐', authorId: 'm18', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '海鲜达人 · 青岛',
    publishTime: '2025-04-14', views: 31200, likes: 6200, isLiked: false, comments: 456, shares: 1340,
    tags: ['青岛海鲜', '山东', '市场', '烟火气'],
    status: 'published',
    relatedProducts: [{ productId: 'p12', highlightText: '码头直供', displayPosition: 'floating' }]
  },
  {
    id: 'c31', title: '大连海参：深海养殖的奥秘', type: 'article',
    province: 'liaoning', provinceName: '辽宁',
    coverImage: '/content-thumb-xinjiang-fruit-1.jpg',
    content: '大连长海县，是中国最好的海参产地之一。这里的海水温度低、盐度适中，特别适合海参生长...\n\n「我们的海参要养足三年才捕捞。」养殖户老赵说。他在这片海域养了二十年海参，对每一条海参的生长周期了如指掌...',
    summary: '深入大连长海县海参养殖基地，记录从育苗到捕捞的完整过程。',
    author: '海参老赵', authorId: 'm28', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '海参养殖户 · 大连',
    publishTime: '2025-04-04', views: 13400, likes: 2800, isLiked: false, comments: 189, shares: 560,
    tags: ['大连海参', '辽宁', '海鲜', '养殖'],
    status: 'published',
    relatedProducts: [{ productId: 'p16', highlightText: '三年参', displayPosition: 'floating' }]
  },
  {
    id: 'c32', title: '草原牧歌：内蒙古羊肉的鲜美密码', type: 'short_video',
    province: 'neimenggu', provinceName: '内蒙古',
    coverImage: '/content-thumb-xinjiang-fruit-2.jpg', mediaUrl: 'https://example.com/video10.mp4',
    duration: '04:55',
    content: '「天苍苍，野茫茫，风吹草低见牛羊。」内蒙古的羊肉之所以鲜美，是因为这里的羊每天在草原上自由奔跑，吃的是天然牧草...',
    summary: '深入内蒙古草原，记录牧民生活和羊肉从牧场到餐桌的全过程。',
    author: '草原牧民巴特尔', authorId: 'm29', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '草原牧民 · 锡林郭勒',
    publishTime: '2025-04-03', views: 21200, likes: 4600, isLiked: true, comments: 334, shares: 980,
    tags: ['内蒙古', '羊肉', '草原', '牧场'],
    status: 'published',
    relatedProducts: [{ productId: 'p17', highlightText: '草原直供', displayPosition: 'floating' }]
  },
  {
    id: 'c33', title: '珠峰大本营：世界之巅的日出', type: 'short_video',
    province: 'xizang', provinceName: '西藏',
    coverImage: '/content-thumb-yunnan-tea-2.jpg', mediaUrl: 'https://example.com/video11.mp4',
    duration: '07:12',
    content: '海拔5200米的珠峰大本营，是世界上海拔最高的营地。当第一缕阳光照在珠穆朗玛峰的峰顶时，整个世界都被染成了金色...',
    summary: '实拍珠峰大本营日出全过程，感受世界之巅的震撼美景。',
    author: '高原行者', authorId: 'm30', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '户外探险家 · 拉萨',
    publishTime: '2025-04-02', views: 45600, likes: 12300, isLiked: true, comments: 789, shares: 3450,
    tags: ['珠峰', '西藏', '日出', '极限'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c34', title: '藏香制作：一缕香烟里的虔诚', type: 'article',
    province: 'xizang', provinceName: '西藏',
    coverImage: '/content-thumb-suzhou-1.jpg',
    content: '藏香是藏传佛教重要的供品之一，由几十种天然香料按照古法配方配制而成...\n\n「做藏香不仅仅是手艺，更是一种修行。」次仁师傅说。他做藏香已经三十五年了，每一种香料的配比都记在心里...',
    summary: '深入拉萨传统藏香作坊，记录藏香制作的全过程和背后的文化意义。',
    author: '次仁藏香', authorId: 'm31', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '藏香匠人 · 拉萨',
    publishTime: '2025-04-01', views: 18900, likes: 4200, isLiked: false, comments: 298, shares: 890,
    tags: ['藏香', '西藏', '非遗', '佛教'],
    status: 'published',
    relatedProducts: [{ productId: 'p18', highlightText: '手工藏香', displayPosition: 'floating' }]
  },
  {
    id: 'c35', title: '龙井村寻茶：一杯明前龙井的诞生', type: 'short_video',
    province: 'zhejiang', provinceName: '浙江',
    coverImage: '/content-thumb-yunnan-tea-1.jpg', mediaUrl: 'https://example.com/video12.mp4',
    duration: '04:38',
    content: '清明前的龙井茶，是茶中极品。我们来到杭州西湖边的龙井村，跟随茶农一起采摘、炒制明前龙井...',
    summary: '实拍龙井村明前龙井采摘炒制全过程，记录一杯好茶诞生的故事。',
    author: '龙井茶农', authorId: 'm32', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '西湖茶农 · 龙井村',
    publishTime: '2025-03-31', views: 25600, likes: 5800, isLiked: false, comments: 412, shares: 1340,
    tags: ['龙井茶', '西湖', '浙江', '明前茶'],
    status: 'published',
    relatedProducts: [{ productId: 'p19', highlightText: '明前龙井', displayPosition: 'floating' }]
  },
  {
    id: 'c36', title: '新疆棉花田：云端上的白色海洋', type: 'article',
    province: 'xinjiang', provinceName: '新疆',
    coverImage: '/content-thumb-xinjiang-fruit-1.jpg',
    content: '九月的新疆，棉花进入了采摘季。从空中俯瞰，大片的棉田就像白色的海洋，在阳光下闪闪发光...\n\n「我们的棉花是手工采摘的，虽然慢，但不会损伤棉纤维。」采棉女工阿依古丽说...',
    summary: '航拍新疆棉花田丰收景象，记录手工采棉的传统工艺。',
    author: '阿依古丽', authorId: 'm33', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '采棉女工 · 阿克苏',
    publishTime: '2025-03-30', views: 19800, likes: 4300, isLiked: false, comments: 312, shares: 980,
    tags: ['新疆棉花', '丰收', '手工采摘', '农田'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c37', title: '大理扎染：板蓝根染出的蓝色梦境', type: 'article',
    province: 'yunnan', provinceName: '云南',
    coverImage: '/content-thumb-suzhou-1.jpg',
    content: '周城村，是中国最大的白族聚居村落，也是扎染技艺的发源地。走进任何一家扎染坊，都能看到院子里挂满了蓝色的布匹...\n\n「我们的染料只用板蓝根，不用任何化学染料。」扎染传承人段阿姨说。一块扎染布从设计图案到最终成品，需要经过二十多道工序...',
    summary: '深入大理周城村，记录白族扎染从设计到成品的完整工艺。',
    author: '段氏扎染', authorId: 'm34', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '扎染传承人 · 大理',
    publishTime: '2025-03-29', views: 16700, likes: 3900, isLiked: false, comments: 267, shares: 780,
    tags: ['扎染', '大理', '云南', '非遗'],
    status: 'published',
    relatedProducts: [{ productId: 'p20', highlightText: '手工扎染', displayPosition: 'floating' }]
  },
  {
    id: 'c38', title: '北京烤鸭：果木炭火里的百年传奇', type: 'article',
    province: 'beijing', provinceName: '北京',
    coverImage: '/content-thumb-shaanxi-1.jpg',
    content: '全聚德烤鸭，始于1864年，至今已有160年历史。果木炭火烤制，皮脆肉嫩，配上薄饼、葱丝、甜面酱，一口下去，满嘴生香...\n\n「烤鸭讲究的是火候。」全聚德的老师傅说。一只鸭子从充气、挂糖到入炉，需要经过二十多道工序...',
    summary: '探访全聚德烤鸭百年老店，记录果木炭火烤鸭的完整工艺。',
    author: '全聚德旗舰店', authorId: 'm37', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '百年老字号 · 北京',
    publishTime: '2025-04-22', views: 28900, likes: 6200, isLiked: false, comments: 445, shares: 1560,
    tags: ['北京烤鸭', '全聚德', '果木炭烤', '老字号'],
    status: 'published',
    relatedProducts: [{ productId: 'p21', highlightText: '百年老字号', displayPosition: 'floating' }]
  },
  {
    id: 'c39', title: '天津麻花：十八街的酥脆传承', type: 'short_video',
    province: 'tianjin', provinceName: '天津',
    coverImage: '/content-thumb-shaanxi-1.jpg', mediaUrl: 'https://example.com/video14.mp4',
    duration: '03:48',
    content: '桂发祥十八街麻花，天津三绝之首。酥脆香甜，层次分明，每一根都是手工搓制...',
    summary: '实拍天津桂发祥麻花手工制作全过程，感受百年酥脆传承。',
    author: '桂发祥官方', authorId: 'm38', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '天津老字号',
    publishTime: '2025-04-20', views: 15600, likes: 3400, isLiked: false, comments: 234, shares: 780,
    tags: ['天津麻花', '桂发祥', '老字号', '手工'],
    status: 'published',
    relatedProducts: [{ productId: 'p22', highlightText: '天津三绝', displayPosition: 'floating' }]
  },
  {
    id: 'c40', title: '黑龙江五常大米：一碗饭里的黑土芬芳', type: 'article',
    province: 'heilongjiang', provinceName: '黑龙江',
    coverImage: '/content-thumb-xinjiang-fruit-1.jpg',
    content: '五常大米，产自黑龙江五常市，是中国最知名的大米品牌之一。黑土地的肥沃、昼夜温差大、龙凤山水灌溉，造就了五常大米独特的口感...\n\n「好的五常大米，煮出来饭粒油亮，入口软糯，凉了也不回生。」五常粮农老张说...',
    summary: '深入五常稻花香核心产区，探寻中国最好吃大米的秘密。',
    author: '五常粮农', authorId: 'm39', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '五常稻农 · 二十年种植',
    publishTime: '2025-04-18', views: 34500, likes: 8900, isLiked: true, comments: 567, shares: 2340,
    tags: ['五常大米', '黑龙江', '黑土地', '稻花香'],
    status: 'published',
    relatedProducts: [{ productId: 'p25', highlightText: '正宗五常', displayPosition: 'floating' }]
  },
  {
    id: 'c41', title: '上海小笼包：南翔老街的百年手艺', type: 'short_video',
    province: 'shanghai', provinceName: '上海',
    coverImage: '/content-thumb-suzhou-1.jpg', mediaUrl: 'https://example.com/video15.mp4',
    duration: '04:12',
    content: '南翔小笼包，皮薄馅大汁多，一口一个鲜。百年老店，每天凌晨四点开始备料...',
    summary: '实拍南翔小笼包手工包制全过程，感受百年手艺的传承。',
    author: '南翔小笼', authorId: 'm40', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '南翔老店 · 上海',
    publishTime: '2025-04-16', views: 21200, likes: 5100, isLiked: false, comments: 345, shares: 1120,
    tags: ['小笼包', '南翔', '上海', '百年老店'],
    status: 'published',
    relatedProducts: [{ productId: 'p27', highlightText: '手工现包', displayPosition: 'floating' }]
  },
  {
    id: 'c42', title: '安徽黄山毛峰：云雾深处的茶香', type: 'article',
    province: 'anhui', provinceName: '安徽',
    coverImage: '/content-thumb-yunnan-tea-1.jpg',
    content: '黄山毛峰，中国十大名茶之一，产于黄山风景区及周边地区。海拔800米以上的茶园，常年云雾缭绕，茶叶芽叶肥壮，白毫显露...\n\n「明前的毛峰最珍贵，一芽一叶，汤色清澈，香气持久。」黄山茶农老程说...',
    summary: '深入黄山核心产区，记录明前毛峰采摘炒制全过程。',
    author: '黄山茶农', authorId: 'm41', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '黄山茶农 · 三代制茶',
    publishTime: '2025-04-14', views: 17800, likes: 4200, isLiked: false, comments: 289, shares: 890,
    tags: ['黄山毛峰', '安徽', '明前茶', '云雾茶'],
    status: 'published',
    relatedProducts: [{ productId: 'p28', highlightText: '明前毛峰', displayPosition: 'floating' }]
  },
  {
    id: 'c43', title: '河南信阳毛尖：中原茶乡的春天', type: 'article',
    province: 'henan', provinceName: '河南',
    coverImage: '/content-thumb-yunnan-tea-2.jpg',
    content: '信阳毛尖，又称豫毛峰，是中国十大名茶之一。产于河南信阳大别山北麓，以「细、圆、光、直、多白毫」著称...\n\n「信阳毛尖讲究一芽一叶或一芽二叶，手工炒制，四万颗芽头才出一斤干茶。」信阳茶场老刘说...',
    summary: '走进信阳茶山，记录毛尖茶从采摘到炒制的完整过程。',
    author: '信阳茶场', authorId: 'm42', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '信阳茶农 · 二十年制茶',
    publishTime: '2025-04-12', views: 13400, likes: 3200, isLiked: false, comments: 198, shares: 670,
    tags: ['信阳毛尖', '河南', '春茶', '大别山'],
    status: 'published',
    relatedProducts: [{ productId: 'p29', highlightText: '雨前毛尖', displayPosition: 'floating' }]
  },
  {
    id: 'c44', title: '重庆火锅：沸腾的麻辣江湖', type: 'short_video',
    province: 'chongqing', provinceName: '重庆',
    coverImage: '/content-thumb-sichuan-1.jpg', mediaUrl: 'https://example.com/video16.mp4',
    duration: '05:28',
    content: '重庆火锅，麻辣鲜香，是山城人最引以为傲的美食。牛油锅底，翻滚的红油，毛肚、鸭肠、黄喉七上八下...',
    summary: '实拍重庆老火锅从底料炒制到涮菜的全过程，感受麻辣江湖的热血。',
    author: '桥头火锅', authorId: 'm43', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '重庆火锅 · 老字号',
    publishTime: '2025-04-10', views: 42300, likes: 9800, isLiked: true, comments: 678, shares: 2890,
    tags: ['重庆火锅', '牛油', '麻辣', '山城'],
    status: 'published',
    relatedProducts: [{ productId: 'p31', highlightText: '桥头底料', displayPosition: 'floating' }]
  },
  {
    id: 'c45', title: '宁夏枸杞：塞上江南的红宝石', type: 'article',
    province: 'ningxia', provinceName: '宁夏',
    coverImage: '/content-thumb-xinjiang-fruit-1.jpg',
    content: '宁夏中宁枸杞，是道地药材中的上品。黄河灌溉、光照充足、昼夜温差大，造就了中宁枸杞颗粒饱满、多糖含量高的特点...\n\n「好枸杞要看颜色、摸手感、尝味道。」中宁枸杞农老马说。他种了三十年枸杞，对每一粒的品质了如指掌...',
    summary: '深入中宁枸杞核心产区，记录枸杞从种植到晾晒的完整过程。',
    author: '中宁枸杞农', authorId: 'm44', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '枸杞农 · 中宁',
    publishTime: '2025-04-08', views: 16700, likes: 3800, isLiked: false, comments: 234, shares: 780,
    tags: ['枸杞', '宁夏', '中宁', '养生'],
    status: 'published',
    relatedProducts: [{ productId: 'p32', highlightText: '中宁直供', displayPosition: 'floating' }]
  },
  {
    id: 'c46', title: '甘肃敦煌：大漠深处的千年壁画', type: 'article',
    province: 'gansu', provinceName: '甘肃',
    coverImage: '/content-thumb-yunnan-tea-2.jpg',
    content: '敦煌莫高窟，被誉为「东方卢浮宫」。735个洞窟，4.5万平方米壁画，2415尊泥质彩塑，记录了千年的信仰与艺术...\n\n「每一幅壁画都是一部无声的史书。」敦煌研究院的讲解员说。从北凉到元代，跨越千年...',
    summary: '走进敦煌莫高窟，用镜头记录千年壁画的前世今生。',
    author: '敦煌文旅', authorId: 'm45', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '敦煌文化推广人',
    publishTime: '2025-04-06', views: 38900, likes: 9200, isLiked: true, comments: 567, shares: 2340,
    tags: ['敦煌', '莫高窟', '壁画', '丝路'],
    status: 'published',
    relatedProducts: [{ productId: 'p33', highlightText: '兰州百合', displayPosition: 'floating' }]
  },
  {
    id: 'c47', title: '青海湖：高原蓝宝石的四季变幻', type: 'short_video',
    province: 'qinghai', provinceName: '青海',
    coverImage: '/content-thumb-xinjiang-fruit-2.jpg', mediaUrl: 'https://example.com/video17.mp4',
    duration: '06:15',
    content: '青海湖，中国最大的内陆湖，海拔3200米。夏天油菜花盛开，湖面碧蓝如洗；冬天冰封万里，银装素裹...',
    summary: '航拍青海湖四季美景，记录高原蓝宝石的壮丽变幻。',
    author: '青海文旅', authorId: 'm46', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '风光摄影师 · 青海',
    publishTime: '2025-04-04', views: 31200, likes: 7800, isLiked: false, comments: 445, shares: 1890,
    tags: ['青海湖', '高原', '航拍', '风景'],
    status: 'published',
    relatedProducts: [{ productId: 'p34', highlightText: '高原虫草', displayPosition: 'floating' }]
  },
  {
    id: 'c48', title: '河北驴肉火烧：保定人的早餐信仰', type: 'short_video',
    province: 'hebei', provinceName: '河北',
    coverImage: '/content-thumb-shaanxi-1.jpg', mediaUrl: 'https://example.com/video18.mp4',
    duration: '03:56',
    content: '在保定，没有什么比一个热腾腾的驴肉火烧更能唤醒一天的活力。酥脆的火烧夹上卤制入味的驴肉，一口咬下去...',
    summary: '实拍保定老驴头驴肉火烧制作全过程，感受冀味早餐的魅力。',
    author: '老驴头', authorId: 'm47', authorAvatar: '/avatar-merchant-3.jpg', authorTitle: '保定老字号',
    publishTime: '2025-04-02', views: 18900, likes: 4500, isLiked: false, comments: 312, shares: 980,
    tags: ['驴肉火烧', '保定', '河北', '早餐'],
    status: 'published',
    relatedProducts: [{ productId: 'p23', highlightText: '老汤卤制', displayPosition: 'floating' }]
  },
  {
    id: 'c49', title: '山西老陈醋：千年发酵的酸香', type: 'article',
    province: 'shanxi', provinceName: '山西',
    coverImage: '/content-thumb-yunnan-tea-2.jpg',
    content: '山西老陈醋，中国四大名醋之首。以高粱为主料，经过蒸、酵、熏、淋、陈五道工序，至少陈酿一年以上...\n\n「好的老陈醋，颜色黑紫，酸味柔和，回味绵长。」清徐醋厂的老技师说。他酿了四十年醋...',
    summary: '深入清徐老陈醋厂，记录千年酿造工艺的传承与创新。',
    author: '平遥牛肉馆', authorId: 'm48', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '醋文化推广人 · 山西',
    publishTime: '2025-03-30', views: 14500, likes: 3600, isLiked: false, comments: 234, shares: 780,
    tags: ['老陈醋', '山西', '酿造', '非遗'],
    status: 'published',
    relatedProducts: [{ productId: 'p24', highlightText: '古法腌制', displayPosition: 'floating' }]
  },
  {
    id: 'c50', title: '海南文昌鸡：椰林下的美味传说', type: 'article',
    province: 'hainan', provinceName: '海南',
    coverImage: '/content-thumb-xinjiang-fruit-2.jpg',
    content: '文昌鸡，海南四大名菜之首。散养于椰林之下，以椰肉、花生饼为食，皮薄肉嫩，白切最能体现原味...\n\n「好的文昌鸡要养足120天，肉质紧实又不失嫩滑。」文昌鸡场的老符说...',
    summary: '深入文昌椰林鸡场，记录散养文昌鸡从养殖到上桌的全过程。',
    author: '文昌鸡场', authorId: 'm49', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '文昌鸡农 · 海南',
    publishTime: '2025-03-28', views: 12300, likes: 2900, isLiked: false, comments: 189, shares: 560,
    tags: ['文昌鸡', '海南', '椰林', '白切'],
    status: 'published',
    relatedProducts: [{ productId: 'p30', highlightText: '散养120天', displayPosition: 'floating' }]
  },
  {
    id: 'c51', title: '吉林长白山：人参采挖的惊险之旅', type: 'short_video',
    province: 'jilin', provinceName: '吉林',
    coverImage: '/content-thumb-yunnan-tea-1.jpg', mediaUrl: 'https://example.com/video19.mp4',
    duration: '05:42',
    content: '长白山深山老林里，采参人小心翼翼地拨开落叶，一根红绳系住人参的茎叶，然后跪在地上，用骨签一点一点地拨开泥土...',
    summary: '跟随长白山采参人进山，记录野生人参采挖的惊险过程。',
    author: '参农老李', authorId: 'm50', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '长白山参农 · 二十年采参',
    publishTime: '2025-03-26', views: 25600, likes: 6700, isLiked: true, comments: 423, shares: 1780,
    tags: ['长白山', '人参', '采参', '东北'],
    status: 'published',
    relatedProducts: [{ productId: 'p26', highlightText: '六年生参', displayPosition: 'floating' }]
  },
  {
    id: 'c52', title: '江西景德镇：泥与火的艺术', type: 'article',
    province: 'jiangxi', provinceName: '江西',
    coverImage: '/content-thumb-suzhou-1.jpg',
    content: '景德镇，千年瓷都。从拉坯到施釉，从入窑到出窑，每一件瓷器都经历了泥与火的洗礼...\n\n「做瓷器最重要的是耐心。」非遗传承人王师傅说。他做瓷器已经三十年了，每一件作品都倾注了心血...',
    summary: '深入景德镇古窑，记录手工制瓷的完整工艺流程。',
    author: '景德镇文旅', authorId: 'm51', authorAvatar: '/avatar-merchant-1.jpg', authorTitle: '瓷文化推广人 · 景德镇',
    publishTime: '2025-03-24', views: 19800, likes: 4800, isLiked: false, comments: 312, shares: 980,
    tags: ['景德镇', '瓷器', '非遗', '手工'],
    status: 'published',
    relatedProducts: []
  },
  {
    id: 'c53', title: '武汉热干面：一碗面的江湖', type: 'short_video',
    province: 'hubei', provinceName: '湖北',
    coverImage: '/content-thumb-shaanxi-1.jpg', mediaUrl: 'https://example.com/video20.mp4',
    duration: '04:08',
    content: '每天清晨，武汉的街头巷尾都弥漫着芝麻酱的香气。一碗热干面，是武汉人一天的开始...',
    summary: '实拍武汉最地道的三家热干面老店，记录江城早餐的烟火气。',
    author: '武汉吃货团', authorId: 'm25', authorAvatar: '/avatar-merchant-2.jpg', authorTitle: '美食探店 · 武汉',
    publishTime: '2025-03-22', views: 22300, likes: 5400, isLiked: false, comments: 389, shares: 1230,
    tags: ['热干面', '武汉', '早餐', '芝麻酱'],
    status: 'published',
    relatedProducts: []
  },
];

// ─── Comments ──────────────────────────────────────────────
export const mockComments: ContentComment[] = [
  { id: 'cm1', contentId: 'c1', userName: '茶友小王', userAvatar: '/avatar-default.png', content: '这篇写得真好，仿佛闻到了茶香！同款茶饼已下单。', time: '2小时前', likes: 45 },
  { id: 'cm2', contentId: 'c1', userName: '普洱老饕', userAvatar: '/avatar-default.png', content: '古树茶确实不一样，回甘持久，值得收藏。', time: '5小时前', likes: 32 },
  { id: 'cm3', contentId: 'c1', userName: '爱喝茶的猫', userAvatar: '/avatar-default.png', content: '作者大大，请问这款茶饼适合新手入门吗？', time: '1天前', likes: 18 },
  { id: 'cm4', contentId: 'c3', userName: '吃瓜群众', userAvatar: '/avatar-default.png', content: '新疆的瓜是真的甜！去年买过，全家都说好。', time: '3小时前', likes: 67 },
  { id: 'cm5', contentId: 'c3', userName: '水果猎人', userAvatar: '/avatar-default.png', content: '吐鲁番的哈密瓜天下第一，不接受反驳！', time: '6小时前', likes: 89 },
  { id: 'cm6', contentId: 'c7', userName: '火锅控', userAvatar: '/avatar-default.png', content: '看完直接饿了，下单了五袋底料，周末约朋友涮火锅！', time: '4小时前', likes: 123 },
  { id: 'cm7', contentId: 'c11', userName: '潮汕人', userAvatar: '/avatar-default.png', content: '这才是正宗的潮汕牛肉丸！弹牙有嚼劲，汤都喝光了。', time: '2小时前', likes: 78 },
  { id: 'cm8', contentId: 'c12', userName: '老广', userAvatar: '/avatar-default.png', content: '早茶是广东人的灵魂，虾饺必点！', time: '5小时前', likes: 56 },
  { id: 'cm9', contentId: 'c16', userName: '游客小明', userAvatar: '/avatar-default.png', content: '去西安一定要买这个文创，送朋友特别有意义。', time: '1天前', likes: 34 },
  { id: 'cm10', contentId: 'c22', userName: '嗦粉达人', userAvatar: '/avatar-default.png', content: '柳州螺蛳粉永远的神！每周必吃三袋。', time: '3小时前', likes: 92 },
  { id: 'cm11', contentId: 'c33', userName: '登山客', userAvatar: '/avatar-default.png', content: '这辈子一定要去一次珠峰大本营，太震撼了！', time: '8小时前', likes: 156 },
  { id: 'cm12', contentId: 'c35', userName: '手作爱好者', userAvatar: '/avatar-default.png', content: '扎染的蓝色太美了，每一块都是独一无二的。', time: '6小时前', likes: 67 },
];

// ─── Content Analytics ─────────────────────────────────────
export const mockAnalytics: ContentAnalytics[] = [
  {
    contentId: 'c1', title: '云南普洱茶园晨雾：一杯茶里的三百年时光',
    views: 12450, likes: 2340, comments: 186, shares: 520,
    clickThrough: 890, conversions: 156, conversionRate: 3.5,
    revenue: 26208,
    dailyTrend: [
      { date: '04-14', views: 800, clicks: 45 }, { date: '04-15', views: 1200, clicks: 78 },
      { date: '04-16', views: 1500, clicks: 92 }, { date: '04-17', views: 1800, clicks: 110 },
      { date: '04-18', views: 2100, clicks: 135 }, { date: '04-19', views: 2400, clicks: 156 },
      { date: '04-20', views: 2650, clicks: 189 },
    ],
    productPerformance: [
      { productId: 'p1', productName: '云南普洱熟茶饼 357g', clicks: 890, orders: 156, revenue: 26208 }
    ]
  },
  {
    contentId: 'c3', title: '吐鲁番葡萄架下的甜蜜时光：哈密瓜的一生',
    views: 15600, likes: 3200, comments: 245, shares: 780,
    clickThrough: 1200, conversions: 234, conversionRate: 4.8,
    revenue: 13806,
    dailyTrend: [
      { date: '04-14', views: 1200, clicks: 65 }, { date: '04-15', views: 1800, clicks: 98 },
      { date: '04-16', views: 2200, clicks: 145 }, { date: '04-17', views: 2600, clicks: 178 },
      { date: '04-18', views: 2900, clicks: 210 }, { date: '04-19', views: 2400, clicks: 198 },
      { date: '04-20', views: 2500, clicks: 206 },
    ],
    productPerformance: [
      { productId: 'p2', productName: '新疆哈密瓜 2个装', clicks: 1200, orders: 234, revenue: 13806 }
    ]
  },
  {
    contentId: 'c11', title: '潮汕牛肉丸：一颗丸子的百年传承',
    views: 32100, likes: 6800, comments: 520, shares: 1890,
    clickThrough: 2100, conversions: 456, conversionRate: 5.2,
    revenue: 31008,
    dailyTrend: [
      { date: '04-14', views: 2500, clicks: 120 }, { date: '04-15', views: 3800, clicks: 210 },
      { date: '04-16', views: 4200, clicks: 280 }, { date: '04-17', views: 5100, clicks: 340 },
      { date: '04-18', views: 5600, clicks: 380 }, { date: '04-19', views: 5800, clicks: 410 },
      { date: '04-20', views: 5100, clicks: 360 },
    ],
    productPerformance: [
      { productId: 'p7', productName: '潮汕手工牛肉丸 500g', clicks: 2100, orders: 456, revenue: 31008 }
    ]
  },
];

// ─── City Data ────────────────────────────────────────────
export const cityData: CityData[] = [
  { id: 'hangzhou', name: '杭州', provinceId: 'zhejiang', provinceName: '浙江', description: '人间天堂，西湖龙井的故乡', coverImage: '/content-thumb-suzhou-1.jpg', specialtyCount: 12, activityCount: 5, hotSpecialty: '西湖龙井', hotActivity: '采茶体验', products: ['西湖龙井', '丝绸', '藕粉'], x: 52, y: 58 },
  { id: 'ningbo', name: '宁波', provinceId: 'zhejiang', provinceName: '浙江', description: '港口城市，海鲜之都', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', specialtyCount: 8, activityCount: 3, hotSpecialty: '宁波汤圆', hotActivity: '渔港赶海', products: ['宁波汤圆', '海鲜', '年糕'], x: 68, y: 52 },
  { id: 'shaoxing', name: '绍兴', provinceId: 'zhejiang', provinceName: '浙江', description: '黄酒故里，鲁迅故乡', coverImage: '/content-thumb-yunnan-tea-2.jpg', specialtyCount: 6, activityCount: 2, hotSpecialty: '绍兴黄酒', hotActivity: '黄酒文化节', products: ['绍兴黄酒', '梅干菜', '臭豆腐'], x: 58, y: 62 },
  { id: 'kunming', name: '昆明', provinceId: 'yunnan', provinceName: '云南', description: '春城花都，四季如春', coverImage: '/content-thumb-yunnan-tea-1.jpg', specialtyCount: 15, activityCount: 6, hotSpecialty: '鲜花饼', hotActivity: '斗南花市', products: ['鲜花饼', '普洱茶', '过桥米线'], x: 42, y: 48 },
  { id: 'dali', name: '大理', provinceId: 'yunnan', provinceName: '云南', description: '风花雪月，白族扎染之乡', coverImage: '/content-thumb-suzhou-1.jpg', specialtyCount: 10, activityCount: 4, hotSpecialty: '白族扎染', hotActivity: '三月街', products: ['扎染', '普洱茶', '乳扇'], x: 30, y: 56 },
  { id: 'xishuangbanna', name: '西双版纳', provinceId: 'yunnan', provinceName: '云南', description: '热带雨林，普洱茶核心产区', coverImage: '/content-thumb-yunnan-tea-2.jpg', specialtyCount: 8, activityCount: 5, hotSpecialty: '普洱茶', hotActivity: '泼水节', products: ['普洱茶', '热带水果', '傣族手工艺'], x: 38, y: 72 },
  { id: 'chengdu', name: '成都', provinceId: 'sichuan', provinceName: '四川', description: '天府之国，美食之都', coverImage: '/content-thumb-sichuan-1.jpg', specialtyCount: 18, activityCount: 7, hotSpecialty: '火锅底料', hotActivity: '川菜体验课', products: ['火锅底料', '郫县豆瓣', '腊肉'], x: 48, y: 42 },
  { id: 'leshan', name: '乐山', provinceId: 'sichuan', provinceName: '四川', description: '大佛故里，美食小城', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', specialtyCount: 7, activityCount: 3, hotSpecialty: '乐山甜皮鸭', hotActivity: '嘉州美食节', products: ['甜皮鸭', '豆腐脑', '钵钵鸡'], x: 40, y: 56 },
  { id: 'xian', name: '西安', provinceId: 'shaanxi', provinceName: '陕西', description: '十三朝古都，美食天堂', coverImage: '/content-thumb-shaanxi-1.jpg', specialtyCount: 14, activityCount: 5, hotSpecialty: '肉夹馍', hotActivity: '回民街美食之旅', products: ['肉夹馍', '凉皮', '兵马俑文创'], x: 55, y: 40 },
  { id: 'yanan', name: '延安', provinceId: 'shaanxi', provinceName: '陕西', description: '革命圣地，洛川苹果之乡', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', specialtyCount: 6, activityCount: 2, hotSpecialty: '洛川苹果', hotActivity: '红色研学', products: ['洛川苹果', '红枣', '小米'], x: 60, y: 28 },
  { id: 'fuzhou', name: '福州', provinceId: 'fujian', provinceName: '福建', description: '榕城古韵，闽茶飘香', coverImage: '/content-thumb-yunnan-tea-1.jpg', specialtyCount: 10, activityCount: 4, hotSpecialty: '茉莉花茶', hotActivity: '三坊七巷文化游', products: ['茉莉花茶', '鱼丸', '肉燕'], x: 62, y: 42 },
  { id: 'wuyishan', name: '武夷山', provinceId: 'fujian', provinceName: '福建', description: '世界双遗，岩茶圣地', coverImage: '/content-thumb-yunnan-tea-2.jpg', specialtyCount: 8, activityCount: 5, hotSpecialty: '武夷岩茶', hotActivity: '采茶制茶体验', products: ['大红袍', '岩茶', '笋干'], x: 48, y: 58 },
  { id: 'quanzhou', name: '泉州', provinceId: 'fujian', provinceName: '福建', description: '海上丝路起点，非遗之城', coverImage: '/content-thumb-suzhou-1.jpg', specialtyCount: 9, activityCount: 3, hotSpecialty: '铁观音', hotActivity: '木偶戏观赏', products: ['铁观音', '德化白瓷', '面线糊'], x: 68, y: 52 },
  { id: 'guangzhou', name: '广州', provinceId: 'guangdong', provinceName: '广东', description: '花城羊城，粤菜发源地', coverImage: '/content-thumb-shaanxi-1.jpg', specialtyCount: 20, activityCount: 8, hotSpecialty: '广式腊肠', hotActivity: '早茶文化体验', products: ['广式腊肠', '荔枝', '新会陈皮'], x: 55, y: 50 },
  { id: 'shantou', name: '汕头', provinceId: 'guangdong', provinceName: '广东', description: '潮汕美食之都', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', specialtyCount: 12, activityCount: 4, hotSpecialty: '牛肉丸', hotActivity: '潮汕美食节', products: ['牛肉丸', '卤鹅', '粿条'], x: 72, y: 62 },
  { id: 'nanjing', name: '南京', provinceId: 'jiangsu', provinceName: '江苏', description: '六朝古都，鸭都美食', coverImage: '/content-thumb-suzhou-1.jpg', specialtyCount: 13, activityCount: 5, hotSpecialty: '盐水鸭', hotActivity: '秦淮灯会', products: ['盐水鸭', '雨花茶', '云锦'], x: 58, y: 38 },
  { id: 'suzhou', name: '苏州', provinceId: 'jiangsu', provinceName: '江苏', description: '园林之城，苏绣之乡', coverImage: '/content-thumb-suzhou-1.jpg', specialtyCount: 11, activityCount: 4, hotSpecialty: '苏绣', hotActivity: '苏绣体验课', products: ['苏绣', '碧螺春', '阳澄湖大闸蟹'], x: 68, y: 44 },
  { id: 'urumqi', name: '乌鲁木齐', provinceId: 'xinjiang', provinceName: '新疆', description: '丝路明珠，瓜果之乡', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', specialtyCount: 16, activityCount: 6, hotSpecialty: '哈密瓜', hotActivity: '葡萄节', products: ['哈密瓜', '葡萄干', '和田大枣'], x: 35, y: 28 },
  { id: 'turpan', name: '吐鲁番', provinceId: 'xinjiang', provinceName: '新疆', description: '火洲之城，葡萄之乡', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', specialtyCount: 8, activityCount: 4, hotSpecialty: '葡萄干', hotActivity: '葡萄采摘节', products: ['葡萄干', '哈密瓜', '葡萄酒'], x: 42, y: 38 },
  { id: 'liuzhou', name: '柳州', provinceId: 'guangxi', provinceName: '广西', description: '螺蛳粉之城，工业旅游', coverImage: '/content-thumb-sichuan-1.jpg', specialtyCount: 7, activityCount: 3, hotSpecialty: '螺蛳粉', hotActivity: '螺蛳粉美食节', products: ['螺蛳粉', '云片糕', '牛腊巴'], x: 42, y: 55 },
  { id: 'guilin', name: '桂林', provinceId: 'guangxi', provinceName: '广西', description: '山水甲天下', coverImage: '/content-thumb-yunnan-tea-2.jpg', specialtyCount: 9, activityCount: 5, hotSpecialty: '桂林米粉', hotActivity: '漓江竹筏游', products: ['桂林米粉', '罗汉果', '桂花糕'], x: 52, y: 42 },
  { id: 'guiyang', name: '贵阳', provinceId: 'guizhou', provinceName: '贵州', description: '避暑之都，酸汤鱼之乡', coverImage: '/content-thumb-live-1.jpg', specialtyCount: 10, activityCount: 4, hotSpecialty: '老干妈', hotActivity: '苗族姊妹节', products: ['老干妈', '酸汤鱼底料', '刺梨'], x: 48, y: 48 },
  { id: 'qiandongnan', name: '黔东南', provinceId: 'guizhou', provinceName: '贵州', description: '苗侗风情，银饰之乡', coverImage: '/content-thumb-suzhou-1.jpg', specialtyCount: 8, activityCount: 5, hotSpecialty: '苗族银饰', hotActivity: '苗年节', products: ['苗族银饰', '蜡染', '酸汤'], x: 55, y: 62 },
  { id: 'changsha', name: '长沙', provinceId: 'hunan', provinceName: '湖南', description: '星城长沙，网红美食之都', coverImage: '/content-thumb-sichuan-1.jpg', specialtyCount: 15, activityCount: 6, hotSpecialty: '臭豆腐', hotActivity: '火宫殿庙会', products: ['臭豆腐', '腊肉', '辣椒酱'], x: 52, y: 48 },
  { id: 'xiangxi', name: '湘西', provinceId: 'hunan', provinceName: '湖南', description: '边城风情，腊肉之乡', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', specialtyCount: 6, activityCount: 3, hotSpecialty: '湘西腊肉', hotActivity: '赶秋节', products: ['腊肉', '猕猴桃', '姜糖'], x: 38, y: 58 },
  { id: 'wuhan', name: '武汉', provinceId: 'hubei', provinceName: '湖北', description: '江城武汉，热干面之都', coverImage: '/content-thumb-shaanxi-1.jpg', specialtyCount: 12, activityCount: 4, hotSpecialty: '热干面', hotActivity: '樱花季', products: ['热干面', '鸭脖', '莲藕'], x: 55, y: 45 },
  { id: 'qingdao', name: '青岛', provinceId: 'shandong', provinceName: '山东', description: '海滨城市，啤酒海鲜', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', specialtyCount: 11, activityCount: 5, hotSpecialty: '青岛海鲜', hotActivity: '啤酒节', products: ['海鲜', '啤酒', '苹果'], x: 72, y: 32 },
  { id: 'yantai', name: '烟台', provinceId: 'shandong', provinceName: '山东', description: '苹果之乡，海滨度假', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', specialtyCount: 8, activityCount: 3, hotSpecialty: '红富士苹果', hotActivity: '苹果采摘节', products: ['红富士苹果', '葡萄酒', '海参'], x: 78, y: 28 },
  { id: 'dalian', name: '大连', provinceId: 'liaoning', provinceName: '辽宁', description: '浪漫之都，海鲜名城', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', specialtyCount: 9, activityCount: 4, hotSpecialty: '大连海参', hotActivity: '海鲜美食节', products: ['海参', '鲍鱼', '樱桃'], x: 78, y: 22 },
  { id: 'huhehaote', name: '呼和浩特', provinceId: 'neimenggu', provinceName: '内蒙古', description: '青城草原，乳都之城', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', specialtyCount: 7, activityCount: 4, hotSpecialty: '风干牛肉', hotActivity: '那达慕大会', products: ['风干牛肉', '奶酪', '羊肉'], x: 52, y: 28 },
  { id: 'lasa', name: '拉萨', provinceId: 'xizang', provinceName: '西藏', description: '日光之城，信仰圣地', coverImage: '/content-thumb-yunnan-tea-2.jpg', specialtyCount: 6, activityCount: 3, hotSpecialty: '藏香', hotActivity: '雪顿节', products: ['藏香', '牦牛肉干', '藏红花'], x: 32, y: 52 },
  { id: 'jiaxing', name: '嘉兴', provinceId: 'zhejiang', provinceName: '浙江', description: '红船起航地，粽子之乡', coverImage: '/content-thumb-suzhou-1.jpg', specialtyCount: 7, activityCount: 3, hotSpecialty: '嘉兴粽子', hotActivity: '南湖红船研学', products: ['嘉兴粽子', '南湖菱', '酱鸭'], x: 72, y: 52 },
  { id: 'fuzhou_jx', name: '抚州', provinceId: 'jiangxi', provinceName: '江西', description: '才子之乡，广昌白莲', coverImage: '/content-thumb-yunnan-tea-1.jpg', specialtyCount: 5, activityCount: 2, hotSpecialty: '广昌白莲', hotActivity: '莲花节', products: ['广昌白莲', '南丰蜜桔', '临川菜梗'], x: 62, y: 56 },
  { id: 'beijing_city', name: '北京', provinceId: 'beijing', provinceName: '北京', description: '六朝古都，烤鸭飘香', coverImage: '/content-thumb-shaanxi-1.jpg', specialtyCount: 8, activityCount: 4, hotSpecialty: '北京烤鸭', hotActivity: '故宫文化游', products: ['北京烤鸭', '果脯', '二锅头'], x: 67, y: 39 },
  { id: 'tianjin_city', name: '天津', provinceId: 'tianjin', provinceName: '天津', description: '津门故里，麻花飘香', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', specialtyCount: 6, activityCount: 3, hotSpecialty: '狗不理包子', hotActivity: '古文化街庙会', products: ['狗不理包子', '麻花', '板栗'], x: 68, y: 41 },
  { id: 'shijiazhuang', name: '石家庄', provinceId: 'hebei', provinceName: '河北', description: '燕赵大地，板栗之乡', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', specialtyCount: 5, activityCount: 2, hotSpecialty: '驴肉火烧', hotActivity: '赵州桥文化游', products: ['驴肉火烧', '板栗', '雪花梨'], x: 64, y: 44 },
  { id: 'taiyuan', name: '太原', provinceId: 'shanxi', provinceName: '山西', description: '表里山河，醋香千年', coverImage: '/content-thumb-yunnan-tea-2.jpg', specialtyCount: 6, activityCount: 3, hotSpecialty: '平遥牛肉', hotActivity: '平遥古城年俗', products: ['平遥牛肉', '老陈醋', '汾酒'], x: 61, y: 45 },
  { id: 'harbin', name: '哈尔滨', provinceId: 'heilongjiang', provinceName: '黑龙江', description: '冰城夏都，大米飘香', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', specialtyCount: 7, activityCount: 4, hotSpecialty: '五常大米', hotActivity: '冰雪大世界', products: ['五常大米', '红肠', '蓝莓'], x: 82, y: 25 },
  { id: 'changchun', name: '长春', provinceId: 'jilin', provinceName: '吉林', description: '北国春城，人参之乡', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', specialtyCount: 5, activityCount: 3, hotSpecialty: '长白山人参', hotActivity: '雾凇观赏节', products: ['人参', '黑木耳', '冷面'], x: 80, y: 30 },
  { id: 'shanghai_city', name: '上海', provinceId: 'shanghai', provinceName: '上海', description: '魔都上海，小笼飘香', coverImage: '/content-thumb-suzhou-1.jpg', specialtyCount: 9, activityCount: 5, hotSpecialty: '南翔小笼包', hotActivity: '城隍庙灯会', products: ['小笼包', '五香豆', '蝴蝶酥'], x: 74, y: 61 },
  { id: 'hefei', name: '合肥', provinceId: 'anhui', provinceName: '安徽', description: '徽风皖韵，毛峰茶香', coverImage: '/content-thumb-yunnan-tea-1.jpg', specialtyCount: 6, activityCount: 3, hotSpecialty: '黄山毛峰', hotActivity: '徽州民俗体验', products: ['黄山毛峰', '宣纸', '徽墨酥'], x: 68, y: 59 },
  { id: 'zhengzhou', name: '郑州', provinceId: 'henan', provinceName: '河南', description: '中原大地，毛尖茶香', coverImage: '/content-thumb-shaanxi-1.jpg', specialtyCount: 7, activityCount: 3, hotSpecialty: '信阳毛尖', hotActivity: '少林武术节', products: ['信阳毛尖', '烩面', '道口烧鸡'], x: 63, y: 52 },
  { id: 'haikou', name: '海口', provinceId: 'hainan', provinceName: '海南', description: '椰城海口，文昌鸡香', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', specialtyCount: 5, activityCount: 3, hotSpecialty: '文昌鸡', hotActivity: '椰子节', products: ['文昌鸡', '椰子糖', '咖啡'], x: 57, y: 90 },
  { id: 'chongqing_city', name: '重庆', provinceId: 'chongqing', provinceName: '重庆', description: '山城火锅，麻辣鲜香', coverImage: '/content-thumb-sichuan-1.jpg', specialtyCount: 8, activityCount: 4, hotSpecialty: '火锅底料', hotActivity: '洪崖洞民俗游', products: ['火锅底料', '酸辣粉', '桃片'], x: 53, y: 64 },
  { id: 'yinchuan', name: '银川', provinceId: 'ningxia', provinceName: '宁夏', description: '塞上江南，枸杞红艳', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', specialtyCount: 5, activityCount: 2, hotSpecialty: '宁夏枸杞', hotActivity: '沙湖文化旅游节', products: ['枸杞', '葡萄酒', '滩羊肉'], x: 53, y: 43 },
  { id: 'lanzhou', name: '兰州', provinceId: 'gansu', provinceName: '甘肃', description: '河西走廊，百合甘甜', coverImage: '/content-thumb-yunnan-tea-2.jpg', specialtyCount: 5, activityCount: 3, hotSpecialty: '兰州百合', hotActivity: '敦煌文化节', products: ['兰州百合', '牛肉面', '枸杞'], x: 49, y: 49 },
  { id: 'xining', name: '西宁', provinceId: 'qinghai', provinceName: '青海', description: '三江源头，虫草珍贵', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', specialtyCount: 4, activityCount: 2, hotSpecialty: '冬虫夏草', hotActivity: '青海湖骑行', products: ['冬虫夏草', '黑枸杞', '牦牛肉'], x: 46, y: 47 },
  { id: 'dalian', name: '大连', provinceId: 'liaoning', provinceName: '辽宁', description: '浪漫之都，海鲜名城', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', specialtyCount: 6, activityCount: 3, hotSpecialty: '大连海参', hotActivity: '海鲜美食节', products: ['海参', '鲍鱼', '樱桃'], x: 78, y: 35 },
  { id: 'taibei', name: '台北', provinceId: 'taiwan', provinceName: '台湾', description: '宝岛明珠，凤梨酥甜', coverImage: '/content-thumb-suzhou-1.jpg', specialtyCount: 7, activityCount: 4, hotSpecialty: '凤梨酥', hotActivity: '夜市美食之旅', products: ['凤梨酥', '高山茶', '牛轧糖'], x: 74, y: 79 },
];

// ─── Activity Data ────────────────────────────────────────
export const activityData: ActivityData[] = [
  { id: 'a1', title: '西双版纳泼水节', provinceId: 'yunnan', provinceName: '云南', cityId: 'xishuangbanna', cityName: '西双版纳', type: 'festival', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', images: [], description: '一年一度的傣族泼水节，感受最热烈的民族狂欢', time: '4月13日-15日', location: '西双版纳景洪市', price: 0, participants: 2300, maxParticipants: 5000, isHot: true, heatValue: 9800, tags: ['泼水节', '傣族', '民族节日'], merchant: '西双版纳文旅', merchantAvatar: '/avatar-merchant-3.jpg' },
  { id: 'a2', title: '武夷山采茶制茶体验', provinceId: 'fujian', provinceName: '福建', cityId: 'wuyishan', cityName: '武夷山', type: 'farming', coverImage: '/content-thumb-yunnan-tea-1.jpg', images: [], description: '亲手采摘武夷岩茶，跟随非遗传承人学习制茶工艺', time: '4月-5月每周六', location: '武夷山景区', price: 298, originalPrice: 398, participants: 156, maxParticipants: 200, isHot: true, heatValue: 7600, tags: ['采茶', '制茶', '非遗体验'], merchant: '岩韵茶庄', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a3', title: '吐鲁番葡萄采摘节', provinceId: 'xinjiang', provinceName: '新疆', cityId: 'turpan', cityName: '吐鲁番', type: 'picking', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', images: [], description: '走进葡萄沟，亲手采摘最甜的无核白葡萄', time: '8月-9月', location: '吐鲁番葡萄沟', price: 128, participants: 890, maxParticipants: 2000, isHot: true, heatValue: 8500, tags: ['葡萄', '采摘', '新疆'], merchant: '西域果园', merchantAvatar: '/avatar-merchant-3.jpg' },
  { id: 'a4', title: '青岛国际啤酒节', provinceId: 'shandong', provinceName: '山东', cityId: 'qingdao', cityName: '青岛', type: 'festival', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', images: [], description: '亚洲最大的啤酒盛会，全球啤酒品牌齐聚', time: '8月第二个周末', location: '青岛啤酒城', price: 50, participants: 5600, maxParticipants: 10000, isHot: true, heatValue: 12000, tags: ['啤酒', '海鲜', '嘉年华'], merchant: '青岛文旅', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a5', title: '大理三月街民族节', provinceId: 'yunnan', provinceName: '云南', cityId: 'dali', cityName: '大理', type: 'festival', coverImage: '/content-thumb-suzhou-1.jpg', images: [], description: '千年历史的白族盛会，赛马、对歌、商贸', time: '3月15日-21日', location: '大理古城', price: 0, participants: 1200, maxParticipants: 3000, isHot: false, heatValue: 5400, tags: ['白族', '三月街', '民族节日'], merchant: '大理文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a6', title: '湘西赶秋节', provinceId: 'hunan', provinceName: '湖南', cityId: 'xiangxi', cityName: '湘西', type: 'festival', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', images: [], description: '苗族传统节日，打秋千、唱苗歌、赶边边场', time: '立秋日', location: '凤凰古城', price: 0, participants: 680, maxParticipants: 2000, isHot: false, heatValue: 4200, tags: ['苗族', '赶秋', '凤凰'], merchant: '凤凰文旅', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a7', title: '苏绣非遗体验课', provinceId: 'jiangsu', provinceName: '江苏', cityId: 'suzhou', cityName: '苏州', type: 'craft', coverImage: '/content-thumb-suzhou-1.jpg', images: [], description: '跟随苏绣传承人学习基础针法，完成一幅小作品', time: '每周六下午', location: '苏州平江路绣坊', price: 168, originalPrice: 238, participants: 89, maxParticipants: 120, isHot: true, heatValue: 6800, tags: ['苏绣', '非遗', '手工体验'], merchant: '苏绣坊', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a8', title: '烟台苹果采摘节', provinceId: 'shandong', provinceName: '山东', cityId: 'yantai', cityName: '烟台', type: 'picking', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', images: [], description: '走进果园亲手采摘红富士，现摘现吃', time: '10月-11月', location: '烟台栖霞苹果园', price: 68, participants: 450, maxParticipants: 800, isHot: false, heatValue: 5100, tags: ['苹果', '采摘', '亲子'], merchant: '王大叔果园', merchantAvatar: '/avatar-merchant-3.jpg' },
  { id: 'a9', title: '黔东南苗年节', provinceId: 'guizhou', provinceName: '贵州', cityId: 'qiandongnan', cityName: '黔东南', type: 'festival', coverImage: '/content-thumb-suzhou-1.jpg', images: [], description: '苗族最隆重的传统节日，芦笙舞、斗牛、长桌宴', time: '10月下旬', location: '西江千户苗寨', price: 0, participants: 1500, maxParticipants: 5000, isHot: true, heatValue: 8900, tags: ['苗族', '苗年', '长桌宴'], merchant: '苗寨文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a10', title: '那达慕大会', provinceId: 'neimenggu', provinceName: '内蒙古', cityId: 'huhehaote', cityName: '呼和浩特', type: 'festival', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', images: [], description: '草原盛会，赛马、摔跤、射箭三大竞技', time: '7月-8月', location: '呼和浩特草原', price: 0, participants: 3200, maxParticipants: 8000, isHot: true, heatValue: 9200, tags: ['那达慕', '草原', '蒙古族'], merchant: '草原文旅', merchantAvatar: '/avatar-merchant-3.jpg' },
  { id: 'a11', title: '成都川菜体验课', provinceId: 'sichuan', provinceName: '四川', cityId: 'chengdu', cityName: '成都', type: 'craft', coverImage: '/content-thumb-sichuan-1.jpg', images: [], description: '跟随川菜大厨学做经典川菜，从备料到出锅', time: '每周三/六', location: '成都宽窄巷子', price: 198, originalPrice: 298, participants: 230, maxParticipants: 300, isHot: true, heatValue: 7200, tags: ['川菜', '美食', '体验课'], merchant: '蜀味坊', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a12', title: '拉萨雪顿节', provinceId: 'xizang', provinceName: '西藏', cityId: 'lasa', cityName: '拉萨', type: 'festival', coverImage: '/content-thumb-yunnan-tea-2.jpg', images: [], description: '藏传佛教最盛大的节日，晒佛、藏戏、酸奶宴', time: '8月中旬', location: '拉萨哲蚌寺', price: 0, participants: 2800, maxParticipants: 6000, isHot: true, heatValue: 10500, tags: ['雪顿节', '藏戏', '晒佛'], merchant: '拉萨文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a13', title: '柳州螺蛳粉美食节', provinceId: 'guangxi', provinceName: '广西', cityId: 'liuzhou', cityName: '柳州', type: 'market', coverImage: '/content-thumb-sichuan-1.jpg', images: [], description: '螺蛳粉爱好者的天堂，百种口味任你选', time: '11月', location: '柳州城中区', price: 0, participants: 4500, maxParticipants: 10000, isHot: true, heatValue: 8800, tags: ['螺蛳粉', '美食', '柳州'], merchant: '柳州螺妹', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a14', title: '泉州木偶戏观赏', provinceId: 'fujian', provinceName: '福建', cityId: 'quanzhou', cityName: '泉州', type: 'craft', coverImage: '/content-thumb-suzhou-1.jpg', images: [], description: '观赏国家级非遗提线木偶戏，体验指尖艺术', time: '每周五/六晚', location: '泉州木偶剧院', price: 88, participants: 56, maxParticipants: 100, isHot: false, heatValue: 3600, tags: ['木偶戏', '非遗', '泉州'], merchant: '木偶传承人', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a15', title: '长沙火宫殿庙会', provinceId: 'hunan', provinceName: '湖南', cityId: 'changsha', cityName: '长沙', type: 'market', coverImage: '/content-thumb-shaanxi-1.jpg', images: [], description: '百年火宫殿，最地道的长沙小吃汇聚', time: '春节/元宵', location: '长沙坡子街', price: 0, participants: 6800, maxParticipants: 15000, isHot: true, heatValue: 11000, tags: ['庙会', '小吃', '长沙'], merchant: '火宫殿', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a16', title: '广昌莲花节', provinceId: 'jiangxi', provinceName: '江西', cityId: 'fuzhou_jx', cityName: '抚州', type: 'festival', coverImage: '/content-thumb-yunnan-tea-1.jpg', images: [], description: '万亩莲田盛开，赏莲、品莲、画莲', time: '6月-7月', location: '广昌县驿前镇', price: 0, participants: 320, maxParticipants: 1000, isHot: false, heatValue: 2800, tags: ['莲花', '白莲', '赏花'], merchant: '广昌文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a17', title: '北京故宫文化体验季', provinceId: 'beijing', provinceName: '北京', cityId: 'beijing_city', cityName: '北京', type: 'craft', coverImage: '/content-thumb-shaanxi-1.jpg', images: [], description: '走进紫禁城，体验宫廷文化，品鉴御膳烤鸭', time: '4月-10月', location: '故宫博物院', price: 60, participants: 12000, maxParticipants: 30000, isHot: true, heatValue: 15000, tags: ['故宫', '文化', '烤鸭'], merchant: '故宫文创', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a18', title: '天津古文化街庙会', provinceId: 'tianjin', provinceName: '天津', cityId: 'tianjin_city', cityName: '天津', type: 'market', coverImage: '/content-thumb-shaanxi-1.jpg', images: [], description: '百年古街，麻花飘香，相声茶馆，津味十足', time: '春节/元宵', location: '古文化街', price: 0, participants: 5600, maxParticipants: 12000, isHot: true, heatValue: 8200, tags: ['庙会', '麻花', '相声'], merchant: '天津文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a19', title: '河北承德避暑山庄文化节', provinceId: 'hebei', provinceName: '河北', cityId: 'shijiazhuang', cityName: '石家庄', type: 'festival', coverImage: '/content-thumb-suzhou-1.jpg', images: [], description: '皇家园林避暑体验，品尝正宗驴肉火烧', time: '7月-8月', location: '承德避暑山庄', price: 130, participants: 2300, maxParticipants: 5000, isHot: false, heatValue: 5600, tags: ['避暑', '皇家', '驴肉火烧'], merchant: '承德文旅', merchantAvatar: '/avatar-merchant-3.jpg' },
  { id: 'a20', title: '山西平遥古城年俗文化节', provinceId: 'shanxi', provinceName: '山西', cityId: 'taiyuan', cityName: '太原', type: 'festival', coverImage: '/content-thumb-shaanxi-1.jpg', images: [], description: '千年古城过大年，社火表演、老陈醋品鉴', time: '春节', location: '平遥古城', price: 125, participants: 3400, maxParticipants: 8000, isHot: true, heatValue: 9500, tags: ['平遥', '年俗', '老陈醋'], merchant: '平遥文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a21', title: '哈尔滨冰雪大世界', provinceId: 'heilongjiang', provinceName: '黑龙江', cityId: 'harbin', cityName: '哈尔滨', type: 'festival', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', images: [], description: '世界最大冰雪主题乐园，冰雕雪雕震撼视觉', time: '12月-2月', location: '哈尔滨松北区', price: 300, participants: 8900, maxParticipants: 20000, isHot: true, heatValue: 13500, tags: ['冰雪', '哈尔滨', '冰雕'], merchant: '哈尔滨文旅', merchantAvatar: '/avatar-merchant-3.jpg' },
  { id: 'a22', title: '吉林雾凇观赏节', provinceId: 'jilin', provinceName: '吉林', cityId: 'changchun', cityName: '长春', type: 'festival', coverImage: '/content-thumb-yunnan-tea-2.jpg', images: [], description: '松花江畔雾凇奇观，人参养生体验', time: '12月-2月', location: '吉林市松花江', price: 0, participants: 2100, maxParticipants: 5000, isHot: false, heatValue: 6200, tags: ['雾凇', '人参', '冰雪'], merchant: '吉林文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a23', title: '上海城隍庙灯会', provinceId: 'shanghai', provinceName: '上海', cityId: 'shanghai_city', cityName: '上海', type: 'festival', coverImage: '/content-thumb-suzhou-1.jpg', images: [], description: '百年城隍庙，花灯璀璨，小笼包飘香', time: '元宵节', location: '城隍庙', price: 0, participants: 7800, maxParticipants: 15000, isHot: true, heatValue: 11200, tags: ['灯会', '小笼包', '元宵'], merchant: '上海文旅', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a24', title: '安徽徽州民俗体验', provinceId: 'anhui', provinceName: '安徽', cityId: 'hefei', cityName: '合肥', type: 'craft', coverImage: '/content-thumb-suzhou-1.jpg', images: [], description: '走进徽州古村，体验宣纸制作，品鉴黄山毛峰', time: '4月-5月', location: '黟县宏村', price: 158, originalPrice: 228, participants: 670, maxParticipants: 1000, isHot: false, heatValue: 4800, tags: ['徽州', '宣纸', '毛峰'], merchant: '徽州文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a25', title: '河南少林武术节', provinceId: 'henan', provinceName: '河南', cityId: 'zhengzhou', cityName: '郑州', type: 'festival', coverImage: '/content-thumb-shaanxi-1.jpg', images: [], description: '天下武功出少林，武术表演、禅修体验', time: '10月', location: '少林寺', price: 80, participants: 4500, maxParticipants: 10000, isHot: true, heatValue: 10200, tags: ['少林', '武术', '禅修'], merchant: '少林文旅', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a26', title: '武汉樱花季', provinceId: 'hubei', provinceName: '湖北', cityId: 'wuhan', cityName: '武汉', type: 'festival', coverImage: '/content-thumb-yunnan-tea-1.jpg', images: [], description: '武大樱花盛开，热干面飘香，江城最美时节', time: '3月-4月', location: '武汉大学/东湖', price: 0, participants: 12000, maxParticipants: 30000, isHot: true, heatValue: 14000, tags: ['樱花', '热干面', '武汉'], merchant: '武汉文旅', merchantAvatar: '/avatar-merchant-3.jpg' },
  { id: 'a27', title: '海南椰子节', provinceId: 'hainan', provinceName: '海南', cityId: 'haikou', cityName: '海口', type: 'festival', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', images: [], description: '椰风海韵，文昌鸡宴，热带水果品鉴', time: '3月-4月', location: '海口/三亚', price: 0, participants: 3400, maxParticipants: 8000, isHot: false, heatValue: 6500, tags: ['椰子', '文昌鸡', '热带'], merchant: '海南文旅', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a28', title: '重庆洪崖洞民俗夜游', provinceId: 'chongqing', provinceName: '重庆', cityId: 'chongqing_city', cityName: '重庆', type: 'market', coverImage: '/content-thumb-sichuan-1.jpg', images: [], description: '千与千寻般的夜景，火锅飘香的山城夜游', time: '全年', location: '洪崖洞', price: 0, participants: 9800, maxParticipants: 20000, isHot: true, heatValue: 12800, tags: ['洪崖洞', '火锅', '夜景'], merchant: '重庆文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a29', title: '宁夏沙湖文化旅游节', provinceId: 'ningxia', provinceName: '宁夏', cityId: 'yinchuan', cityName: '银川', type: 'festival', coverImage: '/content-thumb-xinjiang-fruit-1.jpg', images: [], description: '沙漠与湖泊的奇妙融合，枸杞采摘体验', time: '9月-10月', location: '沙湖景区', price: 60, participants: 1200, maxParticipants: 3000, isHot: false, heatValue: 4200, tags: ['沙湖', '枸杞', '沙漠'], merchant: '宁夏文旅', merchantAvatar: '/avatar-merchant-3.jpg' },
  { id: 'a30', title: '甘肃敦煌文化节', provinceId: 'gansu', provinceName: '甘肃', cityId: 'lanzhou', cityName: '兰州', type: 'festival', coverImage: '/content-thumb-yunnan-tea-2.jpg', images: [], description: '莫高窟壁画临摹，丝路文化探秘，兰州百合品鉴', time: '9月', location: '敦煌莫高窟', price: 238, participants: 2800, maxParticipants: 5000, isHot: true, heatValue: 9800, tags: ['敦煌', '丝路', '百合'], merchant: '敦煌文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a31', title: '青海湖骑行嘉年华', provinceId: 'qinghai', provinceName: '青海', cityId: 'xining', cityName: '西宁', type: 'festival', coverImage: '/content-thumb-xinjiang-fruit-2.jpg', images: [], description: '环青海湖骑行，高原风光，虫草品鉴', time: '7月-8月', location: '青海湖', price: 0, participants: 5600, maxParticipants: 10000, isHot: true, heatValue: 8600, tags: ['骑行', '青海湖', '虫草'], merchant: '青海文旅', merchantAvatar: '/avatar-merchant-3.jpg' },
  { id: 'a32', title: '杭州西湖龙井开茶节', provinceId: 'zhejiang', provinceName: '浙江', cityId: 'hangzhou', cityName: '杭州', type: 'farming', coverImage: '/content-thumb-yunnan-tea-1.jpg', images: [], description: '明前龙井头采，茶艺表演，西湖踏青', time: '3月下旬', location: '西湖龙井村', price: 0, participants: 4500, maxParticipants: 8000, isHot: true, heatValue: 11000, tags: ['龙井', '开茶', '西湖'], merchant: '杭州文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a33', title: '广州早茶文化节', provinceId: 'guangdong', provinceName: '广东', cityId: 'guangzhou', cityName: '广州', type: 'market', coverImage: '/content-thumb-shaanxi-1.jpg', images: [], description: '一盅两件叹世界，广式腊肠品鉴，粤菜大师课', time: '11月', location: '广州上下九', price: 0, participants: 6700, maxParticipants: 15000, isHot: true, heatValue: 10500, tags: ['早茶', '腊肠', '粤菜'], merchant: '广州文旅', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a34', title: '景德镇瓷文化节', provinceId: 'jiangxi', provinceName: '江西', cityId: 'fuzhou_jx', cityName: '抚州', type: 'craft', coverImage: '/content-thumb-suzhou-1.jpg', images: [], description: '千年瓷都，亲手拉坯烧瓷，感受泥与火的艺术', time: '10月', location: '景德镇古窑', price: 198, originalPrice: 298, participants: 890, maxParticipants: 1500, isHot: true, heatValue: 7800, tags: ['瓷器', '拉坯', '景德镇'], merchant: '景德镇文旅', merchantAvatar: '/avatar-merchant-1.jpg' },
  { id: 'a35', title: '南京秦淮灯会', provinceId: 'jiangsu', provinceName: '江苏', cityId: 'nanjing', cityName: '南京', type: 'festival', coverImage: '/content-thumb-suzhou-1.jpg', images: [], description: '天下第一灯会，秦淮河畔赏灯品鸭', time: '春节/元宵', location: '夫子庙秦淮河', price: 0, participants: 15000, maxParticipants: 30000, isHot: true, heatValue: 14500, tags: ['灯会', '秦淮', '盐水鸭'], merchant: '南京文旅', merchantAvatar: '/avatar-merchant-2.jpg' },
  { id: 'a36', title: '西安回民街美食之旅', provinceId: 'shaanxi', provinceName: '陕西', cityId: 'xian', cityName: '西安', type: 'market', coverImage: '/content-thumb-shaanxi-1.jpg', images: [], description: '从肉夹馍到泡馍，一条街吃遍三秦美食', time: '全年', location: '回民街', price: 0, participants: 8900, maxParticipants: 20000, isHot: true, heatValue: 11800, tags: ['回民街', '肉夹馍', '美食'], merchant: '西安文旅', merchantAvatar: '/avatar-merchant-3.jpg' },
];

// ─── Helpers ───────────────────────────────────────────────
export function getContentsByProvince(provinceId?: string): ContentItem[] {
  if (!provinceId || provinceId === 'all') return mockContentItems;
  return mockContentItems.filter(c => c.province === provinceId);
}

export function getContentsByType(type: ContentType): ContentItem[] {
  return mockContentItems.filter(c => c.type === type);
}

export function getContentById(id: string): ContentItem | undefined {
  return mockContentItems.find(c => c.id === id);
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getCommentsByContentId(contentId: string): ContentComment[] {
  return mockComments.filter(c => c.contentId === contentId);
}

export function getRelatedProducts(content: ContentItem): Product[] {
  return content.relatedProducts
    .map(rp => mockProducts.find(p => p.id === rp.productId))
    .filter((p): p is Product => p !== undefined);
}

export function getAnalyticsById(contentId: string): ContentAnalytics | undefined {
  return mockAnalytics.find(a => a.contentId === contentId);
}

export function getCitiesByProvince(provinceId: string): CityData[] {
  return cityData.filter(c => c.provinceId === provinceId);
}

export function getActivitiesByProvince(provinceId: string): ActivityData[] {
  return activityData.filter(a => a.provinceId === provinceId);
}

export function getActivitiesByCity(cityId: string): ActivityData[] {
  return activityData.filter(a => a.cityId === cityId);
}

export function getProductsByProvince(provinceId: string): Product[] {
  return mockProducts.filter(p => p.province === provinceId);
}

export function getProductsByCity(cityId: string): Product[] {
  const city = cityData.find(c => c.id === cityId);
  if (!city) return [];
  return mockProducts.filter(p => p.province === city.provinceId);
}
