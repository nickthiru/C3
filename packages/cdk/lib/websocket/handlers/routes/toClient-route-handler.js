// Need to send JWT token with every websocket frame. Event object key for this is "Authorization".

/*
  Remember to register an "event" at the end of each task/function to SNS.
*/

// exports.handler = function () {
//   // To do

//   // Publish event "addUser"
// }

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
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
function getConnections() {
  return ddb.scan({
    TableName: 'Chat',
  }).promise();
}