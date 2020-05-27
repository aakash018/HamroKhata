const mongoose = require("mongoose")

const auditSchema = new mongoose.Schema({
    Aakash_Subash: {
        type: Number,
        required: true,
        default: 0,
    },
    Aakash_Yaman: {
        type: Number,
        required: true,
        default: 0,
    },
    Subash_Yaman: {
        type: Number,
        required: true,
        default: 0,
    },
    Subash_Aakash: {
        type: Number,
        required: true,
        default: 0,
    },
    Yaman_Aakash: {
        type: Number,
        required: true,
        default: 0,
    },
    Yaman_Subash: {
        type: Number,
        required: true,
        default: 0,
    }
});

module.exports = mongoose.model("Audit", auditSchema)