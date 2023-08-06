/*
  Remember to register an "event" at the end of each task/function to SNS.
*/

const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require("@aws-sdk/client-apigatewaymanagementapi");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const apiGwMgmtApiClient = new ApiGatewayManagementApiClient({
  endpoint: "https://m71oz07fyl.execute-api.us-east-1.amazonaws.com/dev"
});
const ddbClient = new DynamoDBClient();

exports.handler = async (event, context, callback) => {
  try {
    const { Items } = await ddbClient.send(new ScanCommand({
      TableName: process.env.DB_NAME
    }));

    Items.forEach(async (Item) => {
      const unmarshalledItem = unmarshall(Item);
      console.log("connectionId: " + String(unmarshalledItem["connectionId"]));
      console.log("sending message...");

      let result;

      try {
        result = await apiGwMgmtApiClient.send(new PostToConnectionCommand({
          ConnectionId: unmarshalledItem["connectionId"],
          Data: "Hello!"
        }));
        console.log("result: " + result);
      }
      catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }

  // try {
  //   await apiGwMgmtApiClient.send(new PostToConnectionCommand({
  //     ConnectionId: "I0n2VfxsoAMCJOw=",
  //     Data: "Hello"
  //   }));
  // } catch (err) {
  //   console.error(err);
  // }

  const response = {
    statusCode: 200
  }

  callback(null, response);
};
