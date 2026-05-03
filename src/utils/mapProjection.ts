export interface GeoFeature {
  type: 'Feature';
  properties: { id: string; name: string; cp: [number, number]; childNum: number };
  geometry: { type: 'Polygon' | 'MultiPolygon'; coordinates: number[][][][] | number[][][] };
}

export interface GeoCollection {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

const MIN_LON = 73;
const MAX_LON = 135;
const MIN_LAT = 17;
const MAX_LAT = 54;
const WIDTH = 1000;
const HEIGHT = 800;

export function projectLonLat(lon: number, lat: number): [number, number] {
  const x = ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * WIDTH;
  const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * HEIGHT;
  return [x, y];
}

function ringToPath(ring: number[][]): string {
  if (ring.length === 0) return '';
  const [firstX, firstY] = projectLonLat(ring[0][0], ring[0][1]);
  let path = `M${firstX.toFixed(2)},${firstY.toFixed(2)}`;
  for (let i = 1; i < ring.length; i++) {
    const [px, py] = projectLonLat(ring[i][0], ring[i][1]);
    path += `L${px.toFixed(2)},${py.toFixed(2)}`;
  }
  path += 'Z';
  return path;
}

export function featureToPath(feature: GeoFeature): string {
  const { type, coordinates } = feature.geometry;
  if (type === 'Polygon') {
    const rings = coordinates as number[][][];
    return rings.map(ringToPath).join(' ');
  }
  const polys = coordinates as number[][][][];
  return polys.map(poly => poly.map(ringToPath).join(' ')).join(' ');
}

export function getCentroid(feature: GeoFeature): [number, number] {
  const cp = feature.properties.cp;
  if (cp && cp.length === 2) {
    return projectLonLat(cp[0], cp[1]);
  }
  const coords = feature.geometry.type === 'Polygon'
    ? (feature.geometry.coordinates as number[][][])[0]
    : (feature.geometry.coordinates as number[][][][])[0][0];

  let sumX = 0, sumY = 0;
  for (const [lon, lat] of coords) {
    const [x, y] = projectLonLat(lon, lat);
    sumX += x;
    sumY += y;
  }
  return [sumX / coords.length, sumY / coords.length];
}

export const GEOJSON_NAME_TO_ID: Record<string, string> = {
  '新疆': 'xinjiang',
  '西藏': 'xizang',
  '内蒙古': 'neimenggu',
  '青海': 'qinghai',
  '四川': 'sichuan',
  '黑龙江': 'heilongjiang',
  '甘肃': 'gansu',
  '云南': 'yunnan',
  '广西': 'guangxi',
  '湖南': 'hunan',
  '陕西': 'shaanxi',
  '广东': 'guangdong',
  '吉林': 'jilin',
  '河北': 'hebei',
  '湖北': 'hubei',
  '贵州': 'guizhou',
  '山东': 'shandong',
  '江西': 'jiangxi',
  '河南': 'henan',
  '辽宁': 'liaoning',
  '山西': 'shanxi',
  '安徽': 'anhui',
  '福建': 'fujian',
  '浙江': 'zhejiang',
  '江苏': 'jiangsu',
  '重庆': 'chongqing',
  '宁夏': 'ningxia',
  '海南': 'hainan',
  '台湾': 'taiwan',
  '北京': 'beijing',
  '天津': 'tianjin',
  '上海': 'shanghai',
  '香港': 'hongkong',
  '澳门': 'macao',
};
