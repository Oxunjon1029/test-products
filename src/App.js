import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
