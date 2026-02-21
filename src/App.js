import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Registration from './Registration';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/registration">Registration</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
