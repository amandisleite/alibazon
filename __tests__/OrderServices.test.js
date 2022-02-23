const OrderServices = require('../services/OrderServices');

describe('OrderServices', () => {
   
    it('should eliminate duplicates', () => {
        const arr = [
            [ 'nhenhe', 'nhenhe', 'nhenhe', 'nhenhe' ],
            [ 'address' ],
            [ 'address' ],
            [ 'nhanha' ],
            [ 'nhunhu' ],
            [ 'nhonho', 'nhonho' ],
            [ 'sangrila', 'sangrila' ],
            [ 'eden', 'eden', 'eden', 'eden', 'eden', 'eden' ]
        ]
        const uniqueValues = OrderServices.uniqueValuesAtArray(arr)
        expect(uniqueValues).toHaveLength(8);
    })

    it('should calculate total price per array', () => {
        const arr = [
            [ 64, 475, 99.99, 40 ],
            [ 1595 ],
            [ 1595 ],
            [ 64 ],
            [ 34 ],
            [ 64, 45 ],
            [ 192, 384 ],
            [ 276, 1425, 162, 128, 39.99, 59.98 ]
        ]
        const totalPrice = OrderServices.totalPricePerOrder(arr)
        expect(totalPrice[0]).toBe(678.99);  
    })

    it('should create payment id 3', () => {
        const arr = {
            data: [
                { obj: 'item' },
                { obj: 'item' },
                { obj: 'item' }
            ]
        }
        const paymentId = OrderServices.createPaymentId(arr)
        expect(paymentId).toBe(3);  
    })
})