const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Public: get AI response for customer support
router.post('/response', aiController.getAIResponse);

module.exports = router;
