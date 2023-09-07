const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns"); // CommonJS import

/*
Check the 'event' object for group-level authorization. https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27148474

This is not related to this particular handler, but remember to register an "event" at the end of each task/function to SNS.
*/

const client = new SNSClient();

exports.publishToSns = async (topicArn, message) => {
  console.log("Inside 'publish to sns' helper");
  console.log("topicArn: " + topicArn);
  console.log("message: " + message);

  try {
    var response = await client.send(new PublishCommand({
      TopicArn: topicArn,
      Message: message,
    }));
    console.log("response: " + JSON.stringify(response));
    return response;
  } catch (err) {
    console.log(err);
  }
};

  // try {
  //   var response = await client.send(new PublishCommand({
  //     TopicArn: process.env.outputEventTopicArn,
  //     Message: `${process.env.outputEventTopicName}`,
  //   }));
  //   console.log("response: " + JSON.stringify(response));
  // } catch (err) {
  //   console.log(err);
  // }