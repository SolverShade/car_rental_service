import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer footer-content">
      <div className="row">
        <p></p>
        <img
          src="/white_logo.png"
          alt="Icon"
          style={{ width: '4em', height: '3em' }}
        />
        <p></p>
        <p>Links</p>
        <div className="links">
          <a class="active" href="#home">Home</a>
          <a href="#contact">Locations</a>
          <a href="#vehicles">Vehicles</a>
          <a href="#signup">Sign Up</a>
          <a href="#login">Log In</a>
        </div>
      </div>
    </div >
  );
}

export default Footer;
