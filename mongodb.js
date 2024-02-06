// CURD = Create Update Read Delete

const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

// MongoClient.connect(connectionURL,{ useNewUrlParser: true }, (error, client)=>{
//     //Here if error occurs then we are going to return error that why no code forward gona excecute
//     if(error){
//         return console.log("Unable To Connect to database!")
//     }
//     console.log("Connected Correctly")
// })

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'test'

const id = new ObjectId()
console.log(id)
console.log(id.toString().length)
console.log("Raw Byte Id :",id.id.length)
console.log(id.getTimestamp())

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');
    // console.log(collection)
    // collection.insertOne({
    //     name: 'Sarthak',
    //     Age: 19
    // })
  
    // the following code examples can be pasted here...
  
    return 'done.';
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


