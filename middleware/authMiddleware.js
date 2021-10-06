const jwt = require("jsonwebtoken")
const JWTSECRET = require("../service/jwtSecret")

module.exports = (req, res, next) => {
    let string = req.headers['authorization'].split(" ")
    let bearer = string[0]
    let token = string[1]
    if(bearer === "Bearer"){
        jwt.verify(token, JWTSECRET, (err) => {
            if(err){
                console.log(err)
                res.status(401).json("Não autorizado")
            }else 
                next()
        })
    }else 
        res.status(401).json("Não autorizado")
}