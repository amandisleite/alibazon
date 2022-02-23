const { CategoriesServices } = require('../services');

describe('CategoriesServices', () => {
    it('should transform sub images name to null', async () => {
        const imageSub = [[{ image: 'categories/category_404.png'}], [{ image: 'categories/category_404.png'}]]
        CategoriesServices.checkImage(imageSub, '')
        expect(imageSub[0][0].image).toBe(null)
    })

    it('should transform parent images name to null', async () => {
        const imageParent = [{ image: 'categories/category_404.png'}, { image: 'categories/category_404.png'}]
        CategoriesServices.checkImage('', imageParent)
        expect(imageParent[1].image).toBe(null)
    })

    it('should transform womens-outfits to womens-clothing-outfits', async () => {
        const subId = [[{ id: 'womens-outfits', name: 'Outfits', parent_category_id: 'womens-clothing' }]]
        CategoriesServices.checkSubcatId(subId)
    
        expect(subId[0][0].new_id).toBe('womens-clothing-outfits')
    })

    it('should transform mens-clothing-dress-shirts to mens-dressshirts', async () => {
        const subId = [[{ id: 'mens-clothing-dress-shirts', name: 'Dress Shirts', parent_category_id: 'mens-clothing' }]]
        CategoriesServices.checkSubcatId(subId)
        expect(subId[0][0].new_id).toBe('mens-clothing-dressshirts')
    })

    it('should not transform mens-accessories-luggage', async () => {
        const subId = [[{ id: 'mens-accessories-luggage', name: 'Luggage', parent_category_id: 'mens-accessories' }]]
        CategoriesServices.checkSubcatId(subId)
        expect(subId[0][0].new_id).toBe('mens-accessories-luggage')
    })
})