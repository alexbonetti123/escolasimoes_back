const Post = require("../../db/models/Post")
const authMiddleware = require("../../middleware/authMiddleware")
let objPosts = []
let i

module.exports = app => {
    app.get("/posts", authMiddleware, async(req, res) => {
        try {
            const posts = await Post.findAll({raw:true})
            res.status(200).json(posts)
        } catch(err){
            res.status(500).json(err)
        }
    })
    app.get("/post/:id", authMiddleware, (req, res) => {
        let {id} = req.params
        if(isNaN(id))
            res.status(400).json("Id não pode ser uma string")
        Post.findOne({raw:true, where:{id}})
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
    app.post("/post", authMiddleware, (req, res) => {
        let {titulo, descricao, dataPost, autor, likes} = req.body
        if(titulo != "" && descricao != "" && dataPost != "" && autor != "" && !isNaN(likes)){
            Post.create({
                titulo,
                descricao,
                dataPost,
                autor,
                likes
            })
            .then(() => res.status(200).json("Post enviado"))
            .catch(err => res.status(500).json(err))
        }else
            res.status(400).json("Requisição incompleta")
    })
    app.put("/post/:id", authMiddleware, (req, res) => {
        let {id} = req.params
        let {titulo, descricao, likes} = req.body
        if(isNaN(id))
            res.status(400).json("Id deve ser um inteiro")
        //Atualizando em partes
        if(titulo != undefined){
            Post.update({titulo}, {where:{id}})
            .then(() => res.status(200).json("Atualizado com sucesso"))
            .catch(err => res.status(500).json(err))
        }
        if(descricao != undefined){
            Post.update({descricao}, {where:{id}})
            .then(() => res.status(200).json("Atualizado com sucesso"))
            .catch(err => res.status(500).json(err))
        }
        if(likes != undefined){
            Post.update({likes}, {where:{id}})
            .then(() => res.status(200).json("Atualizado com sucesso"))
            .catch(err => res.status(500).json(err))
        }
    })
    app.delete("/post/:id", authMiddleware, (req, res) => {
        let {id} = req.params
        if(isNaN(id))
            res.status(400).json("O id deve ser um inteiro")
        Post.destroy({where:{id}})
        .then(() => res.status(200).json("Removido com sucesso"))
        .catch(err => res.status(500).json(err))
    })
}