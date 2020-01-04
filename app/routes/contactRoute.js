const express = require('express');
const router = express.Router();
const contact = require('../controllers/contactController');

router.post('/search-contact' ,contact.searchContact);
router.post('/add-contact', contact.addContact);
router.post('/list-friend', contact.listFriends);
router.post('/list-watting', contact.listWaitingAccept);
router.post('/accept-contact', contact.acceptContact);
router.post('/group-chat/:ownerId', contact.newGroupChat);
module.exports = router;