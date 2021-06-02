const logger = require("../loggers/logger");
const { testimonialValidate } = require('../validations/testimonialValidation')
const { GeneralError } = require("../utils/error");
const db = require("../models/sequelize");
const Testimonial = db.testimonial;

exports.multipleDeleteT =  async(req,res, next) =>{
    try{
    console.log(req.body)
    await Testimonial.destroy({ where: { id: req.body.id } })
}  catch (err) {
    logger.error("err", err)
    next(new GeneralError("delete failed"));
}
};

exports.testimonial = async (req, res) => {
    const result = await Testimonial.findAll()
    res.render('testimonial',{
        values: req.body,
      users: result
    })
}

exports.addTestimonial = async (req, res, next) => {
    try {
        const result = await Testimonial.findAll()

        let { error } = testimonialValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'test_name') {
                var err1 = error.details[0].message;
                return res.render('testimonial', {
                    error1: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'designation') {
                var err1 = error.details[0].message;
                return res.render('testimonial', {
                    error2: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'test_desc') {
                var err1 = error.details[0].message;
                return res.render('testimonial', {
                    error3: err1,
                    values: req.body,
                    users: result
                });
            }
        }
        if (typeof (req.file) == 'undefined' || typeof (req.file) == undefined) {
            return res.render('testimonial', {
                error4: "Image is required",
                values: req.body,
                users: result
            });
        }else{
        const user = {
            test_name: req.body.test_name,
            designation: req.body.designation,
            test_desc: req.body.test_desc,
            image: req.file.originalname
        }
        await Testimonial.create(user)
        res.render('testimonial', {
            message: "User testimonial is successfully created",
            values: req.body,
            users: result
        });
    }
}
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user testimonial failed"));
    }
};

exports.viewTestimonial =async (req, res) => {
    const id = req.query.id;
    const user = await Testimonial.findByPk(id)
    res.render('viewTestimonial',{
        values: user
    })
}

exports.editTestimonial =async (req, res) => {
    const id = req.query.id;
    const user = await Testimonial.findByPk(id)
    res.render('editTestimonial',{
        values: user
    })
}

exports.updateTestimonial = async (req, res, next) => {
    try {

        let { error } = testimonialValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'test_name') {
                var err1 = error.details[0].message;
                return res.render('editTestimonial', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'designation') {
                var err1 = error.details[0].message;
                return res.render('editTestimonial', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'test_desc') {
                var err1 = error.details[0].message;
                return res.render('editTestimonial', {
                    error3: err1,
                    values: req.body
                });
            }
        }
        const user = {
            test_name: req.body.test_name,
            designation: req.body.designation,
            test_desc: req.body.test_desc,
        }
        if (req.file) {
            user.image = req.file.originalname
          }
           await Testimonial.update(user, {
            where: { id: req.body.id }
          })
        res.render('editTestimonial', {
            message: "User testimonial is updated successfully ",
            values: req.body
        });
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user testimonial failed"));
    }
};


exports.deleteTestimonial = async (req, res, next) => {
    const id = req.query.id;
    try {
        await Testimonial.destroy({ where: { id: id } })
        await res.redirect('/testimonial');
    } catch (err) {
      next(new GeneralError('error while deleting user detail'))
    }
  }
  