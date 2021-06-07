const express = require("express");
const router = express.Router();
const QpvModel = require("../models/Qpv");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {

    QpvModel.find()
    .then((qpvResults) => {
        console.log(qpvResults.properties);
        console.log(qpvResults.data);
        res.status(200).json(qpvResults);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    })
})

module.exports = router;