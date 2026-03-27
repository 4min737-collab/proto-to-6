import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import WireframeV1 from './pages/WireframeV1';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/v1" element={<WireframeV1 />} />
      </Routes>
    </BrowserRouter>
  );
}
