var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ActivitySchema   = new Schema({
	 user:{
        type: String,
        require: true
    },
    activity: {
        type: String,
        require: true
    },
    date: {
        type:Date,
        default:Date.now
	},
    vendor: {
        type:String
	},
	category: {
        type:String
	},
    score: {
        type:Number,
        default: 0
    }
});




module.exports = mongoose.model('Activity', ActivitySchema);
