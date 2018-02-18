//CONFIG
const express = require("express");
const bodyParser = require("body-parser");
const searchService = require("./searchService");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//CONFIG

app.get("/test", function(req, res) {
  console.log("Test working");
  res.send("Well done");
});

app.get("/:searchString", function(req, res) {
  console.log("Fetching programme titles for: " + req.params.searchString);
  searchService.fetchProgrammes(req.params.searchString, function(details) {
    res.send(details);
  });
});

app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});
