const users = []

// addUser
const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate
    if (!username || !room) {
        return {
            error: 'Un pseudonyme et un chat et un salon sont nécessaires.'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => user.room === room && user.username === username)

    // Validate
    if (existingUser) {
        return {
            error: 'Le pseudonyme existe déjà dans ce salon.'
        }
    }

    // Store user
    const user = { id, username, room }
    users.push(user)

    return { user }
}



// removeUser
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// getUser
const getUser = (id) => {
    return users.find((user) => user.id === id)
}

// getUsersInRoom
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}



// Export
module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}