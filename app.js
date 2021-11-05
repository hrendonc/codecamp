const express = require('express')
const app = express()
require('dotenv').config()


// Configuraciones
const puerto = process.env.PORT || 3000;
absolutePath = __dirname + "/views/index.html"

//// Middleware
app.use("/public", express.static(__dirname + "/public"))

/*app.use((req, res, next)=>{
    console.log(req.method + " " + req.path + " - " + req.ip + " - " + Date())
    next()
})*/

//Rutas
app.get("/", (req, res)=>{
    res.sendFile(absolutePath)
})

//Chain Middleware
const middleware = (req, res, next)=>{
    req.time = new Date().toString()
    next()
}

app.get("/now", middleware, (req, res)=>{
    res.json({
        time: req.time
    })
})
//End Chain Middleware

const mySecret = process.env.MESSAGE_STYLE
var wordChange = "Hello json"

app.get("/json", (req, res) => {
    if (mySecret === "uppercase") {
        res.json({
            "message": wordChange.toUpperCase()
        })
    } else {
        res.json({
            "message": wordChange
        })
    }
})

//Escuchando el Puerto
app.listen(puerto, ()=>{
    console.log(`Escuchando en el puerto ${puerto}`)
})



module.exports = app