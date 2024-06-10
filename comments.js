// Create web server and listen on port 3000
// Load the express module
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path");
var comments = require("./comments.json");
var _ = require("lodash"); // Load the lodash module
var cors = require("cors"); // Load the cors module

// Use the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Load the comments from the comments.json file
app.get("/comments", function (req, res) {
  res.json(comments);
});

// Add a new comment to the comments.json file
app.post("/comments", function (req, res) {
  var comment = req.body;
  comments.push(comment);
  fs.writeFileSync(
    path.join(__dirname, "comments.json"),
    JSON.stringify(comments, null, 4)
  );
  res.json(comments);
});

// Update a comment in the comments.json file
app.put("/comments/:id", function (req, res) {
  var comment = _.find(comments, { id: req.params.id });
  if (!comment) {
    res.status(404).json({ error: "Comment not found" });
    return;
  }
  _.assign(comment, req.body);
  fs.writeFileSync(
    path.join(__dirname, "comments.json"),
    JSON.stringify(comments, null, 4)
  );
  res.json(comments);
});

//
//  Delete a comment from the comments.json file
app.delete("/comments/:id", function (req, res) {
  var comment = _.find(comments, { id: req.params.id });
  if (!comment) {
    res.status(404).json({ error: "Comment not found" });
    return;
  }
  _.remove(comments, { id: req.params.id });
  fs.writeFileSync(
    path.join(__dirname, "comments.json"),
    JSON.stringify(comments, null, 4)
  );
  res.json(comments);
});

// Start the server
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
