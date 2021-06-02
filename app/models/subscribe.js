module.exports = (sequelize, Sequelize) => {
    const Subscribe = sequelize.define("subscribe", {
      subs_email: {
        type: Sequelize.STRING
      }
    });
  
    return Subscribe;
  };