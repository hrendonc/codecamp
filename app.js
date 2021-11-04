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

app.get("/", (req, res)=>{
    res.sendFile(absolutePath)
})

const messUper = "Hello json".toUpperCase()

app.get("/json", (req, res)=>{
    if(process.env.MESSAGE_STYLE === "uppercase")
    {
        res.json({
            "message": messUper
        })
    }
    else {
        res.json({
            "message": "Hello json"
        })
    }
    
})


app.listen(puerto, function(){
    console.log('Escuchando en puerto 3000')
})

module.exports = app