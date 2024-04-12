import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './login';
import Signup from './signup';
import Home from './Home';
import Profile from './profile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
