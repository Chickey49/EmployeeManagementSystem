
const inquirer = require("inquirer");
const database = require("database");


(async () => {
    await promptUser();
})
promptUser = async () => {
    var answers = await inquirer.prompt([
        {
            name: "init",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all Employees", "View Employees by department", "View Employees by role", "Add Employee", "Remove Employee"]
        }]);
    database.connect(results);

    switch (promptUser.answers) {
        case "View all Employees":

            var results = await database.getEmployees();
            console.table(results)
            break;

        case "View Employees by department":

            var results = await database.getDepts();

            inquirer.prompt([
                {
                    name: "department",
                    type: "list",
                    choices: [results]
                }
            ]).then((answers) => {
                if (answers === HR) {
                    // query all employees from HR
                    promptUser();
                }
                if (answers === eng) {
                    // query all employees from engineering
                    promptUser();
                }
                if (answers === mgr) {
                    // select all employees from management
                    promptUser();
                }
            }

        // next ====================================================================================
        case "View Employees by role":

            var results = db.query("SELECT * FROM 'role'")

            inquirer.prompt([
                {
                    name: "roles",
                    type: "list",
                    choices: [results]
                }
            ]).then((answers) => {
                if (answers.choices === "HR coordinator") {
                    // query all employees with title HR coordinator
                    promptUser();
                }
                if (answers.choices === "CEO") {
                    // query all employees with title CEO
                    promptUser();
                }
                if (answers.choices === "Engineer") {
                    // select all employees with title Enigneer
                    promptUser();
                }
                if (answers.choices === "Tester") {
                    // select all employees with title Tester
                    promptUser();
                }
                if (answers.choices === "Dev lead") {
                    // select all employees with title Dev lead
                    promptUser();
                } 
                if (answers.choices === "Senior Dev") {
                    // select all employees with title Senior Dev
                    promptUser();
                }
            });
            break;

        // next =============================================================================================
        case "Add Employee":


            inquirer.prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "Employees first name"
                },

                {
                    name: "lastName",
                    type: "input",
                    message: "Employees last name"
                },

                {
                    name: "role",
                    type: "list",
                    message: "Employees role id. 1 = HR, 2 = eng, 3 = mgr",
                    choices: ["1", "2", "3"]
                }
            ]).then((answers) => {
                let first_name = answers.firstName;
                let last_name = answers.lastName;
                let role_id = answers.role;
                // db.query("INSERT INTO employees" + first_name + last_name + role_id);
                console.log("this is a table");
            });
            break;
//  next ============================================================================================
        case "Remove Employee":

            inquirer.prompt([
                {
                    name: "lastName",
                    type: "input",
                    message: "Employees last name"
                },

            ]).then((answers) => {
                let last_name = answers.lastName;
                // db.query("select all employees" + last_name);
                // remove from db
                console.log("this is a table");
            });
    }
}


