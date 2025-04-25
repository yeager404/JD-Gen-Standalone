const express = require('express');
const router = express.Router();
const { mdDemo } = require('../controllers/mdDemo');

router.post('/mdDemo', mdDemo);

module.exports = router;