-- Seed the departments table
INSERT INTO departments (name)
VALUES
    ('Engineering'),
    ('Human Resources'),
    ('Marketing'),
    ('Finance');

-- Seed the roles table
INSERT INTO roles (title, salary, department_id)
VALUES
    ('Software Engineer', 90000, (SELECT id FROM departments WHERE name = 'Engineering')),
    ('HR Specialist', 60000, (SELECT id FROM departments WHERE name = 'Human Resources')),
    ('Marketing Manager', 85000, (SELECT id FROM departments WHERE name = 'Marketing')),
    ('Accountant', 70000, (SELECT id FROM departments WHERE name = 'Finance'));

-- Seed the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', (SELECT id FROM roles WHERE title = 'Software Engineer'), NULL),
    ('Jane', 'Smith', (SELECT id FROM roles WHERE title = 'HR Specialist'), NULL),
    ('Alice', 'Johnson', (SELECT id FROM roles WHERE title = 'Marketing Manager'), NULL),
    ('Bob', 'Williams', (SELECT id FROM roles WHERE title = 'Accountant'), NULL),
    ('Tom', 'Brown', (SELECT id FROM roles WHERE title = 'Software Engineer'), 1),
    ('Sara', 'Davis', (SELECT id FROM roles WHERE title = 'HR Specialist'), 2);
