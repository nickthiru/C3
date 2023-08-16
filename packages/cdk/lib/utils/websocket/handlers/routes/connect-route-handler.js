const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const ddbClient = new DynamoDBClient();

exports.handler = async (event, context, callback) => {
  console.log("Inside connect-route-handler.js");
  console.log("event: " + JSON.stringify(event));
  console.log("process.env.websocketConnectionsTableName: " + process.env.websocketConnectionsTableName);

  const websocketConnectionId = event.requestContext.connectionId;

  try {
    const result = await ddbClient.send(new PutItemCommand({
      TableName: process.env.websocketConnectionsTableName,
      Item: {
        connectionId: { S: websocketConnectionId }
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
