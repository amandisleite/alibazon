const Services = require('./Services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class UserServices extends Services {

    static async signUp(user) {
        return Services.sendData(`${api}auth/signup`, user)
    }

    static async signIn(user) {
        return Services.sendData(`${api}auth/signin`, user)
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