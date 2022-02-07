const axios = require('axios');

class Services {
    static async getData(url) {
        const response = await axios(url);
        return response;
    }
}

module.exports = Services;