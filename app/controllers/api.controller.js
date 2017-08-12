const User = require('../models/user'),
 	Event = require('../models/event'),
	News = require('../models/news');
module.exports = {
	getAllNews : getAllNews,
	getNews : getNews,
	createNews: createNews,
	editNews: newsUpdate,
	getAllEvent: getAllEvent,
	getEvent: getEvent,
	chekUser: chekUser,
	removeNews: removeNews,
	editEvent: editEvent,
	createEvent: createEvent,
	removeEvent: removeEvent,
	postUsers:postUsers,
	editUser: editUser,
	loginUser: loginUser
}

/**===========================================**\
*=            		User block            			=*
*=============================================*/
/**
* loginUser() Login  User
*
* @return <Json> 
* @return <Token> Type Bearer 
*/
function loginUser(req, res, callback){
	User.findOne({ username: req.body.username }, function (err, user) {
	      if (err) { return res.send(err); }

	      // No user found with that username
	      if (!user) { return res.json({status: 401, msg: 'No user found with that username' }); }

	      // Make sure the password is correct
	      user.verifyPassword(req.body.password, function(err, isMatch) {
	        if (err) { return res.send(err); }

	        // Password did not match
	        if (!isMatch) { return res.send({status: 401, msg: 'password not matcen'}) ; }

	        // Success
	        if(!user.token){
	        	User.findByIdAndUpdate({_id: user._id}, {token: uid(128)}, {new: true}  , function (err, userTockin) {
		        if (err) return res.status(500).json({status: false, msg: 'There was a problem updating the item.',errro : err });
		        return res.send(userTockin);
		    });
	        }else{
		        return res.send(user);
	        }

	      });
	    });

}

/**
* postUsers()  create New User
*
* @return <Json> 
*/
function postUsers  (req, res, callback) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
  });
 user.save(function(err) {
        if (err) return res.status(500).json(err.errors );

    res.status(200).json({ message: 'saved successfully  ' , user: user});
  });
}


function editUser (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).json({status: false, msg: 'There was a problem updating the item.',errro : err });
        res.status(200).json(user);
    });
}

/**
* getAllNews() Get all News
*
* @return <json>
*/
function getAllNews(req, res){

	News.find({}).populate({ path: 'author' }). exec(function (err, news) {
		    if (err) return handleError(err);
		    res.send(news);
  })

}
/**
* getNews() Get  news
*
* @params <Slug> 
* @method <GET> 
* @return <json> 
*/
function getNews(req, res){
		News.findOne({slug: req.params.slug}, (err, news) =>{
		if(err){
			res.json({ status: false, msg: 'Not Found any item'});
		}
		else{
			if(news) {
				res.json(news);
			}else{
				res.json({ status: false, msg: 'not found any data.'});
			}
		}
		})
}

/**
* removeNews() Remove news
*
* @params <id> 
* @method <DELETE> 
* @return <json> 
*/
function removeNews(req, res){
	News.deleteOne({_id: req.params.id}, (err, resorv) => {
		if(err){
			res.json({ status: false, msg: 'error '});
		}else{
			res.json({ status: true, msg: 'Successfully deleted '});
		}
	});
}


function newsUpdate (req, res) {
    News.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, news) {
        if (err) return res.status(500).json({status: false, msg: 'There was a problem updating the item.',errro : err });
        res.status(200).json(news);
    });
}
function createNews (req, res) {
    News.create(req.body,  function (err, news) {
        if (err) return res.status(500).json({status: false, msg: 'There was a problem create the item.',errro : err });
        res.status(200).json(news);
    });
}
/**===========================================**\
*=            		Event block            			=*
\*=============================================*/

function getAllEvent(req, res){
	Event.find({}, (err, event) =>{
		if(err){
			res.json({ status: false, msg: 'error'});
		}
		else{
			if(event) {
				res.json(event);
			}else{
				res.json({ status: false, msg: 'not found any data.'});

			}
			
		}
		})
}

function createEvent (req, res) {
    Event.create(req.body,  function (err, event) {
        if (err) return res.status(500).json({status: false, msg: 'There was a problem create the item.',errro : err });
        res.status(200).json(event);
    });
}
/**
* getEvent() Get  One Event
*
* @params <_id> 
* @return <json> 
*/
function getEvent(req, res){
		Event.findById( req.params.eventId, (err, event) =>{
		if(err){
			res.json({ status: false, msg: 'Not Found any item'});
		}
		else{
			if(event) {
				res.json(event);
			}else{
				res.json({ status: false, msg: 'not found any data.'});
			}
		}
	})
}

function editEvent (req, res) {
    Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, event) {
        if (err) return res.status(500).json({status: false, msg: 'There was a problem updating the item.',errro : err });
        res.status(200).json(event);
    });
}

function removeEvent(req, res) {
	Event.findByIdAndRemove(req.params.id, function (err, event) {
	        if (err) return res.status(500).json({status: false, msg: 'There was a problem Deleting the item.',errro : err });
	        res.status(200).json(event);
	    });
}

/**
* chekUser() Get  user Data
*
* @params <username> 
* @return <json> 
*/
function chekUser(req, res){
			User.findOne( {username: req.params.username } , (err, user) =>{
		if(err){
			res.json({ status: false, msg: 'Not Found any item'});
		}
		else{
			if(user) {
				res.json(user);
			}else{
				res.json({ status: false, msg: 'not found any data.'});
			}
		}
		})
}
function uid (len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}