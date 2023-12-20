// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeHierachy.css';
import EmployeeForm from './EmployeeForm'; // Import the EmployeeForm component
import Gravatar from 'react-gravatar';
import Tree from 'react-d3-tree';

const EmployeeTable = ({ employees, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Define searchTerm state

  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.employeeNumber && employee.employeeNumber.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.reportingLineManager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
     <div className="search-section">
  <div className="search-container">
    <label htmlFor="search">Search:</label>
    <input
      type="text"
      id="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  {/* Your form components go here */}
</div>
      <table className='employee-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Employee Number</th>
            <th>Salary</th>
            <th>Role</th>
            <th>Reporting Line Manager</th>
            <th>Email</th>
            <th>Profile Photo</th> {/* Add a new column for Gravatar */}
            <th className='actions-th'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>{(employee.employeeNumber && employee.employeeNumber.toString()) || ''}</td>
              <td>{employee.salary}</td>
              <td>{employee.role}</td>
              <td>{employee.reportingLineManager}</td>
              <td>{employee.email}</td>
              <td>
                {/* Display Gravatar in the table */}
                <Gravatar email={employee.email} size={40} />
              </td>
              <td className='actions-th'>
                <button className='actions-button' onClick={() => onUpdate(employee)}>
                  Update
                </button>
                <button className='actions-button' onClick={() => onDelete(employee._id, employee.name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

// Main EmployeeHierarchy component
const EmployeeHierarchy = () => {
  // State variables
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [updateEmployee, setUpdateEmployee] = useState(null); // State to store the employee to update
  const [searchTerm, setSearchTerm] = useState(''); // Define searchTerm state
  const [treeData, setTreeData] = useState(null); // State to store tree data

  // Fetch employee data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch employee data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/Employee/getEmployees');
      setEmployees(response.data);

      // Create tree data from employee data for react-d3-tree
      const hierarchyData = createHierarchyData(response.data);
      setTreeData(hierarchyData);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Error fetching employees');
    }
  };

  // Update employee data
  const handleUpdate = async (employee) => {
    const { name, /* other properties you want to update */ } = employee;

    try {
      const response = await axios.put(`http://localhost:4000/Employee/employees/${name}`, {
        /* other properties you want to update */
      });
      console.log(response.data);
      fetchData(); // Refetch data after update
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Error updating employee');
    }
  };

  // Cancel the update operation
  const handleCancelUpdate = () => {
    setUpdateEmployee(null);
  };

  // Delete employee data
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      try {
        const response = await fetch('http://localhost:4000/Employee/DelEmployees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid: id,
          }),
        });

        const data = await response.json();
        alert(data.data);
        fetchData(); // Refetch data after delete
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    } else {
      // Handle cancellation or do nothing.
    }
  };

  // Create hierarchy data for react-d3-tree
  const createHierarchyData = (employees) => {
    // Implement your logic to create hierarchy data from employees
    // For example, you might have a manager property in each employee
    // indicating the manager's name or ID.
    // The react-d3-tree library requires data in a specific format.

    // Example: Replace this with your actual logic
    const hierarchyData = {
      name: 'CEO',
      children: employees.map((employee) => ({
        name: employee.name,
        attributes: {
          surname: employee.surname,
          employeeNumber: employee.employeeNumber,
          role: employee.role,
          reportingLineManager: employee.reportingLineManager,
          email: employee.email,
        },
      })),
    };

    return hierarchyData;
  };

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner' style={{ width: 'auto' }}>
        <h1 className='EmpD'>Employee Details</h1>

        {updateEmployee ? (
          <EmployeeForm
            employee={updateEmployee}
            onCancel={handleCancelUpdate}
            onUpdate={fetchData}
          />
        ) : (
          <>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {/* Render EmployeeTable component */}
            <EmployeeTable
              employees={employees}
              onUpdate={handleUpdate}
              onDelete={(id, name) => handleDelete(id, name)}
            />

            {/* Render react-d3-tree component */}
            {treeData && (
              <div style={{ width: '100%', height: '500px' }}>
                <Tree data={treeData} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Export the EmployeeHierarchy component
export default EmployeeHierarchy;