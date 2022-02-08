const Services = require('./Services');
const secretKey = process.env.SECRET_KEY;

class AuthServices extends Services {
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

    static validateUser(user) {
        if (typeof user.email !== 'string' || user.email.length === 0) {
            throw new Error('e-mail is invalid')
        }
        if (typeof user.password !== 'string' || user.password.length === 0) {
            throw new Error('password is invalid')
        }
        if(user.name) {
            if (typeof user.name !== 'string' || user.name.length === 0) {
                throw new Error('name is invalid')
            }
        }
    }
}

module.exports = AuthServices;