const express = require("express")
const path = require('path')
const socketApi = require('./socket.js')
const { instrument } = require('@socket.io/admin-ui')

app = express()

app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'App')))

PORT = process.env.PORT || 8080

app.get('/', (req, res)=>{
    res.sendfile(index.html)
})

const server = app.listen(PORT)

socketApi.attach(server)

instrument(socketApi, { auth: false })