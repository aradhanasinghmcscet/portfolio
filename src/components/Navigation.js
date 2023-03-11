import React from 'react';

import { NavLink, Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  // Jumbotron,
  // Grid,
  // Row,
  // Col,
  // Image,
  // Button
} from 'react-bootstrap';
import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navigation = () => {
  return (
    <div>
      <AppBar position='static'>
        <Typography variant='title' color='inherit'>
          <Navbar bg='dark' expand='lg' className='site-title'>
            <Navbar.Brand href='#home' className='brand'>
              Aradhana Singh{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='absic-navbar-nav'>
              <Nav className='mr-auto'>
                <NavLink className='link-item' to='/'>
                  Home
                </NavLink>
                <NavLink className='link-item' to='/about'>
                  About
                </NavLink>
                <NavLink className='link-item' to='/blog'>
                  Projects
                </NavLink>
                {/* <NavLink className='link-item' to='/blog'>
                  Blog
                </NavLink>
                <NavLink className='link-item' to='/portfolio'>
                  Portfolio
                </NavLink> */}
                <NavLink className='link-item' to='/contact'>
                  Contact
                </NavLink>
                {/* <NavLink className='link-item' to='/todo'>
                  ToDo List
                </NavLink> */}
                {/* <NavLink>
                <div class="sharethis-inline-follow-buttons"></div>
                </NavLink> */}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Typography>
      </AppBar>
    </div>
  );
};

export default Navigation;
