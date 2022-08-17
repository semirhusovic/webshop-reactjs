import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Layout/Header';
import { CartProvider } from './Contexts/CartContext';
import { AuthContextProvider } from './Contexts/AuthContext';
import Login from './Components/Auth/Login';
import Homepage from './Components/Layout/Homepage';
import Cart from './Components/Cart';
import SingleItemPage from './Components/Layout/SingleItemPage';
import { ToastContainer } from 'react-toastify';
import Register from './Components/Auth/Register';
import Checkout from './Components/Layout/Checkout';


function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <Router>
          <Header>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<SingleItemPage />} />
            </Routes>
            <ToastContainer autoClose={8000} />
          </Header>
        </Router>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App;
