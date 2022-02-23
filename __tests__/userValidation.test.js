const request = require('supertest');
const app = require('../app');

describe('userValidation', () => {
    it('should be invalid e-mail', async () => {
        const user = {
            "username": 'aaa',
            "useremail": '12345',
            "userpassword": '123456'
        }
    
        const res = await request(app)
                .post('/signup')
                .send(user)
        await expect(res.text).toContain('invalid')
    })
    
    it('should be invalid password', async () => {
        const user = {
            "username": 'aaa',
            "useremail": '12345@.com',
            "userpassword": '1234'
        }
    
        const res = await request(app)
                .post('/signup')
                .send(user)
        await expect(res.text).toContain('invalid')
    })

    it('should be invalid name', async () => {
        const user = {
            "username": 'a',
            "useremail": '12345@.com',
            "userpassword": '123456'
        }
    
        const res = await request(app)
                .post('/signup')
                .send(user)
        await expect(res.text).toContain('invalid')
    })

    it('should show error that e-mail is already registered', async () => {
        const user = {
            "username": 'aaa',
            "useremail": 'aaa@gmail.com',
            "userpassword": '123456'
        }
    
        const res = await request(app)
                .post('/signup')
                .send(user)
        await expect(res.text).toContain('already exists')
    })
})