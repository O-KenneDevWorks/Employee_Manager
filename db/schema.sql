DROP DATABASE IF EXISTS empmgr_db;

CREATE DATABASE empmgr_db;

\c empmgr_db;

-- department
-- id: SERIAL PRIMARY KEY
-- name: VARCHAR(30) UNIQUE NOT NULL to hold department name
CREATE TABLE departments (
    id SERIAL  PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- role
-- id: SERIAL PRIMARY KEY
-- title: VARCHAR(30) UNIQUE NOT NULL to hold role title
-- salary: DECIMAL NOT NULL to hold role salary
-- department_id: INTEGER NOT NULL to hold reference to department role belongs to
CREATE TABLE roles (
    id SERIAL  PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- employee
-- id: SERIAL PRIMARY KEY
-- first_name: VARCHAR(30) NOT NULL to hold employee first name
-- last_name: VARCHAR(30) NOT NULL to hold employee last name
-- role_id: INTEGER NOT NULL to hold reference to employee role
-- manager_id: INTEGER to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
CREATE TABLE employees (
    id SERIAL  PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
