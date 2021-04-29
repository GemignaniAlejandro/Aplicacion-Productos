import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import handlebars from 'express-handlebars';
import * as functions from './controllers/functions';
import productosRouter from './routes/productos';

const app = express(); 
const http = createServer(app);
const PORT = process.env.PORT || 8080;
const io = new Server(http, {
});


app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: "./views/layouts",
        partialsDir: "./views/partials/"
    })
);

// VIEWS

app.set("view engine", "hbs"); //Handlebars
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// RUTAS 
app.use("/productos", productosRouter);

// SOCKET
io.on('connection', (socket) => {
    console.log('cliente conectado');

    socket.on('client-message', (data) =>
    {
        io.emit('server-message', data);
    });

    socket.on('client-chat-message', (datosMensaje) => 
    {
        functions.addMensaje(JSON.parse(datosMensaje));
        io.emit('server-chat-message', datosMensaje);
    });
});

http.listen(PORT, () =>{
    console.log(`Servidor en puerto ${PORT}`);
});