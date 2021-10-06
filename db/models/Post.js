const Sequelize = require("sequelize")
const connection = require("../Sequelize")

const Post = connection.define("posts", {
    titulo:Sequelize.STRING,
    descricao:Sequelize.TEXT,
    dataPost:Sequelize.STRING,
    autor:Sequelize.TEXT,
    likes:Sequelize.INTEGER
})

Post.sync({force:false})

module.exports = Post