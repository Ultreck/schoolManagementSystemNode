const express = require('express');
const multer = require('multer');
const {registerUsers, loginUsers, userData, getAllData, validateEmail } = require('./controllers/signUpController');
const router = express.Router();
router.use(express.json());

router.get('/datas', getAllData)
router.post('/validate', validateEmail)
router.post('/data', userData)
router.post('/register', registerUsers)
router.post('/login', loginUsers)

module.exports = router;