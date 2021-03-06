const Services = require('./Services');
const CategoriesServices = require('./CategoriesServices')
const WishlistServices = require('./WishlistServices')

const { ItemAlreadyChosen, ItemOutOfStock } = require('../errors');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class CartServices extends Services {
    static cartItem(product, variant, quantity) {
        const data = {
            secretKey: secretKey,
            productId: product,
            variantId: variant,
            quantity: quantity
        }
        return data;
    }

    static deleteCartItem(product, variant) {
        const data = {
            secretKey: secretKey,
            productId: product,
            variantId: variant
        }
        return data;
    }

    static async getDataCart(token) {
        return Services.getDataToken(`${api}/cart?secretKey=${secretKey}`, token)
    }

    static async sendDataCart(items, token) {
        return Services.sendDataToken(`${api}cart/addItem`, items, token)
    }

    static async changeQuantityCart(items, token) {
        return Services.sendDataToken(`${api}cart/changeItemQuantity`, items, token)
    }

    static async deleteDataCart(items, token) {
        return Services.deleteDataToken(`${api}/cart/removeItem`, items, token)
    }

    static checkIfVariantImageExists(listOfVariantsIds, listOfProducts, listOfColorsOfProducts) {
        const imagesLinks = [];
        const list = []

        for (let i = 0; i < listOfVariantsIds.length; i++) {
            let product = listOfProducts[i]
            let nameProduct = product[0].name
            for (let image of product[0].image_groups) {
                list.push({
                    image: image,
                    nameProduct: nameProduct,
                    color: listOfColorsOfProducts[i].color,
                    variantId: listOfVariantsIds[i]
                })
            }
        }
        for (let j = 0; j < list.length; j++) {
            const eachImage = list[j]
            if (eachImage.image.view_type === 'large') {
                if (eachImage.image.variation_value === eachImage.color) {
                    imagesLinks.push({
                        nameProduct: eachImage.nameProduct,
                        link: eachImage.image.images[0].link,
                        color: eachImage.color,
                        variantId: eachImage.variantId
                    })
                } else if (eachImage.image.variation_value === eachImage.variantId) {
                    imagesLinks.push({
                        nameProduct: eachImage.nameProduct,
                        link: eachImage.image.images[0].link,
                        color: eachImage.color,
                        variantId: eachImage.variantId
                    })
                } else if (eachImage.image.images[0].link.includes(eachImage.variantId)) {
                    imagesLinks.push({
                        nameProduct: eachImage.nameProduct,
                        link: eachImage.image.images[0].link,
                        color: eachImage.color,
                        variantId: eachImage.variantId
                    })
                } else if (eachImage.image.images[0].link.includes(eachImage.color)) {
                    imagesLinks.push({
                        nameProduct: eachImage.nameProduct,
                        link: eachImage.image.images[0].link,
                        color: eachImage.color,
                        variantId: eachImage.variantId
                    })
                } else {
                    imagesLinks.push({
                        nameProduct: eachImage.nameProduct,
                        link: eachImage.image.images[0].link,
                        color: eachImage.color.color,
                        variantId: eachImage.variantId
                    })
                }
            } 
        }
        const newimagesLinks = CategoriesServices.removeDuplicatesObjects(imagesLinks, 'variantId');
        return newimagesLinks;
    }


    static totalPrice(prices) {
        let totalPrice = 0;
            prices.forEach(price => {
                totalPrice += price
          })
        return totalPrice;
    }

    static async getProductsByProductsIds(productsIds) {
        const productList = [];
        for (let productId of productsIds) {
            const product = await CategoriesServices.getDataOneProduct(productId);
            productList.push(product.data)
        }
        return productList;
    }

    static async getProductsNames(productsIds) {
        const productsNames = [];
        for (let productId of productsIds) {
            const product = await CategoriesServices.getDataOneProduct(productId);
            productsNames.push(product.data[0].name)
        }
        return productsNames;
    }

    static returnItemsFromRequest(request) {
        const allProducts = request.data.items
        return allProducts;
    }

    static getProductsIds(allProducts) {
        const productIds = [];
        for (let eachProduct of allProducts) {
            const productId = eachProduct.productId
            productIds.push(productId)
        }
        return productIds;
    }

    static getVariantsIds(allProducts) {
        const productVariantsId = [];
        for (let eachProduct of allProducts) {
            const variantId = eachProduct.variant.product_id
            productVariantsId.push(variantId)
        }
        return productVariantsId;
    }

    static getPrices(allProducts) {
        const productsPrices = [];
        for (let eachProduct of allProducts) {
            let priceProduct = eachProduct.variant.price
            const quantityProduct = eachProduct.quantity
            priceProduct = priceProduct * quantityProduct
            productsPrices.push(priceProduct)
        }
        return productsPrices;
    }

    static getQuantities(allProducts) {
        const productsQuantities = [];
        for (let eachProduct of allProducts) {
            const quantityProduct = eachProduct.quantity
            productsQuantities.push(quantityProduct)
        }
        return productsQuantities;
    }

    static getColorOfProducts(allProducts) {
        const colorProducts = [];
        for (let eachProduct of allProducts) {
            const variantId = eachProduct.variant.product_id
            if (eachProduct.variant.variation_values) {
                const colorProduct = eachProduct.variant.variation_values.color
                colorProducts.push({
                    color: colorProduct,
                    variantId: variantId
                  })
            } 
            if (!eachProduct.variant.variation_values) {
                colorProducts.push({
                    color: 'undefined',
                    variantId: variantId
                  })
            }
        }
        return colorProducts;
    }

    static getVariantColorInfo(productList, variantsId) {
        let itemVariantColor = 0
        let itemColor = 0
        const allColors = [];
        for (let i = 0; i < productList.length; i++) {
            const productData = productList[i][0]
            for (let variant of productData.variants) {
                if (variant.product_id === variantsId[i]) {
                    itemVariantColor = variant.variation_values.color
                    for (let attributes of productData.variation_attributes) {
                        if (attributes.id === 'color') {
                            for (let values of attributes.values) {
                                if (values.value === itemVariantColor) {
                                    itemVariantColor = values.name
                                    itemColor = values.value
                                }
                            }
                        }
                    }
                }
            }
            allColors.push({
                variantColor: itemVariantColor,
                valueColor: itemColor
            })
        }
        return allColors;
    }
    
    static getVariantSizeInfo(productList, variantsId) {
        let itemVariantSize = 0
        let itemSize = 0
        const allSizes = [];
        for (let i = 0; i < productList.length; i++) {
            const productData = productList[i][0]
            for (let variant of productData.variants) {
                if (variant.product_id === variantsId[i]) {
                    itemVariantSize = variant.variation_values.size
                    for (let attributes of productData.variation_attributes) {
                        if (attributes.name === 'size' || attributes.name === 'Size') {
                            for (let values of attributes.values) {
                                if (values.value === itemVariantSize) {
                                    itemVariantSize = values.name
                                    itemSize = values.value
                                }
                            }
                        }
                    }
                }
            }
            allSizes.push({
                variantSize: itemVariantSize,
                valueSize: itemSize
            })
        }
        return allSizes;
    }   
    
    static getVariantWidthInfo(productList, variantsId) {
        let itemVariantWidth = 0
        let itemWidth = 0
        const allWidths = [];
        for (let i = 0; i < productList.length; i++) {
            const productData = productList[i][0]
            for (let variant of productData.variants) {
                if (variant.product_id === variantsId[i]) {
                    itemVariantWidth = variant.variation_values.width
                    for (let attributes of productData.variation_attributes) {
                        if (attributes.id === 'width') {
                            for (let values of attributes.values) {
                                if (values.value === itemVariantWidth) {
                                    itemVariantWidth = values.name
                                    itemWidth = values.value
                                }
                            }
                        }
                    }
                }
            }
            allWidths.push({
                variantWidth: itemVariantWidth,
                valueWidth: itemWidth
            })
        }
        return allWidths;
    }  

    static discoveringVariantIt(item, product) {
        let variantId = 0
        const productData = product.data[0]
        const productVariants = productData.variants
        for (let variant of productVariants) {
            const values = variant.variation_values
            if (item.color) {
                if (item.color === values.color && item.size === values.size && item.width === values.width) {
                    variantId = variant.product_id
                }
            }
            if (!item.color) {
                if (item.size === values.size || item.size === values.accessorySize && item.width === values.width) {
                    variantId = variant.product_id
                }
            }
        }
        if (variantId === 0 ) {
            throw new ItemOutOfStock();
        } else {
            return variantId;
        }
    }

    static checkIfItemAlreadyChosen(addItem) {
        if (addItem.err) {
            throw new ItemAlreadyChosen();
        } else {
            return addItem;
        }
    }

    static checkQuantityOfProduct(item) {
        if (item.quantityProduct) {
            return item.quantityProduct
        } else {
            item.quantityProduct = '1'
        }
        return item.quantityProduct;
    }

    static checkIfVariantIdMatch(allProducts, variantId) {
        const productsIds = [];

        for (let eachProduct of allProducts) {
            const eachProductVariant = eachProduct.variant.product_id
            if (eachProductVariant === variantId) {
              productsIds.push(eachProduct.productId)
            }
        }
        return productsIds;
    }

    static async checkIfRequestComesFromWishlist(path, idProduct, variantId, token) {
        if (path.includes('wishlist')) {
            await WishlistServices.sendItemToCartAndDeleteFromWishlist(idProduct, variantId, token)
        }
    }
}

module.exports = CartServices;