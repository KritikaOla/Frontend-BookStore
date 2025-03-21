import React from 'react';
import Navbar from './components/Navbar';
import Books from './pages/Books';
import Cart from './pages/Cart';
import Manga from './pages/Manga';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/signup';
import Payment from './pages/payment';
import Result from './pages/Result';
import Toolbar from '@mui/material/Toolbar';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './Store/CartContext'; 

// console.log('Navbar:', Navbar);


function App() {
  return (
    <CartProvider>
      <>
        <Navbar />
        <Toolbar /> 
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </CartProvider>
  );
}

export default App;
