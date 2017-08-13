const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

function _handlerEntryPoint(event, context, cb) {
    console.log('put-records:' + JSON.stringify(event.body));

    var body = JSON.parse(event.body);

    function appendNewInfoRecords (memberid, infoCollection) {
        console.log("appendNewInfoRecords - infos: " + memberid + " " + JSON.stringify(infoCollection));

        return dynamo.update({
                TableName: 'those-things',
                Key: { id: memberid },
                ReturnValues: 'ALL_NEW',
                UpdateExpression: 'set #info = :info',
                ExpressionAttributeNames: {
                '#info': "info"
            },
                ExpressionAttributeValues: {
                ':info': infoCollection
            }
        }).promise()
    }

    function success(data) {
        console.log("success: " + JSON.stringify(data))
        cb(null, {"created" : body })
    }

    function failure(data) {
        console.log("faiulure: " + JSON.stringify(data))
    
        cb({"write failed" : data })
    }

    function replaceRecordInDatabase(infoCollection) {
        appendNewInfoRecords(event.pathParameters.memberid, infoCollection).then(success, failure);
    }

    function   recordInfoGet(body, infoCollection, replaceRecordInDatabase) {
        console.log("Body: " + JSON.stringify(body));
        console.log("infos: " + JSON.stringify(infoCollection));

        var infoItemFound = false;
        for(var i = 0; i < infoCollection.length; i++) {
            if(infoCollection[i].id == body.id) {
                infoItemFound = true;
                console.log("about to replace item: " + infoItemFound);

                // replace item in array
                infoCollection[i] = body;
                //save array to DynamoDB
                replaceRecordInDatabase(infoCollection);
            }
        }

        if(infoItemFound == false) {
            console.log("item not foundadd to array: " + infoItemFound);
            
            infoCollection.push(body);
            replaceRecordInDatabase(infoCollection);
        }
    }

    function findAndUpdate(upsert) {
        
        var param = {
            TableName:'those-things',
            Key: { id: event.pathParameters.memberid }
        }
        dynamo.get(param, upsert)

        console.log()
    }

    function upsert(err, data) {
        console.log("found - err: " + JSON.stringify(err));   
        console.log("found - data: " + JSON.stringify(data));
        
        if(data.Item) {
            recordInfoGet(body, data.Item.info, replaceRecordInDatabase);
        }
        // if we don't get a record back then it's the first one and it can go straight into the db
        else {
            // There is no array yet and the function expects a collection so create one first
            var infoCollection = new Array();
            infoCollection.push(body);
            appendNewInfoRecords(event.pathParameters.memberid, infoCollection ).then(success, failure);
        }
    }

    findAndUpdate(upsert);

}

module.exports = _handlerEntryPoint;
