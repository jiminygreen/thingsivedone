const AWS = require("aws-sdk");
const database = require("./member-actions-database-access");
// const databaseFindAndUpdate = require("./member-actions-database-access").findAndUpdate;
// const databaseAppendNewInfoRecords = require("./member-actions-database-access").appendNewInfoRecords;
const dynamo = new AWS.DynamoDB.DocumentClient();


function _handlerEntryPoint(event, context, cb) {
    console.log('delete-records');
    console.log('delete-records-event:' + JSON.stringify(event));

    console.log('delete-records-context:' + JSON.stringify(context));

    function   recordInfoDelete(body, infoCollection, replaceRecordInDatabase) {
        console.log("Body: " + JSON.stringify(body));
        console.log("infos: " + JSON.stringify(infoCollection));

        var infoItemFound = false;
        for(var i = 0; i < infoCollection.length; i++) {
            if(infoCollection[i].id == body.id) {
                infoItemFound = true;
                console.log("about to replace item: " + infoItemFound);

                // remove the item from the array
                infoCollection.splice(i, 1);
                //save array to DynamoDB
                replaceRecordInDatabase(event.pathParameters.memberid, infoCollection);
            }
        }
    }

    function upsert (err, data) {
            console.log("del - found - err: " + JSON.stringify(err));   
            console.log("del - found - data: " + JSON.stringify(data));
            
            if(data.Item) {
                recordInfoDelete({"id" : event.pathParameters.recordid}, data.Item.info, database.appendNewInfoRecords);
            }
            // if we don't get a record back then it's the first one and it can go straight into the db
            else {
                cb({"message" : "record not found"} )
            }
        }

    database.findAndUpdate(event.pathParameters.memberid, upsert);
}

module.exports = _handlerEntryPoint;
