// CRUD

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const objectID= mongodb.ObjectId

const connectionURL= 'mongodb://127.0.0.1:27017'
const databaseName = 'Task-manager' 



mongoClient.connect(connectionURL, {useNewURLParser: true},(error,client)=>{
    if(error)
    {
        return console.log("Unable to connect to database")
    }

    const db = client.db(databaseName)
    
    // const updatePromes = db.collection('users').updateOne({
    //     _id:new objectID("62eafbd46b14389ad658a033")
    // }, 
    //     {
    //         $inc: {
    //             age: 1
    //         }
    // }).then((result) =>{
    //     console.log(result)
    // }).catch((error) =>{
    //     console.log(error)
    // })

    // const updateTask = db.collection('task').updateMany({
    //     completed:false
    // },
    //     {
    //         $set: {
    //             completed:true
    //         }
    //     }).then((result) =>{
    //             console.log(result)
    //         }).catch((error) =>{
    //             console.log(error)
    //         })

    const deleteTask = db.collection('task').deleteOne(
    {
        task: 'Delete'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})


