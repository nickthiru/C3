const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const ddbClient = new DynamoDBClient();

exports.handler = async (event, context, callback) => {

  console.log("Inside disconnect-route-handler.js");
  console.log(event);

  const connectionId = event.requestContext.connectionId;
  let result = null;

  try {
    result = await ddbClient.send(new DeleteItemCommand({
      TableName: process.env.DB_NAME,
      Key: {
        connectionId: { S: connectionId }
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