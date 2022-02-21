const users = require('./usersRoutes');
const categories = require('./categoriesRoutes');
const main = require('./mainRoutes');
const cart = require('./cartRoutes');
const order = require('./orderRoutes');
const wishlist = require('./wishlistRoutes');

const errors = require('../middlewares/errorTreatment')

module.exports = (app) => {
  app.use(
    users,
    wishlist,
    cart,
    order,
    categories,
    main,
    errors
  )
}