//CRUD operations

const { MongoClient, ObjectId } = require('mongodb');
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
// var id = new ObjectId();
// console.log('id', id, id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect from database");
    }
    console.log("Connected Correctly");
    const db = client.db(databaseName);

    // db.collection('users').findOne({name: 'Namu', age: 1}, (error, user) => {
    //     if(error) {
    //         return console.log(error);
    //     }
    //     return console.log(user);
    // })

    // db.collection('users').find({age: 24}).toArray((error, users) => {
    //     console.log(users);
    // })

    // db.collection('users').find({age: 24}).count((error, count) => {
    //     console.log(count);
    // })
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Neha',
    //     age: 25
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert');
    //     }
    //     console.log('result', result.ops);
    // })
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Eating",
    //       completed: false
    //     },
    //     {
    //       description: "Sleeping",
    //       completed: true
    //     },
    //     {
    //       description: "Working",
    //       completed: false
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert the tasks");
    //     }
    //     console.log({ result });
    //   }
    // );

    //READ
    // db.collection('tasks').findOne({_id: new ObjectId("613b36118c7891a2f3044f2e")}, (error, task) => {
    //     console.log('task', task);
    // })

    // db.collection('tasks').find(({completed: false})).toArray((error, tasks) => {
    //     console.log('tasks', tasks);
    // })

//UPDATE
//     db.collection('users').updateOne({_id: new ObjectId("613b2bcb1937aeb14fc57e1d")}, {
//        $inc: {
//            age: 1
//        }
//     }).then((result) => {
//         console.log(result);
//     }).catch((error) => {
//         console.log(error);
//     })
//   });

// db.collection('tasks').updateMany({
//     completed: false
//     }, {
//     $set: {
//         completed: true
//     }
// }).then((result) => {
//         console.log(result);
//     }).catch((error) => {
//         console.log(error);
//     })

//DELETE
// db.collection('users').deleteMany({
//     age: 25
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })
db.collection('tasks').deleteOne({
    description: 'Eating'
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})
})

