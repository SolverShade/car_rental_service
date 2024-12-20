import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import CustomerManagement from './pages/CustomerManagementPage/CustomerManagementPage'
import Rental from './pages/RentalPage/Rental'
import ViewCars from './pages/ViewCarsPage/ViewCars'
import CarManagement from './pages/CarManagePage/CarManagement'
import StaffPortal from './pages/StaffPortalPage/StaffPortal'
import ReservationManagement from './pages/ReservationManagement/ReservationManagement'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function App() {
  return (
    <Router>
      <Header />
      <NotificationContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/view_cars" element={<ViewCars />} />
        <Route path="/customer_management" element={<CustomerManagement />} />
        <Route path="/staff_portal" element={<StaffPortal />} />
        <Route path="/manage_cars" element={<CarManagement />} />
        <Route path="/reservation_management" element={<ReservationManagement />} />
      </Routes>
      <Footer />
    </Router>
  )
}



