import express from 'express';
import EmployeeManager from '../classes/employeeManager.js';

const app = express();
const PORT = process.env.PORT || 3001;
const employeeManager = new EmployeeManager();

// Middleware
app.use(express.json());

// Example route to get all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await employeeManager.getEmployees();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Example route to add a new department
app.post('/department', async (req, res) => {
  const { name } = req.body;
  try {
    const department = await employeeManager.addDepartment(name);
    res.json(department);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
