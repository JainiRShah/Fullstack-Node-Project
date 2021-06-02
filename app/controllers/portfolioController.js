const logger = require("../loggers/logger");
const { portfolioValidate } = require('../validations/portfolioValidation')
const { GeneralError } = require("../utils/error");
const db = require("../models/sequelize");
const Portfolio = db.portfolio;

exports.multipleDeleteP =  async(req,res, next) =>{
    try{
    await Portfolio.destroy({ where: { id: req.body.id } })
}  catch (err) {
    logger.error("err", err)
    next(new GeneralError("delete failed"));
}
};

exports.portfolio =async (req, res) => {
    const result = await Portfolio.findAll()
    res.render('portfolio',{
        values: req.body,
        users: result
    })
}

exports.addPortfolio = async (req, res, next) => {
    try {
        let { error } = portfolioValidate(req.body);
        const result = await Portfolio.findAll()
        if (error) {
            if (error.details[0].context.key == 'proj_category') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error1: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'proj_name') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error2: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'proj_title') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error4: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'proj_website') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error5: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'proj_date') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error6: err1,
                    values: req.body,
                    users: result
                });
            }
            if (error.details[0].context.key == 'proj_desc') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error7: err1,
                    values: req.body,
                    users: result
                });
            }
        }
        
        if (typeof (req.file) == 'undefined' || typeof (req.file) == undefined) {
            return res.render('portfolio', {
                error3: "Image is required",
                values: req.body,
                users: result
            });
        }else{
        const user = {
            proj_category: req.body.proj_category,
            proj_name: req.body.proj_name,
            proj_image: req.file.originalname,
            proj_title: req.body.proj_title,
            proj_website: req.body.proj_website,
            proj_date: req.body.proj_date,
            proj_desc: req.body.proj_desc
        }
        await Portfolio.create(user)
        res.render('portfolio', {
            message: "User Portfolio is successfully created",
            values: req.body,
            users: result
        });
    }
}
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user portfolio failed"));
    }
};


exports.viewPortfolio =async (req, res) => {
    const id = req.query.id;
    const user = await Portfolio.findByPk(id)
    res.render('viewPortfolio',{
        values: user
    })
}


exports.editPortfolio =async (req, res) => {
    const id = req.query.id;
    const user = await Portfolio.findByPk(id)
    res.render('editPortfolio',{
        values: user
    })
}

exports.updatePortfolio = async (req, res, next) => {
    try {
        let { error } = portfolioValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'proj_category') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_name') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_title') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_website') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error5: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_date') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error6: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_desc') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error7: err1,
                    values: req.body
                });
            }
        }
        const user = {
            proj_category: req.body.proj_category,
            proj_name: req.body.proj_name,
            proj_title: req.body.proj_title,
            proj_website: req.body.proj_website,
            proj_date: req.body.proj_date,
            proj_desc: req.body.proj_desc
        }
        if (req.file) {
            user.proj_image = req.file.originalname
          }
           await Portfolio.update(user, {
            where: { id: req.body.id }
          })
            res.render('editPortfolio', {
            message: "User Portfolio updated successfully",
            values: req.body
        });
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user portfolio failed"));
    }
};

exports.deletePortfolio = async (req, res, next) => {
    const id = req.query.id;
    try {
        await Portfolio.destroy({ where: { id: id } })
        await res.redirect('/portfolio');
    } catch (err) {
      next(new GeneralError('error while deleting user detail'))
    }
  }
  