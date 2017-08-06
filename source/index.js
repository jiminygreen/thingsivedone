var v1CategoriesGetHandler = require("./v1-categories-get-handler");
var v1RecordsGetHandler = require("./v1-records-get-handler");
var v1RecordsPutHandler = require("./v1-records-put-handler");


'use strict';

/**
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
    else if(event.path == "/v1/records" && event.httpMethod == "GET")
    {
        v1RecordsGetHandler(event, context, done);
        return;
    }
    else if(event.path == "/v1/records" && (event.httpMethod == "PUT" || event.httpMethod == "POST"))
    {
        v1RecordsPutHandler(event, context, done);
        return;
    }
    


    // switch (event.httpMethod) {
    //     case 'DELETE':
    //         dynamo.deleteItem(JSON.parse(event.body), done);
    //         break;
    //     case 'GET':
    //         if(event.queryStringParameters.TableName)
    //         {
    //             var params = {
    //                 TableName: event.queryStringParameters.TableName,
    //                 //IndexName: "that-thing-id",
    //                 KeyConditionExpression: 'that-thing-id = :hkey and when = :rkey',
    //                 ExpressionAttributeValues: {
    //                     ':hkey': 'contacts-13:59:00 12/04/2016',
    //                     ':rkey': '13:59:00 12/04/2016'
    //                 }
    //             };

    //             console.log(JSON.stringify(params));
    //             dynamo.query(params, done);
    //         }
    //         else
    //             done(new Error(`missing TableName parameter "${event.httpMethod}"`));
    //         break;
    //     case 'POST':
    //         dynamo.putItem(JSON.parse(event.body), done);
    //         break;
    //     case 'PUT':
    //         dynamo.updateItem(JSON.parse(event.body), done);
    //         break;
    //     default:
    //         done(new Error(`Unsupported method "${event.httpMethod}"`));
    // }
};
