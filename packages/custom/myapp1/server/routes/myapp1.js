(function() {
    'use strict';

    module.exports = function(app) {

        var myapp1 = require('../controllers/contactus');

        app.post('/api/contact-us', function(req, res) {
            myapp1.ContactusMail(req, res);
        });
    };
})();
