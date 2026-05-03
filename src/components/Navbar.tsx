import { Link } from 'react-router-dom';
import { Home, Compass, Map, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const links = [
  { path: '/user/home', label: '首页', icon: Home },
  { path: '/user/explore', label: '发现', icon: Compass },
  { path: '/user/map', label: '地图', icon: Map },
  { path: '/user/cart', label: '购物车', icon: ShoppingCart, badge: true },
  { path: '/user/profile', label: '我的', icon: User },
];

export default function Navbar() {
  const { totalCount } = useCart();

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4"
      style={{
        height: '52px',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--divider)',
      }}
    >
      <Link to="/user/home" className="flex items-center gap-1">
        <span
          className="font-semibold"
          style={{ fontSize: '18px', color: 'var(--text-primary)' }}
        >
          神州丰采
        </span>
      </Link>
      <nav className="flex items-center gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className="relative flex items-center gap-1 rounded-full px-2 py-1 active:scale-[0.96]"
              style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                transition: 'transform 100ms',
              }}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{link.label}</span>
              {link.badge && totalCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
