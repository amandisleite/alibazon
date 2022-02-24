class UserAlreadyExists extends Error {
    constructor(email) {
        super(
        `A user with the e-mail ${email} already exists.
        Please try putting another e-mail or, if you are
        already registered, try to sign in`);
    
        this.name = 'UserAlreadyExists';
        this.errId = 0;
    }
}
  
module.exports = UserAlreadyExists;
  