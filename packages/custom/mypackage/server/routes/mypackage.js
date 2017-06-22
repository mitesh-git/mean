(function() {
    'use strict';

    module.exports = function(Mypackage, app, auth, database, circles) {

        var mypackages = require('../controllers/mypackage')(Mypackage);

        //var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.post('/api/mypackage/addreport', requiresLogin, function(req, res) {
            mypackages.AddNewReport(req, res);
        });
        app.put('/api/mypackage/editreport/:id', requiresLogin, function(req, res) {
            mypackages.EditTaskReport(req, res);
        });
        app.post('/api/mypackage/sendemail', requiresLogin, function(req, res) {
            mypackages.SendTaskEmail(req, res);
        });
        app.get('/api/mypackage/usertasks', requiresLogin, function(req, res) {
            mypackages.ListTaskReports(req, res);
        });
        app.get('/api/mypackage/usertasks/:taskID', requiresLogin, function(req, res) {
            mypackages.TaskDetailsByID(req, res);
        });
        app.delete('/api/mypackage/deletetask/:taskID', requiresLogin, function(req, res) {
            mypackages.DeleteTaskReports(req, res);
        });
    };
})();
