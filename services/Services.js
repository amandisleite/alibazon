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
}

module.exports = Services;