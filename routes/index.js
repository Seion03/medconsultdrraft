var express = require('express');
var router = express.Router();
var Doctor = require('../models/doctorsmodel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/registerdoctor', function(req, res, next) {
  res.render('registerdoctor', { title: 'Doctor Registration' });
});

router.post('/registerdoctor', async (req, res) => {
  try {
      const newUser = new Doctor({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          position: req.body.position,
          speciality: req.body.speciality,
          experience: req.body.experience
      });
      console.log(newUser);

      await newUser.save();
      res.send('User signed up successfully!');
  } catch (error) {
      res.status(500).send('Error signing up user: ' + error.message);
  }
});

router.post('/doctorLogin', async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await Doctor.findOne({ email });
      if (!user) {
          return res.status(401).send('Invalid email or password');
      }
      if (user.password !== password) {
          return res.status(401).send('Invalid email or password');
      }
      const doctorName = user.name;
      res.render('doctorDashboard', { doctorName: doctorName });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});



router.get('/registeradmin', function(req, res, next) {
  res.render('registeradmin', { title: 'Admin Registration' });
});

router.get('/registerpatient', function(req, res, next) {
  res.render('registerpatient', { title: 'Register Registration' });
});


module.exports = router;
