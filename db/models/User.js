const Sequelize = require("sequelize")
const connection = require('../Sequelize')

const Users = connection.define("users", {
    nome:Sequelize.TEXT,
    email:Sequelize.TEXT,
    senha:Sequelize.STRING
})

Users.sync({force:false})

module.exports = Users