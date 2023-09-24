const express = require('express');
const router = express.Router();

const auth = require('../controllers/UserAuthController');

router.post('/register', auth.register);
router.post('/register/check-email', auth.check_email);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
// router.get('/profile', auth.profile);

module.exports = router;