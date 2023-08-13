exports.handler = async (event, context, callback) => {
  console.log("Inside 'provision single device' event handler");
  console.log("event: " + JSON.stringify(event));

  const response = {
    statusCode: 200
  };

  callback(null, response);
}