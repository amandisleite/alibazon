const { createUser, loginUser } = require('../services/UserServices');
const { validateUser } = require('../middlewares/userValidation')

it('should be invalid e-mail', async () => {
    const user = {
        username: 'aaa',
        useremail: 12345,
        userpassword: '123456'
    }
    
    await expect(() => { validateUser(user) }).toThrow(/invalid/)
})

it('should be invalid name', async () => {
    const user = {
        username: 12345,
        useremail: 'aaa@gmail.com',
        userpassword: '123456'
    }
    await expect(() => { validateUser(user) }).toThrow(/invalid/)
})

it('should be invalid password', async () => {
    const user = createUser('aaa', 12345)
    await expect(() => { validateUser(user) }).toThrow(/invalid/)
})