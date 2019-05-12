const express = require('express')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT


// Accept json requests
app.use(express.json())


// Routes
app.use(userRouter)
app.use(taskRouter)


// Listen server
app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})