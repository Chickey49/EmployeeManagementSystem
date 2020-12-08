const mysql = require("mysql");
const mapObject = require('map-obj');

class Database {
    constructor() {

    }
    async connect() {
        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Password!',
            database: 'EMS_db'
        });
        try {
            await this.db.connect();
        } catch (e) {
            console.log(e);
        }
    }


    getEmployees() {
        var dbquery = "SELECT * FROM employees";
        return new Promise(data => {
            this.db.query(dbquery, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                try {

                    data(result);

                } catch (error) {
                    data({});
                    throw error;
                }

            });
        });

    }

    executeSql(dbquery) {
        return new Promise(data => {
            this.db.query(dbquery, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                try {
                    data(result);
                } catch (error) {
                    console.log("Error: " + error);
                    console.log("Sql: " + dbquery);
                    data({});
                    throw error;
                }
            });
        });
    }

    executeSqlWithParams(dbquery, params) {
        return new Promise(data => {
            this.db.query(dbquery, params, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                try {
                    data(result);
                } catch (error) {
                    console.log("Error: " + error);
                    console.log("Sql: " + dbquery);
                    data({});
                    throw error;
                }

            });
        });
    }

    async deleteEmployee(id) {
        // test to see if this employee is a manager.
        var dbquery = "select * from employees where manager_id =?";
        var results = await this.executeSqlWithParams(dbquery, [id]);
        if (results.length>0) {
            // throw an error to let caller know, data not right.
            throw new Error("Error, Employee is a manager of other employees.");
        }
        // we can delete now.
        var dbquery = "delete from employees where id =?";
        return this.executeSqlWithParams(dbquery, [id]);
    }

    getEmployeesByDept(name) {
        var dbquery =
            `SELECT e.*, r.title, d.name as DeptName
         FROM employees e 
         INNER JOIN roles r ON e.roles_id = r.id
         INNER JOIN departments d ON r.department_id = d.id 
         where d.name = ?`;

        return this.executeSqlWithParams(dbquery, [name]);
    }



    getDepts() {
        let dbquery = "SELECT * FROM departments";
        return new Promise(data => {
            this.db.query(dbquery, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                try {

                    data(result);

                } catch (error) {
                    data({});
                    throw error;
                }

            });
        });
    }

    getRoles() {
        let dbquery = "SELECT * FROM roles";
        return new Promise(data => {
            this.db.query(dbquery, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                try {

                    data(result);

                } catch (error) {
                    data({});
                    throw error;
                }

            });
        });
    }

    getEmployeesByRoles(title) {
        let dbquery = `SELECT e.*, r.title, d.name as DeptName
        FROM employees e
        INNER JOIN roles r ON e.roles_id = r.id
        INNER JOIN departments d ON r.department_id = d.id
        where r.title = ?;`;
        return new Promise(data => {
            this.db.query(dbquery, [title], function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                try {

                    data(result);

                } catch (error) {
                    data({});
                    throw error;
                }

            });
        });
    }

    saveEmployee(emp) {
        // insert statement 
        let dbquery =
            `INSERT INTO employees
        (first_name, last_name, roles_id, manager_id)
        VALUES
        (?,?,?,?);`;
        return new Promise(data => {
            this.db.query(dbquery, [emp.first_name, emp.last_name, emp.roles_id, emp.manager], function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                try {

                    data(result);

                } catch (error) {
                    data({});
                    throw error;
                }

            });
        });
    }
    getDepartment(id) {
        let dbquery = "SELECT * FROM departments WHERE id=?";
        return new Promise(data => {
            this.db.query(dbquery, [id], function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                try {

                    data(result);

                } catch (error) {
                    data({});
                    throw error;
                }

            });
        });
    }
    getManagers() {
        let dbquery = "select e.* from employees e where e.id in (select distinct manager_id from employees)";
        return new Promise(data => {
            this.db.query(dbquery, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                try {

                    data(result);

                } catch (error) {
                    data({});
                    throw error;
                }

            });
        });

    }
}

module.exports = Database;
