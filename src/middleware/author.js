const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    try{
        let token = req.headers.authorization
        if(token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            req.userId = user.id
        } else {
            res.status(401).json({message: "Unauthorized User"});
        }
        
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized User"})
    }
}
module.exports = {
    verifyToken,
};