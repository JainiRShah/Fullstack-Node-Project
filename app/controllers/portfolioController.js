const logger = require("../loggers/logger");
const { portfolioValidate } = require('../validations/portfolioValidation')
const { GeneralError } = require("../utils/error");
const db = require("../models/sequelize");
const Portfolio = db.portfolio;
const Pcategory = db.portfolio_category
const Pimage = db.portfolio_image

const readXlsxFile = require("read-excel-file/node");

exports.multipleDeleteP = async (req, res, next) => {
    try {
        await Portfolio.destroy({ where: { id: req.body.id } })
    } catch (err) {
        logger.error("err", err)
        next(new GeneralError("delete failed"));
    }
};

exports.portfolio = async (req, res) => {
    const category = await Pcategory.findAll()
    Pcategory.hasMany(Portfolio, { foreignKey: 'id' })
    Portfolio.belongsTo(Pcategory, { foreignKey: 'proj_category' })
    const result = await Portfolio.findAll({ include: [Pcategory] })
    res.render('portfolio', {
        values: req.body,
        users: result,
        categories: category
    })
}

exports.addPortfolio = async (req, res, next) => {
    try {
        console.log(req.file)
        const category = await Pcategory.findAll()
        Pcategory.hasMany(Portfolio, { foreignKey: 'id' })
        Portfolio.belongsTo(Pcategory, { foreignKey: 'proj_category' })
        const result = await Portfolio.findAll({ include: [Pcategory] })
        let { proj_category, proj_name, proj_title, proj_website, proj_date, proj_desc } = req.body

        let { error } = portfolioValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'proj_category') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error1: err1,
                    values: req.body,
                    users: result,
                    categories: category
                });
            }
            if (error.details[0].context.key == 'proj_name') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error2: err1,
                    values: req.body,
                    users: result,
                    categories: category
                });
            }
            if (error.details[0].context.key == 'proj_title') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error4: err1,
                    values: req.body,
                    users: result,
                    categories: category
                });
            }
            if (error.details[0].context.key == 'proj_website') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error5: err1,
                    values: req.body,
                    users: result,
                    categories: category
                });
            }
            if (error.details[0].context.key == 'proj_date') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error6: err1,
                    values: req.body,
                    users: result,
                    categories: category
                });
            }
            if (error.details[0].context.key == 'proj_desc') {
                var err1 = error.details[0].message;
                return res.render('portfolio', {
                    error7: err1,
                    values: req.body,
                    users: result,
                    categories: category
                });
            }
        }

        if (typeof (req.file) == 'undefined' || typeof (req.file) == undefined) {
            return res.render('portfolio', {
                error3: "Image is required",
                values: req.body,
                users: result,
                categories: category
            });
        } else {
            const user = {
                proj_category, proj_name, proj_title, proj_website, proj_date, proj_desc
            }
            console.log(req.file)
            const userImage = {
                proj_name, proj_image: req.file.originalname
            }
            await Portfolio.create(user)
            await Pimage.create(userImage)
            res.render('portfolio', {
                message: "User Portfolio is successfully created",
                values: req.body,
                users: result,
                categories: category
            });
        }
    }
    catch (err) {
        logger.error("err", err)
        next(new GeneralError("user portfolio failed"));
    }
};


exports.viewPortfolio = async (req, res) => {
    const id = req.query.id;
    Pcategory.hasMany(Portfolio, { foreignKey: 'id' })
    Portfolio.belongsTo(Pcategory, { foreignKey: 'proj_category' })
    const result = await Portfolio.findAll({ include: [Pcategory] })
    const user = await Portfolio.findByPk(id)
    const image = await Pimage.findByPk(id)

    console.log(user)
    res.render('viewPortfolio', {
        values: user,
        results: result,
        images: image
    })
}


exports.editPortfolio = async (req, res) => {
    const id = req.query.id;
    const user = await Portfolio.findByPk(id)
    Pcategory.hasMany(Portfolio, { foreignKey: 'id' })
    Portfolio.belongsTo(Pcategory, { foreignKey: 'proj_category' })
    const result = await Portfolio.findAll({ include: [Pcategory] })
    const image = await Pimage.findByPk(id)

    console.log(result)
    const category = await Pcategory.findAll()
    res.render('editPortfolio', {
        values: user,
        results: result,
        categories: category,
        images: image
    })
}

exports.updatePortfolio = async (req, res, next) => {
    try {
        Pcategory.hasMany(Portfolio, { foreignKey: 'id' })
        Portfolio.belongsTo(Pcategory, { foreignKey: 'proj_category' })
        const result = await Portfolio.findAll({ include: [Pcategory] })
        const category = await Pcategory.findAll()
        const image = await Pimage.findByPk(id)

        let { proj_category, proj_name, proj_title, proj_website, proj_date, proj_desc } = req.body

        let { error } = portfolioValidate(req.body);

        if (error) {
            if (error.details[0].context.key == 'proj_category') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error1: err1,
                    values: req.body,
                    results: result,
                    categories: category,
                    images: image
                });
            }
            if (error.details[0].context.key == 'proj_name') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error2: err1,
                    values: req.body,
                    results: result,
                    categories: category,
                    images:image
                });
            }
            if (error.details[0].context.key == 'proj_title') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error4: err1,
                    values: req.body,
                    results: result,
                    categories: category,
                    images:image
                });
            }
            if (error.details[0].context.key == 'proj_website') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error5: err1,
                    values: req.body,
                    results: result,
                    categories: category,
                    images:image
                });
            }
            if (error.details[0].context.key == 'proj_date') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error6: err1,
                    values: req.body,
                    results: result,
                    categories: category,
                    images:image
                });
            }
            if (error.details[0].context.key == 'proj_desc') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error7: err1,
                    values: req.body,
                    results: result,
                    categories: category,
                    images:image
                });
            }
        }
        console.log(req.body)
        const user = {
            proj_category, proj_name, proj_title, proj_website, proj_date, proj_desc
        }
        console.log(req.file)

        if (req.file) {
            var userImage = {
                proj_name, proj_image: req.file.originalname
            }
        }
        await Pimage.update(userImage, {
            where: { id: req.body.id }
        })
        await Portfolio.update(user, {
            where: { id: req.body.id }
        })
        res.render('editPortfolio', {
            message: "User Portfolio updated successfully",
            values: req.body,
            results: result,
            categories: category,
            images:req.file.originalname
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



exports.excelUpload = (req, res) => {
   
        try {
          if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
          }
      console.log(__basedir)
          let path =
            __basedir + "/public/assets/uploads/" + req.file.filename;
      
          readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();
      
            let tutorials = [];
      
            rows.forEach((row) => {
                console.log(row)
              let tutorial = {
                id: row[0],
                proj_category: row[1],
                proj_name: row[2],
                proj_title: row[3],
                proj_website: row[4],
                proj_date: row[5],
                proj_desc: row[6]
              };
      
              tutorials.push(tutorial);
              console.log(tutorials)
            });
      
            Portfolio.bulkCreate(tutorials)
              .then(() => {
                res.status(200).send({
                  message: "Uploaded the file successfully: " + req.file.originalname,
                });
              })
              .catch((error) => {
                res.status(500).send({
                  message: "Fail to import data into database!",
                  error: error.message,
                });
              });
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
          });
        }
      };


