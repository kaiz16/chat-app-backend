const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { userRoutes } = require('./controllers/userRoutes.js')
// load env var
require('dotenv').config()

let corsOptions = {
    origin: '*' // allow from anywhere
}
// use cors
app.use(cors(corsOptions))

// json body parser
app.use(express.json())

app.use('/api/users', userRoutes)
// connect to mongoDB
mongoose.connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database.')
}).catch((e) => {
    console.log(e)
})

// if port is defined in env file, use that otherwise use 8000
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('App is now listening on ' + PORT)
})