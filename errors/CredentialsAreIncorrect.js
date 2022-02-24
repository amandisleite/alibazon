class CredentialsAreIncorrect extends Error {
    constructor() {
        super('Your e-mail or password are incorrect.');
    
        this.name = 'CredentialsAreIncorrect';
        this.errId = 5;
    }
}
  
module.exports = CredentialsAreIncorrect;
  