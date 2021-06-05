const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image:{
    type: String,
    default:
      "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
  },
  status: {
    type: String,
    enum: ["student", "alumni"],
  },
  lastName: String,
  firstName: String,
  email: { type: String, required: true },
  profileImg: String,
  password: { type: String, required: true },
  Address: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  formattedAddress: String,
  foundHood: String,
  industry: String,
  intro: String,
  linkedin: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
