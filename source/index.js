var v1CategoriesGetHandler = require("./v1-categories-get-handler");
var v1RecordsGetHandler = require("./v1-records-get-handler");
var v1RecordsPutHandler = require("./v1-records-put-handler");
var v1RecordsDeleteHandler = require("./v1-records-delete-handler");


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


    if(event.path.includes("categories") && event.path.includes("v1") && event.httpMethod == "GET")
    {
        v1CategoriesGetHandler(event, context, done);
        return;
    }
    else if(event.path.includes("records") && event.path.includes("v1") && event.httpMethod == "GET")
    {
        v1RecordsGetHandler(event, context, done);
        return;
    }
    else if(event.path.includes("records") && event.path.includes("v1") && (event.httpMethod == "PUT" || event.httpMethod == "POST"))
    {
        v1RecordsPutHandler(event, context, done);
        return;
    }
    else if(event.path.includes("records") && event.path.includes("v1") && (event.httpMethod == "DELETE"))
    {
        v1RecordsDeleteHandler(event, context, done);
        return;
    }
    
};
