


const personalityHelper = require('./app/helpers/personality-insights');
const profileFromText = personalityHelper.profileFromText;
var Activity     = require('./app/models/activity');
var Rules     = require('./app/models/rules');


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

  app.post('/executeRule',function(req, res,next) {

		var query = {
		};
    var query1 = {
    };
    if(req.body.user)
  			query1.user = req.body.user;

    if(req.body.domain)
		       query.domain = req.body.domain;

    Rules.find(query).exec(function(err, domainRules){
          console.log("Response in finding Rules" , err, domainRules);
          if(err)
            console.log("Rules for domain:  Error",domainRules);
          if (domainRules && domainRules[0])
          {
            for (var i = 0; i < domainRules[0].rules.length; i++) {
              console.log("Rules for i",domainRules[0].rules[i]);

                query1.activity = domainRules[0].rules[i].ruleJSON.activity;
                query1.vendor = domainRules[0].rules[i].ruleJSON.vendor;
                query1.score = domainRules[0].rules[i].numberOfTransactions;
                query1.points = domainRules[0].rules[i].points;
              }
                console.log("Rule to be executed is",query1);
               Activity.find(query1).exec(function(err, userActivity){
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
          }
          else
            {
                console.log("No Rules found for the domain",query.domain);
                res.json({ message: 'No Rules Found!' });
            }
        });
	    });

  app.post('/addRule',function(req, res,next) {

   var query = {
   };

   console.log("add Rule domain",req.body.domain);
   console.log("add Rule RULE",req.body.rule);

   if(req.body.domain)
     query.domain = req.body.domain;

 Rules.find(query).exec(function(err, domainRules){
     console.log("Error in finding Rules" , err, domainRules);
     if(err)
       console.log("Rules for domain:  Error");
     if (domainRules && domainRules[0])
     {
       //var newRule = new Rule();\
       var newRule = JSON.parse(req.body.rule);
       console.log("Rules for domain:  Found",domainRules[0]);
       if(domainRules[0].rules){
          domainRules[0].rules.push(newRule);}
        else {
          var newRules = new Rules();
          newRules.rules = [];
          newRules.rules.push(newRule);
          domainRules[0].rules = newRules;
        }
        domainRules[0].save(function(err){
          console.log("Rules for domain created and saved");
        });
        res.json({ message: 'Rules Updated!' });
     }
     else
       {
           console.log("No Rules found for the domain",query.domain);

           var newRule = JSON.parse(req.body.rule);

           var newRules = new Rules();
           newRules.domain = req.body.domain;
           newRules.rules = [];
           newRules.rules.push(newRule);
           newRules.save(function(err) {
             console.log(err);
             if (err)
                res.send(err);
              res.json({ message: 'Rules created!' });
           });
       }

   });
 });

 app.post('/getRules',function(req, res,next) {

  var query = {
  };

  console.log("Get Rules domain",req.body.domain);

  if(req.body.domain)
    query.domain = req.body.domain;

Rules.find(query).exec(function(err, domainRules){
    console.log("Response in finding Rules" , err, domainRules);
    if(err)
      console.log("Rules for domain:  Error",domainRules);
    if (domainRules && domainRules[0])
    {
      console.log("Rules for domain:  Found");
      var actual_rules = [];
      res.json(domainRules[0]);
    }
    else
      {
          console.log("No Rules found for the domain",query.domain);
          res.json({ message: 'No Rules Found!' });
      }

  });
});


  	function getFormattedStringFromJSON(jsonObj)
  	{
  		var formattedStr;
  		formattedStr = jsonObj.activity+"d "+jsonObj.category+" in "+jsonObj.vendor+" website for "+jsonObj.score+" times.";
  		return formattedStr;
  	}

};
