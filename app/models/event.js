const mongoose 	= require('mongoose'),
	schema 	= mongoose.Schema;
	// Create a schema
	const eventSchema = new schema({
		name : String,
		update_date: Date,
		create_date: Date,
		slug : {
			type: String,
			unique: true
		},
		description : String,
		author : String
	});

	// middleware --------------
	// make sure that the slug created from name
	eventSchema.pre('save', function(next){
		this.slug = getSlug(this.name);
		next();
	})


	// create the model
	const eventModel = mongoose.model('Event', eventSchema);

	// export the model
	module.exports = eventModel;