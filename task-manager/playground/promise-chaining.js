require('../src/db/mongoose')
const User = require('../src/models/user')


User.findByIdAndUpdate('5cc2cb629c90960eb0c6f4ae', { age: 1 }).then((user) => {
    return User.countDocuments({ age: 1 })
}).then((usersCount) => {
    console.log(usersCount)
}).catch((error) => {
    console.log(error)
})