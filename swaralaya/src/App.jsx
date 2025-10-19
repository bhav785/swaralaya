import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Indexpg from './pages/Indexpg';
import Homepg from './pages/Homepg';
import Listpg from './pages/Listpg';
function App() {
  return (
    <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Indexpg/>} />
      <Route path="/home" element={<Homepg />} />
      <Route path="/lists" element={<Listpg />} />
    </Routes>
    </Router>
  );
}

export default App
