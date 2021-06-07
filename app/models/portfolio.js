module.exports = (sequelize, Sequelize) => {
    const Portfolio = sequelize.define("portfolio", {
      proj_category: {
        type: Sequelize.STRING
      },
      proj_name: {
        type: Sequelize.STRING
      },
      proj_title: {
        type: Sequelize.STRING
      },
      proj_website:{
        type: Sequelize.STRING  
      },
      proj_date:{
        type: Sequelize.DATE  
      },
      proj_desc:{
        type: Sequelize.TEXT  
      }
    });
  
    return Portfolio;
  };