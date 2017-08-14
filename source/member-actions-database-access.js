const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();


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

function findAndUpdate(memberid, upsert) {
        console.log("findAndUpdate - upsert func: " + typeof(upsert))
        
        var param = {
            TableName:'those-things',
            Key: { id: memberid }
        }
        dynamo.get(param, upsert)

    }

module.exports = {
           appendNewInfoRecords : function (memberid, infoCollection) {
            return appendNewInfoRecords(memberid, infoCollection);
        },

        findAndUpdate : function (memberid, upsert) {
            return findAndUpdate(memberid, upsert);
        }
    
}
