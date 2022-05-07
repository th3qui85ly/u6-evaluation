const jwt = require('jsonwebtoken');

const SECRET_KEY = "MostSecretKey";

function generateToken(payload) {

    let token = jwt.sign(payload, SECRET_KEY);
    return token;
}

module.exports = {
    generateToken,
}
