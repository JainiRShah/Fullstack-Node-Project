module.exports = (sequelize, Sequelize) => {
    const Pcategory = sequelize.define("portfolio_category", {
      p_category: {
        type: Sequelize.STRING
      }
    });
  
    return Pcategory;
  };