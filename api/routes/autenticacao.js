const jwtSecret = require("../../service/jwtSecret")
const jwt = require("jsonwebtoken")

module.exports = app => {
    app.post("/token/validar", (req, res) => {
        let {token} = req.body
        let stringToken = token.split(" ")
        if(stringToken[0] === "Bearer"){
            jwt.verify(stringToken[1], jwtSecret, (err) => {
                if(err){
                    res.status(401).json("Token inválido")
                }else{
                    res.status(200).json("OK")
                }
            })
        }else
            res.status(401).json("Token Inválido")
    })
}