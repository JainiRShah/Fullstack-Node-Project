const logger = require("../loggers/logger");
const { subscribeValidate } = require('../validations/subscribeValidation')
const { GeneralError } = require("../utils/error");
const db = require("../models/sequelize");
const Subscribe = db.subscribe;

exports.multipleDeleteS =  async(req,res, next) =>{
    try{
    await Subscribe.destroy({ where: { id: req.body.id } })
}  catch (err) {
    logger.error("err", err)
    next(new GeneralError("delete failed"));
}
};

exports.subscribe =async (req, res) => {
    const result = await Subscribe.findAll()
    res.render('subscribe',{
        users: result
    })
}

exports.addSubscribe = async (req, res, next) => {
    try {
        const result = await Subscribe.findAll()
        let { error } = subscribeValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'subs_email') {
                var err1 = error.details[0].message;
                return res.render('subscribe', {
                    error1: err1,
                    users: result
                });
            }
        }
        const user = {  
            subs_email: req.body.subs_email,
        }
        await Subscribe.create(user)
        res.render('subscribe', {
            message: "User subscribe is successfully added",
            users: result
        });
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user subscribe failed"));
    }
};

exports.editSubscribe =async (req, res) => {
    const id = req.query.id;
    const user = await Subscribe.findByPk(id)
    res.render('editSubscribe',{
        values: user
    })
}

exports.updateSubscribe = async (req, res, next) => {
    try {
        let { error } = subscribeValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'subs_email') {
                var err1 = error.details[0].message;
                return res.render('editSubscribe', {
                    error1: err1,
                    users: req.body
                });
            }
        }
        const user = {  
            subs_email: req.body.subs_email,
        }
        await Subscribe.update(user, {
            where: { id: req.body.id }
          })      
            res.render('subscribe', {
            message: "User subscribe is updated successfully",
            users: req.body
        });
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user subscribe failed"));
    }
};

exports.deleteSubscribe = async (req, res, next) => {
    const id = req.query.id;
  
    try {
        await Subscribe.destroy({ where: { id: id } })
        await res.redirect('/subscribe');
    } catch (err) {
      next(new GeneralError('error while deleting user detail'))
    }
  }
  