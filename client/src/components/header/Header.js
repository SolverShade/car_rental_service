import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <div class="header">
        <img src="/black_logo.png" alt="Icon" style={{ marginRight: '10px' }} />
        <a href="#home" class="logo">Car Rental Service</a>
        <div class="header-right">
          <a class="active" href="/">HOME</a>
          <a href="#contact">LOCATIONS</a>
          <a href="#vehicles">VEHICLES</a>
          <a href="#signup">SIGN UP</a>
          <a href="#login">LOG IN</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
