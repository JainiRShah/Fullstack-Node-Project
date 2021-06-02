const logger = require("../loggers/logger");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlerwares/auth");
const { loginValidate, passwordValidate, newPasswordValidate, profileValidate, resetpValidate } = require('../validations/userValidation')
const { GeneralError } = require("../utils/error");
const db = require("../models/sequelize");
const User = db.user;
const saltRounds = 10;
const { OTPsend } = require("../services/mail");

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
logger.info(otp);


exports.register = (req, res) => {
    res.render('register');
}

exports.signup = async (req, res, next) => {
    try {
        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword,
            profileImage: req.file.originalname
        }
        await User.create(user)
        res.redirect('/');
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user registration failed"));
    }
};

exports.login = (req, res) => {
    res.render('login', {
        values: req.body
    });
}

exports.authUser = async (req, res, next) => {
    try {
        let { error } = loginValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'username') {
                var err1 = error.details[0].message;
                return res.render('login', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'password') {
                var err1 = error.details[0].message;
                return res.render('login', {
                    error2: err1,
                    values: req.body
                });
            }
        }
        const value = await User.findOne({ where: { username: req.body.username } })
        if (value) {
            const originalPass = value.password
            const comparision = await bcrypt.compare(req.body.password, originalPass)
            if (comparision) {
                let userdata = {
                    username: value.username,
                    email: value.email,
                    image: value.image,
                    id: value.id,
                };
                let tokenValue = generateToken(userdata);
                const user = { token: tokenValue };
                const updateUser = await User.update(user, {
                    where: { id: value.id }
                })
                if (updateUser) {
                    res.cookie("jwt", tokenValue, {
                        expires: new Date(Date.now() + 30000000)
                    })
                    res.cookie("id", updateUser[0], {
                        expires: new Date(Date.now() + 30000000)
                    })
                    res.redirect('/dashboard');
                }
            } else {
                var err1 = "Email and password does not match";
                return res.render('login', {
                    error: err1,
                    values: req.body
                });
            }
        } else {
            var err1 = "User not found";
            return res.render('login', {
                error: err1,
                values: req.body
            });
        }

    } catch (err) {
        next(new GeneralError("user login failed"));
    }
};

exports.forgetPassword = (req, res) => {
    res.render('forgetPassword')
}

exports.verifyEmail = async (req, res, next) => {
    try {
        let { error } = passwordValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('forgetPassword', {
                    error1: err1
                });
            }
        }
        const value = await User.findOne({ where: { email: req.body.email } })
        if (value) {
            OTPsend(req.body.email, otp);
            res.render('otp', {
                email: req.body.email
            });
        }
        else {
            return res.render('forgetPassword', {
                error: "Please enter valid Email"
            });
        }
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("reset password failed"));
    }
};

exports.verifyOtp = async (req, res, next) => {
    try {
        if (otp == req.body.otp) {
            res.render('newPassword', {
                email: req.body.email,
            });

        } else {
            var err1 = "Please enter correst OTP";
            return res.render('otp', {
                error: err1,
                email: req.body.email,
            });
        }
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("reset password failed"));
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        let { error } = newPasswordValidate(req.body);
        if (error) {

            if (error.details[0].context.key == 'password') {
                let err1 = error.details[0].message;
                return res.render('newPassword', {
                    error1: err1,
                    email: req.body.email,
                });
            }
            if (error.details[0].context.key == 'confirm_password') {
                let err1 = error.details[0].message;
                return res.render('newPassword', {
                    error2: err1,
                    email: req.body.email,
                });
            }
        }
        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const updatePassword1 = { password: encryptedPassword };
        const updateUser = await User.update(updatePassword1, {
            where: { email: req.body.email }
        })
        if (updateUser) {
            res.redirect('/')
        }
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user registration failed"));
    }
};

exports.dashboard = (req, res) => {
    res.render('dashboard');
}

exports.viewProfile = async (req, res, next) => {
    const id = req.cookies.id;
    try {
        const user = await User.findByPk(id)
        if (user) {
            res.render('editProfile', {
                values: user
            });
        }
    } catch (err) {
        next(new GeneralError('error while getting user detail'))
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        let { error } = profileValidate(req.body);
        if (error) {

            if (error.details[0].context.key == 'username') {
                let err1 = error.details[0].message;
                return res.render('editProfile', {
                    error1: err1,
                    values: req.body,
                });
            }
            if (error.details[0].context.key == 'email') {
                let err1 = error.details[0].message;
                return res.render('editProfile', {
                    error2: err1,
                    values: req.body,
                });
            }
        }
        const id = req.cookies.id;
        const user = {
            username: req.body.username,
            email: req.body.email,
        };
        if (req.file) {
            user.profileImage = req.file.originalname
        }
        const updateUser = await User.update(user, {
            where: { id: id }
        })
        if (updateUser) {
            return res.render('editProfile', {
                error: "User Profile is Updated",
                values: req.body
            });
        }
        else {
            return res.render('editProfile', {
                error: "user details updation failed",
                values: req.body
            });
        }
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user details updation failed"));
    }
};

exports.resetPassword = (req, res) => {
    res.render('resetPassword')
}

exports.resetPass = async (req, res, next) => {
    try {
        let { error } = resetpValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'current_password') {
                var err1 = error.details[0].message;
                return res.render('resetPassword', {
                    error1: err1
                });
            }
            if (error.details[0].context.key == 'password') {
                var err1 = error.details[0].message;
                return res.render('resetPassword', {
                    error2: err1
                });
            }
            if (error.details[0].context.key == 'confirm_password') {
                var err1 = error.details[0].message;
                return res.render('resetPassword', {
                    error3: err1
                });
            }
        }
        const id = req.cookies.id;
        const user = await User.findByPk(id)
        if (user) {
            const comparision = await bcrypt.compare(req.body.current_password, user.password);
            if (comparision) {
                const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
                const updatePassword = { password: encryptedPassword };
                const updateUser = await User.update(updatePassword, {
                    where: { id: id }
                })
                if (updateUser) {
                    return res.render('resetPassword', {
                        error: "Your Password has been Reset"
                    });
                } else {
                    return res.render('resetPassword', {
                        error: "Your Password has not been Reset"
                    });
                }
            } else {
                return res.render('resetPassword', {
                    error: "Current Password is incorrect",
                });
            }
        }
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user registration failed"));
    }
};

exports.logout = async (req, res) => {
    try {
      res.clearCookie("jwt");
      res.clearCookie("id");
      res.redirect('/');
    } catch (err) {
      logger.error("err", err)
      next(new GeneralError("user logout failed"));
    }
  };