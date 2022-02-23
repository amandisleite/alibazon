const Services = require('../services/Services');

describe('Services', () => {

    it('should be creating user', () => {
        const productList = [
            [
                {
                    master: [Object],
                    type: [Object],
                    _id: '5172d203ffdd81f3234d5f8a',
                    price_max: 145,
                    page_description: 'These straight-fit shorts are perfect for the summer heat without losing your cool. Made in our cotton stretch twill fabric.',
                    page_title: "Men's Cotton Straight Shorts",
                    name: 'Cotton Straight Shorts',
                    price: 140,
                    variation_attributes: [Array],
                    id: '86736845',
                    currency: 'USD',
                    primary_category_id: 'mens-clothing-shorts',
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
                    ],
                    short_description: 'These straight-fit shorts are perfect for the summer heat without losing your cool. Made in our cotton stretch twill fabric.',
                    orderable: true,
                    variants: [Array],
                    long_description: '<ul>\n' +
                    '<li>95% cotton, 5% polyurethane</li>\n' +
                    '<li>straight-fit</li>\n' +
                    '<li>quarter top front pockets</li>\n' +
                    '<li>patch back pockets</li>\n' +
                    '<li>dry clean only</li>\n' +
                    '</ul>',
                    c_isSale: true
                }
            ],
            [
                {
                    master: [Object],
                    type: [Object],
                    _id: '5172d204ffdd81f3234d5fdb',
                    page_description: 'Floral patterns are so popular this time of year! We love the new black and white pattern.',
                    page_title: 'Black And White V-Neck Floral Dress',
                    name: 'Black And White V-Neck Floral Dress',
                    price: 128,
                    variation_attributes: [Array],
                    id: '25592211',
                    currency: 'USD',
                    primary_category_id: 'womens-clothing-dresses',
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
                        }],
                    short_description: 'Floral patterns are so popular this time of year! We love the new black and white pattern.',
                    orderable: true,
                    variants: [Array],
                    long_description: 'Floral patterns are so popular this time of year! We love the new black and white pattern.'
                }
            ],
            [
                {
                    master: [Object],
                    type: [Object],
                    _id: '5172d203ffdd81f3234d5f9f',
                    page_description: "This silk tie is works well with a Untitled Store dress shirt and suit It's perfect for any occasion. ",
                    page_title: 'Striped Silk Tie',
                    name: 'Striped Silk Tie',
                    price: 29.99,
                    variation_attributes: [Array],
                    id: '25752986',
                    currency: 'USD',
                    primary_category_id: 'mens-accessories-ties',
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
                        }],
                    short_description: "This silk tie is works well with a Untitled Store dress shirt and suit It's perfect for any occasion. ",
                    orderable: true,
                    variants: [Array],
                    long_description: "This silk tie is works well with a Untitled Store dress shirt and suit It's perfect for any occasion. "
                }
            ]
        ]
        
        const colorProducts = [
            { color: 'C43', variantId: '883360544250' },
            { color: 'JJ2RVXX', variantId: '701643843442' },
            { color: 'Orange', variantId: '793775370033-1-1' }
        ]
        const variantsIds = [ '883360544250', '701643843442', '793775370033-1-1' ]

        const imagesLinks = Services.checkIfVariantImageExists(variantsIds, productList, colorProducts)
        expect(imagesLinks[2].link).toBe('undefined')
    
    })        
})