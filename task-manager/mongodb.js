// CRUD

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  // If error on connection
  if (error) {
    return console.log('Unable to connect to database !')
  }

  // Set database name
	const db = client.db(databaseName)

  db.collection('users')
    .deleteMany({
      age: 20
    }).then((result) => {
      console.log(result.deletedCount)
    }).catch((error) => {
      console.log(error)
  })

})
