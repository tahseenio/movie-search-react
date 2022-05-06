import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/:id' element={<MovieDetail />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
