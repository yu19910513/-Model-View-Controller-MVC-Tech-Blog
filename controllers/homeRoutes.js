const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', async (req, res) => {
  try {
    const home_post = await Post.findAll({
      attributes: [
        'id',
        'name',
        'content'
      ],
    });
    const posts = home_post.map(post => post.get({ plain: true }));
    res.render('homepage', {
          posts,
          loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('signup');
  });

  router.get('/post/:id', async (req, res) => {
    try {
      const single_post = await Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'name',
          'content'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment', 'post_id', 'user_id'],
            include: {
              model: User,
              attributes: ['name']
            }
          },
          {
            model: User,
            attributes: ['name']
          }
        ]
      });

      if (!single_post) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }


      const post = single_post.get({ plain: true });
      res.render('add-comment', {
          post,
          loggedIn: req.session.loggedIn
        });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

  })

module.exports = router;
