var v1CategoriesGetHandler = require("./v1-categories-get-handler");


'use strict';

console.log('Loading function - things ive done');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

var createTableParams = `{
    TableName : "those-things3",
    KeySchema: [       
        { AttributeName: "that-thing-id", KeyType: "HASH", //Partition key },
        { AttributeName: "when", KeyType: "RANGE" //Sort key }
    ],
    AttributeDefinitions: [
        { 
            AttributeName: "that-thing-id",
            AttributeType: "S"
        },
        { 
            AttributeName: "when", 
            AttributeType: "S"
        }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
}`;


/**
 * I Greg - Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });


    if(event.path == "/v1/categories" && event.httpMethod == "GET")
    {
        v1CategoriesGetHandler(event, context, done);
        return;
    }
    
    //done(null, `Dave and his happy Method "${event.httpMethod}"`);
    if (event.resource === "/thingsivedone/setup") {
            dynamodb.createTable(createTableParams, function(err, data) {
                if (err) {
                    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                }
            });
            done(null, `Setup completed`);
        
    }    


    switch (event.httpMethod) {
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            if(event.queryStringParameters.TableName)
            {
                var params = {
                    TableName: event.queryStringParameters.TableName,
                    //IndexName: "that-thing-id",
                    KeyConditionExpression: 'that-thing-id = :hkey and when = :rkey',
                    ExpressionAttributeValues: {
                        ':hkey': 'contacts-13:59:00 12/04/2016',
                        ':rkey': '13:59:00 12/04/2016'
                    }
                };

                console.log(JSON.stringify(params));
                dynamo.query(params, done);
            }
            else
                done(new Error(`missing TableName parameter "${event.httpMethod}"`));
            break;
        case 'POST':
            dynamo.putItem(JSON.parse(event.body), done);
            break;
        case 'PUT':
            dynamo.updateItem(JSON.parse(event.body), done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
