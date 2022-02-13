const { InvalidField } = require("../errors");

module.exports = {
    validateUser(req, res, next) {
        const user = req.body;
        
        try {
            if (user === undefined) {
                throw new InvalidField('user')
            }

            if (user.useremail) {
                if (typeof user.useremail !== 'string' || user.useremail.length === 0 || !user.useremail.includes('@.com')) {
                    throw new InvalidField('e-mail')
                }
            }
            if (user.userpassword) {
                if (typeof user.userpassword !== 'string' || user.userpassword.length < 6) {
                    throw new InvalidField('password')
                }
            }
            if(user.username) {
                if (typeof user.username !== 'string' || user.username.length < 3) {
                    throw new InvalidField('name')
                }
            }
            return next();
        } catch (err) { next(err) }
    }
}