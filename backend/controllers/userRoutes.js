const express = require('express');
const userRoutes = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users } = require('../models/Users.js')
const { verifyToken } = require('../middlewares/verifyToken.js')

// register users
userRoutes.post('/register', async (req, res) => {
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

// user login
userRoutes.post('/login', async (req, res) => {
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
    let token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
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
userRoutes.get('/', verifyToken, async (req, res) => {
    // find current user
    let users = await Users.findOne({ username: req.user.username })

    res.status(200).send(users)
})

module.exports = {
    userRoutes
}