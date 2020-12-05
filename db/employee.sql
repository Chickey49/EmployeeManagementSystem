-- DROP DATABASE IF EXISTS EMS_db;
-- CREATE DATABASE EMS_db;
USE EMS_db;


DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
  id INTEGER  NOT NULL,
  name VARCHAR(11) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE roles (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary VARCHAR(100) NOT NULL,
  department_id INTEGER NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE employees (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  roles_id INTEGER  NOT NULL,
  manager_id INTEGER,
  PRIMARY KEY(id)
);
/*
SELECT e.*, r.title, d.name as DeptName
FROM employees e
INNER JOIN roles r ON e.roles_id = r.id
INNER JOIN departments d ON r.department_id = d.id



;
*/

INSERT INTO departments(id, name) VALUES (1, 'HR');
INSERT INTO departments(id, name) VALUES (2, 'eng');
INSERT INTO departments(id, name) VALUES (3, 'mgr');

INSERT INTO roles (title, salary, department_id) values ('HR coordinator', 80000, 1); 
INSERT INTO roles (title, salary, department_id) values ('CEO', 750000, 3); 
INSERT INTO roles (title, salary, department_id) values ('Engineer', 100000, 2); 
INSERT INTO roles (title, salary, department_id) values ('Tester', 40000, 2);
INSERT INTO roles (title, salary, department_id) values ('Dev lead', 50000,3);
INSERT INTO roles (title, salary, department_id) values ('Senior Dev', 95000,2);

INSERT INTO employees (first_name, last_name, roles_id) values ('Mark', 'Twain', 2);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) values ('Trevor', 'Cass', 3, 2);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) values ('Jane', 'Austen', 1, 3);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) values ('Pete', 'Carroll', 5, 2);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) values ('Jeff', 'Labowski', 4, 1);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) values ('Dave', 'Hickey', 6, 3);
