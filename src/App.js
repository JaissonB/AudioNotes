import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route index element={<Login />} /> */}
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;