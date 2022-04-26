/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('../model');

const { User } = db;

exports.login = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const checksum = crypto
          .createHash('md5')
          .update(JSON.stringify({ email }))
          .digest('hex');
        user.update({
          userToken: checksum,
        });
        const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
          expiresIn: '60days',
        });
        res.cookie('key_hash', token);
        return res.json({ success: true });
      }
      return res.json({
        error: true,
        message: 'Incorrect email or password',
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: 'Something went wrong!',
      });
    });
};

exports.logout = async (req, res) => {
  const token = req.cookies.key_hash;
  try {
    const decode = jwt.verify(token, process.env.SECRET_TOKEN);
    User.update(
      {
        userToken: '',
      },
      { where: { email: decode.email } },
    );
  } catch (error) {
    return res.json({ success: false });
  }
  res.clearCookie('key_hash');
  return res.json({ success: true });
};
