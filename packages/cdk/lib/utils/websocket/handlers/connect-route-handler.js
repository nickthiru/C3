const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const ddbClient = new DynamoDBClient();

exports.handler = async (event, context, callback) => {
  console.log("Inside connect-route-handler.js");
  console.log("event: " + JSON.stringify(event));
  console.log("process.env.webSocketConnectionsTableName: " + process.env.webSocketConnectionsTableName);

  try {
    const result = await ddbClient.send(new PutItemCommand({
      TableName: process.env.webSocketConnectionsTableName,
      Item: {
        connectionId: { S: event.requestContext.connectionId }  // WebSocket connection ID
      }
    }));
    console.log(result);
  } catch (err) {
    console.error(err);
  };

  const response = {
    statusCode: 200,
  };

  callback(null, response);
}
