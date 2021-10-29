const mongoose = require("mongoose");
const validator = require('validator');
//TO CONNECT FROM LOCAL COMMAND:
///Users/subgupta2/mongodb/mongodb/bin/mongod.exe --dbpath =/Users/subgupta2/mongodb-data
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
});


//CREATE

// const me = new User({
//   name: "Namku Gupta    ",
//   email: 'namy@gml.com',
//   password: 'P    l,mwelkdkwed                  '
// });

// me.save()
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));


// const task = new Task({
//     description: 'Cooking'
// })

// task.save().then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })