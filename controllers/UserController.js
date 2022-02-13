const { UserAlreadyExists } = require('../errors');
const { UserServices } = require('../services');
const { createUser, loginUser } = require('../services/UserServices');

const api = process.env.API_URL;

class UserController {
  
  static async signUpUser(req, res, next) {
    const { username, useremail, userpassword } = req.body

    const newUser = createUser(username, useremail, userpassword);

    try {
      // const userExists = await UserServices.sendData(`${api}auth/signup`, newUser)
      // console.log(userExists)
      // if (userExists === 'Request failed with status code 400') {
      //   throw new UserAlreadyExists(useremail);
      // } else {
        await UserServices.sendData(`${api}auth/signup`, newUser)
        res.cookie("username", req.body.username)
        res.render("signup", { name: req.body.username })
        res.status(200)        
      // }
    } catch (err) {
      return next(err)
    }
  }

  static async signInUser(req, res, next) {
    const { useremail, userpassword } = req.body

    const user = loginUser(useremail, userpassword);

    try {
      const userLogged = await UserServices.sendData(`${api}auth/signin`, user)
      res.cookie("username", userLogged.data.user.name)
      res.render("index", { name: userLogged.data.user.name})
      res.status(200)        
      
    } catch (err) {
      return next(err)
    }
  }

  // static async userExists(user) {
  //   const { useremail, userpassword } = req.body

  //   const user = loginUser(useremail, userpassword);

  //   try {
  //     const userExists = await UserServices.sendData(`${api}auth/signin`, user)
  //     if (userExists) {
  //       throw new Error('user already registered')
  //     }
      
  //     res.render("index", { name: userLogged.data.user.name})
  //     res.status(200)        
      
  //   } catch (err) {
  //     res.send({ err: err.message })
  //     res.status(400)
  //   }
  // }
}
    
module.exports = UserController;
