'use strict'

/*
 * Defining the Package
 */
var Module = require('meanio').Module
var path = require('path')
var MeanStarter = new Module('meanStarter');
var nodemailer = require('nodemailer'),
    config = require('meanio').loadConfig();
//var contactus = require('./public/controllers/contactus')();

function sendMail(mailOptions) {
    var transport = nodemailer.createTransport(config.mailer);
    transport.sendMail(mailOptions, function(err, response) {
        if (err){
            console.log(err);
            return err;
        }
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
                res.send(error);
            }else{
                console.log("Success");
                res.send('succesfully Sent');
            }
        });
    });

    MeanStarter.angularDependencies(['mean.system', 'mean.users'])

   return MeanStarter
})
