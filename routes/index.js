//load up express module
var express = require('express');

//load up cutom db module... abstracts the mongodb interface a bit
var DB = require('../javascripts/db');

//make a new Express router
var router = express.Router();

/* router to GET home page as HTML. */
router.get('/', function(req, res, next) {
	//render a view using the pug template
	res.render('index', { 
		title: 'Townie' 
	});
});

/* router to GET a JSON description of the data for debugging. */
router.get('/debug', function(req, res, next) {
	//output a json response
	var testObject = { 
		title: 'Townie',
		version: 1.0
	}
	res.json(testObject);
});

/* router to GET JSON object with how many documents are in the collection */
router.get('/count', function(req, res, next) {
	var database = new DB;
	var connectStr = "mongodb://localhost:27017";

	//connect and count documents
	database.connect(connectStr)
		.then(function() {
	            return database.countDocuments('messages')
	    })
	    .then(
	    	function(count) {
		    	//success
		        return {
		            "success": true,
		            "count": count,
		            "error": ""
		        };
	        },
	        function(err) {
	        	//failure
	            console.log("Failed to count the documents: " + err);
	            return {
                    "success": false,
                    "count": 0,
                    "error": "Failed to count the documents: " + err
	            };
	        }
		)
	    .then(function(resultObject) {
	            database.close();
	            res.json(resultObject);
	    })
});


/* router to GET JSON object with how many documents are in the collection */
router.get('/messages', function(req, res, next) {
	var database = new DB;
	var connectStr = "mongodb://localhost:27017";

	//connect and count documents
	database.connect(connectStr)
    .then(
        function() {
            // Returning will pass the promise returned by sampleCollection to
            // the next .then in the chain
            return database.sampleCollection('messages', 10)
        })  // No function is provided to handle the connection failing and so that
            // error will flow through to the next .then
    .then(
        function(docs) {
            return {
                    "success": true,
                    "documents": docs,
                    "error": ""
                };
        },
        function(error) {
            console.log('Failed to retrieve sample data: ' + error);
            return {
                    "success": false,
                    "documents": null,
                    "error": "Failed to retrieve sample data: " + error
                };
    	}
    )
    .then(
        function(resultObject) {
            database.close();
            res.json(resultObject);
        }
    )
})


module.exports = router;
