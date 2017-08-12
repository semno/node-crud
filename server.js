//load envirment  variables
require('dotenv').config();

// grab our dependencies
	const express 			= require('express'),
		app  			= express();
		port 			= process.env.PORT || 8080,
		expresslayout  	= require('express-ejs-layouts'),
		mongoose                   = require('mongoose'),
		bodyParser                  =   require('body-parser'),
		session                        = require('express-session'),
                        truncatise                     = require('truncatise'),
		cookieParser               = require('cookie-parser'),
		flash                            = require('connect-flash'),
		expressValidator         = require('express-validator'),
		getSlug                        = require('speakingurl'),
		pagination                    = require('pagination'),
		fecha                           = require('fecha'),
		fileUpload  		= require('express-fileupload'),
		bcrypt 			= require('bcrypt'),
		 assert = require('assert') ,
		passport 		= require('passport');

// configration our application ==========================
// cookie

app.use(cookieParser());
app.use(session({
	secret : process.env.SECRET,
	 saveUninitialized: true,
  	resave: true
}));
// handel flash messeges
app.use(flash());
// File upload
app.use(fileUpload({safeFileName: true}));	


// tell express when to look for static asset ================
app.use(express.static( __dirname +  '/public'));
// set ejs as our 
app.set('view engine', 'ejs');
app.use(expresslayout);

// conact to database 
 mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {useMongoClient: true});

// parse incoming requests
app.use( bodyParser.urlencoded({ extended: true }) );

// body validation
app.use(expressValidator());
app.use(passport.initialize());
// ser the routes ====================================
app.use(  require('./app/routes/web') );
app.use( '/api', require('./app/routes/api')  );
//sart our server ====================================
app.listen(port, () => {
	console.log(`App Listening on http://localhost:${port}`);
});
