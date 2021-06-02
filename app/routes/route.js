let express = require("express");
let router = express.Router();

const userRouter = require('./Router/userRouter');
const portfolioRouter = require('./Router/portfolioRouter');
const contactRouter = require('./Router/contactRouter');
const subscribeRouter = require('./Router/subscribeRouter');
const testimonialRouter = require('./Router/testimonialRouter');

router.use('/', userRouter);
router.use('/', portfolioRouter);
router.use('/', contactRouter);
router.use('/', subscribeRouter);
router.use('/', testimonialRouter);

module.exports = router;