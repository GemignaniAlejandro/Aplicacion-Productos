const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const handlebars = require('express-handlebars');
const PORT = process.env.PORT || 8080;
const functions = require('../controllers/functions');
const productosRouter = require('../routes/productos');

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: "./views/layouts",
        partialsDir: "./views/partials/"
    })
);

app.set("view engine", "hbs"); 
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//  RUTAS
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

http.listen(PORT, () =>
{
    console.log(`Server en puerto ${PORT}`);
}) 