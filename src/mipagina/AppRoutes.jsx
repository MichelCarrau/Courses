import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from './Contact/Contact';
import About from './about/About';
import NasaImageSearch from '../Components/NasaImageSearch';
import NasaImageDetails from '../Components/NasaImageDetails';
import NotFound from './Notfound';
import PageDash from './dash/PageDash';
import PageTrading from './dash/PageTrading';
import DetallesDash from './dash/DetallesDash';
import Info from '../Components/info/info';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/images" element={<NasaImageSearch />} />
      <Route path="/imageDetails/:nasaId" element={<NasaImageDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dash" element={<PageDash />} />
      <Route path="/dash/:id" element={<DetallesDash />} />
      <Route path="/dash/trading" element={<PageTrading />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
}