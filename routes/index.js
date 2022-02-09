const users = require('./usersRoute');
const categories = require('./categoriesRoute');
const main = require('./mainRoutes');

module.exports = (app) => {
  app.use(
    users,
    categories,
    main,
  )
}