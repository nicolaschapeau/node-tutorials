require('../src/db/mongoose')
const User = require('../src/models/user')

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age : age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5cc2cb839c90960eb0c6f4b0', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})