import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** Scrolls to the top and moves focus to the main content after each page change (accessibility). */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const main = document.getElementById('main');
    if (main && document.activeElement !== document.body) main.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
