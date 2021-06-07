const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const qpvSchema = new Schema({
    type: String,
    geometry: {
        type: String,
        coordinates: []
    },
    properties: {
        b_vp: String,
        nom_dept: String,
        objectid: Number,
        current_code: String,
        l_nqpv: String,
        c_cainsee: String,
        com_arm_name: String,
        geo_point_2d: [Number],
        c_dep: Number,
        shape_leng: Number,
        b_npnru: String,
        b_etat: String,
        c_nqpv: String,
        d_maj: String,
        nom_com: String,
        c_nat_qpv: String,
        dep_name: String,
        shape_area: Number
    }
});

const QpvModel = mongoose.model("Qpv", qpvSchema);
module.exports = QpvModel;