const express = require('express')
const app = express()
require('dotenv').config()


// Configuraciones
const puerto = process.env.PORT || 3000;
absolutePath = __dirname + "/views/index.html"

// Middleware
app.use("/public", express.static(__dirname + "/public"))

//Rutas
/*
app.get("/", (req, res)=>{
    res.send("Hello Express by ecThor")
})
*/

app.get("/", (req, res, next)=>{
    res.sendFile(absolutePath)
    console.log(req.method + " " + req.path + " - " + req.ip)
    next()
})

const mySecret = process.env.MESSAGE_STYLE
var wordChange = "Hello json"

app.get("/json", (req, res, next) => {
    if (mySecret === "uppercase") {
        res.json({
            "message": wordChange.toUpperCase()
        })
        console.log(req.method + " " + req.path + " - " + req.ip)
        next()  
    } else {
        res.json({
            "message": wordChange
        })
        console.log(req.method + " " + req.path + " - " + req.ip)
        next()
    }
})


app.listen(puerto, function(){
    console.log(`Escuchando en el puerto ${puerto}`)
})



module.exports = app