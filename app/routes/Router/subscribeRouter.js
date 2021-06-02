let express = require("express");
let router = express.Router();
const subscribeController = require('../../controllers/subscribeController');
const {authenticate} = require("../../middlerwares/auth")

router.get("/subscribe", authenticate, subscribeController.subscribe);
router.post("/addSubscribe", authenticate, subscribeController.addSubscribe);

router.delete("/subscribe", authenticate, subscribeController.multipleDeleteS)

router.get("/deleteSubscribe", authenticate, subscribeController.deleteSubscribe);

router.get('/editSubscribe', authenticate, subscribeController.editSubscribe);
router.post('/updateSubscribe', authenticate, subscribeController.updateSubscribe);


module.exports = router;    