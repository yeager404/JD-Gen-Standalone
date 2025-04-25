const express = require('express');
const router = express.Router();
const multer = require('multer');

const { createJob } = require('../controllers/job.controller');
const {submitResponse} = require("../controllers/response.controller");
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

router.post('/jobs', createJob);
router.post("/jobs/:jobId/respond", upload.single("resume"), submitResponse);

module.exports = router;