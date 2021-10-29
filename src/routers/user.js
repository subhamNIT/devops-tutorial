const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const sharp = require('sharp');
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('please upload Image'))
    }
    cb(undefined, true);
  }
})

router.post('/users/me/avatar',auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({
    width: 250,
    height: 250
  }).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({error: error.message});
})

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/users/:id/avatar', async(req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {

  }
})


router.post("/users", async (req, res) => {
    const user = new User(req.body);
    console.log(user);
    //WITHOUT USING THE ASYNC/AWAIT
    // user
    //   .save()
    //   .then(() => {
    //     res.status(201).send(user);
    //   })
    //   .catch((error) => {
    //     res.status(400).send(error);
    //   });
  
    //USING ASYNC/AWAIT
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({
          user,
          token
      });
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({
            user,
            token
        });
    }
    catch(e) {
        res.status(400).send();
    }
  })
  
  router.post('/users/logout', auth, async (req, res) => {
    try {
        console.log(req.user);
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
  })

  router.post('/users/logoutAll', auth, async (req, res) => {
      try {
        req.user.tokens= [];
        await req.user.save();
        res.send();
      } catch(e) {
        res.status(500).send();
      }
  })

  router.get("/users", auth, async (req, res) => {
    // User.find({})
    //   .then((users) => {
    //     res.send(users);
    //   })
    //   .catch((error) => {
    //     res.status(500).send(error);
    //   });
  
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get("/users/me", auth, async (req, res) => {
    // User.find({})
    //   .then((users) => {
    //     res.send(users);
    //   })
    //   .catch((error) => {
    //     res.status(500).send(error);
    //   });
    console.log(req.user);
    res.send(req.user);
});
  
  router.get("/users/:id", async (req, res) => {
    console.log(req.params);
    // User.findOne({ _id: req.params.id })
    //   .then((users) => {
    //     if (!users) {
    //       return res.status(404).send();
    //     }
    //     res.send(users);
    //   })
    //   .catch((error) => {
    //     res.status(500).send(error);
    //   });
  
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
//   router.delete("/users/:id", async (req, res) => {
//     try {
//       const user = User.findByIdAndDelete(req.params.id);
  
//       if (!user) {
//         return res.status(404).send();
//       }
//       return res.send(user);
//     } catch (e) {
//       res.status(500).send(e);
//     }
//   });

  router.delete("/users/me", auth, async (req, res) => {
    console.log('request',req.user);
    try {
        
      await req.user.remove();
      res.send(req.user);
    } catch (e) {
      res.status(500).send(e);
    }
  });


//   router.patch("/users/:id", async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["name", "email", "age", "password"];
  
//     const isValidOperation = updates.every((update) => {
//       return allowedUpdates.includes(update);
//     });
  
//     if (!isValidOperation) {
//       return res.status(400).send({ error: "Invalid Operations" });
//     }
  
//     try {
//         const user = await User.findById(req.params.id);
//         updates.forEach((update) => user[update] = req.body[update])
//         await user.save();
//     //   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     //     new: true,
//     //     runValidators: true,
//     //   });
  
//       if (!user) {
//         return res.status(404).send();
//       }
//       res.send(user);
//     } catch (e) {
//       res.status(400).send(e);
//     }
//   });

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "age", "password"];
  
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update);
    });
  
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Operations" });
    }
  
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save();
    //   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true,
    //   });
      res.send(req.user);
    } catch (e) {
      res.status(400).send(e);
    }
  });
module.exports = router;