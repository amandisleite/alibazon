const request = require('supertest');
const app = require('../app');

afterEach(() => {
    jest.useRealTimers();
  });

describe('Routes', () => {
    jest.useFakeTimers('legacy');

    it('should return status 200 in the Mens request', async () => {
        const res = await request(app).get('/mens')
        expect(res.status).toBe(200)
    })

    it('should return status 200 in the Womens request', async () => {
        const res = await request(app).get('/womens')
        expect(res.status).toBe(200)
    })

    it('should return status 200 in a Womens Subcategory request', async () => {
        const res = await request(app).get('/womens/womens-clothing-tops')
        expect(res.status).toBe(200)
    })

    it('should return status 200 in a Mens Subcategory request', async () => {
        const res = await request(app).get('/mens/mens-accessories-luggage')
        expect(res.status).toBe(200)
    })
    
    it('should return status 200 in a Womens Product request', async () => {
        const res = await request(app).get('/womens/womens-jewelry-earrings/25720029')
        expect(res.status).toBe(200)
    })

    it('should return status 200 in a Mens Product request', async () => {
        const res = await request(app).get('/mens/mens-accessories-ties/25752235')
        expect(res.status).toBe(200)
    })
    
    it('should return status 200 when user already registered signs in', async () => {
            const res = await request(app)
                .post('/signin')
                .send({
                    "useremail": "aaa@gmail.com",
                    "userpassword": "123456"
                })
            expect(res.status).toBe(200)
    })

    it('should return status 500 when unexisting user tries to sign in', async () => {
        const res = await request(app)
            .post('/signin')
            .send({
                "useremail": "abc@gmail.com",
                "userpassword": "121212"
            })
        expect(res.status).toBe(500)
})
})