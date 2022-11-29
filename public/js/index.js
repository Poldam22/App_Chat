//Aqui va la configuración del socket del lado del cliente
const socket = io.connect();

//02 Escuchamos el mensaje que viene del server

// socket.on('mi mensaje', data =>{
//     alert(data)

//     //enviamos mensaje al sever
// socket.emit('notificacion', 'mensaje recibido exitosamente!!')

// })


//03_ armamos la función render

function render(data) {
   const html = data.map(item =>{
    return(`<div> <strong>${item.author}</strong>: <em>${item.text}</em></div>`)
   } ).join(' ')

   document.getElementById('message').innerHTML = html
}



//04 - Funcion que se ejecuta cuando doy click en el boton enviar
function addMessage(){
    const authorName = document.getElementById('author').value
    const textMsj = document.getElementById('text').value

    const mensaje = {
        author: authorName,
        text: textMsj
    }

    document.getElementById('text').value = ''

//enviamos data al server.
socket.emit('new-message', mensaje)

return false
}

// 02 Eventos para enviar(emit) y recibir(on) los mensajes.
socket.on('messages', data=>{
    render(data)
    alertMsj(data)
})
