// Importing classes and necessary modules
import inquirer from 'inquirer';
import EmployeeManager from './employeeManager.js';

// Define the Cli class
class Cli {
    exit: boolean = false;
    employeeManager: EmployeeManager;

    constructor() {
        this.employeeManager = new EmployeeManager(); // Initialize the EmployeeManager for DB operations
    }

    // Method to perform actions on the selected option
    performActions(): void {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Select an action',
                    choices: [
                        "view all departments",
                        "view all roles",
                        "view all employees",
                        "view employees by manager",
                        "view employees by department",
                        "view total department budget",
                        "add a department",
                        "add a role",
                        "add an employee",
                        "update an employee role",
                        "update an employee manager",
                        "delete a department",
                        "delete a role",
                        "delete an employee",
                        "exit",
                    ],
                },
            ])
            .then(async (answers: any) => {
                // Perform the selected action
                switch (answers.action) {
                    case 'view all departments':
                        await this.viewAllDepartments();
                        break;

                    case 'view all roles':
                        await this.viewAllRoles();
                        break;

                    case 'view all employees':
                        await this.viewAllEmployees();
                        break;

                    case 'view employees by manager':
                        await this.viewEmployeesByManager();
                        break;

                    case 'view employees by department':
                        await this.viewEmployeesByDepartment();
                        break;

                    case 'view total department budget':
                        await this.viewTotalDepartmentBudget();
                        break;

                    case 'add a department':
                        await this.addDepartment();
                        break;

                    case 'add a role':
                        await this.addRole();
                        break;

                    case 'add an employee':
                        await this.addEmployee();
                        break;

                    case 'update an employee role':
                        await this.updateEmployeeRole();
                        break;

                    case 'update an employee manager':
                        await this.updateEmployeeManager();
                        break;

                    case 'delete a department':
                        await this.deleteDepartment();
                        break;

                    case 'delete a role':
                        await this.deleteRole();
                        break;

                    case 'delete an employee':
                        await this.deleteEmployee();
                        break;

                    case 'exit':
                        this.exit = true;
                        break;

                    default:
                        console.log('Invalid option selected');
                        break;
                }

                if (!this.exit) {
                    this.performActions();
                }
            });
    }


    // Method to view all departments
    async viewAllDepartments(): Promise<void> {
        const departments = await this.employeeManager.getDepartments();
        if (departments.length > 0) {
            console.table(departments);
        } else {
            console.log('No departments found.');
            const { addDepartment } = await inquirer.prompt({
                type: 'confirm',
                name: 'addDepartment',
                message: 'No departments found. Would you like to add a new department?',
            });
            if (addDepartment) {
                await this.addDepartment(); // Call the method to add a department
            }
        }
    }

    // Method to view all roles
    async viewAllRoles(): Promise<void> {
        const roles = await this.employeeManager.getRoles();
        if (roles.length > 0) {
            console.table(roles);
        } else {
            console.log('No roles found.');
            const { addRole } = await inquirer.prompt({
                type: 'confirm',
                name: 'addRole',
                message: 'No roles found. Would you like to add a new role?',
            });
            if (addRole) {
                await this.addRole(); // Call the method to add a role
            }
        }
    }

    // Method to view all employees
    async viewAllEmployees(): Promise<void> {
        const employees = await this.employeeManager.getEmployees();
        if (employees.length > 0) {
            console.table(employees);
        } else {
            console.log('No employees found.');
            const { addEmployee } = await inquirer.prompt({
                type: 'confirm',
                name: 'addEmployee',
                message: 'No employees found. Would you like to add a new employee?',
            });
            if (addEmployee) {
                await this.addEmployee(); // Call the method to add an employee
            }
        }
    }

    // Method to view employees by manager
    async viewEmployeesByManager(): Promise<void> {
        const { managerId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the manager ID:',
                validate: (input: string) => {
                    // Ensure a valid manager ID is provided
                    if (!isNaN(parseInt(input))) {
                        return true;
                    }
                    return 'Please enter a valid Manager ID';
                },
            },
        ]);

        // Step 1: Check if the manager exists
        const managerExists = await this.employeeManager.getEmployeeById(parseInt(managerId));

        if (!managerExists) {
            // Step 2: If no manager with the given ID exists, prompt to view employees
            console.log(`No manager found with ID '${managerId}'`);

            const { viewEmployees } = await inquirer.prompt({
                type: 'confirm',
                name: 'viewEmployees',
                message: 'Would you like to view all employees?',
            });

            if (viewEmployees) {
                await this.viewAllEmployees(); // Call method to view all employees
            }
        } else {
            // Step 3: Check if the manager has any subordinates
            const subordinates = await this.employeeManager.getEmployeesByManager(parseInt(managerId));

            if (subordinates.length === 0) {
                console.log(`Manager with ID '${managerId}' exists but has no subordinates.`);

                const { addEmployee } = await inquirer.prompt({
                    type: 'confirm',
                    name: 'addEmployee',
                    message: 'Would you like to add a new employee under this manager?',
                });

                if (addEmployee) {
                    await this.addEmployee(); // Call method to add a new employee
                }
            } else {
                console.table(subordinates); // Display subordinates if they exist
            }
        }
    }

    // Method to view employees by department
    async viewEmployeesByDepartment(): Promise<void> {
        const { departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID:',
                validate: (input: string) => {
                    if (!isNaN(parseInt(input))) {
                        return true;
                    }
                    return 'Please enter a valid department ID';
                },
            },
        ]);

        const employees = await this.employeeManager.getEmployeesByDepartment(parseInt(departmentId));
        if (employees.length > 0) {
            console.table(employees);
        } else {
            console.log(`No employees found in department ID '${departmentId}'.`);
            const { addEmployee } = await inquirer.prompt({
                type: 'confirm',
                name: 'addEmployee',
                message: 'No employees found in this department. Would you like to add a new employee?',
            });
            if (addEmployee) {
                await this.addEmployee(); // Call the method to add an employee
            }
        }
    }

    // Method to view total budget of a department
    async viewTotalDepartmentBudget(): Promise<void> {
        const { departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID:',
                validate: (input: string) => {
                    if (!isNaN(parseInt(input))) {
                        return true;
                    }
                    return 'Please enter a valid department ID';
                },
            },
        ]);

        const totalBudget = await this.employeeManager.getTotalDepartmentBudget(parseInt(departmentId));
        if (totalBudget) {
            console.log(`Total utilized budget for department ID '${departmentId}' is: ${totalBudget}`);
        } else {
            console.log(`No department found with ID '${departmentId}' or the department has no associated budget.`);
            const { addDepartment } = await inquirer.prompt({
                type: 'confirm',
                name: 'addDepartment',
                message: `Would you like to add a new department?`,
            });
            if (addDepartment) {
                await this.addDepartment(); // Call the method to add a department
            }
        }
    }

    // Method to add a department
    async addDepartment(): Promise<void> {
        const { departmentName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:',
                validate: (input: string) => input.trim() !== '' || 'Please enter a valid department name.',
            },
        ]);

        try {
            await this.employeeManager.addDepartment(departmentName);
            console.log(`Department '${departmentName}' added successfully.`);
        } catch (error) {
            console.error('Error inserting department into database:', error instanceof Error ? error.message : error);
        }
    }

    // Method to add a role
    async addRole(): Promise<void> {
        const { title, salary, departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:',
                validate: (input: string) => input.trim() !== '' || 'Please enter a valid role name.',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role:',
                validate: (input: string) => {
                    const salaryValue = parseFloat(input);
                    if (isNaN(salaryValue) || salaryValue <= 0) {
                        return 'Please enter a valid salary greater than 0.';
                    }
                    return true;
                },
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID for the role:',
                validate: async (input: string) => {
                    const departmentIdValue = parseInt(input);
                    if (isNaN(departmentIdValue) || departmentIdValue <= 0) {
                        return 'Please enter a valid department ID.';
                    }

                    // Check if the department exists
                    const departments = await this.employeeManager.getDepartments();
                    const departmentExists = departments.some(department => department.id === departmentIdValue);

                    if (!departmentExists) {
                        console.log('\nDepartment not found. Here is the list of available departments:');
                        console.table(departments);
                        return 'Please enter a valid department ID from the list above.';
                    }
                    return true;
                },
            },
        ]);

        // Add the role once all validations pass
        await this.employeeManager.addRole(title, parseFloat(salary), parseInt(departmentId));
        console.log(`Role '${title}' added with salary '${salary}' in department ID '${departmentId}'.`);
    }

    // Method to add an employee
    async addEmployee(): Promise<void> {
        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the employee\'s first name:',
                validate: (input: string) => input.trim() !== '' || 'Please enter a valid first name.',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the employee\'s last name:',
                validate: (input: string) => input.trim() !== '' || 'Please enter a valid last name.',
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'Enter the role ID for the employee:',
                validate: (input: string) => {
                    // Allow empty string (no manager) or a valid number for manager ID
                    if (!isNaN(Number(input))) {
                        return true;
                    }
                    return 'Please enter a valid role ID';
                }
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the manager ID for the employee (leave blank if none):',
                default: '',
                validate: (input: string) => {
                    // Allow empty string (no manager) or a valid number for manager ID
                    if (input === '' || !isNaN(Number(input))) {
                        return true;
                    }
                    return 'Please enter a valid manager ID or leave blank.';
                }
            }
        ]);

        // Parse managerId to `null` if it is an empty string, otherwise to a number
        const managerIdValue = managerId === '' ? null : parseInt(managerId, 10);

        await this.employeeManager.addEmployee(firstName, lastName, parseInt(roleId), managerIdValue);
        console.log(`Employee '${firstName} ${lastName}' added with role ID '${roleId}' and manager ID '${managerIdValue}'.`);
    }

    // Method to update an employee's role
    async updateEmployeeRole(): Promise<void> {
        const { employeeId, newRoleId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'Enter the employee ID to update:',
                validate: async (input: string) => {
                    const employeeIdValue = parseInt(input);
                    if (isNaN(employeeIdValue) || employeeIdValue <= 0) {
                        return 'Please enter a valid employee ID.';
                    }

                    // Check if the employee exists
                    const employees = await this.employeeManager.getEmployees();
                    const employeeExists = employees.some(employee => employee.id === employeeIdValue);

                    if (!employeeExists) {
                        console.log('\nEmployee not found. Would you like to add a new employee?');
                        const { addEmployee } = await inquirer.prompt({
                            type: 'confirm',
                            name: 'addEmployee',
                            message: 'Add new employee?',
                        });
                        if (addEmployee) {
                            await this.addEmployee(); // Call the method to add a new employee
                        }
                        return false; // Stop further execution if no valid employee
                    }

                    return true;
                },
            },
            {
                type: 'input',
                name: 'newRoleId',
                message: 'Enter the new role ID for the employee:',
                validate: async (input: string) => {
                    const roleIdValue = parseInt(input);
                    if (isNaN(roleIdValue) || roleIdValue <= 0) {
                        return 'Please enter a valid role ID.';
                    }

                    // Check if the role exists
                    const roles = await this.employeeManager.getRoles();
                    const roleExists = roles.some(role => role.id === roleIdValue);

                    if (!roleExists) {
                        console.log('\nRole not found. Here is the list of available roles:');
                        console.table(roles);
                        return 'Please enter a valid role ID from the list above.';
                    }

                    return true;
                },
            },
        ]);

        // Update the employee's role once all validations pass
        await this.employeeManager.updateEmployeeRole(parseInt(employeeId), parseInt(newRoleId));
        console.log(`Employee ID '${employeeId}' updated to role ID '${newRoleId}'.`);
    }

    // Method to update an employee's manager
    async updateEmployeeManager(): Promise<void> {
        const { employeeId, newManagerId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'Enter the employee ID to update:',
                validate: async (input: string) => {
                    const employeeIdValue = parseInt(input);
                    if (isNaN(employeeIdValue) || employeeIdValue <= 0) {
                        return 'Please enter a valid employee ID.';
                    }

                    // Check if the employee exists
                    const employees = await this.employeeManager.getEmployees();
                    const employeeExists = employees.some(employee => employee.id === employeeIdValue);

                    if (!employeeExists) {
                        console.log('\nEmployee not found. Here is the list of available employees:');
                        console.table(employees);

                        const { addEmployee } = await inquirer.prompt({
                            type: 'confirm',
                            name: 'addEmployee',
                            message: 'Would you like to add a new employee?',
                        });

                        if (addEmployee) {
                            await this.addEmployee(); // Call the method to add a new employee
                        }
                        return false; // Stop further execution if no valid employee
                    }

                    return true;
                },
            },
            {
                type: 'input',
                name: 'newManagerId',
                message: 'Enter the new manager ID (leave blank if none):',
                default: '',
                validate: async (input: string) => {
                    if (input === '') {
                        return true; // Allow no manager
                    }

                    const managerIdValue = parseInt(input);
                    if (isNaN(managerIdValue) || managerIdValue <= 0) {
                        return 'Please enter a valid manager ID or leave blank.';
                    }

                    // Check if the manager exists
                    const employees = await this.employeeManager.getEmployees();
                    const managerExists = employees.some(employee => employee.id === managerIdValue);

                    if (!managerExists) {
                        console.log('\nManager not found. Here is the list of available employees:');
                        console.table(employees);

                        return 'Please enter a valid manager ID from the list above.';
                    }

                    return true;
                },
            },
        ]);

        // Parse managerId to `null` if it is an empty string, otherwise to a number
        const managerIdValue = newManagerId === '' ? null : parseInt(newManagerId, 10);

        // Update the employee's manager once all validations pass
        await this.employeeManager.updateEmployeeManager(parseInt(employeeId), managerIdValue);
        console.log(`Employee ID '${employeeId}' updated to manager ID '${managerIdValue}'.`);
    }

    // Method to delete a department
    async deleteDepartment(): Promise<void> {
        const { departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID to delete:',
                validate: (input: string) => {
                    // Ensure a valid department ID is provided
                    if (!isNaN(parseInt(input))) {
                        return true;
                    }
                    return 'Please enter a valid department ID';
                },
            },
        ]);

        await this.employeeManager.deleteDepartment(parseInt(departmentId));
        console.log(`Department ID '${departmentId}' deleted.`);
    }

    // Method to delete a role
    async deleteRole(): Promise<void> {
        const { roleId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'roleId',
                message: 'Enter the role ID to delete:',
                validate: (input: string) => {
                    // Ensure a valid department ID is provided
                    if (!isNaN(parseInt(input))) {
                        return true;
                    }
                    return 'Please enter a valid department ID';
                },
            },
        ]);

        await this.employeeManager.deleteRole(parseInt(roleId));
        console.log(`Role ID '${roleId}' deleted.`);
    }

    // Method to delete an employee
    async deleteEmployee(): Promise<void> {
        const { employeeId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'Enter the employee ID to delete:',
                validate: (input: string) => {
                    // Ensure a valid department ID is provided
                    if (!isNaN(parseInt(input))) {
                        return true;
                    }
                    return 'Please enter a valid department ID';
                },
            },
        ]);

        await this.employeeManager.deleteEmployee(parseInt(employeeId));
        console.log(`Employee ID '${employeeId}' deleted.`);
    }

    // Method to start the CLI
    startCli(): void {
        this.performActions();
    }
}

// Export the Cli class
export default Cli;
