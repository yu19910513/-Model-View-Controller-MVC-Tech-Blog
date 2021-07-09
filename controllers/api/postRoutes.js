const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const create_post = await Post.create({
      name: req.body.name,
      content: req.body.content,
      user_id: req.session.user_id
    });
    res.status(200).json(create_post)
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }

});

module.exports = router;
