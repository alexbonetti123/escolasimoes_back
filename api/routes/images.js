const Images = require('../../db/models/Image')
const authMiddleware = require('../../middleware/authMiddleware')

module.exports = app => {
    app.get("/images", authMiddleware, (req, res) => {
        Images.findAll({raw:true})
        .then(images => {
            res.status(200).json(images)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
    app.post("/image", authMiddleware, (req, res) => {
        let {idPost, nome, data} = req.body
        Images.create({
            idPost, 
            nome, 
            data
        })
        .then(() => {
            res.status(200).json("Inserido com sucesso")
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
}