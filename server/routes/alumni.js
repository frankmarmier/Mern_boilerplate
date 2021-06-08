const express = require("express");
const router = express.Router();
const AlumniModel = require("../models/User");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {

    AlumniModel.find()
    .then((alumniResults) => {
        console.log(alumniResults);
        res.status(200).json(alumniResults);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    })
})


router.get("/:id", (req, res, next) => {

    AlumniModel.findById(req.params.id)
    .then((foundAlumni) => {
        console.log(foundAlumni);
        res.status(200).json(foundAlumni);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    })
})
module.exports = router;