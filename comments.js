// Create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
var db;

// Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017/meanstack', (err, database) => {
  if (err) return console.log(err);
  db = database;
  // Start web server
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));
// Set up EJS
app.set('view engine', 'ejs');

// Render index.ejs
app.get('/', (req, res) => {
  db.collection('comments').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {comments: result});
  });
});

// Add a comment
app.post('/comments', (req, res) => {
  db.collection('comments').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});

// Edit a comment
app.put('/comments', (req, res) => {
  db.collection('comments')
  .findOneAndUpdate({name: 'person1'}, {
    $set: {
      name: req.body.name,
      comment: req.body.comment
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// Delete a comment
app.delete('/comments', (req, res) => {
  db.collection('comments').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err);
    res.send('Message deleted!');
  });
});

