import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures that whenever the customer navigates to another page/route,
 * the window and primary scrollable containers smoothly reset to top without jarring jumps.
 * If a hash anchor is present (e.g. #faq), it smoothly scrolls to that target.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // If an anchor hash is provided, attempt to scroll to that element
    if (hash) {
      const elementId = hash.replace(/^#/, '');
      const element = document.getElementById(elementId) || document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const pathChanged = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (pathChanged || window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      const mainContainers = document.querySelectorAll<HTMLElement>(
        'main, [data-scroll-container]'
      );
      mainContainers.forEach((container) => {
        if (container.scrollTop > 0) {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }, [pathname, search, hash]);

  // Smooth scroll to top when clicking links that point to the current page (e.g. Logo, active navigation items)
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      if (href === pathname || href === '#' || href === `${pathname}#` || href === '/') {
        if (window.scrollY > 0) {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
