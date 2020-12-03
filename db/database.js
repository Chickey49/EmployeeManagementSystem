var mysql = require("mysql");

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


    async getEmployees() {
        var results = await db.query("SELECT * FROM 'employees'");
        return results;
        // err handling try catch stuff
    }

    async getDepts() {
    var results = db.query("SELECT * FROM 'departments'");
    return results;
    }
}
module.exports = Database;
