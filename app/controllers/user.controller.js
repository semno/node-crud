const User = require('../models/user');
module.exports = {
		register : register,
		processRegistertion : processRegistertion,
		processLogin  : processLogin,
		logout: logout,
		profile: profile
	}
	function register(req, res) {
		if(! req.session.userId ) {
		res.render('pages/user/register', {
			errorsRegister: req.flash('errors'),
			errorsLogin: req.flash('errorsLogin'),
			});
		}else{
			 return res.redirect('/profile');
		}
	}
	function processRegistertion(req, res) {
		req.checkBody('name','name is requerd.').notEmpty();
		 req.checkBody('email','email is requerd.').notEmpty();
		 req.checkBody('email','Invalid Email').isEmail();
		 req.checkBody('username','username is requerd.').notEmpty();
		 req.checkBody('password','password is requerd.').notEmpty();

	// validation Body data
		 	req.getValidationResult()
			   .then(function(result){
			     if (!result.isEmpty()) {
			     	req.flash('errors', result.array().map(err => err.msg ));
			 	return res.redirect('/register');
			    }else{
			    	const userData = {
			    		name : req.body.name,
			    		username : req.body.username,
			    		password : req.body.password,
			    		email : req.body.email
			    	};
			    	User.create(userData, (err, usr) => {
			    		if(err){
			    			return res.send(err);
			    		}else{
			    			req.session.userId = usr._id;
			 			return res.redirect('/profile');
			    		}
			    	})
			    }
			});
	}

	function processLogin(req, res, next){
		 req.checkBody('email','email is requerd.').notEmpty();
		 req.checkBody('email','Invalid Email').isEmail();
		 req.checkBody('password','password is requerd.').notEmpty();
		 if( req.body.rememberMe ){
    			req.session.cookie.maxAge = 3600000 * 24 * 30;
		 }

	// validation Body data
		 	req.getValidationResult()
			   .then(function(result){
			     if (!result.isEmpty()) {
			     	req.flash('errorsLogin', result.array().map(err => err.msg ));
			 	return res.redirect('/register');
			    }else{
				User.authenticate( req.body.email, req.body.password , (err, user) => {
					if( err || !user){
					 req.flash('errorsLogin', err.msg );
					 return res.redirect('/register');
					}else{
						req.session.userId = user._id;
					 	return res.redirect('/profile');
					}
				});
			}
		});
	}

	function logout(req, res, next){
		if( req.session && req.session.userId  ) {
			// delete any sesstion and redirect
			req.session.destroy( (err) => {
				if(err){
					return next(err);
				}else{
					return res.redirect('/');
				}
			})
		}
	}
	function profile(req,res){
		if( req.session.userId  ) {
			res.send( 'UserID ' + req.session.userId );
		}else{
			return res.redirect('/');
		}
	}
