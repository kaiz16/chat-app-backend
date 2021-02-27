const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
// load env file
require('dotenv').config()

const url = process.env.MongoDB
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY
const userSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

// models 
const Users = mongoose.model('users', userSchema)


let corsOptions = {
    origin: '*' // allow from anywhere
}
// use cors
app.use(cors(corsOptions))

// json body parser
app.use(express.json())

// connect to mongoDB
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database.')
}).catch((e) => {
    console.log(e)
})

// token verification
function verifyToken(req, res, next) {
    const token = req.headers['authorization']
    try {
        let verification = jwt.verify(token, SECRET_JWT_KEY)
        req.user = verification
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}

// register a new user 
app.post('/users/register', async (req, res) => {
    let { firstname, lastname, username, password } = req.body
    try {
        let hashedPassword = await bcrypt.hash(password, 10)
        let user = new Users({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hashedPassword
        })

        user.save()

        res.status(200).send(user)
    } catch (error) {
        return res.status(400).send('Error while registering a user')
    }
})

// user authentication
app.post('/users/login', async (req, res) => {
    let { username, password } = req.body
    // user must be registered to login
    let user = await Users.findOne({ username: username })
    
    if (!user) {
        return res.status(400).send("Please register first.")
    }

    // check user's password
    let matchedPassword = await bcrypt.compare(password, user.password)
    if(!matchedPassword) {
        return res.status(400).send("Password is wrong.")
    }

    let payload = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        created_at: user.created_at
    }

    // sign our JWT using our secret key (Your secret key should be unique and secure)
    let token = jwt.sign(payload, SECRET_JWT_KEY, {
        expiresIn: '1h'
    })

    // finally if everything went OK. return JWT
    res.status(200).json({
        token: token
    })
})

// getting current user
// this api route is protected. It verifies JWT token. 
// Process information if token is valid
app.get('/users', verifyToken, async (req, res) => {
    // find current user
    let users = await Users.findOne({ username: req.user.username })

    res.status(200).send(users)
})

// if port is defined in env file, use that otherwise use 8000
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('App is now listening on ' + PORT)
})