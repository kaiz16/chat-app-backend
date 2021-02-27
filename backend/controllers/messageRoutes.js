const express = require('express');
const messageRoutes = express.Router()
const { Messages } = require('../models/Messages.js')
const { verifyToken } = require('../middlewares/verifyToken.js')
// Get messages
// Post message 
// Delete message
messageRoutes.get('/', verifyToken, async (req, res) => {
    let messages = await Messages.find()

    res.status(200).send(messages)
})

// register users
messageRoutes.post('/newMessage', verifyToken, async (req, res) => {
    let { message } = req.body
    let username = req.user.username
    try {
        let newMessage = new Messages({
            username: username,
            message: message
        })

        newMessage.save()

        res.status(200).send(newMessage)
    } catch (error) {
        return res.status(400).send('Error sending message.')
    }
})

// register users
messageRoutes.delete('/deleteMessage', verifyToken, async (req, res) => {
    let { id } = req.body
    let username = req.user.username
    try {
        let message = await Messages.findOne({ _id: id })
        if (message.username !== username){
            throw 'error'
        }
        
        await Messages.findOneAndDelete({ _id: id })

        res.status(200).send('Ok')
    } catch (error) {
        return res.status(400).send('Error sending message.')
    }
})

module.exports = {
    messageRoutes
}