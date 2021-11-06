const express = require('express')
const app = express()
require('dotenv').config()


// Configuraciones
const puerto = process.env.PORT || 3000;
absolutePath = __dirname + "/views/index.html"

//// Middleware
app.use("/public", express.static(__dirname + "/public"))

app.use((req, res, next)=>{
    //console.log(req.method + " - " + req.path + " - " + req.ip + " - " + Date())
    next()
})

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

app.get('/user/:id', (req, res, next)=>{
    console.log('ID:', req.params.id)
    next()
}, (req, res)=>{
    res.send('User info')
})

app.get('/user/:id', (req, res, next)=>{
    res.send(req.params.id)
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

//Get Route Parameter Input from the Client
app.get("/user/:userId/book/:bookId", (req, res) => {
    //const {userId, bookId} = req.params;
    res.json({
      user: req.params.userId,
      book: req.params.bookId
    });
  });

//Get Query Parameter Input from the Client
app.get('/name', (req, res)=>{
    let firstName = req.query.first
    let lastName = req.query.last
    //var {first: firstName, last: lastName} = req.query
    console.log(firstName + " " + lastName)
    res.json({
        name: `${firstName} ${lastName}` 
    })
})

//Escuchando el Puerto
app.listen(puerto, ()=>{
    console.log(`Escuchando en el puerto ${puerto}`)
})



module.exports = app