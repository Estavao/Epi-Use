const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a data schema
const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String },
  birthDate: { type: Date },
  employeeNumber: { type: Number },
  salary: { type: Number },
  role: { type: String },
  reportingLineManager: { type: String },
  email: { type: String },
  profilePhoto: { type: Buffer }, // Use Buffer type for binary data like images
  entryDate: { type: Date, default: Date.now },
});

const Employees = mongoose.model('Employees', EmployeeSchema, 'Employees');
const mySchemas = { 'Employees': Employees };

module.exports = mySchemas;
