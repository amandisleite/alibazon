const app = require('../app');
const { UserAlreadyExists } = require('../errors');
const { UserServices } = require('../services');
const { signUp } = require('../services/UserServices');

describe('User', () => {

    it('should return Sign In request', async () => {
        const res = await UserServices.signIn('aaa@gmail.com', '123456')
        expect(res.status).toBe(200)
        expect(res.data.user.email).toBe('aaa@gmail.com')
        expect(res.data.token).toBeDefined()
    })

    it('should return error for already registered user in Sign Up request', async () => {
        await expect(UserServices.signUp('abc', 'abc@gmail.com', '123456')).rejects.toThrowError(UserAlreadyExists)
    })

})