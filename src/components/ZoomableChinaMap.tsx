import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw, Navigation } from 'lucide-react';
import type { ProvinceData } from '@/types';
import { provinceData } from '@/data/mockData';
import chinaGeoJSON from '@/data/china-provinces.json';
import type { GeoCollection } from '@/utils/mapProjection';
import { featureToPath, getCentroid, GEOJSON_NAME_TO_ID } from '@/utils/mapProjection';
import ProvinceTooltip from './ProvinceTooltip';

interface Props {
  onProvinceSelect?: (id: string | null) => void;
  selectedProvince?: string | null;
  height?: string;
}

const REGION_COLORS: Record<string, { fill: string; stroke: string; hover: string; select: string }> = {
  north: { fill: '#fef3f2', stroke: '#e8a0a0', hover: '#fde0dd', select: '#fca5a5' },
  northeast: { fill: '#eff6ff', stroke: '#a0c4e8', hover: '#dbeafe', select: '#93c5fd' },
  east: { fill: '#ecfdf5', stroke: '#a0e0c0', hover: '#d1fae5', select: '#6ee7b7' },
  central: { fill: '#fffbeb', stroke: '#e8d8a0', hover: '#fef3c7', select: '#fcd34d' },
  south: { fill: '#f0fdfa', stroke: '#a0d8d0', hover: '#ccfbf1', select: '#5eead4' },
  southwest: { fill: '#f5f3ff', stroke: '#c0b0e0', hover: '#ede9fe', select: '#c4b5fd' },
  northwest: { fill: '#fff7ed', stroke: '#e8c8a0', hover: '#ffedd5', select: '#fdba74' },
};

