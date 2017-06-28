'use strict'

/*
 * Defining the Package
 */
var Module = require('meanio').Module
var path = require('path')
var MeanStarter = new Module('meanStarter');
var nodemailer = require('nodemailer'),
    config = require('meanio').getConfig();
//var contactus = require('./public/controllers/contactus')();

function sendMail(mailOptions) {
    var transport = nodemailer.createTransport(config.mailer);
    transport.sendMail(mailOptions, function(err, response) {
        if (err){
            console.log(err);
            return err;
        }
        console.log(response);
        return response;
    });
}
/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
MeanStarter.register(function (app, users, system) {
  // Set views path, template engine and default layout
    app.set('views', path.join(__dirname, '/server/views'));

    app.get('/api/capcha',function (req,res) {
        var strategies = config.recapcha;
        res.send(strategies);
    });


    app.post('/api/contact-us', function(req, res) {
       // console.log(req);
        //contactus.ContactusMail(req, res);
        var ContactUsmailOptions = {
            to: config.emailFrom,//req.user.email,
            from: config.emailFrom,//config.emailFrom,
            subject: req.body.name+' Contacted.', // Subject line
            text: req.body.page, // plain text body
            html: "Email : <BR>"+req.body.email +"<BR> Message : <BR>"+ req.body.message // html body
        };

        sendMail(ContactUsmailOptions, function(error, response){
            if(error){
                console.log("error" + error);
                response.send(error);
            }else{
                console.log("Success");
                response.send('succesfully Sent');
            }
        });

        res.send('succesfully Sent');

    });

    /*MeanStarter.aggregateAsset('js', './js/angular-recaptcha.min.js');*/

    MeanStarter.angularDependencies(['mean.system', 'mean.users','vcRecaptcha'])

   return MeanStarter
})
