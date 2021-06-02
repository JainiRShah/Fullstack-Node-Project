let express = require("express");
let router = express.Router();
const testimonialController = require('../../controllers/testimonialController');
const { upload } = require("../../services/multer");
const {authenticate} = require("../../middlerwares/auth")

router.get("/testimonial", authenticate, testimonialController.testimonial);
router.post("/addTestimonial", authenticate, upload.single("image"),testimonialController.addTestimonial);

router.delete("/testimonial", authenticate, testimonialController.multipleDeleteT)

router.get("/deleteTestimonial", authenticate, testimonialController.deleteTestimonial);

router.get('/viewTestimonial',  authenticate, testimonialController.viewTestimonial);

router.get('/editTestimonial', authenticate, testimonialController.editTestimonial);
router.post('/updateTestimonial', authenticate, upload.single("image"),testimonialController.updateTestimonial);

module.exports = router;    