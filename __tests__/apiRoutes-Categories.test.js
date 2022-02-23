const Services = require('../services/Services');
const request = require('supertest');
const app = require('../app');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

afterEach(() => {
    jest.useRealTimers();
  });


describe('Main Categories', () => {
    jest.useFakeTimers('legacy');

    it('should return Mens request', async () => {
        const res = await Services.getData(`${api}/categories/mens?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens')
    })

    it('should return Womens request', async () => {
        const res = await Services.getData(`${api}/categories/womens?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens')
    })
})

describe('Parent Categories - Mens', () => {
    jest.useFakeTimers('legacy');

    it('should return Mens Clothing request', async () => {
        const res = await Services.getData(`${api}/categories/mens-clothing?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens-clothing')
    })

    it('should return Mens Accessories request', async () => {
        const res = await Services.getData(`${api}/categories/mens-accessories?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens-accessories')
    })
})

describe('Parent Categories - Womens', () => {
    jest.useFakeTimers('legacy');
    
    it('should return Womens Clothing request', async () => {
        const res = await Services.getData(`${api}/categories/womens-clothing?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-clothing')
    })

    it('should return Womens Accessories request', async () => {
        const res = await Services.getData(`${api}/categories/womens-accessories?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-accessories')
    })

    it('should return Womens Jewelry request', async () => {
        const res = await Services.getData(`${api}/categories/womens-jewelry?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-jewelry')
    })
})

describe('Subcategory Clothing - Mens', () => {
    jest.useFakeTimers('legacy');

    it('should return Mens Clothing Dress Shirts request', async () => {
        const res = await Services.getData(`${api}/categories/mens-clothing-dress-shirts?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens-clothing-dress-shirts')
    })

    it('should return Mens Clothing Shorts request', async () => {
        const res = await Services.getData(`${api}/categories/mens-clothing-shorts?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens-clothing-shorts')
    })

    it('should return Mens Clothing Jackets request', async () => {
        const res = await Services.getData(`${api}/categories/mens-clothing-jackets?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens-clothing-jackets')
    })

    it('should return Mens Clothing Pants request', async () => {
        const res = await Services.getData(`${api}/categories/mens-clothing-pants?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens-clothing-pants')
    })

    it('should return Mens Clothing Suits request', async () => {
        const res = await Services.getData(`${api}/categories/mens-clothing-suits?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens-clothing-suits')
    })
})

describe('Subcategory Accessories - Mens', () => {
    jest.useFakeTimers('legacy');

    it('should return Mens Accessories Luggage request', async () => {
        const res = await Services.getData(`${api}/categories/mens-accessories-luggage?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens-accessories-luggage')
    })

    it('should return Mens Accessories Gloves request', async () => {
        const res = await Services.getData(`${api}/categories/mens-accessories-gloves?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens-accessories-gloves')
    })

    it('should return Mens Accessories Ties request', async () => {
        const res = await Services.getData(`${api}/categories/mens-accessories-ties?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('mens-accessories-ties')
    })
})

describe('Subcategory Clothing - Womens', () => {
    jest.useFakeTimers('legacy');

    it('should return Womens Clothing Dresses', async () => {
        const res = await Services.getData(`${api}/categories/womens-clothing-dresses?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-clothing-dresses')
    })

    it('should return Womens Clothing Jackets', async () => {
        const res = await Services.getData(`${api}/categories/womens-clothing-jackets?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-clothing-jackets')
    })

    it('should return Womens Clothing Bottoms', async () => {
        const res = await Services.getData(`${api}/categories/womens-clothing-bottoms?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-clothing-bottoms')
    })

    it('should return Womens Clothing Tops', async () => {
        const res = await Services.getData(`${api}/categories/womens-clothing-tops?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-clothing-tops')
    })
})

describe('Subcategory Accessories - Womens', () => {
    jest.useFakeTimers('legacy');

    it('should return Womens Accessories Scarves', async () => {
        const res = await Services.getData(`${api}/categories/womens-accessories-scarves?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-accessories-scarves')
    })

    it('should return Womens Accessories Shoes', async () => {
        const res = await Services.getData(`${api}/categories/womens-accessories-shoes?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-accessories-shoes')
    })
})

describe('Subcategory Jewelry - Womens', () => {
    jest.useFakeTimers('legacy');

    it('should return Womens Jewelry Earrings', async () => {
        const res = await Services.getData(`${api}/categories/womens-jewelry-earrings?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-jewelry-earrings')
    })

    it('should return Womens Jewelry Bracelets', async () => {
        const res = await Services.getData(`${api}/categories/womens-jewlery-bracelets?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-jewlery-bracelets')
    })

    it('should return Womens Jewelry Necklaces', async () => {
        const res = await Services.getData(`${api}/categories/womens-jewelry-necklaces?secretKey=${secretKey}`)
        expect(res.status).toBe(200)
        expect(res.data.id).toBe('womens-jewelry-necklaces')
    })

})

describe('Subcategory Clothing - Products - Mens', () => {
    jest.useFakeTimers('legacy');

    it('should return products of Mens Clothing Dress Shirts request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=mens-clothing-dress-shirts&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-clothing-dress-shirts')
        }
    })

    it('should return products of Mens Clothing Shorts request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=mens-clothing-shorts&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-clothing-shorts')
        }
    })

    it('should return products of Mens Clothing Jackets request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=mens-clothing-jackets&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-clothing-jackets')
        }
    })

    it('should return products of Mens Clothing Pants request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=mens-clothing-pants&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-clothing-pants')
        }
    })

    it('should return products of Mens Clothing Suits request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=mens-clothing-suits&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-clothing-suits')
        }
    })
})

describe('Subcategory Accessories - Products - Mens', () => {
    jest.useFakeTimers('legacy');

    it('should return products of Mens Accessories Luggage request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=mens-accessories-luggage&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-accessories-luggage')
        }
    })

    it('should return products of Mens Accessories Gloves request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=mens-accessories-gloves&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-accessories-gloves')
        }
    })

    it('should return products of Mens Accessories Ties request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=mens-accessories-ties&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-accessories-ties')
        }
    })
})

describe('Subcategory Clothing - Products - Womens', () => {
    jest.useFakeTimers('legacy');

    it('should return products of Womens Clothing Dresses request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=womens-clothing-dresses&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-clothing-dresses')
        }
    })

    it('should return products of Womens Clothing Jackets request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=womens-clothing-jackets&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-clothing-jackets')
        }
    })

    it('should return products of Womens Clothing Bottoms request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=womens-clothing-bottoms&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-clothing-bottoms')
        }
    })

    it('should return products of Womens Clothing Tops request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=womens-clothing-tops&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-clothing-tops')
        }
    })
})

describe('Subcategory Accessories - Products - Womens', () => {
    jest.useFakeTimers('legacy');

    it('should return products of Womens Accessories Scarves request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=womens-accessories-scarves&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-accessories-scarves')
        }
    })

    it('should return products of Womens Accessories Shoes request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=womens-accessories-shoes&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-accessories-shoes')
        }
    })
})

describe('Subcategory Jewelry - Products - Womens', () => {
    jest.useFakeTimers('legacy');

    it('should return products of Womens Jewelry Earrings request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=womens-jewelry-earrings&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-jewelry-earrings')
        }
    })

    it('should return products of Womens Jewelry Bracelets request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=womens-jewlery-bracelets&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-jewlery-bracelets')
        }
    })

    it('should return products of Womens Jewelry Necklaces request', async () => {
        const res = await Services
        .getData(`${api}products/product_search?primary_category_id=womens-jewelry-necklaces&secretKey=${secretKey}`)

        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-jewelry-necklaces')
        }
    })
})

describe('Products - Clothing - Mens', () => {
    jest.useFakeTimers('legacy');

    it('should return a product of Mens Clothing Dress Shirts request', async () => {
        const productId = 69309284

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-clothing-dress-shirts')
        }
    })

    it('should return a product of Mens Clothing Shorts request', async () => {
        const productId = 54736828

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-clothing-shorts')
        }
    })

    it('should return a product of Mens Clothing Jackets request', async () => {
        const productId = 82936941

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-clothing-jackets')
        }
    })

    it('should return a product of Mens Clothing Pants request', async () => {
        const productId = 34536828

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-clothing-pants')
        }
    })

    it('should return a product of Mens Clothing Suits request', async () => {
        const productId = 25604524

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-clothing-suits')
        }
    })

})

describe('Products - Accessories - Mens', () => {
    jest.useFakeTimers('legacy');

    it('should return a product of Mens Accessories Luggage request', async () => {
        const productId = 'M1355'

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-accessories-luggage')
        }
    })

    it('should return a product of Mens Accessories Gloves request', async () => {
        const productId = 'TG720'

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-accessories-gloves')
        }
    })

    it('should return a product of Mens Accessories Ties request', async () => {
        const productId = 25752986

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('mens-accessories-ties')
        }
    })
})

describe('Products - Clothing - Womens', () => {
    jest.useFakeTimers('legacy');

    it('should return a product of Womens Clothing Dresses request', async () => {
        const productId = 25592211

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-clothing-dresses')
        }
    })

    it('should return a product of Womens Clothing Jackets request', async () => {
        const productId = 25589048

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-clothing-jackets')
        }
    })

    it('should return a product of Womens Clothing Bottoms request', async () => {
        const productId = 25565982

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-clothing-bottoms')
        }
    })

    it('should return a product of Womens Clothing Tops request', async () => {
        const productId = 25565189

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-clothing-tops')
        }
    })
})

describe('Products - Accessories - Womens', () => {
    jest.useFakeTimers('legacy');

    it('should return a product of Womens Accessories Scarves request', async () => {
        const productId = 22951021

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-accessories-scarves')
        }
    })

    it('should return a product of Womens Accessories Shoes request', async () => {
        const productId = 25791388

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-accessories-shoes')
        }
    })
})

describe('Products - Jewelry - Womens', () => {
    jest.useFakeTimers('legacy');

    it('should return a product of Womens Jewelry Earrings request', async () => {
        const productId = 25599653

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-jewelry-earrings')
        }
    })

    it('should return a product of Womens Jewelry Bracelets request', async () => {
        const productId = 25720050

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-jewlery-bracelets')
        }
    })

    it('should return a product of Womens Jewelry Necklaces request', async () => {
        const productId = 25720078

        const res = await Services
        .getData(`${api}products/product_search?id=${productId}&secretKey=${secretKey}`)
        
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
        for (let data of res.data) {
            expect(data).toHaveProperty('primary_category_id')
            expect(data.primary_category_id).toBe('womens-jewelry-necklaces')
        }
    })
})