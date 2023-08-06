exports.handler = (event, context, callback) => {

  console.log("Inside default-route-handler.js");
  console.log("event: " + JSON.stringify(event));

  const response = {
    statusCode: 200
  };

  callback(null, response);
}