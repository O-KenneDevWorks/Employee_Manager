// AS A business owner
// I WANT to be able to view and manage the departments, roles, and employees in my company
// SO THAT I can organize and plan my business

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee

// import classes
import Cli from './classes/Cli.js';

const banner = `
.-----------------------------------------------------------------------------------.
|                                                                                   |
|  _______ .___  ___. .______    __        ______   ____    ____  _______  _______  |
| |   ____||   \\/   | |   _  \\  |  |      /  __  \\  \\   \\  /   / |   ____||   ____| |
| |  |__   |  \\  /  | |  |_)  | |  |     |  |  |  |  \\   \\/   /  |  |__   |  |__    |
| |   __|  |  |\\/|  | |   ___/  |  |     |  |  |  |   \\_    _/   |   __|  |   __|   |
| |  |____ |  |  |  | |  |      |  \`----.|  \`--'  |     |  |     |  |____ |  |____  |
| |_______||__|  |__| | _|      |_______| \\______/      |__|     |_______||_______| |
|                                                                                   |
| .___  ___.      ___      .__   __.      ___       _______  _______ .______        |
| |   \\/   |     /   \\     |  \\ |  |     /   \\     /  _____||   ____||   _  \\       |
| |  \\  /  |    /  ^  \\    |   \\|  |    /  ^  \\   |  |  __  |  |__   |  |_)  |      |
| |  |\\/|  |   /  /_\\  \\   |  . \`  |   /  /_\\  \\  |  | |_ | |   __|  |      /       |
| |  |  |  |  /  _____  \\  |  |\\   |  /  _____  \\ |  |__| | |  |____ |  |\\  \\--.    |
| |__|  |__| /__/     \\__\\ |__| \\__| /__/     \\__\\ \\______| |_______|| _| \`.___|    |
|                                                                                   |
'-----------------------------------------------------------------------------------'
`;

console.log(banner);

// Initialize the CLI
const cli = new Cli();

// Start the CLI
cli.startCli();