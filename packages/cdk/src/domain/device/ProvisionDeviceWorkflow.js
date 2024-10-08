// const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { publishToSns } = require("../../helper/publish-to-sns");

/*
Check the 'event' object for group-level authorization. https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27148474

This is not related to this particular handler, but remember to register an "event" at the end of each task/function to SNS.
*/

// const client = new SNSClient();

exports.handler = async (event, context, callback) => {
  console.log("Inside 'provision device' handler");
  console.log("event: " + JSON.stringify(event));
  console.log("context: " + JSON.stringify(context));
  console.log("process.env.outputEventTopicName: " + process.env.outputEventTopicName);
  console.log("process.env.outputEventTopicArn: " + process.env.outputEventTopicArn);

  const outputEventTopicName = process.env.outputEventTopicName;
  const outputEventTopicArn = process.env.outputEventTopicArn

  /*** Input Gate ***/

  // Validate input


  /*** Run the logic to provision a single device ***/

  // 1. Create a Thing

  // 2. Create credentials

  // 3. Create policy

  // 4. Attach policy to client certificate

  // 5. Attach client certificate in the Thing Registry

  // 6. Get credentials onto device via LoRaWAN

  // 7. Test connection and communication between device and IoT Core

  // 8. Publish to 'ProvisionSingleDeviceCompletedTopic' event to SNS


  /*** Output Gate ***/

  // Validate output


  /*** Publish 'completed' event ***/

  // try {
  //   var response = await client.send(new PublishCommand({
  //     TopicArn: process.env.outputEventTopicArn,
  //     Message: `${process.env.outputEventTopicName}`,
  //   }));
  //   console.log("response: " + JSON.stringify(response));
  // } catch (err) {
  //   console.log(err);
  // }

  const response = publishToSns(outputEventTopicArn, outputEventTopicName);

  // const response = {
  //   statusCode: 200
  // };

  callback(null, response);
};


// 'validateInput' function


// 'validateOutput' function
