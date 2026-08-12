import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { SiteFooter } from './components/SiteFooter';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

export default function App() {
  return (
    <>
      <div className="u-grain" aria-hidden="true" />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <SiteFooter />
    </>
  );
}
