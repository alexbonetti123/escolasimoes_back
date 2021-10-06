const Sequelize = require("sequelize")
const connection = require("../Sequelize")

const Image = connection.define("images", {
    idPost:Sequelize.INTEGER,
    nome:Sequelize.STRING,
    data:Sequelize.BLOB
})

Image.sync({force:false})

module.exports = Image