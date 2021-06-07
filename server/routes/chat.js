const express = require("express");
const router = express.Router();
const Conversation = require('../models/Conversation')
// router.get('/getChannels', (req, res) => {
//     // console.log("HERE")
//     // Conversation.find().then((response) => {
//     //     console.log(response)
//     //     // res.json({
//     //     //     channels: 
//     //     // })

//     // })
// ‍});
router.get('/getChannels', (req, res) => {

    Conversation.find().then((response) => {
        
        res.json({
            channels: response
        })
    })

})

module.exports = router;
