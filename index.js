const sql = require("mssql/msnodesqlv8");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

//middleware config
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//sql server config
const config = {connectionString: "Driver={ODBC Driver 17 for SQL Server}; Server=Tara-01; Database=CheckIT; Trusted_Connection=Yes"};

sql.connect(config)
    .then(pool => {
        console.log("Connected to SQL Server");

        const query = `
            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Tasks')
            CREATE TABLE Tasks (
                ID INT IDENTITY(1,1) PRIMARY KEY,
                Title VARCHAR(50) NOT NULL,
                Describe VARCHAR(100) NOT NULL
            )
        `;
        return pool.request().query(query);
    })
    .catch (err => {
        console.error("DB Connection failed:", err);
    });

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});

//CRUD read - get all tasks with code 200
app.get("/Tasks", async (req, res) => {
    try {
        const result = await new sql.Request().query("SELECT * FROM Tasks");
        res.status(200).send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
});

//CRUD create - add new task with code 201
app.post("/Tasks", async(req, res) => {
    const { title, describe } = req.body;

    try {
        await new sql.Request()
        .input("Title", sql.VarChar(50), title)
        .input("Describe", sql.VarChar(100), describe)
        .query(`
            INSERT INTO Tasks (Title, Describe)
            VALUES (@Title, @Describe)`);
        res.status(201).send("Task Add");
    } catch (err) {
        console.error(err);
        res.status(500).send("Insert Failed");
    }
});

//CRUD update - update an existing task with no code
app.put("/Tasks/:id", async(req, res) => {
    const {id} = req.params;
    const { title, describe } = req.body;

    try {
        await new sql.Request()
        .input("ID", sql.Int, id)
        .input("Title", sql.VarChar(50), title)
        .input("Describe", sql.VarChar(100), describe)
        .query(`
            UPDATE Tasks SET Title=@Title, Describe=@Describe
            where ID=@ID`);
        res.send("Task Updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("Update Failed");
    }
});

//CRUD delete - remove a task
app.delete("/Tasks/:id", async (req, res) => {
    const {id} = req.params;

    try {
        await new sql.Request()
        .input("ID", sql.Int, id)
        .query("DELETE FROM Tasks WHERE ID=@ID");

        res.status(200).send("Task Deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Delete Failed");
    }
});