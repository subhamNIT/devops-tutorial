const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/task");
const router = new express.Router();

router.get("/tasks", auth, async (req, res) => {
  // Task.find({})
  //   .then((tasks) => {
  //     res.send(tasks);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
  let match = {};
  let tasks = [];
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  try {
    if (Object.keys(match).length !== 0) {
      tasks = await Task.find({
        owner: req.user._id,
        completed: match.completed,
      });
    } else {
      tasks = await Task.find({ owner: req.user._id })
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip)).sort({ completed: -1 });
    }

    //await req.user.populate('tasks').execPopulate();

    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  // Task.findOne({ _id: req.params.id })
  //   .then((tasks) => {
  //     if (!tasks) {
  //       return res.status(404).send();
  //     }
  //     res.send(tasks);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });

  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({ id, owner: req.user._id });
    // console.log(task);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  // // console.log(task);
  // // task
  // //   .save()
  // //   .then(() => {
  // //     res.status(201).send(task);
  // //   })
  // //   .catch((error) => {
  // //     res.status(400).send(error);
  // //   });
  // try {
  //   await task.save();
  //   res.status(201).send(task);
  // } catch (e) {
  //   res.status(400).send(e);
  // }
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  console.log("task", task);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];

  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operations" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    // const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      res.status(400).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
