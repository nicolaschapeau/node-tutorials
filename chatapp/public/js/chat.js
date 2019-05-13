const socket = io()

// Receive message
socket.on('message', (message) => {
    console.log(message)
})

// Send message
document.getElementById('message-form').addEventListener('submit', (event) => {
    event.preventDefault()

    const message = event.target.elements.message.value
    event.target.elements.message.value = ''
    socket.emit('sendMessage', message)
})

// Send location
document.getElementById('send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return console.error('Geocalisation non supporté par votre navigateur.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
        })
    })
})


