var http = require('http');
var url_base = "http://teamtreehouse.com/"

function printMessage(username, badges, points) {
	console.log(username + " has " + badges + " badges and " + points + " points in Javascript. Yay!");
}

function printError(error) {
	console.error(error.message);
}

function get(username) {

	var url = url_base + username + ".json";
	// console.log(url);
	// make the url 
	// make http get request
	var req = http.get(url, function(res) {
			console.log(res.statusCode);
			var body = "";
			res.on('data', function(chunk) {
				body += chunk
			})	
			res.on('end', function() { 
				// if the status code is 200
				if (res.statusCode === 200) {
					//try for error 
					try {
						var profile = JSON.parse(body);
						// add the json parsing
						printMessage(username, profile.badges.length, profile.points.JavaScript);
						// print the data using the print message function
					// if it's anything else
					} catch(error) {
						printError(error);
					}
				}
				else {
					printError({message: "There was an error retrieving " + username + "'s Teamtreehouse page. (" + http.STATUS_CODES[res.statusCode] + ")"})
				}
			})
		})
	
	req.on('error', printError); // this is cool
};
	// parse the response
	// JSON.parse()


























module.exports.get = get;