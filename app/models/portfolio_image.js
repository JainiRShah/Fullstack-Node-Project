module.exports = (sequelize, Sequelize) => {
    const Pimage = sequelize.define("portfolio_image", {
        proj_name: {
            type: Sequelize.STRING
          },
      proj_image: {
        type: Sequelize.STRING
      }
    });
  
    return Pimage;
  };