let express = require("express");
let router = express.Router();
const contactController = require('../../controllers/contactController');
const {authenticate} = require("../../middlerwares/auth")

router.get("/contact", authenticate, contactController.contact);
router.post("/addContact", authenticate,contactController.addContact);

router.delete("/contact", authenticate, contactController.multipleDeleteC)

router.get("/deleteContact", authenticate, contactController.deleteContact);

router.get('/viewContact',  authenticate, contactController.viewContact);

router.get('/editContact', authenticate, contactController.editContact);
router.post('/updateContact', authenticate, contactController.updateContact);


module.exports = router;    