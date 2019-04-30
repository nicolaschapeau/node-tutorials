const express = require('express')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


// Routes
app.use(userRouter)
app.use(taskRouter)


// Accept json requests
app.use(express.json())


// Listen server
app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})