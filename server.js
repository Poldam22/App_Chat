//configuracion del server

const express = require('express');
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')


const app = express()

//Configuración de socket
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


//middleware
app.use(express.static('public'));

const messages = [
    {author: 'Pablo', text:'Hola que tal?'},
    {author: 'Marcelo', text:'Muy bien, vos?'},
    {author: 'Belen', text:'Holaa!'}
]

// 01_establecer conexion con el cliente
// io.on('connection', socket =>{
//     console.log('Nuevo cliente conectado');

//     // _02 Enviamos mensajes al cliente
//     socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor')

//     socket.on('notificacion', data =>{
//         console.log(data);
//     })
// })


//Implementación/configuración de socket
io.on('connection', socket =>{
    console.log('Nuevo cliente conectado!');

    //vamos a enviar el historial del chat cuando un nuevo cliente se conecta
    socket.emit('messages', messages)

    //escuchamos al cliente
    socket.on('new-message', data =>{
        messages.push(data)
   

    //re enviamos por medio de broadcast los msn a todos los clientes que esten conectador en ese momento

    io.sockets.emit('messages', messages)
})
})


const PORT = 8070;

const server = httpServer.listen(PORT, ()=>{
    console.log('server running');
})

server.on('error', error =>console.log(`Error en servidor ${error}`))