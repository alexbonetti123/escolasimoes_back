const Comentarios = require("../../db/models/Comentarios")
const authMiddleware = require("../../middleware/authMiddleware")

module.exports = app => {
    app.get("/comments", authMiddleware, (req, res) => {
        Comentarios.findAll({raw:true})
        .then(comments => res.status(200).json(comments))
        .catch(err => res.status(500).json(err))
    })
    app.get("/comment/:id", authMiddleware, (req, res) => {
        let {id} = req.params
        if(isNaN(id))
            res.status(400).json("Id deve ser um inteiro")
        Comentarios.findOne({raw:true, where:{id}})
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json(err))
    })
    app.post("/comment", authMiddleware, (req, res) => {
        let {idPost, autor, conteudo} = req.body
        if(idPost != "" && autor != "" && conteudo != ""){
            Comentarios.create({
                idPost, 
                autor, 
                conteudo
            })
            .then(() => res.status(200).json("Enviado com sucesso"))
            .catch(err => res.status(500).json(err))
        }
    })
    app.delete("/comment/:id", authMiddleware, (req, res) => {
        let {id} = req.params
        if(isNaN(id))
            res.status(400).json("ID deve ser um inteiro")
        Comentarios.destroy({where:{id}})
        .then(() => res.status(200).json("Removido com sucesso"))
        .catch(err => res.status(500).json(err))
    })
    app.put("/comment/:id", authMiddleware, (req, res) => {
        let {id} = req.params
        let {conteudo} = req.body
        if(isNaN(id))
            res.status(400).json("Id deve ser um inteiro")
        if(conteudo != undefined){
            Comentarios.update({conteudo}, {where:{id}})
            .then(() => res.status(200).json("Atualizado com sucesso"))
            .catch(err => res.status(500).json(err))
        }
    })
}