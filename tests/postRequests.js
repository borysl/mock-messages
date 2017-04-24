var chai = require('chai');
var request = require('request');
var expect = chai.expect; // we are using the "expect" style of Chai

var host = 'localhost';
var port = 8080;

function sendPostRequest(requestUrl, requestData, callback) {
    // Set the headers
    var headers = {
        'Content-Type':     'application/json'
    }

    // Configure the request
    var options = {
        url: `http://${host}:${port}/${requestUrl}`,
        method: 'POST',
        json: true,
        headers: headers,
        body: requestData
    }

    request.post(options, function (err, httpResponse, body) {
        console.log(err, body);
        callback(err);
    });
}

describe('messaging webservice', function() {
  it('POST /userMessages should put message to a specific user', function(done) {
    var requestUrl='userMessages';

    var requestData = {
        "messages": [
            {
                "userId": 1234564565454,
                "messageId": "100500",
                "payload": "someInternalStuff",
                "createdTs": 123,
                "expireTs": 12345
            }
        ]
    };

    sendPostRequest(requestUrl, requestData, function(err) {
        expect(err).to.equal(null);
        done();
    });
  });

it('POST /retrieveMessages should retrieve message to a specific user', function(done) {
    sendPostRequest('userMessages', {
        "messages": [
            {
                "userId": 234123215342,
                "messageId": "42",
                "payload": "someInternalStuff",
                "createdTs": 123,
                "expireTs": 12345
            }
        ]
    }, function(err) {
        expect(err).to.equal(null);
        sendPostRequest('retrieveMessages', {
            "userId": 234123215342,
            "sessionId": 23215342
        }, function (err2) {
            expect(err2).to.equal(null);
            done();
        });
    });
  });
});

