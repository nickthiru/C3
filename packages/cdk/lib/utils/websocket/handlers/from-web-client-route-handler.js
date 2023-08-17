const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns"); // CommonJS import

/*
Check the 'event' object for group-level authorization. https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27148474

This is not related to this particular handler, but remember to register an "event" at the end of each task/function to SNS.
*/

const client = new SNSClient();

exports.handler = async (event, context, callback) => {
  console.log("Inside 'fromclient' route handler");
  console.log("event: " + JSON.stringify(event));

  const body = JSON.parse(event["body"]);

  const topicArn = body.data.topicArn;
  const message = JSON.stringify(body.data.message);

  try {
    var response = await client.send(new PublishCommand({
      TopicArn: topicArn,
      Message: message,
    }));
    console.log("response: " + JSON.stringify(response));
  } catch (err) {
    console.log(err);
  }

  // const response = {
  //   statusCode: 200
  // };

  callback(null, response);
};