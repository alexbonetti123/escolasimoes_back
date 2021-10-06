const Users = require("../../db/models/User")
const jwt = require("jsonwebtoken")
const JWTSECRET = require("../../service/jwtSecret")
const authMiddleware = require("../../middleware/authMiddleware")

module.exports = app => {
    app.post("/user", (req, res) => {
        let {nome, email, senha} = req.body
        if(nome != "" && email != "" && senha != ""){
            Users.create({
                nome, 
                email,
                senha
            }).then(() => {
                jwt.sign({email}, JWTSECRET, {expiresIn:'10h'}, (err, token) => {
                    if(!err){
                        res.status(200).json(token)
                    }else
                        console.log(err)
                })
            }).catch(err => {
                res.status(500).json(err)
            })
        }
    })
    app.get("/users", authMiddleware, (req, res) => {
        Users.findAll({raw:true})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
    app.post("/user/login", (req, res) => {
        //Aqui é para logar
        let {email, senha} = req.body
        Users.findOne({raw:true, where:{email}})
        .then(user => {
                if(user.email === "admin@admin.com" && user.senha === "12345admin"){
                    jwt.sign({email}, JWTSECRET, {expiresIn:'10h'}, (err, token) => {
                        if(!err)
                            res.status(200).json({msg:"OK", token})
                        else 
                            console.log(err)
                    })
                }
                if(user.senha === senha){
                    jwt.sign({email}, JWTSECRET, {expiresIn:'10h'}, (err, token) => {
                        if(!err)
                            res.status(200).json({msg:"NAO", token})
                        else 
                            console.log(err)
                    })
                }else {
                    res.status(401).json("Dados incorretos")
                }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
    app.delete("/user/:id", (req, res) => {
        let {id} = req.params
        Users.destroy({where:{email:id}})
        .then(() => {
            res.status(200).json("Removido com sucesso")
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
}