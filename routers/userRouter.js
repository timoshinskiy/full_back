const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/login',controller.login)
router.post('/register',controller.register)
router.patch('/user',controller.getUser);
router.post('/sendmail',controller.sendMailApprove);
router.get('/approve/:uid',controller.approveEmail);
router.get('/forgot/:email',controller.forgotPass);

module.exports = router;