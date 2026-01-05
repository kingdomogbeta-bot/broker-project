const express = require('express');
const router = express.Router();
const controller = require('../controllers/messagesController');
const auth = require('../middleware/authMiddleware');

// Public: create message (from user)
router.post('/', controller.createMessage);

// Protected: admin routes
router.get('/', auth, controller.listMessages);
router.get('/:userId', auth, controller.getConversation);
router.post('/:userId/reply', auth, controller.replyToMessage);

module.exports = router;
