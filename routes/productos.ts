import express from 'express';
import * as functions from '../controllers/functions';
const router = express();

router.get('/', (req, res)=>
{
    let productos: Array<JSON> = functions.getProductos();
    let mensajes: Array<JSON> = functions.getMensajes();
    if(productos.length>0)
    {
        res.render('listaProductos', {productos: productos, existenProductos: true, mensajes: mensajes});
    }
    else
    {
        res.render('listaProductos', {existenProductos: false});
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

router.get('/listar', (req, res) =>
{
    let productos = functions.getProductos();
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

router.get('/listar/:id', (req, res) =>
{
    let producto = functions.getProducto(parseInt(req.params.id));
    if(producto == undefined)
    {
        res.json({error: 'producto no encontrado'})
    }
    else
    {
        res.json(producto);
    }
});

router.put('/actualizar/:id/:title/:price/:thumbnail', (req, res) =>
{
    let productos = functions.getProductos();
    let cantidadProductos = productos.length;
    
    const id = parseInt(req.params.id);
    const title = req.params.title;
    const price = parseInt(req.params.price);
    const thumbnail = req.params.thumbnail;
    
    if(id <= cantidadProductos)
    {
        let productoActualizado = functions.updateProducto(id, title, price, thumbnail);
        res.json(productoActualizado);
    }
    else
    {
        res.json({error: "ID inválida"})
    }
});

router.delete('/borrar/:id', (req, res) =>
{
    const id = parseInt(req.params.id);

    let productoBorrado = functions.deleteProducto(id);
    
    res.json(productoBorrado);
});

export default router;