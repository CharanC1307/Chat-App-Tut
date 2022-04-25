require('dotenv').config()
const express = require("express")
const path = require('path')
const socketapi = require('./socket.js')

app = express()
app.use(express.static(path.join(__dirname, 'app')))
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')))

PORT = process.env.PORT

app.get('/', (req, res)=>{
    res.sendfile(index.html)
})

const server = app.listen(PORT, '192.168.0.6')

socketapi.attach(server)