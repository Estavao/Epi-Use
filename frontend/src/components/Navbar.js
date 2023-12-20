import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a separate CSS file

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className='Epi'>EPI-USE</h1>

          <div className="menu-icon">
            {/* Your menu icon content goes here */}
          </div>

          <ul className="navigation-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/EmployeeForm">EmployeeForm</Link></li>
            <li><Link to="/EmployeeHierachy">EmployeeHierachy</Link></li>
           
            
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
