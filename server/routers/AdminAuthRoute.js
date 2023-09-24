const express = require('express');
const router = express.Router();

const auth = require('../controllers/AdminAuthController');

router.post('/create', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.get('/profile', auth.profile);

module.exports = router;