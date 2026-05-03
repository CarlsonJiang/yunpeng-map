import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Map, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/user/home', label: '首页', icon: Home },
  { path: '/user/explore', label: '发现', icon: Compass },
  { path: '/user/map', label: '地图', icon: Map },
  { path: '/user/cart', label: '购物车', icon: ShoppingCart, badge: true },
  { path: '/user/profile', label: '我的', icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const { totalCount } = useCart();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-90 mx-auto max-w-mobile"
      style={{
        height: '56px',
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--divider)',
      }}
    >
      <div className="flex h-full items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center gap-[2px]"
              style={{ width: '20%' }}
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  color={isActive ? 'var(--accent)' : 'var(--text-tertiary)'}
                />
                {item.badge && totalCount > 0 && (
                  <span
                    className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1"
                    style={{
                      background: 'var(--accent)',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 600,
                    }}
                  >
                    {totalCount > 99 ? '99+' : totalCount}
                  </span>
                )}
              </motion.div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
