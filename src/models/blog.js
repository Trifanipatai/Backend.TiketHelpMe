const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPost = new Schema({
    unit: {
        type: String,
        require: true,
    },
    nama: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    NoHP: {
        type: Object,
        required: true,
    },
    topik: {
        type: String,
        require: true,
    },
    deskripsi: {
        type: String,
        require: true,
    },
    lokasi: {
        type: String,
        require: true,
    },
},{
    timestamps: true
});
module.exports = mongoose.model('Tiket', BlogPost);