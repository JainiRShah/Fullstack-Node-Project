module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
      contact_name: {
        type: Sequelize.STRING
      },
      contact_email: {
        type: Sequelize.STRING
      },
      contact_no: {
        type: Sequelize.STRING
      },
      msg:{
        type: Sequelize.TEXT  
      },
      date:{
        type: Sequelize.DATE  
      }
    });
  
    return Contact;
  };