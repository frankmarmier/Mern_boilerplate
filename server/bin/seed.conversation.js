const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../config/dbConnection");

const Conversation = require("../models/Conversation");
const User = require("../models/User");
const allConversations = [{
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'Funny',
    participants: 0,
    id: 2,
    sockets: []
}];

async function seedConversations() {
    try {
      await Conversation.collection
        .drop()
        .catch((error) => console.log("No collection to drop, proceeding..."));
      console.log("Conversation collection dropped");
  
      const usersInDB = await User.find();
  
      allConversations.forEach((conv) => {
        conv.users = [usersInDB[0]._id, usersInDB[1]._id];
      });
      const createdConversation = await Conversation.create(allConversations);
      console.log(createdConversation);
      process.exit();
    } catch (error) {
      console.log(error);
      process.exit();
    }
  }
  
  seedConversations();
  
  module.exports = seedConversations;
