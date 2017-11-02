


const personalityHelper = require('./app/helpers/personality-insights');
const profileFromText = personalityHelper.profileFromText;
var Activity     = require('./app/models/activity');


module.exports = (app) => {
  // personality profile from text
  

  app.post('/job/profile',function(req, res,next) {

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
				var str="";
				for(index=0;index < userActivity.length ; index++)
				{
					str = str + getFormattedStringFromJSON(userActivity[index]);
				}
				var text1 = {"text": str};
				console.log("String: ",str);
				profileFromText(text1)
      			.then(res.json.bind(res))
     			 .catch(next);

			}else
				res.json({ message: 'Activities not Found!' });

		});
	});

   app.post('/rule',function(req, res,next) {

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
				var str="";
				for(index=0;index < userActivity.length ; index++)
				{
					var user = userActivity[index].user;
					//TODO: Call BC for updating the points
					//Update the useractivity with the score to zero
					userActivity[index].score = 0;
					userActivity[index].save(function(err) {
						console.log(err);
						if (err)
							console.log("Error in resetting the activity score to zero");
						else
							console.log("Activity updated to reset the score to zero");
					});		
				}

			}
				res.json({ message: 'Rules applied succesfully!' });

		});
	});


  	function getFormattedStringFromJSON(jsonObj)
  	{
  		var formattedStr;
  		formattedStr = jsonObj.activity+"d "+jsonObj.category+" in "+jsonObj.vendor+" website for "+jsonObj.score+" times.";
  		return formattedStr;
  	}

};
