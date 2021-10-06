const Sequelize = require("sequelize")
const connection = require("../Sequelize")

const Comentarios = connection.define("comments", {
    idPost:Sequelize.INTEGER,
    autor:Sequelize.STRING,
    conteudo:Sequelize.TEXT
})

Comentarios.sync({force:false})

module.exports = Comentarios