const router = require('express').Router();

const apiRoute = require('./api');
const homeRoute = require('./homeRoute.js');
const dashRoute = require('./dashRoute.js');

router.use('/api', apiRoute);
router.use('/', homeRoute);
router.use('/dashboard', dashRoute);

// router.use((req, res) => {
//   res.status(404).end();
// });

module.exports = router;
