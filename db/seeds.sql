USE employee_db;

INSERT INTO department (name) 
VALUES ('Sales'), 
       ('Engineering'), 
       ('Finance');

INSERT INTO role (title, salary, department_id) 
VALUES ('Sales Lead', 100000, 1),
       ('Engineer', 80000, 2),
       ('Accountant', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Alice', 'Smith', 1, NULL),
       ('Alex', 'Brown', 2, 1),
       ('Andrea', 'Chan', 3, 1);
