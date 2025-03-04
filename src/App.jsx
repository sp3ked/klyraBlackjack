import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages
import Home from './pages/Home';
import Blackjack from './pages/Blackjack';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blackjack" element={<Blackjack />} />
        <Route path="/roulette" element={<ComingSoon />} />
        <Route path="/slots" element={<ComingSoon />} />
        <Route path="/poker" element={<ComingSoon />} />
        <Route path="/promotions" element={<ComingSoon />} />
        <Route path="/about" element={<ComingSoon />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
}

export default App;