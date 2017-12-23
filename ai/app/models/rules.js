var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;



var RulesSchema   = new Schema({
	 domain:{
        type: String,
        require: true
    },
    // rules: [{ type: Schema.Types.ObjectId, ref: 'Rule' }]
		rules: [{}]
});

module.exports = mongoose.model('Rules', RulesSchema);
