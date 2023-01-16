const { Validator } = require('node-input-validator');
contactValidator = (req, res, next) =>{
      //etape 3 : validateur d'email
    const FormValid = new Validator(req.body, {
      email: 'required|email',
      subject: 'required',
      message : 'required'
    });  
    FormValid.check().then((matched) => {
      if (!matched) {
        res.render('contact', {formError : FormValid.errors});
        return;
      }
      next();
    });
}
module.exports = contactValidator