const 	mongoose 	= require('mongoose'),
 	schema 	= mongoose.Schema;

 // creat schema for news collection
 const newsSchema = new schema({
 	title :  {
			type: String,
			reqired: true,
		},
 	
 	update_date: Date,
 	slug : {
			type: String,
			unique: true
		},
	description : {
			type: String,
			reqired: true,
		},
	create_date: {
 		type: Date, 
 		default: Date.now,
 	},
	author : { 
		type:  schema.ObjectId , 
		ref: 'User'
	},
	photo: String,
	like: Number,
	shear: Number
 });

// handel result 
newsSchema.method('toJSON', function() {
	    var news = this.toObject();
	    delete news.author.token;
	    delete news.author.password;
	    delete news.author.__v;
	    delete news.__v;
	    return news;
	  });
//create 
 	newsSchema.pre('save', function(next){
		this.slug = getSlug(this.title);
		next();
	})


	// create the model
	const newsModel = mongoose.model('News', newsSchema);

	// export the model
	module.exports = newsModel;