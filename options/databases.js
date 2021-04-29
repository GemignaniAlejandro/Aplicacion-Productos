const optionsMySQL = 
{
    client: "mysql",
    connection: 
    {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "productos"
    }
};

const optionsSQLite3 = 
{
    client: "sqlite3",
    connection: 
    {
        filename: "./db/chatLog.sqlite"
    },
    userNullAsDefault: true
};

module.exports = {optionsMySQL, optionsSQLite3};