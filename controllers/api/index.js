const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const comRoutes = require('./comRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', comRoutes);

module.exports = router;
