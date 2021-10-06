const app = require("./config/express")()
const connection = require("./db/Sequelize")
connection.authenticate(() =>{ 
    console.log("Tudo certo")
})

app.listen(8080, () => console.log("conectou"))