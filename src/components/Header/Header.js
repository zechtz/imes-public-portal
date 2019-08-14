import React from 'react';
import './Header.css';

// A Stateless Functional Component
const Header = ({ appName }) => {
  console.log('MuunganoHeader-Rendered');
  return (
    <div className="imes-header-component">
      <h4>{appName}</h4>
    </div>
  )
}

export default Header;
