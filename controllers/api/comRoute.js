const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const getCom = await Comment.findAll({});
        res.status(200).json(getCom)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
  if (req.session) {
      try {
        const postCom = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
          });
          res.status(200).json(postCom)
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedCom = Comment.destroy({
            where: {
              id: req.params.id
            }
          });
          if (!deletedCom) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.status(200).json(deletedCom);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
