const { InvalidField } = require("../errors");

module.exports = {
    validateUser(req, res, next) {
        const user = req.body;
        
        try {
            if (user === undefined) {
                throw new InvalidField('user')
            }

            if (user.useremail) {
                if (user.useremail.length === 0 || !user.useremail.includes('@')) {
                    throw new InvalidField('e-mail')
                }
            }
            if (user.userpassword) {
                if (user.userpassword.length < 6) {
                    throw new InvalidField('password')
                }
            }
            if(user.username) {
                if (user.username.length < 3) {
                    throw new InvalidField('name')
                }
            }
            return next();
        } catch (err) { next(err) }
    }
}