const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAlumni: Boolean,
  industry: String,
  work: String,
  studies: String,
  oldAdress: String,
  description: String,
  workSearch: String,
  introduction: String,
  profileImg: {
    type: String,
    default: 
    "https://media-exp1.licdn.com/dms/image/C4D03AQFVWM-O6hnNcA/profile-displayphoto-shrink_800_800/0/1593705445712?e=1628121600&v=beta&t=43_dRJlOjAMujOqxZxCncEICUQoAvWlcrduROYpDaq8"
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
