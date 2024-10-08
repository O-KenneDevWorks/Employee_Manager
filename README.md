# Employee Manager CLI Application

## Description

The Employee Manager CLI application is a command-line interface (CLI) tool designed for business owners to efficiently manage and organize their company's departments, roles, and employees. By providing an intuitive interface that allows users to view, add, and update departments, roles, and employees, this tool helps business owners plan and maintain their organization.

The application is built using TypeScript and PostgreSQL (psql) for the backend database. Future developments include features like database seeding scripts for streamlined setup.

## Table of Contents

- [Description](#description)

- [Features](#features)

- [Video Example](#video-example)

- [Future Developments](#future-developments)

- [Installation](#installation)

- [Usage](#usage)

- [Testing and Seeding the Database](#testing-and-seeding-the-database)

- [License](#license)

- [Questions](#questions)

## Features

- View All Departments: Displays a formatted table with department names and IDs.
- View All Roles: Displays a list of job titles, role IDs, associated departments, and salaries.
- View All Employees: Shows detailed employee data including employee IDs, first names, last names, job titles, departments, salaries, and managers.
- Add a Department: Prompts the user to input the department name and adds it to the database.
- Add a Role: Prompts the user to input role information (name, salary, department) and adds the role to the database.
- Add an Employee: Prompts the user to input the employee's details (first name, last name, role, and manager) and adds the employee to the database.
- Update an Employee's Role: Allows the user to select an employee and update their role within the company.

## Video Example

Watch the application in action:

[Watch the video](https://drive.google.com/file/d/1znZy0O67cBTpm-TgzCt_US8I2k5E22IR/view?usp=sharing)

In this video, you will see how to:

- View departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles and managers

## Future Development

- Database Seeding: A script for seeding the database with initial data will be added.

## Installation

1. Clone the Repository:
    ```
    git clone git@github.com:O-KenneDevWorks/Employee_Manager.git
    cd employee_manager
    ```

2. Install Dependencies:
    ```
    npm install
    ```

3. Set Up the PostgreSQL Database:

    - Log into your PostgreSQL server, then run the ./db/schema.sql script to create the necessary database tables:

        ```
        psql -U postgres -f ./db/schema.sql
        ```

    - Configure the database connection by creating a .env file with the following variables:
        ```
        DB_USER=your_postgres_user
        DB_PASSWORD=your_postgres_password
        DB_NAME=empmgr_db
        ```

4. Build the TypeScript Project:
    ```
    npm run build
    ```

## Usage

To start the application, run:
```
npm run start
```

You will be presented with a list of actions that you can perform, such as viewing departments, roles, or employees, adding new entries, or updating employee roles.

```
.-----------------------------------------------------------------------------------.
|                                                                                   |
|  _______ .___  ___. .______    __        ______   ____    ____  _______  _______  |
| |   ____||   \/   | |   _  \  |  |      /  __  \  \   \  /   / |   ____||   ____| |
| |  |__   |  \  /  | |  |_)  | |  |     |  |  |  |  \   \/   /  |  |__   |  |__    |
| |   __|  |  |\/|  | |   ___/  |  |     |  |  |  |   \_    _/   |   __|  |   __|   |
| |  |____ |  |  |  | |  |      |  `----.|  `--'  |     |  |     |  |____ |  |____  |
| |_______||__|  |__| | _|      |_______| \______/      |__|     |_______||_______| |
|                                                                                   |
| .___  ___.      ___      .__   __.      ___       _______  _______ .______        |
| |   \/   |     /   \     |  \ |  |     /   \     /  _____||   ____||   _  \       |
| |  \  /  |    /  ^  \    |   \|  |    /  ^  \   |  |  __  |  |__   |  |_)  |      |
| |  |\/|  |   /  /_\  \   |  . `  |   /  /_\  \  |  | |_ | |   __|  |      /       |
| |  |  |  |  /  _____  \  |  |\   |  /  _____  \ |  |__| | |  |____ |  |\  \--.    |
| |__|  |__| /__/     \__\ |__| \__| /__/     \__\ \______| |_______|| _| `.___|    |
|                                                                                   |
'-----------------------------------------------------------------------------------'

? Select an action
❯ view all departments
  view all roles
  view all employees
  view employees by manager
  view employees by department
  view total department budget
  add a department
```

### Commands

- Start the application: npm run start
- Build the project: npm run build
- Set up the database schema: psql -U postgres -f ./db/schema.sql

### Example Flow

1. View Departments: Select the option to view all departments. A table with department IDs and names will be displayed.

2. Add a New Department: Choose the option to add a new department. Enter the name of the new department, and it will be added to the database.

3. Update Employee Roles: Select an employee and update their role by choosing from the list of available roles.

## Testing and Seeding the Database

To test the functionality of the Employee Manager CLI and ensure the database is properly seeded before running the application, follow the steps below. This includes seeding the database with initial data and starting the application.

Steps to Test the Application:
1. Seed the Database
    Make sure the database is created and the tables are already defined. If you haven't created the schema yet, follow the instructions in the Installation section first.

    Run the ./db/seeds.sql script to seed the database with initial data:

    ```
    psql -U postgres -d empmgr_db -f ./db/seeds.sql
    ```

    This will populate your database with sample departments, roles, and employees.

2. Start the Application
    Once the database is seeded, you can start the application using the following command:
    ```
    npm run start
    ```
    You will be presented with the list of options to interact with the data, such as viewing employees, departments, or roles, and adding or updating them.

### Testing Workflow

1. Seed the Database: Use the ./db/seeds.sql file to pre-populate your database with sample data. This ensures that the database is not empty, allowing you to test viewing, adding, and updating functionalities.

2. Start the Application: After seeding the database, run the CLI tool by executing npm run start. Verify that the application reads the seeded data correctly and allows interaction with it.

3. Perform Test Actions: Choose actions from the menu, such as:

    - Viewing departments, roles, or employees.
    - Adding new departments, roles, or employees.
    - Updating employee roles and managers.

4. Verify Database Changes: After performing actions in the CLI, verify the database changes by either using the CLI or running SQL queries in your PostgreSQL client to check if the data has been added or updated correctly.

## Dependencies

The project uses the following key dependencies:

- TypeScript: For static typing and scalability.
- Inquirer.js: For interactive command-line prompts.
- PostgreSQL (pg): For database management.
- Dotenv: To manage environment variables securely.

## License

This project is licensed under the MIT License.

## Questions

For any inquiries or issues, please contact:

- Name: Owen Kenne
- Email: <okenne.devworks@gmail.com>
- GitHub: [O-KenneDevWorks](https://github.com/O-KenneDevWorks/)