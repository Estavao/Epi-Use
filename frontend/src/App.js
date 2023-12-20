import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EmployeeForm from './components/EmployeeForm';
import EmployeeHierarchy from './components/EmployeeHierarchy';



import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/EmployeeForm" element={<EmployeeForm />} />
          <Route path="/EmployeeHierachy" element={<EmployeeHierarchy />} />
          
        
        </Routes>
      </Router>
    </>
  );
}



export default App;

