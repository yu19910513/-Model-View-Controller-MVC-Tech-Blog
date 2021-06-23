const router = require('express').Router();
const { Post, User, Com } = require('../../models');
// const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const getPost = await Post.findAll({
            attributes: [
                'id',
                'header',
                'postContent'
            ],
          order: [['postContent', 'DESC']],
          include: [
            {
              model: Com,
              attributes: ['id', 'commentText', 'postId', 'userId'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            },
          ]
        });
        res.status(200).json(getPost)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
      try {
        const getOne = await Post.findOne({
            where: {
              id: req.params.id
            },
            attributes: [
              'id',
              'header',
              'postContent'
            ],
            include: [
              {
                model: User,
                attributes: ['username']
              },
              {
                model: Com,
                attributes: ['id', 'commentText', 'postId', 'userId'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              }
            ]
          });
          if (!getOne) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          };
          res.status(200).json(getOne);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  });


router.post('/', withAuth, async (req, res) => {
    try {
        const makePost = await Post.create({
            header: req.body.header,
            postContent: req.body.postContent,
            userId: req.session.userId
          });
          res.status(200).json(makePost)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update({
            header: req.body.header,
            postContent: req.body.postContent
          },
          {
            where: {
              id: req.params.id
            }
          });
          res.status(200).json(updatedPost)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
      try {
        const deletedPost = await Post.destroy({
            where: {
              id: req.params.id
            }
          });
          if (!deletedPost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          res.status(200).json(deletedPost);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  });

  module.exports = router;
