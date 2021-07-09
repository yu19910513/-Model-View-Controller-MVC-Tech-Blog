const router = require('express').Router();
const { User } = require('../../models');



// POST /api/users


router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then(userDB => {
    req.session.save(() => {
      req.session.user_id = userDB.id;
      req.session.name = userDB.name;
      req.session.loggedIn = true;

      res.json(userDB);
    });
  });
});

// LOGIN
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(userDB => {
    if (!userDB) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = userDB.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userDB.id;
      req.session.name = userDB.name;
      req.session.loggedIn = true;


      res.json({ user: userDB, message: 'You are now logged in!' });
    });
  });
});


router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});
module.exports = router;
