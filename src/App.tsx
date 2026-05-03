import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import EntryPage from '@/pages/EntryPage';
import HomePage from '@/pages/HomePage';
import ContentDetailPage from '@/pages/ContentDetailPage';
import ExplorePage from '@/pages/ExplorePage';
import MapPage from '@/pages/MapPage';
import ProvinceDetailPage from '@/pages/ProvinceDetailPage';
import CityDetailPage from '@/pages/CityDetailPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import OrderConfirmPage from '@/pages/OrderConfirmPage';
import ProfilePage from '@/pages/ProfilePage';
import MerchantDashboard from '@/pages/MerchantDashboard';
import MerchantContent from '@/pages/MerchantContent';
import ContentEditor from '@/pages/ContentEditor';
import ContentAnalytics from '@/pages/ContentAnalytics';
import PartnerDashboard from '@/pages/PartnerDashboard';
import AdminContentReview from '@/pages/AdminContentReview';

export default function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<EntryPage />} />

          <Route path="/user/home" element={<HomePage />} />
          <Route path="/user/content/:id" element={<ContentDetailPage />} />
          <Route path="/user/explore" element={<ExplorePage />} />
          <Route path="/user/map" element={<MapPage />} />
          <Route path="/user/province/:provinceId" element={<ProvinceDetailPage />} />
          <Route path="/user/city/:cityId" element={<CityDetailPage />} />
          <Route path="/user/product/:id" element={<ProductDetailPage />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/user/order-confirm" element={<OrderConfirmPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />

          <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
          <Route path="/merchant/content" element={<MerchantContent />} />
          <Route path="/merchant/content/edit/:id" element={<ContentEditor />} />
          <Route path="/merchant/content/analytics" element={<ContentAnalytics />} />

          <Route path="/partner/dashboard" element={<PartnerDashboard />} />

          <Route path="/admin/content" element={<AdminContentReview />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </CartProvider>
  );
}
