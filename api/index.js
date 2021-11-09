const express = require('express');
const router = express.Router();
const user = require('./User');

router.use('/User',user);

module.exports = router;