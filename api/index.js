const express = require('express');
const router = express.Router();
const comment = require("./comment");
const user = require('./User');

router.use('/User',user);
router.use('/Comment', comment);

module.exports = router;