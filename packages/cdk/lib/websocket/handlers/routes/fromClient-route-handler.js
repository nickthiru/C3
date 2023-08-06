

/*
Check the 'event' object for group-level authorization. https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27148474

This is not related to this particular handler, but remember to register an "event" at the end of each task/function to SNS.
*/

exports.handler = async (event, context, callback) => {
  console.log("Inside 'fromclient' route handler");
  console.log("event: " + JSON.stringify(event));

  const response = {
    statusCode: 200
  };

  callback(null, response);
}