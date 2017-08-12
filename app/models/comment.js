const mongoose = require('mongoose'),
	schema 	= mongoose.Schema;

commentSheams = new schema({
	body: String,
	post_id: {
		type: schema.ObjectId , 
		ref: 'News'
	},
	create_date: { type : Date, default: Date.now } , 
	author : { 
		type:  schema.ObjectId , 
		ref: 'User'
	},
});

// handel result 
commentSheams.method('toJSON', function() {
	    var comment = this.toObject();
	    delete comment.author.token;
	    delete comment.author.password;
	    delete comment.author.__v;
	    delete comment.__v;
	    return comment;
	  });
	// create the model
	const commentModel = mongoose.model('Comment', commentSheams);

	// export the model
	module.exports = commentModel;