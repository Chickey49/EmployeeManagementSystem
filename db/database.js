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

    getEmployeesByDept(name) {
        var dbquery =
            `SELECT e.*, r.title, d.name as DeptName
         FROM employees e 
         INNER JOIN roles r ON e.roles_id = r.id
         INNER JOIN departments d ON r.department_id = d.id 
         where d.name = ?`;
        return new Promise(data => {
            this.db.query(dbquery, [name], function (error, result) {
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
        (id,first_name, last_name, roles_id, manager_id)
        VALUES
        (?,?,?,?,?);`;
        return this.db.query(dbquery, [emp.first_name, emp.last_name, emp.roles_id, emp.manager], function (error, result) {
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
    };
}
module.exports = Database;
