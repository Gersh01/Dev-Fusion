require('express');
require('mongodb');
const jwt = require('jsonwebtoken');

const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.username = payload.username;
        next();
    } catch (e) {
        res.clearCookie("token");
        return res.status(403).json({error: "token is not valid"});
    }
}

exports.setApp = function (app, client) {

}