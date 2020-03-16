const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const utils = require('./utils');
const dotenv = require('dotenv');


// read .env file and add it to process.env
dotenv.config();
// use the default env if .env is  not set.
if(!(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production")) {
  utils.overwriteEnv('.env.default.development')
}


app.use(express.static(__dirname + "/public"))
let clients = 0

io.on('connection', function (socket) {
    socket.on("NewClient", function () {
        if (clients < 2) {
            if (clients == 1) {
                this.emit('CreatePeer')
            }
        }
        else
            this.emit('SessionActive')
        clients++;
    })
    socket.on('Offer', SendOffer)
    socket.on('Answer', SendAnswer)
    socket.on('disconnect', Disconnect)
})

function Disconnect() {
    if (clients > 0) {
        if (clients <= 2)
            this.broadcast.emit("Disconnect")
        clients--
    }
}

function SendOffer(offer) {
    this.broadcast.emit("BackOffer", offer)
}

function SendAnswer(data) {
    this.broadcast.emit("BackAnswer", data)
}

const port = process.env.PORT;

http.listen(port, () => console.log(`Active on ${port} port`))
