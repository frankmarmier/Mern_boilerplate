const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    channel_id: {type: Schema.Types.ObjectId, ref: "Conversation"} ,
    text: String,
    senderName: String,
    username: String,
    user: {type: Schema.Types.ObjectId, ref: "User"},
    sent: Date
},
{ timestamps: true });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
