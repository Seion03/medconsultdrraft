const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('Patient', patientSchema);
