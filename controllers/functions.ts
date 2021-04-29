import fs from 'fs';

let getProductos = ():Array<JSON> => 
{
    let arrayProductos:Array<string> = [];
    try
    {
        const contenido:string = fs.readFileSync('productos.txt', 'utf-8');

        arrayProductos = contenido.split(',\r\n');
            
        arrayProductos.splice(arrayProductos.length - 1, 1);
        
        return arrayProductos.map((producto: string) => JSON.parse(producto)); 
    }
    catch(error)
    {
        console.log('No existe el archivo. Error:', error);
        return []
    }
}

let getProducto = (id:number):object =>
{
    try
    {
        let productos:Array<JSON> = getProductos();
        return productos[id-1]; 
    }
    catch(error)
    {
        return {};
    }
}

let addProducto = async (producto:any) =>
{
    let productos = getProductos();
    producto.id = productos.length+1;
    await fs.promises.appendFile('productos.txt', `${JSON.stringify(producto)},\r\n`);
    console.log('producto agregado');
}

let updateProducto = (id:number, title:string, price:number, thumbnail:string):JSON => 
{
    let productos:any = getProductos();
    let productoActualizado = productos.filter((producto:any)=>
    {
        return producto.id == id;
    });

    productoActualizado = 
    {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: id
    }
    
    return productoActualizado;
}

let deleteProducto = (id:number):JSON => 
{
    let productos:any = getProductos();
    let nProductos = productos.filter((producto:any) => 
    {
        return producto.id == id;
    });

    return nProductos;
}

let addMensaje = async (mensaje:JSON) =>
{
    try 
    {
        fs.promises.appendFile('chatLog.txt', `${JSON.stringify(mensaje)},\r\n`);
    } catch (error) {
        console.log(`No se encontró el archivo, error: ${error}`);
    }
    
}

let getMensajes = ():Array<JSON> => 
{
    let arrayMensajes:Array<string> = [];
    try
    {
        let mensajes:string = fs.readFileSync('chatLog.txt', 'utf-8');
        arrayMensajes = mensajes.split(',\r\n');
        arrayMensajes.splice(arrayMensajes.length - 1, 1);
        let prueba = arrayMensajes.map((datosMensaje: string) => JSON.parse(datosMensaje));
        
        return prueba;  
    }
    catch(error)
    {
        console.log(`No se encontró el archivo, error: ${error}`);
        return [];
    }
}

export {getProductos, getProducto, getMensajes, addProducto, addMensaje, updateProducto, deleteProducto}