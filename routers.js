const express = require('express');
const multer = require('multer');
const {registerUsers, loginUsers } = require('./controllers/signUpController');
const router = express.Router();
router.use(express.json());

router.post('/register', registerUsers)
router.post('/login', loginUsers)

module.exports = router;