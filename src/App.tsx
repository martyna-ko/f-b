import { BrowserRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';
import { ScrollToTop } from './sections/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
