import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import CustomerManagement from './pages/CustomerManagementPage/CustomerManagementPage'
import Rental from './pages/RentalPage/Rental'
import ViewCars from './pages/ViewCarsPage/ViewCars'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/view_cars" element={<ViewCars />} />
        <Route path="/customer_management" element={<CustomerManagement />} />
      </Routes>
      <Footer />
    </Router>
  )
}



