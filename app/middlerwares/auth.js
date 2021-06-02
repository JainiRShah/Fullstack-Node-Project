const jwt = require("jsonwebtoken");
const logger = require('../loggers/logger')
const db = require("../models/sequelize");
const User = db.user;

// Middeware for Generating a new JWT Token
const generateToken = (data) => {
  let token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
  return token;
};

//authenticate
const authenticate = async (req, res, next) => {

  try {
    const token = req.cookies.jwt;
    if (token == undefined) {
      res.redirect('/');
    }

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log("1", verifyUser)
    User.findOne({ where: {id: verifyUser.id} }, async (err, response) => {
      console.log("respo", response)
      if (err) {
        logger.error(err);
        res.redirect('/');
      }
    })

    next();
  } catch (error) {
    logger.info(error)
  }
}




module.exports = {
  authenticate,
  generateToken
};
