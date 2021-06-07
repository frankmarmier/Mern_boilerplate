const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({

  firstName: String,
  lastName: String,
  status: {
    type: String,
    enum: ["student", "alumni"],
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  formattedAddress: String,
  locationUser: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  description: String,
  neighborhood: String,
  industry: String,
  work: String,
  studies: String,
  intro: String,
  workSearch: String,
  linkedin: String,
  city: String,
  dept:String,
  codeDept:Number,
  image:{
    type: String,
    default:
      "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
  },


});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
