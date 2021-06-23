const router = require('express').Router();
const { Post, User, Com } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async(req,res)=>{
    try {
        const getUsers = await User.findAll();
        res.status(200).json(getUsers)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const getOneUser = await User.findOne({
            where: {
              id: req.params.id
            },
            include: [
                {
                  model: Post,
                  attributes: ['id', 'header', 'postContent']
                },
                {
                    model: Com,
                    attributes: ['id', 'commentText'],
                    include: {
                      model: Post,
                      attributes: ['header']
                    }
                }
              ]

        });

        if (!getOneUser) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.status(200).json(getOneUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

  });

  router.post("/", withAuth, async (req,res)=> {
try {
    const createOne = User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
        req.session.userId = createOne.id;
        req.session.username = createOne.username;
        req.session.email = createOne.email
        req.session.loggedIn = true;
    });
    res.status(200).json(createOne)

} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
  });


  router.post('/login', async (req, res) => {
      try {
        const login = await User.findOne({
            where: {
              email: req.body.email
            }
          });

          if (!login) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
          };
          const validatePW = login.checkPassword(req.body.password); // refer to User.js model

          if (!validatePW) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
          };

          req.session.save(() => {
            req.session.userId = login.id;
            req.session.username = login.username;
            req.session.loggedIn = true
          });

        res.status(200).json({ user: login, message: 'You are now logged in!' });

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  });



  router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
      try {
            const logout = await req.session.destroy(() => {
                res.end();
            });
        }

      catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  });


module.exports = router;
