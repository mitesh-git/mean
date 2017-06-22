var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DailyReport = new Schema({
    task:String,
    status:String,
    date:Date,
    user:String,
    remark:String
});
module.exports = mongoose.model('DailyReport', DailyReport);