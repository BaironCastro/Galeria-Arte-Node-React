import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Artistas from "./pages/Artistas";
import Obras from "./pages/Obras";
import Exposiciones from "./pages/Exposiciones";
import ObrasExpuestas from "./pages/ObrasExpuestas";



function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-primary px-3 mb-4 shadow-sm">
        <Link to="/" className="navbar-brand fw-bold text-white">
          Galería de Arte
        </Link>
        <div className="ms-auto">
          <Link to="/artistas" className="nav-link d-inline px-3 text-white">
            Artistas
          </Link>
          <Link to="/obras" className="nav-link d-inline px-3 text-white">
            Obras
          </Link>
          <Link to="/exposiciones" className="nav-link d-inline px-3 text-white">
            Exposiciones
          </Link>
          <Link to="/obras-expuestas" className="nav-link d-inline px-3 text-white">
            Obras Expuestas
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
        <h1 className="text-center mt-5">Bienvenido a la Galería</h1>
        } />

        <Route path="/artistas" element={<Artistas />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/exposiciones" element={<Exposiciones />} />
        <Route path="/obras-expuestas" element={<ObrasExpuestas />} />
      </Routes>

      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
