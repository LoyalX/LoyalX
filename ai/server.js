
// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/l0yalx-activity'); // connect to our database
var Activity     = require('./app/models/activity');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('requests are routed here.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Thanks for accesing l0yalx' });	
});

//=============================================================================
// on routes that end in /activity
// ----------------------------------------------------
router.route('/activity')

	// create a employee (accessed at POST http://localhost:8080/employee)
	.post(function(req, res) {

		console.log("Post Activity");
		
		var activity = new Activity();		// create a new instance
		activity.user = req.body.user;  // set the activity name
		activity.activity = req.body.activity; 
		activity.vendor = req.body.vendor; 
		activity.category = req.body.category; 

		var query = {
		};

		if (req.body.user) {
		    query.user = req.body.user;
			query.activity = req.body.activity; 
			query.vendor = req.body.vendor; 
		}

		Activity.find(query).exec(function(err, userActivity){
			console.log("Error in finding" , err, userActivity);
			if (userActivity && userActivity[0])
			{
				console.log("Post Activity:  Found");
					var score = userActivity[0].score;
					userActivity[0].score = ++score;
					userActivity[0].save(function(err) {
						console.log(err);
						if (err)
							res.send(err);
						res.json({ message: 'Activity Updated with score!',score });
					});		
				
			}
			else
				{
						console.log("Post Activity: Not Found");
						activity.save(function(err) {
						console.log(err);
						if (err)
							res.send(err);
						res.json({ message: 'Activity created!' });
						});			
				}
		});
	})

	// get all the activity (accessed at GET http://localhost:8080/api/activity)
	.get(function(req, res) {
		Activity.find(function(err, activity) {
			if (err)
				res.send(err);

			res.json(activity);
		});
	});

// on routes that end in /activity/:user_id
// ----------------------------------------------------
router.route('/activity/:user_id')

	// get the employee with that id
	.get(function(req, res) {

		var query = {
		};

		if (user_id) {
		    query.user = user_id;
		}

		Activity.find(query).exec(function(err, activity){
			if (err)
				res.send(err);
			res.json(activity);
		});
	});


router.route('/job')

	.post(function(req, res) {

		var query = {
		};
		
		if(req.body.user)
			query.user = req.body.user;

		if(req.body.activity)	
			query.activity = req.body.activity; 
		
		if(req.body.vendor)
			query.vendor = req.body.vendor; 

		if(req.body.score)
			query.score = req.body.score; 

	Activity.find(query).exec(function(err, userActivity){
			console.log("Error in finding" , err, userActivity);
			if(err)
				console.log("Activities for rule1:  Error");
			if (userActivity && userActivity[0])
			{
				console.log("Activities for rule1:  Found",userActivity.length);
				res.json({ 
					message: userActivity,
					status: 200
				});

			}
			res.json({ 
				message: 'Activity not Found!' ,
				status: 404
			});

		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('AI happens on port ' + port);
