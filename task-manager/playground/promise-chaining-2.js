require('../src/db/mongoose')
const Task = require('../src/models/task')


Task.findByIdAndDelete('5cc40ee9be44143a50ddae61').then(() => {
    return Task.countDocuments({ completed: (false) })
}).then((completedCount) => {
    console.log(completedCount)
}).catch((error) => {
    console.log(error)
})