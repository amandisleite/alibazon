const users = require('./usersRoute');
const categories = require('./categoriesRoute');
const main = require('./mainRoutes');

const errors = require('../middlewares/errorTreatment')

module.exports = (app) => {
  app.use(
    users,
    categories,
    main,
    errors
  )
}