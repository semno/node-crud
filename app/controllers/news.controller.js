const 		News = require('../models/news')
 		, Comment = require('../models/comment');
module.exports = {
	showAllNews : showAllNews,
	showSingle: showSingle,
	showCreate: showCreate,
	proccessCreate: proccessCreate,
	commentCreate: commentCreate
}
/**
* View news 
**/ 
// view all
function showAllNews(req, res){

	var collectionCount, rowsPerPage = 6;
	News.count( {}, function(err, c) {
	           collectionCount =  c ;
	      });

	News.find({}, (err, news) =>{
		if(err){
			// if get error return in console error and change status
			console.log( err );
		}
		else{
			const pageOption = {
    					prelink:'/', 
    					current: (req.query.page)? parseInt(req.query.page) : 1, 
    					rowsPerPage:rowsPerPage, 
    					totalResult: collectionCount
    					};
			 var paginator = pagination.create('search', pageOption);

			res.render('pages/news/home', {
				pageNo: parseInt(req.query.page), 
				newsList: news, 
				paginator: paginator.getPaginationData()
			});
		}
		})
		.populate( 'author' )
		.sort({'create_date': -1})
		.limit(rowsPerPage)
		.skip( (req.query.page)? (rowsPerPage*parseInt(req.query.page)) - rowsPerPage: 0 );
	
}
// view singel

	function showSingle (req, res)  {

		News.findOne({slug: req.params.slug}, (err, news) => {
			  Comment.find( { "post_id": { "$in": news } }).populate( 'author' ).exec( function(err,comments){
				  if(!news) {
					res.status(404);
					res.send('Event Not Found..');
				} else{
					// res.send(comments)
				res.render('pages/news/singel',{
						news: news,
						comments: comments,
						sucess : req.flash('success')
					});
				}

				});
		
		});
		
	}

/**
* create  news 
**/ 
// show create form
function showCreate(req, res) {
if(! req.session.userId ) {return res.redirect('/'); }
	res.render('pages/news/create', {
		errors: req.flash('errors')
	});
}
// proccessing create
function proccessCreate(req, res) {
if(! req.session.userId ) {return res.redirect('/'); }

	// form validate
	 	req.checkBody('title','Ttile is requerd.').notEmpty();
	 	req.checkBody('description','description is requerd.').notEmpty();

	 	req.getValidationResult()
		   .then(function(result){
		     if (!result.isEmpty()) {
		     	req.flash('errors', result.array().map(err => err.msg ));
		 	return res.redirect('/news/create');
		    }else{
			// UploadFile
			/**
			*	 Use Express-fileuplad See //-> NPM
			**/
			var photoFullPath;
			 if( req.files && req.files.photo ){
			 	let photo = req.files.photo;
			 	if( photo.mimetype ===  'image/gif' || photo.mimetype ===  'image/png' || photo.mimetype ===  'image/jpeg' || photo.mimetype ===  'image/bmp'  || photo.mimetype ===  'image/webp'  ){
				 photoFullPath = Date.now()+'-'+ photo.name;
				 	photo.mv('./public/upload/'+photoFullPath  , (err) =>{
				 		if(err){
				 			console.log(err);
				 			return false;
				 		}
				 	});
				 }
			 }

			// console.log(req.body);
			const news = new News({
				title : req.body.title,
				description : req.body.description,
				photo : photoFullPath,
				author: req.session.userId
			});
			news.save((err) =>{
				if(err)
				 	throw err;

				 		req.flash('success','Successfully created news!');
				 		res.redirect(`/news/${news.slug}`);
			})
		    }
		     
		   });

}


function commentCreate(req, res) {
if(! req.session.userId ) {return res.redirect('/'); }


	const ComentBody = new Comment({
		body: req.body.body,
		post_id : req.body.post_id,
		author : req.session.userId
	});
	Comment.create(ComentBody, (err, resorv, news) =>{
		console.log(news);
		//        if (err) return res.status(500).json({status: false, msg: 'There was a problem updating the item.',errro : err });

		if(err) { return resorv.send(err);}
		req.flash('success','Successfully created Comment!');
		res.redirect(`/news/${req.body.redirect}`);
	});
}

/**
* edit  news 
**/ 

/**
* delate  news 
**/ 

