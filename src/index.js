const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const app = express();
const port = process.env.PORT || 3003;

const multer = require('multer');

const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('please upload Word'))
    }
    cb(undefined, true);
  }
})

const errorMiddleWare = (req, res, next) => {
  throw new Error('From my MiddleWaere');
}

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send();
}, (error, req, res, next) => {
  res.status(500).send({error: error.message});
})

//EXAMPLE OF MIDDLEWARE
// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//  // next();
//      res.status(503).send('Site is currently in maintenance');
// })
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("The app is available on" + port);
});

//BCRYPT THE PASSWORD
// const bcrypt = require('bcryptjs');
// const myFunction = async () => {
//   const password = '12345!';
//   const hashPassword = await bcrypt.hash(password, 8);
//   console.log(password, hashPassword);

//   const isMatch = await bcrypt.compare('12345!', hashPassword);
//   console.log(isMatch);
// }

// myFunction();

const jwt = require("jsonwebtoken");
const { request } = require("express");

const myFunction = async () => {
  const token = jwt.sign({ _id: "subham123" }, "thisismycourse", {
    expiresIn: "5 seconds",
  });
  console.log(token);

  const data = jwt.verify(token, "thisismycourse");
  console.log(data);
};

myFunction();

//INTERLINKING THE TASKS AND USERS
// const main = async () => {
//   const user = await User.findById('6151a67b4119891e7ebea738');
//   console.log('user in user', user);
//   await user.populate('tasks');
//   console.log(user.tasks);
// }

// main();
