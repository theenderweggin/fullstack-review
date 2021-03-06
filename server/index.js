const express = require('express');
const gitHub = require('../helpers/github.js');
const db = require('../database/index.js');
var bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // console.log("string and a comma", req);

  // if(err) { throw err; } 
  gitHub.getReposByUsername(req.body.user);


  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('about to finish POST')
  res.end();
});

app.get('/repos', function (req, res) {
  console.log(req.query.user);
  db.fetch(25, req.query.user)
  .then((data) => {
    console.log(data)
    res.send(data);
  });
  // res.send();
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

