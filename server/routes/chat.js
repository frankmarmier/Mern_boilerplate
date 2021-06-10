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

router.post('/conversation/notif', (req,res) => {

    Conversation.findById(req.body.channel_id).then((response) => {

        if(response.users[0] !== req.body.user_id) {
            User.findById(response.users[0]).then((response) => {
                res.json({
                    response
                })
            })
        } else {
            User.findById(response.users[0]).then((response) => {
                res.json({
                    response
                })
            })
        }


    })


})

router.post('/messages', (req, res, next) => {
    const {channel_id, text, senderName} = req.body
    const newMessage = {channel_id, text, senderName} 
    newMessage.sent = new Date(req.body.id)

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
    Conversation.findById(req.body.channel_id).then((response) => {
        if(response !== null) {

            Message.find( { _id : { $in : response.olderMessages } }).then((messageData) => {
                res.json({
                    olderMessage: messageData
                })
            })
        } else {
            res.json(200)
        }


    }).catch((error) => console.log(error))
})

router.post('/conversation', (req, res, next) => {
    if(req.session.currentUser) {
        Conversation.find({ users: { $all: [ObjectId(req.session.currentUser.id), ObjectId(req.body.alumni_id)] } })
        .then((response) => {
           

            if(response.length === 0) {

                let name = []

                User.findById(req.body.alumni_id).then((response) => {
                    
                    name.push(response?.firstName)
                    User.findById(req.session.currentUser.id).then((response) => {
                        name.push(response?.firstName)
                        let user_name = response?.firstName
                        const newConv = {title: name,
                        participants: 1,
                        sockets: [],
                        users: [req.body.alumni_id, req.session.currentUser.id]
                        }

                        Conversation.create(newConv).then((newConversation) => {
                           
                            res.json({
                                conversation: newConversation,
                                alumni_name: user_name
                                
                            })
                        })
                        
                    })
                })

            }  else {
                User.findById(req.session.currentUser.id).then((response) => {

                    let user_name = response?.firstName
                    res.json({
                        alumni_name: user_name
                    })
                })
            }
        })

   

    } else {

        console.log("NOT LOGGED IN")
    }
    
    

})
  

module.exports = router;
