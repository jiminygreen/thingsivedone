const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();
//({apiVersion: '2012-08-10'});

// var createTableParams = `{
//     TableName : "those-things3",
//     KeySchema: [       
//         { AttributeName: "that-thing-id", KeyType: "HASH", //Partition key },
//         { AttributeName: "when", KeyType: "RANGE" //Sort key }
//     ],
//     AttributeDefinitions: [
//         { 
//             AttributeName: "that-thing-id",
//             AttributeType: "S"
//         },
//         { 
//             AttributeName: "when", 
//             AttributeType: "S"
//         }
//     ],
//     ProvisionedThroughput: {       
//         ReadCapacityUnits: 5, 
//         WriteCapacityUnits: 5
//     }
// }`;

function _handlerEntryPoint(event, context, cb) {
    console.log('put-records:' + JSON.stringify(event.body));

    var body = JSON.parse(event.body);

    if (body.id == null) {
        cb( { "message": "update must contain id" }, null);
    }

    var params = {
        TableName : "those-things",        
        Item : {
            "id" :  event.pathParameters.memberid ,
            "info" :  [
                {
                    "id" : body.id,
                    "displaytitle" : body.displaytitle, 
                    "category" : body.category,
                    "when" : body.when
                }
            ]
        }
    };

    console.log("param: " + JSON.stringify(params, null, 2));

    dynamo.put(params, cb);

}

module.exports = _handlerEntryPoint;
