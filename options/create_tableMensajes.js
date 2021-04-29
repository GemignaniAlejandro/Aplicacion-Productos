const { optionsSQLite3 } = require("./databases.js");
const knexSQLite3 = require("knex")(optionsSQLite3);

knexSQLite3.schema.createTable("mensajes", table => 
{
    table.string("email")
    table.integer("fecha")
    table.string("mensaje")
})
.then(() =>
{
    console.log("Tabla creada");
})
.catch((err)=>
{
    console.log(err);
    throw err;
})
.finally(()=>
{
    knexSQLite3.destroy();
})