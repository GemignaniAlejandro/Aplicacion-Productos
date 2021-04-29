const express = require("express");
const router = express.Router();
const functions = require("../controllers/functions");

router.get('/', async(req, res) =>
{
    let productos = await functions.getProductos();
    
    
    let mensajes = await functions.getMensajes();
    
    if(productos.length>0)
    {
        res.render('listaProductos', {productos: productos, existenProductos: true, mensajes: mensajes});
    }
    else
    {
        res.render('listaProductos', {existenProductos: false, mensajes: mensajes});
    }
});

router.post('/guardar', (req, res) => 
{   
    let producto = 
    {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    functions.addProducto(producto);
    res.redirect('http://localhost:8080/productos');
});

router.get('/listar', async(req, res) =>
{
    let productos = await functions.getProductos();
    let cantidadProductos = productos.length;
    if(cantidadProductos>0)
    {
        res.json(productos);
    }
    else
    {
        res.json({error: 'no hay productos cargados'});
    }
});

router.get('/listar/:id', async(req, res) =>
{
    const id = req.params.id;
    let producto = await functions.getProducto(id);
    if(producto.length == 0)
    {
        res.json({error: 'producto no encontrado'})
    }
    else
    {
        res.json(producto);
    }
});

router.put('/actualizar/:id', async(req, res) =>
{    
    const id = req.params.id;
    const title = req.body.title;
    const price = req.body.price;
    const thumbnail = req.body.thumbnail;
    
    let productoActualizado = await functions.updateProducto(id, title, price, thumbnail);

    if(productoActualizado.length>0)
    {
        res.json(productoActualizado);
    }
    else
    {
        res.json({error: "No existe un producto con esa ID"});
    }
    
});

router.delete('/borrar/:id', async(req, res) =>
{
    const id = req.params.id;

    let productoBorrado = await functions.deleteProducto(id);
    
    res.json(productoBorrado);
});

module.exports = router;