// creat a new express route
const express = require('express'),
	router = express(),
	mainController = require('../controllers/main.controller'),
	eventsController = require('../controllers/events.controller'),
	fn = require("../models/ckeditorUpload"),
	newsController = require('../controllers/news.controller'),
	userController = require('../controllers/user.controller'),
	apiController = require('../controllers/api.controller');

// export router
module.exports = router ; 
// define routes
router.get('/', mainController.showHome);
/**
* Events 
**/
// #-> GET 
router.get('/events', eventsController.showEvents); // view all events
router.get('/events/create', eventsController.showCreate); // create new event
router.get('/events/:slug/edit', eventsController.showEdit); // edit event
router.get('/events/:slug/delete', eventsController.eventDelete); // delete event
// #->POST
router.post('/events/create',eventsController.processCreate); // proccess add new event
router.post('/events/:slug', eventsController.processEdit); // proccess edit  event by slug
// view singel event
router.get('/events/:slug', eventsController.showSingle); 
// End Events routes -------------------------------------------------------------------------------------------
/**
* News 
**/
// #-> GET 
router.get('/news', newsController.showAllNews);
router.get('/news/create', newsController.showCreate);

// #->POST
router.post('/news/create', newsController.proccessCreate);
router.post('/news/comment', newsController.commentCreate);


router.get('/news/:slug', newsController.showSingle); 
// End News routes -------------------------------------------------------------------------------------------
// CKeditor Uploader
router.post('/uploader', fn);
// End Uploader routes -------------------------------------------------------------------------------------------

/** 
* Users 
**/
router.get('/register', userController.register);
router.get('/profile', userController.profile);
router.get('/logout', userController.logout);

// -> POST 
router.post('/register',userController.processRegistertion);
router.post('/login',userController.processLogin);
// End User routes -------------------------------------------------------------------------------------------


