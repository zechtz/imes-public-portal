import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './Header.css';

// A Stateless Functional Component
const Header = ({ appName }) => {
  console.log('MuunganoHeader-Rendered');
  return (
    <BrowserRouter>
      <div className="imes-header-component">
        <Link to="/"><h4>{appName}</h4></Link>
      </div>
    </BrowserRouter>
  )
}

export default Header;
