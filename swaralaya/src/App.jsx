import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Indexpg from './pages/Indexpg';

function App() {
  return (
    <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Indexpg/>} />
      <Route path="/home" element={<div>Home Page</div>} />
      <Route path="/lists" element={<div>Lists Page</div>} />
    </Routes>
    </Router>
  );
}

export default App
