const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database !')
  }

  // CRUD

  const db = client.db(databaseName)

  // db.collection('users').insertOne({
  //   name: 'Nicolas',
  //   age: 18
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user !')
  //   }
  //
  //   console.log(result.ops)
  // })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Nicolas',
  //     age: 18
  //   },
  //   {
  //     name: 'Benjamin',
  //     age: 20
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert users !')
  //   }
  //
  //   console.log(result.ops)
  // })

  db.collection('tasks').insertMany([
    {
      description: 'First task description',
      completed: false
    },
    {
      description: 'Second task description',
      completed: false
    },
    {
      description: 'Third task description',
      completed: false
    }
  ], (error, result) => {
    if (error) {
      return console.log('Unable to insert the tasks')
    }

    console.log(result.ops)
  })
})
