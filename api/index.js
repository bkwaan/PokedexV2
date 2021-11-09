const express = require('express');
const router = express.Router();
const user = require('./user');

router.use('/User/',user);

module.exports = router;