const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer")
const contactValidator = require('../middlewares/validators/contact.validator')
const sendEmail = require('../middlewares/services/email.service')

// GET Home page
router.get('/', (req, res) =>{
    res.render('index', {title: "Home Page"});
}) 

// GET contact page
router.get('/contact', (req, res) =>{
    res.render('contact', {title: "Contact Page"});
})

/* envoye du formulaire par la methode POST */
router.post('/contact', contactValidator , sendEmail)

module.exports = router;