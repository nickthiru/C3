const { Stack } = require("aws-cdk-lib");
const { Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const path = require("path");

class DisconnectRouteStack extends Stack {
  /**
     * 
     * @param {Construct} scope 
     * @param {string} id 
     * @param {StackProps=} props 
     */
  constructor(scope, id, props) {
    super(scope, id, props);

    const disconnectRouteLambda = new Function(this, "DisconnectRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
      handler: "disconnect-route-handler.handler",
      environment: {
        websocketConnectionsTableName: props.websocketConnectionsTableName
      }
    });
  }
}

module.exports = { DisconnectRouteStack };