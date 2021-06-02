let express = require("express");
let router = express.Router();
const userController = require('../../controllers/userController');
const { upload } = require("../../services/multer");
const {authenticate} = require("../../middlerwares/auth")

router.get("/register", userController.register);
router.post("/signup",upload.single("profileImage"),  userController.signup);

router.get('/', userController.login);
router.post('/authUser', userController.authUser);

router.get("/forgetPassword", userController.forgetPassword);
router.post("/verifyEmail", userController.verifyEmail);

router.post("/verifyOtp", userController.verifyOtp);
router.post("/updatePassword", userController.updatePassword);

router.get("/dashboard", authenticate, userController.dashboard)

router.get("/editProfile", authenticate, userController.viewProfile)
router.post("/updateProfile", authenticate,upload.single("profileImage"), userController.updateProfile);

router.get("/resetPassword", authenticate, userController.resetPassword);
router.post("/resetPass", authenticate, userController.resetPass);

router.get("/logout", authenticate, userController.logout)

module.exports = router;    