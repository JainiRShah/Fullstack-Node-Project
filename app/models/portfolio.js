module.exports = (sequelize, Sequelize) => {
    const Portfolio = sequelize.define("portfolio", {
      proj_category: {
        type: Sequelize.ENUM,
        values: ['APP_Development', 'Web_Application', 'Window_Application']
      },
      proj_name: {
        type: Sequelize.STRING
      },
      proj_image: {
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