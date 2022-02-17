const users = require('./usersRoutes');
const categories = require('./categoriesRoutes');
const main = require('./mainRoutes');
const cart = require('./cartRoutes');

const errors = require('../middlewares/errorTreatment')

module.exports = (app) => {
  app.use(
    users,
    categories,
    cart,
    main,
    errors
  )
}