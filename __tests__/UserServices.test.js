const { createUser, loginUser } = require('../services/UserServices');

describe('UserServices', () => {
   
    it('should be creating user', () => {
        const user = createUser('aaa', 'aaa@gmail.com', '123456')
        expect(user.email).toBe('aaa@gmail.com');
    })

    it('should be formatting user', () => {
        const user = loginUser('aaa@gmail.com', '123456')
        expect(user.email).toBe('aaa@gmail.com')
    })
})