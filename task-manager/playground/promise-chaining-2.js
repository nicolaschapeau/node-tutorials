require('../src/db/mongoose')
const Task = require('../src/models/task')

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({})
    return count
}

deleteTaskAndCount('5cc0154e44b51f40c4e1087f').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})