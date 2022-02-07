const axios = require('axios');

class Services {
    static async getData(url, data = {}) {
        const response = await axios({
            method: 'get',
            url: url,
            data: data
        });
        return response;
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
}

module.exports = Services;