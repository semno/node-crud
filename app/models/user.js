const mongoose 	= require('mongoose'),
	userSchema = new mongoose.Schema({
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true
		},
		username : {
			type: String,
			unique: true,
			required: true,
			trim: true
		},
		password: {
			type: String,
			required: true
		},
		create_date: { 
	 		type: Date, 
	 		default: Date.now,
	 	},
	 	token : {
			type: String,
			trim: true,
			default: ''
		},
		role: Array
	});
	userSchema.method('toJSON', function() {
	    var user = this.toObject();
	    delete user.password;
	    delete user.__v;
	    return user;
	  });
	userSchema.pre('save', function(next){
		var user = this;
		bcrypt.hash( user.password, 10, (err, hash) => {
			if(err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});

	userSchema.statics.authenticate = function (email, password, callback) {
		User.findOne({email : email })
		.exec( function (err, user ) {
			if( err ) {
				return callback(err);
			}else if (!user) {
				var err = 'User not found.';
				err.sttaus = 401;
				return callback({ status: 'error', code: 001, msg: err});
			}
			bcrypt.compare(password, user.password, function(err , res){
				if(res === true){
					return callback(null, user);
				}else {
					return callback({ status: 'error', code: 002,  msg: 'Password Not corect '});
				}
			})
		})
	}
	userSchema.methods.verifyPassword = function(password, cb) {
		  bcrypt.compare(password, this.password, function(err, isMatch) {
		    if (err) return cb(err);
		    cb(null, isMatch);
		  });
		};
	// create the model
	const User = mongoose.model('User', userSchema);

	// export the model
	module.exports = User;