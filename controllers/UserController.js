const { UserAlreadyExists } = require('../errors');
const { UserServices } = require('../services');
const { createUser, loginUser } = require('../services/UserServices');

const api = process.env.API_URL;

class UserController {
  
    static async signUpUser(req, res, next) {
        const { username, useremail, userpassword } = req.body

        const newUser = createUser(username, useremail, userpassword);

        try {
          const userExists = await UserServices.sendData(`${api}auth/signup`, newUser)
          if (userExists === 'Request failed with status code 400') {
            throw new UserAlreadyExists(useremail);
          } else {
            await UserServices.sendData(`${api}auth/signup`, newUser)    
          }
        } catch (err) {
          return next(err)
        }
    }

    static async signInUser(req, res, next) {
        const { useremail, userpassword } = req.body

        const user = loginUser(useremail, userpassword);

        try {
          const userLogged = await UserServices.sendData(`${api}auth/signin`, user)

          res.cookie('token', userLogged.data.token)
          res.locals.token = userLogged.data.token
          res.locals.name = userLogged.data.user.name
          res.redirect('/')     
          
        } catch (err) {
          return next(err)
        }
    }

    static logoutUser(req, res, next) {  
        res.clearCookie('token')
        res.redirect('/')       
    }
}
    
module.exports = UserController;
