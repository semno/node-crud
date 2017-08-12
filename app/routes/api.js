// creat a new express route
const express = require('express') ,
	 router = express.Router(),
	 apiController = require('../controllers/api.controller'),
	 authController = require('../controllers/auth');

// export router
module.exports = router ; 
/** 
* API's 
**/
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});
/*=============================================
=           	   	      Users         			=
=============================================*/
// --> Get
router.get('/user/check/:username',apiController.chekUser);

// --> POST
 router.post('/users',apiController.postUsers);
 router.post('/login',apiController.loginUser);
// --> PUT
router.put('/user',authController.isAuthenticated, apiController.editUser); // UPDATES A SINGLE NEWS IN THE DATABASE


/*=============================================
=           		      News         			=
=============================================*/
// --> Get
router.get('/news/list',apiController.getAllNews);
router.get('/news/:slug',apiController.getNews);
// --> POST
router.post('/news/create', apiController.createNews);
// --> DELETE Params <ObjectID> Return <Json>
router.delete('/news/:id', apiController.removeNews);
// --> PUT Params <ObjectID> Return <Json>
router.put('/news/:id', apiController.editNews); // UPDATES A SINGLE NEWS IN THE DATABASE

/*=============================================
=           		 Events         				=
=============================================*/
// --> Get
router.get('/events/list',apiController.getAllEvent);
router.get('/event/:eventId',apiController.getEvent);
// --> Post
router.post('/event/create', apiController.createEvent);
// --> Delete Params <ObjectID> Return <Json>
router.delete('/event/:id', apiController.removeEvent);
// --> PUT Params <ObjectID> Return <Json>
router.put('/event/:id', apiController.editEvent);

// End API routes -------------------------------------------------------------------------------------------


