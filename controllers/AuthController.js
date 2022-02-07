const { AuthServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class AuthController {
  
  static async signUpUser(req, res, next) {
    const { username, useremail, userpassword } = req.body

    const newUser = {
      secretKey: secretKey,
      name: username,
      email: useremail,
      password: userpassword
    }

    try {
      await AuthServices.sendData(`${api}auth/signup`, newUser)
      res.cookie("username", req.body.username)
      res.render("signin", { name: req.body.username })
      res.status(200)        
    } catch (err) { next(err) }
  }

  static async signInUser(req, res, next) {
    const { useremail, userpassword } = req.body

    const user = {
      secretKey: secretKey,
      email: useremail,
      password: userpassword
    }

    try {
      const userLogged = await AuthServices.sendData(`${api}auth/signin`, user)
      res.cookie("username", userLogged.data.user.name)
      res.render("index", { name: userLogged.data.user.name})
      res.status(200)        
      
    } catch (err) { next(err) }
  }
}
    
module.exports = AuthController;
