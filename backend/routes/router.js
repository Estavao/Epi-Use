const express = require('express');
const router = express.Router();
const multer = require('multer');
const schemas = require('../models/schemas');

router.get('/getEmployees', async (req, res) => {
  try {
    const data = await schemas.Employees.find();
    res.json(data);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/employees', async (req, res) => {
  
    const EmpData = {
      name: name,
      surname: surname,
      birthDate: birthDate,
      employeeNumber:employeeNumber,
      salary: salary,
      role: role,
      reportingLineManager: reportingLineManager,
      email: email,
      profilePhoto: profilePhoto,
    } = req.body;

    const newEmployee = new schemas.Employees(EmpData)
    const saveEmployee = await newEmployee.save();
   

    if (saveEmployee) {
      res.send('message sent.Thak you.')
    }
    res.end()
});



router.put('/employees/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const newData = req.body;

    const updatedEmployee = await schemas.Employees.findOneAndUpdate(
      { name },
      { $set: newData },
      { new: true }
    );

    if (updatedEmployee) {
      res.json({ status: 'ok', data: 'Employee updated successfully' });
    } else {
      res.status(404).json({ status: 'error', data: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ status: 'error', data: 'Internal Server Error' });
  }
});


router.post('/DelEmployees', async (req, res) => {
  try {
    const { userid } = req.body;

    // Attempt to find and delete the employee by ID
    const deletedEmployee = await schemas.Employees.findByIdAndDelete(userid);

    if (deletedEmployee) {
      // If the employee is found and deleted, respond with success
      res.json({ status: 'ok', data: 'Deleted' });
    } else {
      // If the employee is not found, respond with a 404 error
      res.status(404).json({ status: 'error', data: 'Employee not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error('Error deleting employee:', error);
    res.status(500).json({ status: 'error', data: 'Internal Server Error' });
  }
});

module.exports = router;
