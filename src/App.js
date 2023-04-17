import './App.css';

import {
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home';
// import About from './About';
// import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Componente da tela inicial */}
        <Route index element={<Home />} />
        {/* Componente de uma rota específica */}
        {/* <Route path="about" element={<About />} /> */}
        {/* Componente para quando não encontrar uma rota */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;