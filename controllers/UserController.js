const { UserServices } = require('../services');
const { UserAlreadyExists, CredentialsAreIncorrect } = require('../errors');

class UserController {
  
    static async signUpUser(req, res, next) {
        const { username, useremail, userpassword } = req.body

        const newUser = UserServices.createUser(username, useremail, userpassword);

        try {
            const userExists = await UserServices.signUp(newUser)
            if (userExists === 'Request failed with status code 400') {
                throw new UserAlreadyExists(useremail);
            } else {
                await UserServices.signUp(newUser)    
            }
        } catch (err) {
            return next(err)
        }
    }

    static async signInUser(req, res, next) {
        const { useremail, userpassword } = req.body
        const user = UserServices.loginUser(useremail, userpassword);

        try {
            const userLogged = await UserServices.signIn(user)
            if (userLogged === 'Request failed with status code 400') {
                throw new CredentialsAreIncorrect();
            }
            res.cookie('token', userLogged.data.token)
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
