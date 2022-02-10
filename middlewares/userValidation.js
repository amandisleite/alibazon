module.exports = {
    validateUser(req, res, next) {
        const user = req.body;
        
        try {
            if (user === undefined) {
                throw new Error('user is invalid')
            }

            if (user.useremail) {
                if (typeof user.useremail !== 'string' || user.useremail.length === 0) {
                    throw new Error('e-mail is invalid')
                }
            }
            if (user.userpassword) {
                if (typeof user.userpassword !== 'string' || user.userpassword.length === 0) {
                    throw new Error('password is invalid')
                }
            }
            if(user.username) {
                if (typeof user.username !== 'string' || user.username.length === 0) {
                    throw new Error('name is invalid')
                }
            }
            return next();
        } catch (err) {
            next(err)
            res.render('index', { err: err.message })
        }
    }
}