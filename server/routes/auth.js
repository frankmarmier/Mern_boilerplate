const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const upload = require("../config/cloudinary");
// const requireAuth = require("../middlewares/requireAuth");


const salt = 10;

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((userDocument) => {
      if (!userDocument) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = bcrypt.compareSync(
        password,
        userDocument.password
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      req.session.currentUser = {
        role: "admin",
        id: userDocument._id,
      };

      res.redirect("/api/auth/isLoggedIn");
    })
    .catch(next);
});

router.post("/signup",  upload.single("image"), (req, res, next) => {
  //uploader.single("image")
  const {
    lastName,
    firstName,
    email,
    image,
    password,
    Address,
    locationUser,
    neighborhood,
    industry,
    intro,
    linkedin,
    city,
    dep,
    codeDept,
  } = req.body;

  if (req.file) {
    req.body.image = req.file.path; // Add image key to req.body
  }

  User.findOne({ email })
    .then((userDocument) => {
      if (userDocument) {
        return res.status(400).json({ message: "Email already taken" });
      }

      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = { lastName,
        firstName,
        email,
        image,
        password:hashedPassword,
        Address,
        locationUser,
        neighborhood,
        industry,
        intro,
        linkedin,
        city,
        dep,
        codeDept};

      User.create(newUser)
        .then((newUserDocument) => {
          /* Login on signup */
          req.session.currentUser = newUserDocument._id;
          res.redirect("/api/auth/isLoggedIn");
        })
        .catch(next);
    })
    .catch(next);
});

router.get("/isLoggedIn", (req, res, next) => {
  if (!req.session.currentUser)
    return res.status(401).json({ message: "Unauthorized" });

  const id = req.session.currentUser.id;

  User.findById(id)
    .select("-password")
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch(next);
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function (error) {
    if (error) next(error);
    else res.status(200).json({ message: "Succesfully disconnected." });
  });
});

router.get("/profile", (req, res, next) => {
  User.findById(req.session.currentUser.id)
    .select("-password") // Remove the password field from the found document.
    .then((userDocument) => {
      return res.status(200).json(userDocument);
    })
    .catch(next);
});

router.patch(
  "/settings",
  upload.single("image"),
  (req, res, next) => {
    const userId = req.session.currentUser.id;

    // If no file is sent, req.file is undefined, leading to an error when trying to
    // acces req.file.path (undefined.path) => Cannot read property path of undefined.
    if (req.file) {
      req.body.image = req.file.path; // Add profileImage key to req.body
    }

    req.body.locationUser = {coordinates: req.body.coordinates.split(",")}
    req.body.formattedAddress = Array.isArray(req.body.formattedAddress) ? req.body.formattedAddress[0] : req.body.formattedAddress
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .select("-password") // Remove the password field from the found document.
      .then((userDocument) => {
        res.status(200).json(userDocument);
      })
      .catch(next);
  }
);

router.delete("/delete", (req, res, next) => {
console.log(req.session.currentUser.id)
  if(req.session.currentUser) {
      User.findByIdAndDelete(req.session.currentUser.id)
          .then((deletedUser) => {
              res.status(202).json(deletedUser);
          })
          .catch(next);
  } 
});

module.exports = router;
