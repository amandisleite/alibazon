const Services = require('./Services');
const { UserAlreadyExists, CredentialsAreIncorrect } = require('../errors');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class UserServices extends Services {

    static async signUp(name, email, password) {
        const newUser = this.createUser(name, email, password);
        const tryToSignUp = await Services.sendData(`${api}auth/signup`, newUser)
        if (tryToSignUp === 'Request failed with status code 400') {
            throw new UserAlreadyExists(email);
        } else {
            return tryToSignUp;
        }
    }

    static async signIn(email, password) {
        const user = this.loginUser(email, password);
        const userLogged = await Services.sendData(`${api}auth/signin`, user)
        if (userLogged === 'Request failed with status code 400') {
            throw new CredentialsAreIncorrect();
        } else {
            return userLogged;
        }
    }

    static createUser(name, email, password) {
        const data = {
            secretKey: secretKey,
            name: name,
            email: email,
            password: password
        }
        return data;
    }

    static loginUser(email, password) {
        const data = {
            secretKey: secretKey,
            email: email,
            password: password
        }
        return data;
    }
}

module.exports = UserServices;