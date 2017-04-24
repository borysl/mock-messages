'use strict'
 
const express = require('express')
const bodyParser = require('body-parser')

const messages = [];
const port = 8080;
 
// Create a new instance of express
const app = express()
 
// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

Array.prototype.removeIf = function(callback) {
    var i = this.length;
    while (i--) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
    }
};

function handleBadRequest(err, res) {
    console.error(err);
    res.status(500).send('Bullshit request');
}

// Create new message by using POST request to /userMessages
app.post('/userMessages', function (req, res) {
    try {
        var newMessages = req.body.messages;
        var amountOfMessage = newMessages.length;
        messages.push(...newMessages);
        res.set('Content-Type', 'text/plaintext')
        res.send(`You posted ${amountOfMessage} new messages!`)
    } catch(err) {
        handleBadRequest(err, res);
    }
})

// Retrive new message by using POST request to /retrieveMessages 
app.post('/retrieveMessages', function (req, res) {
    try {
        var requestedUserId = req.body.userId;
        var sessionId = req.body.sessionId;
        res.set('Content-Type', 'text/json');
        function filterByUserId(_) { return _.userId == requestedUserId; }
        var retrieved = messages.filter(filterByUserId);
        messages.removeIf(filterByUserId);
        res.send(retrieved);
        console.log(`Messages left: ${messages.length}`);
    } catch(err) {
        handleBadRequest(err, res);
    }
});

app.listen(port, function (err) {
  if (err) {
    throw err
  }
 
  console.log(`Server started on port ${port}`);
})
