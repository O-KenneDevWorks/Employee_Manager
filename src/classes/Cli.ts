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
        console.table(departments);
    }

    // Method to view all roles
    async viewAllRoles(): Promise<void> {
        const roles = await this.employeeManager.getRoles();
        console.table(roles);
    }

    // Method to view all employees
    async viewAllEmployees(): Promise<void> {
        const employees = await this.employeeManager.getEmployees();
        console.table(employees);
    }

    // Method to view employees by manager
    async viewEmployeesByManager(): Promise<void> {
        const { managerId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the manager ID:',
            },
        ]);

        const employees = await this.employeeManager.getEmployeesByManager(parseInt(managerId));
        console.table(employees);
    }

    // Method to view employees by department
    async viewEmployeesByDepartment(): Promise<void> {
        const { departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID:',
            },
        ]);

        const employees = await this.employeeManager.getEmployeesByDepartment(parseInt(departmentId));
        console.table(employees);
    }

    // Method to view total budget of a department
    async viewTotalDepartmentBudget(): Promise<void> {
        const { departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID:',
            },
        ]);

        const totalBudget = await this.employeeManager.getTotalDepartmentBudget(parseInt(departmentId));
        console.log(`Total utilized budget for department ID '${departmentId}' is: ${totalBudget}`);
    }

    // Method to add a department
    async addDepartment(): Promise<void> {
        const { departmentName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:',
            },
        ]);

        try {
            // Assuming `this.employeeManager.addDepartment()` is responsible for interacting with the database
            await this.employeeManager.addDepartment(departmentName);
            console.log(`Department '${departmentName}' added successfully.`);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error inserting department into database:', error.message);
            } else {
                console.error('Unknown error occurred:', error);
            }
            throw error;
        }
    }

    // Method to add a role
    async addRole(): Promise<void> {
        const { title, salary, departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role:',
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID for the role:',
            },
        ]);

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
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the employee\'s last name:',
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'Enter the role ID for the employee:',
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
            },
            {
                type: 'input',
                name: 'newRoleId',
                message: 'Enter the new role ID for the employee:',
            },
        ]);

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
            },
            {
                type: 'input',
                name: 'newManagerId',
                message: 'Enter the new manager ID (leave blank if none):',
                default: '',
                validate: (input: string) => {
                    if (input === '' || !isNaN(Number(input))) {
                        return true;
                    }
                    return 'Please enter a valid manager ID or leave blank.';
                },
            },
        ]);

        const managerIdValue = newManagerId === '' ? null : parseInt(newManagerId, 10);

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
