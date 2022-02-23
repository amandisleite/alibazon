const Services = require('./Services');
const CategoriesServices = require('./CategoriesServices')

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
        const namesProducts = []
        let namesProductsWithoutRepeat = []
        const imagesLinks = [];

        for (let i = 0; i < listOfVariantsIds.length; i++) {
            let product = listOfProducts[i]
            let nameProduct = product[0].name
            for (let image of product[0].image_groups) {
                if (image.view_type === 'large') {
                    if (image.images[0].alt.includes(nameProduct)) {
                        namesProducts.push(nameProduct)
                        namesProductsWithoutRepeat = [...new Set(namesProducts)]
                        if (image.variation_value === listOfColorsOfProducts[i].color) {
                            imagesLinks.push({
                                nameProduct: nameProduct,
                                link: image.images[0].link
                            })
                        } 
                    }
                } 
            }
        }

        let imagesWithLinks = []
        let imagesWithoutLink = []
        for (let eachImage of imagesLinks) {
            imagesWithLinks.push(eachImage.nameProduct)
            imagesWithLinks = [...new Set(imagesWithLinks)]
            imagesWithoutLink = namesProductsWithoutRepeat.filter(val => !imagesWithLinks.includes(val));
        }
        for (let eachImageWithoutLink of imagesWithoutLink) {
            imagesLinks.push({
                nameProduct: eachImageWithoutLink,
                link: 'undefined'
            })
        }

        return imagesLinks;
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
            const colorProduct = eachProduct.variant.variation_values.color
            colorProducts.push({
                color: colorProduct,
                variantId: variantId
              })
        }
        return colorProducts;
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
        }
        return variantId;
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
}

module.exports = CartServices;