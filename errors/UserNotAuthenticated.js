class UserNotAuthenticated extends Error {
    constructor() {
      super('User is not authenticated. Please, sign in or sign up first.');
  
      this.name = 'UserNotAuthenticated';
      this.errId = 2;
    }
  }
  
  module.exports = UserNotAuthenticated;
  