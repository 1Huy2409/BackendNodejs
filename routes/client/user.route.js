const express = require("express");
const router = express.Router(); //tu express goi mot ham Router
const controller = require("../../controllers/client/user.controller")
const validate = require("../../validates/client/user.validate")

//router register client account
router.get('/register', controller.register);
router.post('/register',
    validate.registerPost,
    controller.registerPost
);

//router login client account
router.get('/login', controller.login);
router.post('/login',
    validate.loginPost,
    controller.loginPost
);

//router logout client account
router.get('/logout', controller.logout);

//router forgot password client account
router.get('/password/forgot', controller.forgotPassword);
router.post('/password/forgot', controller.forgotPasswordPost);
module.exports = router;    