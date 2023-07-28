/*
  Remember to register an "event" at the end of each task/function to SNS.
*/

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");


const ddbClient = new DynamoDBClient();
require('./patch.js');

let send = undefined;

function init(event) {
  console.log(event)

  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
  });

  send = async (connectionId, data) => {
    await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: `Echo: ${data}` }).promise();
  }
}

function getConnections() {
  return ddb.scan({
    TableName: 'Chat',
  }).promise();
}

exports.handler = (event, context, callback) => {
  init(event);
  let message = JSON.parse(event.body).message
  getConnections().then((data) => {
    console.log(data.Items);
    data.Items.forEach(function (connection) {
      console.log("Connection " + connection.connectionid)
      send(connection.connectionid, message);
    });
  });

  return {}
};
