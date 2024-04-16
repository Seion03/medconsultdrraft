var express = require('express');
var router = express.Router();
const Patient = require('../models/patientModel');

router.get('/patientdashboard', function(req, res, next) {
    res.render('patientdashboard', { title: 'Doctor Registration' });
  });

  router.get('/registerPatient', function(req, res, next) {
    res.render('registerPatient');
  });
  
  router.post('/registerPatient', async (req, res) => {
    try {
        const newUser = new Patient({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(newUser);
  
        await newUser.save();
        res.send('User signed up successfully!');
    } catch (error) {
        res.status(500).send('Error signing up user: ' + error.message);
    }
  });
  
  router.post('/patientLogin', async (req, res) => {
    try {
        const { email, password } = req.body;
  
        const user = await Patient.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
        if (user.password !== password) {
            return res.status(401).send('Invalid email or password');
        }
        const patientName = user.name;
        res.render('patientDashboard', { patientName: patientName });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
