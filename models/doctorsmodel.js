const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    position: String,
    speciality: String,
    experience: String
});

module.exports = mongoose.model('Doctor', doctorSchema);
