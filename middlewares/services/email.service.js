const nodemailer = require("nodemailer")

sendEmail = (req, res, next) =>{
         //etape 1 : recuperer les données du formulaires avec la methode req.body
    console.log(req.body)
    //etape 2 : envoyer le mail avec la methode send
    let transporteur = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'edithrand505@gmail.com',
            pass:'Lafatra1993'
        }
    });
    let message = "Email :" + req.body.email + "<br>Message : " + req.body.message
    let mailOption = {
        from: req.body.email, //recuperer le mail dans la forme
        to: 'musikaloh@gmail.com',
        subject : req.body.subject,
        html: message
    }
    transporteur.sendMail(mailOption, (err, infos) =>{
        if(err){
            //si il y a erreur, envoyer l'erreur dans la consol et rediriger l'utilisateur vers la page contact
            console.log(err);
            res.render('contact', {title: "Contact Page", 
            error:"error, please try again"});
            next()
        }else{
            console.log(infos)
            res.render('contact', {title: "Contact Page", 
            succes:"your message has benn sent successfully"});
            next()
        }
    })
}

module.exports =sendEmail