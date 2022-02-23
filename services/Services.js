const axios = require('axios');

class Services {
    static async getData(url, data = {}) {
        try {
            const response = await axios({
                method: 'get',
                url: url,
                data: data
            });
            return response;
        } catch (err) {
            return { err: err.request.path };
        }
    }

    static async sendData(url, data) {
        try {
            const request = await axios({
                method: 'post',
                url: url,
                data: data
            });
            return request;
        } catch (err) {
            return err.message;
        }
    }

    static async getDataToken(url, token) {
        try {
            const response = await axios({
                method: 'get',
                url: url,
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response;
        } catch (err) {
            return { err: err.request.path };
        }
    }

    static async sendDataToken(url, data, token) {
        try {
            const request = await axios({
                method: 'post',
                url: url,
                data: data,
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return request;
        } catch (err) {
            return err.message;
        }
    }

    static async deleteDataToken(url, data, token) {
        try {
            const request = await axios({
                method: 'delete',
                url: url,
                data: data,
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return request;
        } catch (err) {
            return err.message;
        }
    }

    static checkIfVariantImageExists(listOfVariantsIds, listOfProducts, listOfColorsOfProducts) {
        const namesProducts = []
        let namesProductsWithoutRepeat = []
        const imagesLinks = [];

        for (let i = 0; i < listOfVariantsIds.length; i++) {
            let product = listOfProducts[i]
            let nameProduct = product[0].name
            for (let image of product[0].image_groups) {
                console.log(image)
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
}

module.exports = Services;