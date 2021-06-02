const logger = require("../loggers/logger");
const { contactValidate } = require('../validations/contactValidation')
const { GeneralError } = require("../utils/error");
const db = require("../models/sequelize");
const Contact = db.contact;

exports.multipleDeleteC =  async(req,res, next) =>{
    try{
    await Contact.destroy({ where: { id: req.body.id } })
}  catch (err) {
    logger.error("err", err)
    next(new GeneralError("delete failed"));
}
};

exports.contact = async(req, res) => {
    const result = await Contact.findAll()
    res.render('contact',{
        values: req.body,
        users: result
    })
};

exports.addContact = async (req, res, next) => {
    try {
        const result = await Contact.findAll()
        let { error } = contactValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'contact_name') {
                var err1 = error.details[0].message;
                return res.render('contact', {
                    error1: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'contact_email') {
                var err1 = error.details[0].message;
                return res.render('contact', {
                    error2: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'contact_no') {
                var err1 = error.details[0].message;
                return res.render('contact', {
                    error3: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'msg') {
                var err1 = error.details[0].message;
                return res.render('contact', {
                    error4: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                return res.render('contact', {
                    error6: err1,
                    values: req.body,
                    users: result
                });
            }
        }

        const user = {
            contact_name: req.body.contact_name,
            contact_email: req.body.contact_email,
            contact_no: req.body.contact_no,
            msg: req.body.msg,
            date: req.body.date,
        }
        await Contact.create(user)
        res.render('contact', {
            message: "User contact is successfully added",
            values: req.body,
            users: result
        });
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user contact failed"));
    }
};

exports.viewContact =async (req, res) => {
    const id = req.query.id;
    const user = await Contact.findByPk(id)
    res.render('viewContact',{
        values: user
    })
}

exports.editContact =async (req, res) => {
    const id = req.query.id;
    const user = await Contact.findByPk(id)
    res.render('editContact',{
        values: user
    })
}

exports.updateContact = async (req, res, next) => {
    try {
        let { error } = contactValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'contact_name') {
                var err1 = error.details[0].message;
                return res.render('editContact', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'contact_email') {
                var err1 = error.details[0].message;
                return res.render('editContact', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'contact_no') {
                var err1 = error.details[0].message;
                return res.render('editContact', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'msg') {
                var err1 = error.details[0].message;
                return res.render('editContact', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                return res.render('editContact', {
                    error6: err1,
                    values: req.body
                });
            }
        }

        const user = {
            contact_name: req.body.contact_name,
            contact_email: req.body.contact_email,
            contact_no: req.body.contact_no,
            msg: req.body.msg,
            date: req.body.date,
        }
      await Contact.update(user, {
            where: { id: req.body.id }
          })
        res.render('editContact', {
            message: "User contact updated is successfully added",
            values: req.body
        });
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user contact failed"));
    }
};

exports.deleteContact = async (req, res, next) => {
    const id = req.query.id;
    try {
        await Contact.destroy({ where: { id: id } })
        await res.redirect('/contact');
    } catch (err) {
      next(new GeneralError('error while deleting user detail'))
    }
  }
  