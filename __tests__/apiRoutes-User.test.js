const app = require('../app');
const { UserServices } = require('../services');

describe('User', () => {

    it('should return Sign In request', async () => {
        const user = UserServices.loginUser('aaa@gmail.com', '123456')
        const res = await UserServices.signIn(user)
        expect(res.status).toBe(200)
        expect(res.data.user.email).toBe('aaa@gmail.com')
        expect(res.data.token).toBeDefined()
    })

    it('should return error for already registered user in Sign Up request', async () => {
        const user = UserServices.createUser('abc', 'abc@gmail.com', '123456')
        const res = await UserServices.signUp(user)
        expect(res).toBe('Request failed with status code 400')
    })

})