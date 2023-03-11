import React, { Component } from 'react';
import Navigation from './Navigation';
// import logo from '../../src/logo.jpg';

const Header = () => {
  return (
    <div className='header-container'>
      <div className='logo-con'>
        {/* <img src={logo} className='link-logo' alt='logo' /> */}
      </div>
      <Navigation className='header-bar' />
    </div>
  );
};

export default Header;
