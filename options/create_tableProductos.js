const { optionsMySQL } = require("./databases.js");
const knex = require("knex")(optionsMySQL);

knex.schema.createTable("productos", table => 
{
    table.increments("id")
    table.string("title")
    table.integer("price")
    table.string("thumbnail")
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
    knex.destroy();
})