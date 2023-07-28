import inquirer from 'inquirer';
import mysql from 'mysql2/promise';

// establish database connection
let connection;

const initDBConnection = async () => {
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'EM-912_70p',
    database: 'employee_db'
  });
};

const viewDepartments = async () => {
  const [rows] = await connection.query('SELECT * FROM department');
  console.table(rows);
  mainMenu();
};

const viewRoles = async () => {
  const [rows] = await connection.query('SELECT * FROM role');
  console.table(rows);
  mainMenu();
};

const viewEmployees = async () => {
  const [rows] = await connection.query('SELECT * FROM employee');
  console.table(rows);
  mainMenu();
};

const addDepartment = async () => {
  const departmentName = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'What is the name of the department?',
  });

  await connection.query('INSERT INTO department SET ?', departmentName);
  console.log('Department added successfully!');
  mainMenu();
};

const addRole = async () => {
  const role = await inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'What is the title of the role?',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary of the role?',
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'What is the ID of the department this role belongs to?',
    }
  ]);

  await connection.query('INSERT INTO role SET ?', role);
  console.log('Role added successfully!');
  mainMenu();
};

const addEmployee = async () => {
  const employee = await inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'What is the first name of the employee?',
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'What is the last name of the employee?',
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'What is the ID of the role this employee has?',
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'What is the ID of the manager this employee reports to?',
    }
  ]);

  await connection.query('INSERT INTO employee SET ?', employee);
  console.log('Employee added successfully!');
  mainMenu();
};

const updateEmployeeRole = async () => {
  const employee = await inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'Please enter the ID of the employee you want to update?',
    },
    {
      name: 'new_role_id',
      type: 'input',
      message: 'Please enter the ID of the new role?',
    }
  ]);

  await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [employee.new_role_id, employee.employee_id]);
  console.log('Employee role updated successfully!');
  mainMenu();
};

const mainMenu = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const start = async () => {
  await initDBConnection();
  mainMenu();
};

start();
