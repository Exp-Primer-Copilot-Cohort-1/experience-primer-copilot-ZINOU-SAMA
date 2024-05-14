// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./model/comments');
var cors = require('cors');

mongoose.connect('mongodb://localhost/comments');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/comment', function(req, res) {
  var newComment = new Comment(req.body);
  newComment.save(function(err, comment) {
    if (err) {
      res.send(err);
    } else {
      res.send(comment);
    }
  });
});

app.get('/comment', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      res.send(err);
    } else {
      res.send(comments);
    }
  });
});

app.listen(3001, function() {
  console.log('Server is running on port 3001');
});