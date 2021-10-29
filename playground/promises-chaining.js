require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("6142ffb41347a9a1cbd0d16a", { age: 28 }).then(
//   (user) => {
//       console.log(user);
//       return User.countDocuments({age: 28})
//   }).then((result) => {
//       console.log(result);
//   }).catch((error) => {
//       console.log(error);
//   })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("6142ffb41347a9a1cbd0d16a", 30)
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
