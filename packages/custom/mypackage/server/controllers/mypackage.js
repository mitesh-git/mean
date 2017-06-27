'use strict';

var mongoose = require('mongoose'),
    nodemailer = require('nodemailer'),
    config = require('meanio').loadConfig();

var ItemSchema = new mongoose.Schema({
        task: { type: String, required: true, trim: true },
        task_status: { type: String, required: true, trim: true },
        user: { type: String, required: true, trim: true },
        remark: { type: String, trim: true },
        date: { type: Date, required: true, trim: true }
    },
    {
        timestamps: true
    });
var  DailyReport = mongoose.model('DailyReportnew',ItemSchema);

/**
 * Send reset password email
 */
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
module.exports = function(Mypackage) {
    return {
        AddNewReport: function(req, res) {
            console.log(req.body);
            var dailyreport = new DailyReport(req.body);
            dailyreport.save(function (err, result) {
                if (err)
                return  res.send(500, { error: err });
                return res.send('succesfully saved');
            });
        },
        EditTaskReport : function(req,res){

            var query = {'_id':req.body.id};
            DailyReport.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
                if (err)
                    return  res.send(500, { error: err });
                return res.send('succesfully saved');
            });
        },
        ListTaskReports:function (req,res) {

            DailyReport.find({'user':req.user.email}, function (err, results) {
                res.json(results);
            });
        },
        DeleteTaskReports:function (req,res) {
            DailyReport.remove({_id: req.params.taskID}, function (err, result) {
                if (err)
                    return  res.send(500, { error: err });
                return res.send('Deleted');
            });
        },
        SendTaskEmail:function (req,res) {
            var MailString;
            var userTaskIds = [];
            //var users   = [];         // shortcut to find them faster afterwards
            for (var key in req.body) {      // first build the search array
                if (key) {
                    userTaskIds.push( new mongoose.Types.ObjectId( key ) );           // for the Mongo query
                    //users[key] = o;                                // to find the user quickly afterwards
                }
            }
            DailyReport.find( {_id: {$in: userTaskIds}} ,function(err, userTasks) {
                if (err)
                    console.log('err');
                else {
                    var UserTaskDate = '',
                        UserTask = '',
                        UserTaskStatus = '',
                        UserTaskRemark = '';
                    MailString = '<table width="500px"><thead><tr><th>Date</th><th>Task</th><th>Status</th><th>Remark</th></tr></thead><tbody>';
                    for (var key in userTasks) {
                        if(userTasks[key].date) UserTaskDate = userTasks[key].date.toDateString();
                        if(userTasks[key].task) UserTask = userTasks[key].task;
                        if(userTasks[key].task_status) UserTaskStatus = userTasks[key].task_status;
                        if(userTasks[key].remark) UserTaskRemark = userTasks[key].remark;

                        MailString += '<tr><td>'+ UserTaskDate+'</td><td>'+UserTask+'</td><td>'+UserTaskStatus+'</td><td>'+UserTaskRemark+'</td></tr>';
                    }
                    MailString += '</tbody><table>'

                    var mailOptions = {
                        to: 'sachin@monadinfotech.com',//req.user.email,
                        from: 'sachin@monadinfotech.com',//config.emailFrom,
                        // to: 'ramesh@monadinfotech.com',//req.user.email,
                        // from: 'ramesh@monadinfotech.com',//config.emailFrom,
                        subject: 'Status report ', // Subject line
                        text: MailString, // plain text body
                        html: MailString // html body
                    };

                    //console.log(mailOptions);
                    sendMail(mailOptions, function(error, response){
                        if(error){
                            console.log(error);
                        }else{
                            //res.redirect('/');
                            console.log(response);
                        }
                    });
                }
            });
        }

    };
}