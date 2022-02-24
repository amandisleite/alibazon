const { UserAlreadyExists, InvalidField, OrderNotAvailable, ItemAlreadyChosen } = require('../errors');

module.exports = (err, req, res, next) => {
    let status = 500;
  
    if (err instanceof UserAlreadyExists ||
        err instanceof InvalidField ||
        err instanceof OrderNotAvailable ||
        err instanceof ItemAlreadyChosen) 
    {
        status = 400;
    }

    let path = req.path.substring(1);
    if (path.includes('logout')) {
        path = 'index'
    }
    if (path.includes('wishlist')) {
        path = 'wishlist'
    }
    if (path.includes('cart')) {
        path = 'cart'
    }
    if (path.includes('orders')) {
        path = 'oldOrders'
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