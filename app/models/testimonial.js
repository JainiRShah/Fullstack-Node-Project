module.exports = (sequelize, Sequelize) => {
    const Testimonial = sequelize.define("testimonial", {
      test_name: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      test_desc: {
        type: Sequelize.TEXT
      },
      image:{
        type: Sequelize.STRING  
      }
    });
  
    return Testimonial;
  };