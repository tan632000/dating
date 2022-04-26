/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../model');

const { User } = db;

module.exports = async (req, res, next) => {
  const token = req.cookies.key_hash;
  try {
    const decode = jwt.verify(token, process.env.SECRET_TOKEN);
    if (!decode || !decode.username) {
      throw 'Invalid user!';
    }
    const userdb = await User.findOne({
      where: {
        username: decode.username,
      },
    });
    if (!userdb) {
      throw 'Invalid user!';
    }
    const checksum = crypto
      .createHash('md5')
      .update(JSON.stringify({ username: decode.username }))
      .digest('hex');
    if (checksum !== userdb.userToken) {
      throw 'Invalid user!';
    }
    if (checksum === userdb.userToken && req.path === '/login') {
      return res.redirect('/dashboard');
    }
  } catch (error) {
    if (req.path === '/login') {
      return next();
    }
    return res.redirect('/login');
  }
  return next();
};
