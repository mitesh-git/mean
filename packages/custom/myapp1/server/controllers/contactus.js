'use strict';

var nodemailer = require('nodemailer'),
    config = require('meanio').loadConfig();

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
module.exports = function(Contactus) {
    return {
        /*ContactusMail: function(req, res) {
            var ContactUsmailOptions = {
                to: req.user.email,//req.user.email,
                from: config.emailFrom,//config.emailFrom,

                subject: req.body.name+' Contacted.', // Subject line
                text: req.body.page, // plain text body
                html: req.body.message // html body
            };

            sendMail(ContactUsmailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    //res.redirect('/');
                    console.log(response);
                }
            });
        }*/
    };
}