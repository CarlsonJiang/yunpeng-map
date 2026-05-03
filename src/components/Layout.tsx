import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showBottomNav?: boolean;
  showFooter?: boolean;
}

export default function Layout({
  children,
  showNav = true,
  showBottomNav = true,
  showFooter = false,
}: LayoutProps) {
  return (
    <div className="mx-auto min-h-[100dvh] max-w-mobile bg-[var(--bg-page)] shadow-xl">
      {showNav && <Navbar />}
      <main
        className="relative"
        style={{
          paddingBottom: showBottomNav ? 'calc(56px + env(safe-area-inset-bottom))' : undefined,
        }}
      >
        {children}
      </main>
      {showFooter && <Footer />}
      {showBottomNav && <BottomNav />}
    </div>
  );
}
