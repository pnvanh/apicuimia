const express = require('express');
const router = express.Router();
const messageControler = require('../controllers/chatController');

router.post('/send-message/:senderId', messageControler.sendMessage); 
router.post('/get-message-inbox/:author', messageControler.getMessageInbox);
router.post('/get-all-message', messageControler.getAllMessage);
module.exports = router;