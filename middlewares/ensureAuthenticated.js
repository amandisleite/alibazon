const errors = require('../errors');

module.exports = {

    async ensureAuthenticated(req, res, next) {
    try {
    let token = req.cookies.token;

    if (!token) {
      throw new errors.UserNotAuthenticated();
    }

      return next();

    } catch (err) {
      return next(err);
    }
  }
}