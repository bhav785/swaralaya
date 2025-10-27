import { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseclient';
import Indexpg from './pages/Indexpg';
import Homepg from './pages/Homepg';
import Listpg from './pages/Listpg';
import Login from './pages/login';
import AddSong from './components/AddSong';

// Wrap everything in a component that has access to useNavigate
function AppRoutes() {
  const navigate = useNavigate();

useEffect(() => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      // Redirect only if you’re on /login or /
      const currentPath = window.location.pathname;
      if (currentPath === '/') {
        navigate('/home');
      }
    } else if (event === 'SIGNED_OUT') {
      navigate('/');
    }
  });

  return () => subscription.unsubscribe();
}, [navigate]);


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/index" element={<Indexpg />} />
      <Route path="/home" element={<Homepg />} />
      <Route path="/lists" element={<Listpg />} />
      <Route path="/addsong" element={<AddSong />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
