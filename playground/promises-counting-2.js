require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete('614303afbf2bb892ee1d888c').then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })

const deleteTaskAndCount = async(id) => {
    const deleteTask = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
}

deleteTaskAndCount('614339b93eb5abbb24cb9d34').then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})
