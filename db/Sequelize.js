const Sequelize = require("sequelize")

const connection = new Sequelize("simoes", "root", "123456", {
    host:"localhost",
    dialect:"mysql"
})

module.exports = connection