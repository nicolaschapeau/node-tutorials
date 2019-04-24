// Requires
const mongoose = require('mongoose')
const validator = require('validator')

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useNewUrlParser: true,
	useCreateIndex: true
})

// Models
// ->
// Users model
const User = mongoose.model('User', {
	name: {
		type: String,
		require: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate (value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password needs to be more secure...')
			}
		}
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate (value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid.')
			}
 		}
	},
	age: {
		type: Number,
		default: 0,
		validate (value) {
			if (value < 0) {
				throw new Error('Age must be a positive number.')
			}
		}
	}
})

// Tasks model
const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	}
})


// Other
// ->
// 

// const me = new User({
// 	name: 'Nicolas',
// 	password: 'mynewpass',
// 	email: 'zkolait@gmail.com',
// 	age: 21
// })

// me.save().then(() => {
// 	console.log('success')
// }).catch((error) => {
// 	console.log(error)
// })

const newTask = new Task({
	description: 'This is a description'
})

newTask.save().then(() => {
	console.log(newTask)
}).catch((error) => {
	console.log(error)
})