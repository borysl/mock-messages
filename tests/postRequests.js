var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai

var host = 'localhost';
var port = 8080;

describe('messaging webservice', function() {
  it('POST /userMessages should put message to a specific user', function(done) {
    var request = require('request');
    // Set the headers
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }

    // Configure the request
    var options = {
        url: `http://${host}:${port}/userMessages`,
        method: 'POST',
        headers: headers
    }

    request.post(options, function (err, httpResponse, body) {
        console.log(err, body);
        expect(err).to.equal(null);
        done();
    });
  });
});