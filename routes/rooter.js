const express = require("express");
const router = express.Router();
const { Validator } = require('node-input-validator');
const nodemailer = require("nodemailer")

// GET Home page
router.get('/', (req, res) =>{
    res.render('index', {title: "Home Page"});
}) 

// GET contact page
router.get('/contact', (req, res) =>{
    res.render('contact', {title: "Contact Page"});
})

/* envoye du formulaire par la methode POST */
router.post('/contact', (req, res) =>{
    //etape 3 : validateur d'email
    const FormValid = new Validator(req.body, {
        email: 'required|email',
        subject: 'required',
        message : 'required'
      });  
      FormValid.check().then((matched) => {
        if (!matched) {
          res.render('contact', {formError : FormValid.errors});
        }
      });
    //etape 1 : recuperer les données du formulaires avec la methode req.body
    console.log(req.body)
    //etape 2 : envoyer le mail avec la methode send
    let transporteur = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'musikaloh@gmail.com',
            pass:'Lafatra1993'
        }
    });

    let mailOption = {
        from: req.body.email, //recuperer le mail dans la forme
        to: 'edithrand505@gmail.com',
        subject : req.body.subject,
        text: req.body.message
    }
    transporteur.sendMail(mailOption, (err, infos) =>{
        if(err){
            //si il y a erreur, envoyer l'erreur dans la consol et rediriger l'utilisateur vers la page contact
            console.log(err);
            res.render('contact', {title: "Contact Page", 
            error:"error, please try again"});
        }else{
            console.log(infos)
            res.render('contact', {title: "Contact Page", 
            succes:"your message has benn sent successfully"});
        }
    })
})

module.exports = router;