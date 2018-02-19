/*** Set required configuration for Node JS server.
 * Requires Express JS as framework for Node JS.
 * Requires mustacheExpress as engine-view to render HTML from server-side.
 * Requires search-service, a JS module, to seperate server logic and make easier to follow.
 */
const express = require("express");
const mustacheExpress = require('mustache-express');
const searchService = require("./search-service");
const app = express();

app.set("port", process.env.PORT || 3000);

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static("public"));

/*** Endpoint for first scenario - Server generated search via query paramter search.
 * Handles Parameter Query written as "?q=searchString".
 * Passes query parameter to the fetchProgrammes function in search-service.js and returns array of results.
 * If no results returned, returns "There are no results" to browser.
 * Renders the html view set out in "prog-render.mustache" and passes returned program data for expressions.
 */
app.get("/serverrendered", function(req, res){

	var searchString = req.query.q;
	const results = searchService.fetchProgrammes(searchString);
  console.log("Fetching programmes containing: " + searchString);

  if(results.length === 0){
    results.push({ programme: {short_synopsis: "There are no results"}});
    var data = {
      results: results
    };
  } else {
  	var data = {
      results: results
    };
  }

  res.render("prog-render", data);
})

/*** Endpoint for 2nd & 3rd scenario - Client generated search via input search field.
 * Handles Query Paramter written as "?search=" + search string".
 * Passes query parameter to the fetchProgrammes function in search-service.js and returns array of results.
 * If no results returned, returns "There are no results" to browser.
 * Passes data back to client side logic where turned into html and appended to list.
 */
app.get("/search", function(req, res) {
	var searchString = req.query.search;
  	console.log("Fetching programmes containing: " + searchString);
  	const results = searchService.fetchProgrammes(searchString);
   res.send(results);
});

/* Sets Server Listener on environment port or localHost:3000.
 */
app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});