import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdSection } from './components/common/AdSection';
import { QuickViewModal } from './components/common/QuickViewModal';
import { BookFittingModal } from './components/common/BookFittingModal';
import { SearchModal } from './components/common/SearchModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RunwayPage } from './pages/RunwayPage';
import { AtelierPage } from './pages/AtelierPage';
import { BespokePage } from './pages/BespokePage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { WishlistPage } from './pages/WishlistPage';
import { BagPage } from './pages/BagPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/runway" element={<RunwayPage />} />
              <Route path="/atelier" element={<AtelierPage />} />
              <Route path="/bespoke" element={<BespokePage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/bag" element={<BagPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Base Ad Section on every page as requested */}
          <AdSection />

          <Footer />

          {/* Interactive Global Modals */}
          <QuickViewModal />
          <BookFittingModal />
          <SearchModal />
          <ToastContainer />
        </div>
      </HashRouter>
    </AppProvider>
  );
}
