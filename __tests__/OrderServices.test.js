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

    it('should be returning attribute data of object', () => {
        const obj = {
            data: 'hello'
        }

        const item = OrderServices.returnItemsFromRequest(obj)
        expect(item).toBe('hello')
    })

    it('should get every payment id', () => {
        const orders = [
            {
                items: [
                    {
                        variant: {
                            variation_values: {
                            },
                            price: 145,
                        },
                        quantity: 3
                    }
                ],
              address: "address",
              paymentId: "1"
            },
            {
                items: [
                    {
                        variant: {
                            variation_values: {
                            },
                            price: 145,
                        },
                        quantity: 3
                    }
                ],
              address: "address",
              paymentId: "7"
            },
            {
                items: [
                    {
                        variant: {
                            variation_values: {
                            },
                            price: 145,
                        },
                        quantity: 3
                    }
                ],
              address: "address",
              paymentId: "10"
            }
        ]

        const res = OrderServices.getOrderPaymentId(orders)
        expect(res[2]).toEqual(['10'])
    })

    it('should get every address', () => {
        const orders = [
            {
                items: [
                    {
                        variant: {
                            variation_values: {
                            },
                            price: 145,
                        },
                        quantity: 3
                    }
                ],
              address: "brazil",
              paymentId: "1"
            },
            {
                items: [
                    {
                        variant: {
                            variation_values: {
                            },
                            price: 145,
                        },
                        quantity: 3
                    }
                ],
                address: "turkey",
                paymentId: "7"
            },
            {
                items: [
                    {
                        variant: {
                            variation_values: {
                            },
                            price: 145,
                        },
                        quantity: 3
                    }
                ],
                address: "india",
                paymentId: "10"
            }
        ]

        const res = OrderServices.getOrderAddress(orders)
        expect(res[1]).toEqual(['turkey'])
    })

    it('should get every order price', () => {
        const orders = [
            {
              items: [
                {
                  variant: {
                    variation_values: {
                    },
                    price: 145,
                  },
                  quantity: 3
                }
              ],
            },
            {
              items: [
                {
                  variant: {
                    price: 50,
                  },
                  quantity: 2
                }
              ],
            },
            {
              items: [
                {
                  variant: {
                    price: 38.60,
                  },
                  quantity: 7
                }
              ],
            }
        ]

        const res = OrderServices.getOrderPrice(orders)
        expect(res[0]).toEqual([435])
    })
})