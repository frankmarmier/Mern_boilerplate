const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    name: String ,
    participants: Number,
    sockets: Array,
    users: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        ref: "User",
      },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
