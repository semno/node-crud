const Event = require('../models/event');

module.exports = {
	showEvents : showEvents,
	showSingle : showSingle,
	processCreate: processCreate,
	showCreate : showCreate,
	processEdit: processEdit,
	showEdit : showEdit,
	eventDelete: eventDelete
}

	function showEvents (req, res)  {
		// Get all from Database
		Event.find({}, function(err, events){
			if(err) {
				res.status(404);
				res.send('Events Not Found..');
			}
			res.render('pages/events',{
				events : events, 
				success: req.flash('success')
			});
		})
		
	}
	function showSingle (req, res)  {
		Event.findOne({slug: req.params.slug}, (err, event) => {
			if(!event) {
				res.status(404);
				res.send('Event Not Found..');
			} else{
			res.render('pages/singel_event',{
					event: event,
					sucess : req.flash('success')
				});
			}
		});
		
	}


	/**
	* create
	*/
	 function showCreate(req, res){
	 	res.render('pages/create', { 
	 		errors : req.flash('errors')
	 	});
	 }


	 function processCreate(req, res){
	 	// validate informtion
	 	req.checkBody('name','name is requerd.').notEmpty();
	 	req.checkBody('description','description is requerd.').notEmpty();

	 	//if error in valitation
	 	const errors = req.validationErrors();
	 	if(errors) {
	 		req.flash('errors', errors.map(err => err.msg ));
	 		return res.redirect('/events/create');
	 	}

	 	const event =  new Event({
	 		name : req.body.name,
	 		description : req.body.description,
	 		create_date: new Date(Date.now()).toISOString()
	 	});
	 	event.save( (err) => {
	 		if(err)
	 			throw err;

	 		req.flash('success','Successfuly created event!');
	 		res.redirect(`/events/${event.slug}`);
	 	});
	 }

	 function showEdit(req, res){
	 	Event.findOne({ slug : req.params.slug}, (err, event) => {
	 		res.render('pages/edit', {
	 			event : event,
	 			errors: req.flash('errors')
	 		})
	 	})
	 	
	 }

	 function processEdit( req, res) {
	 	// validate informtion
	 	req.checkBody('name','name is requerd.').notEmpty();
	 	req.checkBody('description','description is requerd.').notEmpty();

	 	//if error in valitation
	 	const errors = req.validationErrors();
	 	if(errors) {
	 		req.flash('errors', errors.map(err => err.msg ));
	 		return res.redirect(`/events/${req.params.slug}/edit`);
	 	}

	 	Event.findOne( {slug : req.params.slug}, (err, event) => {
	 		event.name = req.body.name;
	 		event.description = req.body.description;
	 		event.update_date =  new Date(Date.now()).toISOString();


	 	event.save( (err) => {
	 		if(err)
	 			throw err;

	 		req.flash('success','Successfuly Update event!');
	 		res.redirect('/events/');
		 	});
		 })
	}
	function eventDelete(req, res){
		Event.remove({ slug: req.params.slug}, (err) =>{
			req.flash('success','Event removed ..!');
			res.redirect('/events');

		})
	}

