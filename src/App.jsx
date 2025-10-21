import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from '@/routes/Login.jsx';
import Home from '@/routes/Home.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navigate to='/' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
