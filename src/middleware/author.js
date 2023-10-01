const jwt = require("jsonwebtoken")
const secret_key = "WEBAPI";

const auth = (req, res, next) => {
    console.log(req);
    try{
        let token = req.headers.authorization
        console.log(req.headers.authorization);
        if(token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, secret_key)
            req.userId = user.id
        } else {
            res.status(401).json({message: "Unauthorized User"});
        }
        
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized User"})
    }
}
module.exports = auth;