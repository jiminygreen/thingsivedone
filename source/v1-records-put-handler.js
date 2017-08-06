//const doc = require('dynamodb-doc');
const AWS = require("aws-sdk");

//const dynamo = new doc.DynamoDB();
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

    //done(null, `Dave and his happy Method "${event.httpMethod}"`);
    // if (event.resource === "/thingsivedone/setup") {
    //         dynamodb.createTable(createTableParams, function(err, data) {
    //             if (err) {
    //                 console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    //             } else {
    //                 console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    //             }
    //         });
    //         done(null, `Setup completed`);
        
    // }    


function _handlerEntryPoint(event, context, cb) {
    console.log('put-records:' + JSON.stringify(event.body));

    var body = JSON.parse(event.body);

    if (body.id == null) {
        cb( { "message": "update must contain id" }, null);
    }

    var params = {
        TableName : "those-things",        
        Item : {
            "id" :  body.id ,
            "info" :  
                {
                "display-title" : body.title, 
                "category" : body.category, 
                "when" : body.when 
            }
        }
    };

    // Item : {
    //         "id" : { "S" : body.id },
    //         "info" : { 
    //             "M" : {
    //             "display-title" : { "S" : body.title }, 
    //             "category" : { "S" : body.category }, 
    //             "when" : { "S" : body.when } 
    //         } }
    //     }
// cb(null, "like a ninja cat");

    console.log("param: " + JSON.stringify(params, null, 2));

    dynamo.put(params, cb);
    //     function(err, data) {
    //    if (err) {
    //         console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    //     } else {
    //         console.log("Added item:", JSON.stringify(data, null, 2));
    //     }
    // });

}

module.exports = _handlerEntryPoint;
