var AWS = require("aws-sdk");

// AWS.config.loadFromPath('./awscreds.json');

var myCredentials = new AWS.CognitoIdentityCredentials();
var myConfig = new AWS.Config({
  credentials: myCredentials, region: 'us-east-1'
});
myConfig.update({region: 'us-east-1'});


AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  TableName: 'service-table',
  Item: {
    'ServiceType' : {S: 'leeter'},
    'Endpoint' :{S: 'http://eggplant-leeter.ntmcn2mjkj.us-east-1.elasticbeanstalk.com'},
    'TeamName': {S: 'Cunning Stunts'}
  }
};

ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

