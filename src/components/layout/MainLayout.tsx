import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '../common/ScrollToTop';

export const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] dark:bg-[#0A0E12] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <div key={location.pathname} className="page-transition-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
