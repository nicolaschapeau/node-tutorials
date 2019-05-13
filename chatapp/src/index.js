const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))



io.on('connection', (socket) => {

    // New user joined
    socket.emit('message', 'Bienvenue sur le chat !')
    socket.broadcast.emit('message', 'Un utisateur à rejoins le chat !')
    
    // New message listener
    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    // New location sent
    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://www.google.fr/maps?q=${coords.latitude},${coords.longitude}`)
    })

    // User disconnected
    socket.on('disconnect', () => {
        io.emit('message', 'Une personne à quitté le chat')
    })
})


server.listen(port, () => {
    console.log('Server is up on port ' + port)
})