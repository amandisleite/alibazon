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
}

module.exports = Services;