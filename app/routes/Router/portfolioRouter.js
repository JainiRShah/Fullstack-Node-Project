let express = require("express");
let router = express.Router();
const portfolioController = require('../../controllers/portfolioController');
const { upload } = require("../../services/multer");
const {authenticate} = require("../../middlerwares/auth")

router.get("/portfolio", authenticate, portfolioController.portfolio);
router.post("/addPortfolio", authenticate, upload.single("proj_image"),portfolioController.addPortfolio);

router.delete("/portfolio", authenticate, portfolioController.multipleDeleteP)
router.get("/deletePortfolio", authenticate, portfolioController.deletePortfolio);

router.get('/viewPortfolio',  authenticate, portfolioController.viewPortfolio);

router.get('/editPortfolio', authenticate, portfolioController.editPortfolio);
router.post('/updatePortfolio', authenticate, upload.single("proj_image"),portfolioController.updatePortfolio);

router.post('/updateExcel', authenticate, upload.single("excel"),portfolioController.excelUpload);

module.exports = router;    