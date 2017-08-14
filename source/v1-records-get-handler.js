const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();


function _handlerEntryPoint(event, context, cb) {
    console.log('get-records');
    console.log('put-records-event:' + JSON.stringify(event));
    console.log('put-records-context:' + JSON.stringify(context));

   var params = {
        TableName : "those-things",
        Key: {
            id : event.pathParameters.memberid
        }
    }

        console.log("param: " + JSON.stringify(params, null, 2));


    dynamo.get(params, cb);
}

module.exports = _handlerEntryPoint;
