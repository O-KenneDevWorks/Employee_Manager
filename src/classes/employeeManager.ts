import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

class EmployeeManager {

  // ========================================================================================================
  // Employee Functions: START
  // Function to get all employees
  async getEmployees() {
    const res = await pool.query('SELECT * FROM employees');
    return res.rows;
  }

  async getEmployeeById(employeeId: number) {
    const res = await pool.query('SELECT * FROM employees WHERE id = $1', [employeeId]);
    return res.rows;
  }

  // Function to get all employees by manager
  async getEmployeesByManager(managerId: number) {
    const res = await pool.query('SELECT * FROM employees WHERE manager_id = $1', [managerId]);
    return res.rows;
  }

  // Function to get employees by department ID
  async getEmployeesByDepartment(departmentId: number) {
    const query = `
      SELECT e.*, r.title
      FROM employees e
      JOIN roles r ON e.role_id = r.id
      WHERE r.department_id = $1`;
    const res = await pool.query(query, [departmentId]);
    return res.rows;
  }

  // Function to add a new employee
  async addEmployee(firstName: string, lastName: string, role_id: number, manager_id: number | null) {
    const res = await pool.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, role_id, manager_id]
    );
    return res.rows[0];
  }

  // Function to update an employee's role
  async updateEmployeeRole(employeeId: number, newRoleId: number) {
    const res = await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *', [
      newRoleId,
      employeeId,
    ]);
    return res.rows[0];
  }

  // Function to update an employee's manager
  async updateEmployeeManager(employeeId: number, newManagerId: number | null) {
    const res = await pool.query(
      'UPDATE employees SET manager_id = $1 WHERE id = $2 RETURNING *',
      [newManagerId, employeeId]
    );
    return res.rows[0];
  }


  // Function to delete an employee
  async deleteEmployee(employeeId: number) {
    const res = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [employeeId]);
    return res.rows[0];
  }
  // Employee Functions: END
  // ========================================================================================================

  // ========================================================================================================
  // Department Functions: START
  // Function to get all departments
  async getDepartments() {
    const res = await pool.query('SELECT * FROM departments');
    return res.rows;
  }

  // Function to add a new department
  async addDepartment(departmentName: string): Promise<void> {
    try {
      const query = 'INSERT INTO departments (name) VALUES ($1)';
      await pool.query(query, [departmentName]);
      console.log(`Department '${departmentName}' added.`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error inserting department into database:', error.message);
      } else {
        console.error('Unknown error occurred:', error);
      }
      throw error;
    }
  }

  // Function to delete a department
  async deleteDepartment(departmentId: number) {
    const res = await pool.query('DELETE FROM departments WHERE id = $1 RETURNING *', [departmentId]);
    return res.rows[0];
  }
  // Department Functions: END
  // ========================================================================================================

  // ========================================================================================================
  // Role Functions: START
  // Function to get all roles
  async getRoles() {
    const res = await pool.query('SELECT * FROM roles');
    return res.rows;
  }

  // Function to add a new role
  async addRole(title: string, salary: number, department_id: number) {
    const res = await pool.query(
      'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
      [title, salary, department_id]
    );
    return res.rows[0];
  }
  // Function to delete a role
  async deleteRole(roleId: number) {
    const res = await pool.query('DELETE FROM roles WHERE id = $1 RETURNING *', [roleId]);
    return res.rows[0];
  }

  // Role Functions: END
  // ========================================================================================================

  // Function to get the total utilized budget of a department
  async getTotalDepartmentBudget(departmentId: number) {
    const query = `
      SELECT SUM(r.salary) AS total_budget
      FROM employees e
      JOIN roles r ON e.role_id = r.id
      WHERE r.department_id = $1`;
    const res = await pool.query(query, [departmentId]);
    return res.rows[0].total_budget;
  }
}

export default EmployeeManager;
