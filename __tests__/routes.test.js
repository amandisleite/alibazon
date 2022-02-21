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

    it('should return status 200 in a Womens Parent category request', async () => {
        const res = await request(app).get('/womens/clothing')
        expect(res.status).toBe(200)
    })

    it('should return status 200 in a Mens Parent category request', async () => {
        const res = await request(app).get('/mens/accessories')
        expect(res.status).toBe(200)
    })

    it('should return status 200 in a Womens Subcategory request', async () => {
        const res = await request(app).get('/womens/clothing/womens-clothing-tops')
        expect(res.status).toBe(200)
    })

    it('should return status 200 in a Mens Subcategory request', async () => {
        const res = await request(app).get('/mens/accessories/mens-accessories-gloves')
        expect(res.status).toBe(200)
    })
    
    it('should return status 200 in a Womens Product request', async () => {
        const res = await request(app).get('/womens/jewelry/womens-jewelry-necklaces/25720078')
        expect(res.status).toBe(200)
    })

    it('should return status 200 in a Mens Product request', async () => {
        const res = await request(app).get('/mens/accessories/mens-accessories-gloves/TG250')
        expect(res.status).toBe(200)
    })
    
    it('should return status 302 when user already registered signs in', async () => {
            const res = await request(app)
                .post('/signin')
                .send({
                    "useremail": "aaa@gmail.com",
                    "userpassword": "123456"
                })
            expect(res.status).toBe(302)
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