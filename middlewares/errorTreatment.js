const UserAlreadyExists = require('../errors/UserAlreadyExists');

module.exports = (err, req, res, next) => {
    let status = 500;
  
    if (err instanceof UserAlreadyExists) {
      status = 400;
    }

    let path = req.path.substring(1);
    if (path === 'womens' || path === 'mens') {
      path = 'category'
    }

    res.status(status);
    res.render(`${path}`, {
      errMessage: err.message,
      errId: err.errId,
      errName: err.name
    });
    
  };