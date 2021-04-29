const fs = require('fs');
const {optionsMySQL, optionsSQLite3} = require("../options/databases.js");
const knex = require("knex")(optionsMySQL);
const knexSQLite3 = require("knex")(optionsSQLite3);

let getProductos = async() => 
{
    try {
        let productos = await knex.from("productos")
        .select("*");
        return productos;
    } catch (error) {
        return [];
    }
}


let getProducto = async(id) =>
{
    try
    {
        let producto = await knex.from("productos").select("*").where("id", "=", id)
        return producto;
    }
    catch(error)
    {
        return {};
    }
}

let addProducto = async(producto) =>
{   
    await knex("productos").insert({
        title: producto.title,
        price: producto.price,
        thumbnail: producto.thumbnail    
    })
        .then(() => console.log("agregado"))
        .catch((err) => {console.log(err); throw err;});
}

let updateProducto = async (id, title, price, thumbnail) => 
{
    await knex("productos").where("id", id).update({
        title: title,
        price: price,
        thumbnail: thumbnail
    })
        
    let producto = await knex("productos").select("*").where("id", id)
    return producto; 
}

let deleteProducto = async(id) => 
{
    await knex.from("productos").where("id", id).del()
}

let getMensajes = async() => 
{
    try {
        let mensajes = await knexSQLite3.from("mensajes")
        .select("*");
        return mensajes;
    } catch (error) {
        return [];
    }
}

let addMensaje = async (mensaje) =>
{
    try {
        await knexSQLite3("mensajes").insert(mensaje)
    } catch (error) {
        console.log(`No se encontró el archivo, error: ${error}`);
    } 
}


module.exports = { getProducto, getProductos, addProducto, updateProducto, deleteProducto, getMensajes, addMensaje }