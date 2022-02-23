const CartServices = require('../services/CartServices');

describe('CartServices', () => {
   
    it('should be creating object of item', () => {
        const cart = CartServices.cartItem('25594785', '799927757417', '1')
        expect(cart.variantId).toBe('799927757417');
    })

    it('should be creating object of delete item', () => {
        const cart = CartServices.deleteCartItem('25594785', '799927757417')
        expect(cart.productId).toBe('25594785');
    })

    it('should be creating link undefined for product without variantion image', () => {
        const productList = [
            [
                {
                    name: 'Cotton Straight Shorts',
                    id: '86736845',
                    image_groups: [
                        {
                            images: [
                                {
                                    alt: "Cotton Straight Shorts, , large",
                                    link: "products/large/B0574244_E3J_0.jpg",
                                    title: "Cotton Straight Shorts, "
                                },
                                {
                                    alt: "Cotton Straight Shorts, , large",
                                    link: "products/large/B0574244_E3J_B0.jpg",
                                    title: "Cotton Straight Shorts, "
                                },
                                {
                                    alt: "Cotton Straight Shorts, , large",
                                    link: "products/large/B0574244_E3J_L1.jpg",
                                    title: "Cotton Straight Shorts, "
                                }
                            ],
                            view_type: "large"
                        },
                        {
                            images: [
                                {
                                    alt: "Cotton Straight Shorts, White, large",
                                    link: "products/large/B0574244_C43_0.jpg",
                                    title: "Cotton Straight Shorts, White"
                                },
                                {
                                    alt: "Cotton Straight Shorts, White, large",
                                    link: "products/large/B0574244_C43_B0.jpg",
                                    title: "Cotton Straight Shorts, White"
                                }
                            ],
                            variation_value: "C43",
                            view_type: "large"
                        },
                        {
                            images: [
                                {
                                    alt: "Cotton Straight Shorts, Beige, large",
                                    link: "products/large/B0574244_E3J_0.jpg",
                                    title: "Cotton Straight Shorts, Beige"
                                },
                                {
                                    alt: "Cotton Straight Shorts, Beige, large",
                                    link: "products/large/B0574244_E3J_B0.jpg",
                                    title: "Cotton Straight Shorts, Beige"
                                },
                                {
                                    alt: "Cotton Straight Shorts, Beige, large",
                                    link: "products/large/B0574244_E3J_L1.jpg",
                                    title: "Cotton Straight Shorts, Beige"
                                }
                            ],
                            variation_value: "E3J",
                            view_type: "large"
                        },
                        {
                            images: [
                                {
                                    alt: "Cotton Straight Shorts, , medium",
                                    link: "products/medium/B0574244_E3J_0.jpg",
                                    title: "Cotton Straight Shorts, "
                                },
                                {
                                    alt: "Cotton Straight Shorts, , medium",
                                    link: "products/medium/B0574244_E3J_B0.jpg",
                                    title: "Cotton Straight Shorts, "
                                },
                                {
                                    alt: "Cotton Straight Shorts, , medium",
                                    link: "products/medium/B0574244_E3J_L1.jpg",
                                    title: "Cotton Straight Shorts, "
                                }
                            ],
                            view_type: "medium"
                        },
                        {
                            images: [
                                {
                                    alt: "Cotton Straight Shorts, White, medium",
                                    link: "products/medium/B0574244_C43_0.jpg",
                                    title: "Cotton Straight Shorts, White"
                                },
                                {
                                    alt: "Cotton Straight Shorts, White, medium",
                                    link: "products/medium/B0574244_C43_B0.jpg",
                                    title: "Cotton Straight Shorts, White"
                                }
                            ],
                            variation_value: "C43",
                            view_type: "medium"
                        }
                    ]
                }
            ],
            [
                {
                    name: 'Black And White V-Neck Floral Dress',
                    id: '25592211',
                    image_groups: [
                        {
                            images: [
                                {
                                    alt: "Black And White V-Neck Floral Dress, , large",
                                    link: "products/large/PG.10242224.JJ2RVXX.PZ.jpg",
                                    title: "Black And White V-Neck Floral Dress, "
                                },
                                {
                                    alt: "Black And White V-Neck Floral Dress, , large",
                                    link: "products/large/PG.10242224.JJ2RVXX.BZ.jpg",
                                    title: "Black And White V-Neck Floral Dress, "
                                }
                            ],
                            view_type: "large"
                        },
                        {
                            images: [
                                {
                                    alt: "Black And White V-Neck Floral Dress, Ivory & Black, large",
                                    link: "products/large/PG.10242224.JJ2RVXX.PZ.jpg",
                                    title: "Black And White V-Neck Floral Dress, Ivory & Black"
                                },
                                {
                                    alt: "Black And White V-Neck Floral Dress, Ivory & Black, large",
                                    link: "products/large/PG.10242224.JJ2RVXX.BZ.jpg",
                                    title: "Black And White V-Neck Floral Dress, Ivory & Black"
                                }
                            ],
                            variation_value: "JJ2RVXX",
                            view_type: "large"
                        }]
                }
            ],
            [
                {
                    name: 'Striped Silk Tie',
                    id: '25752986',
                    image_groups: [
                        {
                          images: [
                            {
                              alt: "Striped Silk Tie, , large",
                              link: "products/large/PG.949114314S.REDSI.PZ.jpg",
                              title: "Striped Silk Tie, "
                            },
                            {
                              alt: "Striped Silk Tie, , large",
                              link: "products/large/PG.949114314S.REDSI.BZ.jpg",
                              title: "Striped Silk Tie, "
                            }
                          ],
                          view_type: "large"
                        },
                        {
                          images: [
                            {
                              alt: "Striped Silk Tie, Red, large",
                              link: "products/large/PG.949114314S.REDSI.PZ.jpg",
                              title: "Striped Silk Tie, Red"
                            },
                            {
                              alt: "Striped Silk Tie, Red, large",
                              link: "products/large/PG.949114314S.REDSI.BZ.jpg",
                              title: "Striped Silk Tie, Red"
                            }
                          ],
                          variation_value: "REDSI",
                          view_type: "large"
                        },
                        {
                          images: [
                            {
                              alt: "Striped Silk Tie, Turquoise, large",
                              link: "products/large/PG.949114314S.TURQUSI.PZ.jpg",
                              title: "Striped Silk Tie, Turquoise"
                            },
                            {
                              alt: "Striped Silk Tie, Turquoise, large",
                              link: "products/large/PG.949114314S.TURQUSI.BZ.jpg",
                              title: "Striped Silk Tie, Turquoise"
                            }
                          ],
                          variation_value: "TURQUSI",
                          view_type: "large"
                        },
                        {
                          images: [
                            {
                              alt: "Striped Silk Tie, , medium",
                              link: "products/medium/PG.949114314S.REDSI.PZ.jpg",
                              title: "Striped Silk Tie, "
                            },
                            {
                              alt: "Striped Silk Tie, , medium",
                              link: "products/medium/PG.949114314S.REDSI.BZ.jpg",
                              title: "Striped Silk Tie, "
                            }
                          ],
                          view_type: "medium"
                        }]
                }
            ]
        ]
        
        const colorProducts = [
            { color: 'C43', variantId: '883360544250' },
            { color: 'JJ2RVXX', variantId: '701643843442' },
            { color: 'Orange', variantId: '793775370033-1-1' }
        ]
        const variantsIds = [ '883360544250', '701643843442', '793775370033-1-1' ]

        const imagesLinks = CartServices.checkIfVariantImageExists(variantsIds, productList, colorProducts)
        expect(imagesLinks[2].link).toBe('undefined')
    
    })

    it('should be returning attribute items of object', () => {
        const obj = {
            data: {
                items: 'hello'
            }
        }

        const item = CartServices.returnItemsFromRequest(obj)
        expect(item).toBe('hello')
    })

    it('should be getting products ids', () => {
        const arr = [
            {
                productId: 0,
            },
            {
                productId: 1,
            },
            {
                productId: 2,
            },
            {
                productId: 3,
            }
        ]

        const res = CartServices.getProductsIds(arr)
        expect(res[2]).toBe(2)
    })

    it('should be getting variants ids', () => {
        const arr = [
            {
                variant: {
                    product_id: 1,
                }
            },
            {
                variant: {
                    product_id: 2,
                }
            },
            {
                variant: {
                    product_id: 3,
                }
            }
        ]

        const res = CartServices.getVariantsIds(arr)
        expect(res[1]).toBe(2)
    })

    it('should be getting prices', () => {
        const arr = [
            {
                variant: {
                    price: 10,
                },
                quantity: 2
            },
            {
                variant: {
                    price: 20,
                },
                quantity: 1
            },
            {
                variant: {
                    price: 5,
                },
                quantity: 3
            }
        ]
        const res = CartServices.getPrices(arr)
        expect(res[0]).toBe(20)
    })

    it('should be getting quantities', () => {
        const arr = [
            {
                quantity: 6,
            },
            {
                quantity: 15,
            },
            {
                quantity: 2,
            },
            {
                quantity: 1,
            }
        ]

        const res = CartServices.getQuantities(arr)
        expect(res[1]).toBe(15)
    })

    it('should be getting color of products', () => {
        const arr = [
            {
                variant: {
                    product_id: 1,
                    variation_values: {
                        color: 'a'
                    }
                }
            },
            {
                variant: {
                    product_id: 2,
                    variation_values: {
                        color: 'b'
                    }
                }
            },
            {
                variant: {
                    product_id: 3,
                    variation_values: {
                        color: 'c'
                    }
                }
            }, 
        ]

        const res = CartServices.getColorOfProducts(arr)
        expect(res[2].color).toBe('c')
        expect(res[1].variantId).toBe(2)
    })
})