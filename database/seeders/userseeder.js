const bcrypt = require('bcrypt');
const { Seeder } = require('mysql-db-seed');
const usersFile = require('./user.json');
require('dotenv').config();

const seed = new Seeder(
  0,
  process.env.MYSQL_HOST,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  process.env.MYSQL_DATABASE,
);

seed.connection.config.connectionConfig.port = process.env.MYSQL_PORT;
usersFile.forEach((element) => {
  (async () => {
    await seed.seed(0, 'users', {
      fullName: element.fullName,
      email: element.email,
      password: bcrypt.hashSync(element.password, 10),
      phoneNumber: element.phoneNumber,
      address: element.address,
      role: element.role,
      userToken: element.userToken,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    seed.exit();
    process.exit();
  })();
});
