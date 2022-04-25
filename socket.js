PORT = 8080 || process.env.PORT
const io = require('socket.io')(PORT)
const users = {}

io.on('connection', socket => {
    socket.on('new-user', username => {
        users[socket.id] = username
        socket.broadcast.emit('user-connected', username)
    })
    socket.on('send-chat-message', message => {
        //Send it to all clients excepts the sender
        socket.broadcast.emit('chat-message', { message: message, username: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})

module.exports = io