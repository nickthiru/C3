exports.handler = (event, context, callback) => {

  //   const connectionId = event.requestContext.connectionId;

  //   addConnectionId(connectionId).then(() => {
  //     callback(null, {
  //       statusCode: 200,
  //     })
  //   });
  // }

  // function addConnectionId(connectionId) {
  //   return ddb.put({
  //     TableName: 'WebsocketConnectionIds',
  //     Item: {
  //       connectionid: connectionId
  //     },
  //   }).promise();
  // }

  console.log("Inside connect-route-handler.js");
  console.log("event: " + event);
}