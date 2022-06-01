const jwt = require('jsonwebtoken');
require('dotenv').config()
// varificación de existencia y macheo del token
module.exports = function (req, res, next) {
    try {
        const jwtToken = req.header("token");
        if(!jwtToken){
            return res.status(403).json("Not Autorized")
        }
        const payload =  jwt.verify(jwtToken, process.env.jwtSecret) 

        req.user = payload.user;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(403).json("Not Authorize");
    }
}