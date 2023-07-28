const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

// establish database connection
let connection;

const initDBConnection = async () => {
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
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
        // ... other cases
        case 'Exit':
          connection.end();
          break;
        default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };
  
  // start the application
  const start = async () => {
    await initDBConnection();
    mainMenu();
  };
  
  start();