export default function ZoomableChinaMap({ onProvinceSelect, selectedProvince, height = '58vh' }: Props) {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1.1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [tooltipProvince, setTooltipProvince] = useState<ProvinceData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const lastTap = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const geoCollection = chinaGeoJSON as unknown as GeoCollection;

  const provinceFeatures = useMemo(() => {
    const result: Array<{ feature: typeof geoCollection.features[0]; province: ProvinceData | undefined; path: string; centroid: [number, number] }> = [];
    for (const feature of geoCollection.features) {
      const provinceId = GEOJSON_NAME_TO_ID[feature.properties.name];
      const province = provinceData.find(p => p.id === provinceId);
      const path = featureToPath(feature);
      const centroid = getCentroid(feature);
      result.push({ feature, province, path, centroid });
    }
    return result;
  }, [geoCollection.features]);

  const handleZoomIn = useCallback(() => setScale(s => Math.min(s * 1.25, 6)), []);
  const handleZoomOut = useCallback(() => setScale(s => Math.max(s / 1.25, 0.4)), []);
  const handleReset = useCallback(() => {
    setScale(1.1); setTranslate({ x: 0, y: 0 }); setTooltipProvince(null); onProvinceSelect?.(null);
  }, [onProvinceSelect]);

  const handleProvinceClick = useCallback((_provinceId: string, province: ProvinceData | undefined, clientX: number, clientY: number) => {
    const now = Date.now();
    const isDoubleTap = now - lastTap.current < 300;
    lastTap.current = now;
    if (isDoubleTap && province) {
      navigate(`/user/province/${province.id}`);
    } else if (province) {
      setTooltipPos({ x: clientX, y: clientY - 30 });
      setTooltipProvince(province);
      onProvinceSelect?.(province.id);
    }
  }, [onProvinceSelect, navigate]);

  const handleProvinceEnter = useCallback((provinceId: string) => {
    navigate(`/user/province/${provinceId}`);
  }, [navigate]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, tx: translate.x, ty: translate.y };
  }, [translate]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setTranslate({
      x: dragStart.current.tx + (e.clientX - dragStart.current.x),
      y: dragStart.current.ty + (e.clientY - dragStart.current.y),
    });
  }, [isDragging]);

  const handlePointerUp = useCallback(() => setIsDragging(false), []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.85 : 1.18;
    setScale(s => Math.min(Math.max(s * delta, 0.4), 6));
  }, []);

  useEffect(() => {
    const up = () => setIsDragging(false);
    window.addEventListener('pointerup', up);
    return () => window.removeEventListener('pointerup', up);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none rounded-2xl shadow-xl"
      style={{
        height,
        background: 'linear-gradient(180deg, #d4eaf4 0%, #c0ddf0 15%, #b8d4e8 30%, #c8dce8 50%, #d2ddd4 70%, #e8e0d0 100%)',
      }}
      onWheel={handleWheel}
    >
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <svg viewBox="0 0 1000 800" className="w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: '100vw' }}>
          <defs>
            <radialGradient id="oceanGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#e8f4fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#b0c8d8" stopOpacity="0.2" />
            </radialGradient>
            <filter id="landShadow">
              <feDropShadow dx="1" dy="1.5" stdDeviation="2" floodColor="#1a1a2e" floodOpacity="0.18" />
            </filter>
            <filter id="hoverGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.3" />
              <feDropShadow dx="0.5" dy="0.5" stdDeviation="1" floodColor="#000" floodOpacity="0.15" />
            </filter>
            <filter id="selectedGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#e63946" floodOpacity="0.35" />
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
            </filter>
            <linearGradient id="oceanBkg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4e4f0" />
              <stop offset="50%" stopColor="#c8dce8" />
              <stop offset="100%" stopColor="#d0dcd8" />
            </linearGradient>
          </defs>

          {/* Ocean background */}
          <rect x="0" y="0" width="1000" height="800" fill="url(#oceanBkg)" />
          <rect x="0" y="0" width="1000" height="800" fill="url(#oceanGlow)" />

          {/* Province layers */}
          <g filter="url(#landShadow)">
            {provinceFeatures.map(({ feature, province, path }) => {
              const region = province?.region || 'east';
              const colors = REGION_COLORS[region] || REGION_COLORS.east;
              const pid = province?.id || GEOJSON_NAME_TO_ID[feature.properties.name] || '';
              const isHovered = hoveredId === pid;
              const isSelected = selectedProvince === pid;

              let fill = colors.fill;
              let stroke = colors.stroke;
              let filter = undefined;
              let strokeWidth = 1.2;

              if (isSelected) {
                fill = colors.select;
                stroke = '#e63946';
                filter = 'url(#selectedGlow)';
                strokeWidth = 2.5;
              } else if (isHovered) {
                fill = colors.hover;
                filter = 'url(#hoverGlow)';
                strokeWidth = 1.8;
              }

              return (
                <path
                  key={feature.properties.id}
                  d={path}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                  style={{ cursor: province ? 'pointer' : 'default', filter }}
                  onMouseEnter={() => setHoveredId(pid)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={(e) => {
                    if (province) handleProvinceClick(pid, province, e.clientX, e.clientY);
                  }}
                />
              );
            })}
          </g>

          {/* Province borders overlay - to prevent gaps between provinces */}
          <g>
            {provinceFeatures.map(({ feature, province, path }) => {
              const pid = province?.id || GEOJSON_NAME_TO_ID[feature.properties.name] || '';
              const isSelected = selectedProvince === pid;
              if (isSelected) return null;
              return (
                <path
                  key={`border-${feature.properties.id}`}
                  d={path}
                  fill="none"
                  stroke="#d0c8c0"
                  strokeWidth={0.4}
                  strokeLinejoin="round"
                  className="pointer-events-none"
                />
              );
            })}
          </g>

          {/* Province Labels */}
          {provinceFeatures.map(({ province, centroid }) => {
            if (!province) return null;
            const [cx, cy] = centroid;
            const colors = REGION_COLORS[province.region] || REGION_COLORS.east;
            const isSmall = ['beijing', 'tianjin', 'shanghai', 'hongkong', 'macao', 'ningxia'].includes(province.id);

            return (
              <g key={`label-${province.id}`} className="pointer-events-none">
                {!isSmall && (
                  <rect
                    x={cx - province.name.length * 6 - 8}
                    y={cy - 19}
                    width={province.name.length * 12 + 16}
                    height={34}
                    rx={5}
                    fill="white"
                    fillOpacity="0.65"
                    className="backdrop-blur-[1px]"
                  />
                )}
                <text
                  x={cx}
                  y={cy - 3}
                  textAnchor="middle"
                  fontSize={isSmall ? 10 : 12}
                  fontWeight="700"
                  fill="#1a1a2e"
                  style={{ fontFamily: 'system-ui, sans-serif', paintOrder: 'stroke', stroke: 'white', strokeWidth: '3px' }}
                >
                  {province.name}
                </text>
                <text
                  x={cx}
                  y={cy + (isSmall ? 8 : 11)}
                  textAnchor="middle"
                  fontSize={isSmall ? 8 : 9.5}
                  fontWeight="600"
                  fill={colors.stroke}
                  style={{ fontFamily: 'system-ui, sans-serif', paintOrder: 'stroke', stroke: 'white', strokeWidth: '2.5px' }}
                >
                  {province.specialty}
                </text>
              </g>
            );
          })}

          {/* South China Sea inset */}
          <g transform="translate(860, 580)">
            <rect x="0" y="0" width="120" height="200" rx="8" fill="url(#oceanBkg)" stroke="#c0d0d8" strokeWidth="1.5" />
            {/* Simplified islands */}
            <circle cx="40" cy="140" r="6" fill="#c0d0d8" opacity="0.6" />
            <circle cx="60" cy="150" r="5" fill="#c0d0d8" opacity="0.6" />
            <circle cx="80" cy="145" r="4" fill="#c0d0d8" opacity="0.6" />
            <circle cx="55" cy="120" r="5" fill="#1abc9c" opacity="0.5" />
            <circle cx="75" cy="125" r="4" fill="#1abc9c" opacity="0.5" />
            <text x="60" y="65" textAnchor="middle" fontSize="13" fill="#4a6a7a" fontWeight="700" style={{ fontFamily: 'system-ui, sans-serif' }}>
              南海诸岛
            </text>
            <text x="60" y="80" textAnchor="middle" fontSize="10" fill="#6a8a9a" fontWeight="400" style={{ fontFamily: 'system-ui, sans-serif' }}>
              (中国固有领土)
            </text>
          </g>

          {/* Compass Rose */}
          <g transform="translate(930, 45)">
            <circle cx="0" cy="0" r="20" fill="white" fillOpacity="0.85" stroke="#c0c8d0" strokeWidth="1" />
            <polygon points="0,-14 3,-5 0,-7 -3,-5" fill="#e63946" />
            <polygon points="0,14 3,5 0,7 -3,5" fill="#555" />
            <polygon points="-14,0 -5,-3 -7,0 -5,3" fill="#555" />
            <polygon points="14,0 5,-3 7,0 5,3" fill="#555" />
            <text x="0" y="-17" textAnchor="middle" fontSize="10" fontWeight="800" fill="#e63946" style={{ fontFamily: 'system-ui, sans-serif' }}>N</text>
          </g>

          {/* Title */}
          <text x="500" y="790" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6a7a8a" opacity="0.3" style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '2px' }}>
            云蓬地图 · 中国特产风物志
          </text>
        </svg>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-20">
        {[
          { icon: Plus, label: '放大', onClick: handleZoomIn },
          { icon: Minus, label: '缩小', onClick: handleZoomOut },
          { icon: RotateCcw, label: '复位', onClick: handleReset },
          { icon: Navigation, label: '收起', onClick: () => setTooltipProvince(null) },
        ].map(({ icon: Icon, label, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/85 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:shadow-xl active:scale-[0.94]"
            title={label}
          >
            <Icon size={15} strokeWidth={2} color="#1a1a2e" />
          </button>
        ))}
      </div>

      {/* Region Legend */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1">
        {[
          { key: 'north', label: '华北' },
          { key: 'northeast', label: '东北' },
          { key: 'east', label: '华东' },
          { key: 'central', label: '华中' },
          { key: 'south', label: '华南' },
          { key: 'southwest', label: '西南' },
          { key: 'northwest', label: '西北' },
        ].map(({ key, label }) => {
          const c = REGION_COLORS[key];
          return (
            <div key={key} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm">
              <span className="w-2.5 h-2.5 rounded-sm border" style={{ background: c.fill, borderColor: c.stroke }} />
              <span className="text-[10px] font-medium text-[#555]">{label}</span>
            </div>
          );
        })}
      </div>

      {/* Province tooltip */}
      <AnimatePresence>
        {tooltipProvince && (
          <ProvinceTooltip
            province={tooltipProvince}
            position={tooltipPos}
            onClose={() => setTooltipProvince(null)}
            onEnter={handleProvinceEnter}
          />
        )}
      </AnimatePresence>

      {/* Tap hint */}
      <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md shadow-sm">
        <span className="text-[10px] text-[#888] font-medium">双击进入省份详情</span>
      </div>
    </div>
  );
}
