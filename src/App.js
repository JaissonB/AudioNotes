import './App.css';
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastre from './pages/Cadastre';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cadastre' element={<Cadastre />} />
      </Routes>
    </div>
  );
}

export default App;