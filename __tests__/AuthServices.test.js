const { createUser, loginUser, validateUser } = require('../services/UserServices');

describe('AuthServices', () => {
   
    it('should be creating user', () => {
        const user = createUser('aaa', 'aaa@gmail.com', '123456')
        expect(user.email).toBe('aaa@gmail.com');
    })

    // it('should be invalid e-mail', async () => {
    //     const user = createUser('aaa', 12345, '123456')
    //     await expect(() => { validateUser(user) }).toThrow(/invalid/)
    // })

    // it('should be invalid name', async () => {
    //     const user = createUser(123456, 'aaa@gmail.com', '123456')
    //     await expect(() => { validateUser(user) }).toThrow(/invalid/)
    // })

    // it('should be invalid password', async () => {
    //     const user = createUser('aaa', 12345)
    //     await expect(() => { validateUser(user) }).toThrow(/invalid/)
    // })

    it('should be formatting user', () => {
        const user = loginUser('aaa@gmail.com', '123456')
        expect(user.email).toBe('aaa@gmail.com')
    })
})