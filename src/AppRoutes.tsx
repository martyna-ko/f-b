import { Route, Routes } from 'react-router';
import { AdultsPage } from './pages/AdultsPage';
import { EventsPage } from './pages/EventsPage';
import { FamilyPage } from './pages/FamilyPage';
import { HomePage } from './pages/HomePage';
import { KidsPage } from './pages/KidsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PricingPage } from './pages/PricingPage';
import { SchedulePage } from './pages/SchedulePage';
import { VisitPage } from './pages/VisitPage';
import { Layout } from './sections/Layout';

/** Page routes from docs/ia/sitemap.md. English at "/", Polish at "/pl". */
const pages = (
  <>
    <Route index element={<HomePage />} />
    <Route path="kids" element={<KidsPage />} />
    <Route path="family" element={<FamilyPage />} />
    <Route path="adults" element={<AdultsPage />} />
    <Route path="schedule" element={<SchedulePage />} />
    <Route path="pricing" element={<PricingPage />} />
    <Route path="events" element={<EventsPage />} />
    <Route path="visit" element={<VisitPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </>
);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/pl" element={<Layout />}>
        {pages}
      </Route>
      <Route path="/" element={<Layout />}>
        {pages}
      </Route>
    </Routes>
  );
}
