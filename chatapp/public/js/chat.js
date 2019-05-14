const socket = io()

// Elements
const $messageForm = document.getElementById('message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $shareLocationButton = document.getElementById('send-location')
const $messages = document.getElementById('messages')

// Templates
const messageTemplate = document.getElementById('message-template').innerHTML
const locationTemplate = document.getElementById('location-template').innerHTML
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix:true })

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of last message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // Scroll offset
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

// Receive message
socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        createdAt: moment(message.createdAt).format('h:mm a'),
        message: message.text
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

// Recieve location
socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationTemplate, {
        username: message.username,
        createdAt: moment(message.createdAt).format('h:m a'),
        url: message.text
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

// Receive sidebar update
socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.getElementById('sidebar').innerHTML = html
})

// Send message
$messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    // Disable form
    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = $messageFormInput.value

    socket.emit('sendMessage', message, () => {
        // Enable form
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        console.log('Message envoyé !')
    })
})

// Send location
document.getElementById('send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return console.error('Geocalisation non supporté par votre navigateur.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        // Disable button
        $shareLocationButton.setAttribute('disabled', 'disabled')

        socket.emit('sendLocation', {
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
        }, () => {
            // Enable button
            $shareLocationButton.removeAttribute('disabled')

            console.log('Position partagée !')
        })
    })
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

