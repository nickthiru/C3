const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const ddbClient = new DynamoDBClient();

exports.handler = async (event, context, callback) => {

  console.log("Inside connect-route-handler.js");
  console.log("event: " + JSON.stringify(event));
  console.log("process.env.DB_NAME: " + process.env.DB_NAME);

  const connectionId = event.requestContext.connectionId;
  let result = null;

  try {
    result = await ddbClient.send(new PutItemCommand({
      TableName: process.env.DB_NAME,
      Item: {
        connectionId: { S: connectionId }
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
