const { UserServices } = require('../services');

class UserController {
  
    static async signUpUser(req, res, next) {
        const { username, useremail, userpassword } = req.body
        try {
            await UserServices.signUp(username, useremail, userpassword)
            res.redirect('/signin')
        } catch (err) {
            return next(err)
        }
    }

    static async signInUser(req, res, next) {
        const { useremail, userpassword } = req.body
        try {
            const userLogged = await UserServices.signIn(useremail, userpassword)
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
