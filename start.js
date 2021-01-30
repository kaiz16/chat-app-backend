const express = require('express');
const cors = require('cors')
const app = express()


// REST API ()
app.use(express.json())


let corsOptions = {
    origin: 'http://localhost:8080'
}
app.use(cors(corsOptions))
// mock database
let chats = [
    {
        msg: 'Hi',
        created_at: new Date
    },
    {
        msg: 'Hello',
        created_at: new Date
    }
]

app.get('/messages', (req, res) => {
    // 200
    console.log('Route message is called')
    res.status(200).send(chats)
})

app.post('/newMessage', (req, res) => {
    // 200
    console.log('Route newMessage is called')
    if (req.body.msg == ''){
        res.status(404).send('You are banned')
        return
    }
    let message = {
        msg: req.body.msg,
        created_at: new Date
    }

    chats.push(message)
    res.status(200).send(message)
})

// will start the app and run the server until you tell it stop
app.listen(3000, () => {
    console.log('🚀 App is listening on port 3000 🚀')
})