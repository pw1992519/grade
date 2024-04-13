const express = require('express');
const router = express.Router();
const path = require('path');
let fileName = path.basename(__filename, '.js');
const controller = require(`../controllers/${fileName}`);

router.post('/login', controller.login)

module.exports = router;
