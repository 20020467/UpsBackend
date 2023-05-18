const { Account } = require("../models");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
