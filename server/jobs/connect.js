const { Spot } = require('@binance/connector');
const { apiKey, secretKey } = require('../../access-key.json');
const client = new Spot(apiKey, secretKey);

module.exports = client;
