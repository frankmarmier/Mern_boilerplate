const express = require("express");
const router = express.Router();
const Conversation = require('../models/Conversation')
const User = require('../models/User')
const Message = require('../models/Message')
const ObjectId = require('mongodb').ObjectID;

router.get('/getChannels', (req, res) => {
    Conversation.find({ users: { $in: [ObjectId(req.session.currentUser.id)] } }).then((response) => {
        res.json({
            channels: response
        })
    })

})

router.post('/messages', (req, res, next) => {
    const {channel_id, text, senderName} = req.body
    const newMessage = {channel_id, text, senderName} 
    User.findById(req.session.currentUser.id).then((response) => {
        newMessage.user = response
    
        newMessage.username = response.firstName
        Message.create(newMessage)
        .then((m) => {

            
            Conversation.findOneAndUpdate({ _id: m.channel_id }, 
                { $push: { olderMessages: m  } }).then((conv) => {
                    res.json({
                        message: m
                    })
                })

        })
        .catch((error) => {
            console.log(error)
        })
    })


})

router.post('/older-messages', (req, res, next) => {
    console.log(req.body)
    Conversation.findById(req.body.channel_id).then((response) => {
        console.log(response.olderMessages)
        Message.find( { _id : { $in : response.olderMessages } }).then((messageData) => {
            console.log(messageData)
            res.json({
                olderMessage: messageData
            })
        })


    }).catch((error) => console.log(error))
})

router.post('/conversation', (req, res, next) => {
    

})
  

module.exports = router;
