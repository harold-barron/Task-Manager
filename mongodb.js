// CRUD

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL= 'mongodb://127.0.0.1:27017'
const databaseName = 'Task-manager' 



mongoClient.connect(connectionURL, {useNewURLParser: true},(error,client)=>{
    if(error)
    {
        return console.log("Unable to connect to database")
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'Harold',
        age: 24
    })


})


