const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const ddbClient = new DynamoDBClient();

exports.handler = async (event, context, callback) => {
  console.log("Inside disconnect-route-handler.js");
  console.log("event: " + JSON.stringify(event));
  console.log("process.env.webSocketConnectionsTableName: " + process.env.webSocketConnectionsTableName);

  try {
    const result = await ddbClient.send(new DeleteItemCommand({
      TableName: process.env.webSocketConnectionsTableName,
      Key: {
        connectionId: { S: event.requestContext.connectionId }  // WebSocket connection ID
      }
    }));
    console.log(result);
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 200,
  }
}