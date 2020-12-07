
const inquirer = require("inquirer");
const database = require("../db/database");
const cTable = require("console.table");



const promptUser = async () => {
    var answers = await inquirer.prompt([
        {
            name: "init",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all Employees", "View Employees by department", "View Employees by role", "Add Employee", "Remove Employee"]
        }]);
    let db = new database();
    db.connect();
    switch (answers.init) {
        case "View all Employees":

            var results = await db.getEmployees();
            // install . map npm
            console.table(results)
            console.log("all employees are being shown")
            isThatAll();
            break;

        case "View Employees by department":

            var results = await db.getDepts();
            inquirer.prompt([
                {
                    name: "department",
                    type: "list",
                    choices: results
                }
            ]).then(async (answers) => {
                if (answers.department === "HR") {
                    let results = await db.getEmployeesByDept("HR")
                    console.table(results);
                    isThatAll();
                }
                if (answers.department === "eng") {
                    let results = await db.getEmployeesByDept("eng")
                    console.table(results);
                    isThatAll();
                }
                if (answers.department === "mgr") {
                    let results = await db.getEmployeesByDept("mgr")
                    console.table(results);
                    isThatAll();
                }
            });
            break;

        // next ====================================================================================
        case "View Employees by role":

            let roles = await db.getRoles();
            const titleList = roles.map(r => {
                return r.title;
            });
            console.log(titleList);
            inquirer.prompt([
                {
                    name: "roles",
                    type: "list",
                    choices: titleList
                }
            ]).then(async (answers) => {
                if (answers.roles === "HR coordinator") {
                    let results = await db.getEmployeesByRoles("HR coordinator")
                    console.table(results)
                    isThatAll();
                }
                if (answers.roles === "CEO") {
                    let results = await db.getEmployeesByRoles("CEO")
                    console.table(results)
                    isThatAll();
                }
                if (answers.roles === "Engineer") {
                    let results = await db.getEmployeesByRoles("Engineer")
                    console.table(results)
                    isThatAll();
                }
                if (answers.roles === "Tester") {
                    let results = await db.getEmployeesByRoles("Tester")
                    console.table(results)
                    isThatAll();
                }
                if (answers.roles === "Dev lead") {
                    let results = await db.getEmployeesByRoles("Dev lead")
                    console.table(results)
                    isThatAll();
                }
                if (answers.roles === "Senior Dev") {
                    let results = await db.getEmployeesByRoles("Senior Dev")
                    console.table(results)
                    isThatAll();
                }
            });
            break;

        // next =============================================================================================
        case "Add Employee":

            let mgrDept = await db.getManagers();
            let mgrList = mgrDept.map(m  => {
                return m.id + "-" + m.first_name + " " + m.last_name;
            });
            let mgrIdList = mgrDept.map(m  => {
                return m.id;
            });

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
                },

                {
                    name: "manager",
                    type: "list",
                    message: "Employees manager: " + mgrList.join(", "),
                    choices: mgrIdList
                }
            ]).then(async (answers) => {
                var emp =
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    roles_id: answers.role,
                    manager: answers.manager,
                }

                const r = await db.saveEmployee(emp);
                const result = r.map(e => {
                     (e.id, e.first_name, e.last_name, e.manager);
                });
                console.table(result);
                isThatAll();
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
                // let last_name = answers.lastName;
                // db.query("select all employees" + last_name);
                // remove from db
                console.log("this employee is mising");
                isThatAll();
            });
    }
}

function isThatAll() {
    inquirer.prompt([
        {
            name: "lastPrompt",
            type: "list",
            message: "Is that all?",
            choices: ["yes", "no"]
        }

    ]).then((answers) => {
        if (answers.lastPrompt === "yes") {
            console.log("All done!")
        }
        if (answers.lastPrompt === "no") {
            promptUser();
        }
    });
}



(async () => {
    await promptUser();
})()

