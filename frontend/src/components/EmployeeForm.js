import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import './EmployeeForm.css';
import axios from 'axios';


function EmployeeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birthDate: '',
    employeeNumber: '',
    salary: '',
    role: '',
    reportingLineManager: '',
    email: '',
    profilePhoto: null,
  });

  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      surname: '',
      birthDate: '',
      employeeNumber: '',
      salary: '',
      role: '',
      reportingLineManager: '',
      email: '',
      profilePhoto: null,
    });
  };

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;

      if (name === 'profilePhoto') {
        // Handle file input separately
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          setFormData({
            ...formData,
            [name]: reader.result, // base64 string
          });
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      } else {
        // Handle other inputs
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };

  // ... (imports and other code)

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.surname === '') {
    setError('Surname cannot be empty');
    return;
  }

  if (formData.email === '') {
    setError('Email cannot be empty');
    return;
  }

  
  try {
    const response = await axios.post('http://localhost:4000/Employee/employees', formData);

    console.log(`Response from server: ${response.data}`);

    // Display success message
    alert('Successfully submitted!');

    // Reset the form after successful submission
    resetForm();
  } catch (error) {
    console.error('Error saving employee:', error);
    setError('Internal Server Error');
  }
};

// ... (rest of the component code)

 
  

  return (
    <div className='container'>
      <div className='form-container'>
        <h2 className='addDel'>Add Employee</h2>
        <form  encType="multipart/form-data"> {/* Add enctype for file uploads */}
          {/* Name */}
          <label>
             Name:
             <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
           </label>

          {/* Surname */}
          <label>
            Surname:
            <input type="text" id='surname' name="surname" value={formData.surname} onChange={handleChange} required />
          </label>

          {/* Birth Date */}
          <label>
            Birth Date:
            <DatePicker
              selected={formData.birthDate}
              onChange={(date) => handleChange({ target: { name: 'birthDate', value: date } })}
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              showMonthDropdown
              placeholderText="Select a date"
            />
          </label>

          {/* Employee Number */}
          <label>
            Employee Number:
            <input type="text" id='employeeNumber' name="employeeNumber" value={formData.employeeNumber} onChange={handleChange} required />
          </label>

          {/* Salary */}
          <label>
            Salary:
            <input type="text" id='salary' name="salary" value={formData.salary} onChange={handleChange} required />
          </label>

          {/* Role */}
          <label>
            Role:
            <input type="text" id='role' name="role" value={formData.role} onChange={handleChange} required />
          </label>

          {/* Reporting Line Manager */}
          <label>
            Reporting Line Manager:
            <input type="text" id='reportingLineManager' name="reportingLineManager" value={formData.reportingLineManager} onChange={handleChange} />
          </label>

          {/* Email */}
          <label>
            Email:
            <input type="email" id='email' name="email" value={formData.email} onChange={handleChange} required />
          </label>

          {/* Profile Photo */}
          <label>
            Profile Photo:
            <input type="file" id='profilePhoto' name="profilePhoto" accept="image/*" onChange={handleChange} />
          </label>

                      {/* Display file name */}
                {formData.profilePhoto && (
         <div className="file-name">{formData.profilePhoto.name}</div>
            )}

          <Gravatar email={formData.email} size={100} />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;

