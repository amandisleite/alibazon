const Services = require('./Services');
const secretKey = process.env.SECRET_KEY;

class UserServices extends Services {
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