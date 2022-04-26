module.exports = (sequelize, Sequelize) => sequelize.define('users', {
  fullName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  },
  userToken: {
    type: Sequelize.STRING,
  },
});
  