const { UserAlreadyExists, InvalidField } = require('../errors');

module.exports = (err, req, res, next) => {
    let status = 500;
  
    if (err instanceof UserAlreadyExists ||
        err instanceof InvalidField) 
    {
      status = 400;
    }

    let path = req.path.substring(1);
    if (path.includes('logout')) {
      path = 'cart'
    }
    if (path.includes('cart')) {
      path = 'cart'
    }
    if (path === 'womens' || path === 'mens') {
      path = 'parentCategory'
    } else {
      let pathSplit = path.split('/')
      if (pathSplit.length === 2) {
        path = 'subcategory'
      }
      if (pathSplit.length === 3) {
        path = 'product'
      }
      if (pathSplit.length === 4) {
        path = 'product-page'
      }
    }

    res.status(status);
    res.render(`${path}`, {
      errMessage: err.message,
      errId: err.errId,
      errName: err.name
    });
    
  };