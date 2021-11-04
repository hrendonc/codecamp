const express = require('express')
const app = express()

// Configuraciones
const puerto = process.env.PORT || 3000;
absolutePath = __dirname + "/views/index.html"

// Middleware
app.use("/public", express.static(__dirname + "/public"))

//Rutas
app.get("/", (req, res)=>{
    res.sendFile(absolutePath)
})

/*
app.get("/", (req, res)=>{
    res.send("Hello Express by ecThor")
})
*/

app.get("/json", (req, res)=>{
    res.json({
        "message": "Hello json"
    })
})


app.listen(puerto, function(){
    console.log('Escuchando en puerto 3000')
})

module.exports = app