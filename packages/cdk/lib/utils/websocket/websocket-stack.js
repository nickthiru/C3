const { Stack } = require("aws-cdk-lib");

const { DataStack } = require("./stacks/data-stack.js");
const { ConnectRouteStack } = require("./stacks/routes/connect-route-stack.js");
const { DisconnectRouteStack } = require("./stacks/routes/disconnect-route-stack.js");
const { DefaultRouteStack } = require("./stacks/routes/disconnect-route-stack.js");
const { FromWebClientRouteStack } = require("./stacks/routes/from-web-client-route-stack.js");
const { ToWebClientRouteStack } = require("./stacks/routes/to-web-client-route-stack.js");
const { ApiStack } = require("./stacks/api-stack.js");

class WebSocketStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** Data Stack ***/

    this.dataStack = new DataStack(this, "DataStack", {
      // To grant lambda permissions to access database
      connectRouteLambda: this.connectRouteStack.connectRouteLambda,
      disconnectRouteLambda: this.disconnectRouteStack.disconnectRouteLambda,
      toWebClientRouteLambda: this.toWebClientRouteStack.toWebClientRouteLambda
    });


    /*** Route Stacks ***/

    this.connectRouteStack = new ConnectRouteStack(this, "ConnectRouteStack", {
      // For ConnectRouteStack/ConnectRouteLambda
      websocketConnectionsTableName: this.dataStack.webSocketConnectionsTable.tableName,
      // For ConnectRouteStack/WebSocketAuthorizerLambda
      cognitoUserPoolId: props.cognitoUserPoolId,
      cognitoUserPoolClientId: props.cognitoUserPoolClientId
    });

    this.disconnectRouteStack = new DisconnectRouteStack(this, "DisconnectRouteStack", {
      websocketConnectionsTableName: this.dataStack.webSocketConnectionsTable.tableName
    });

    this.defaultRouteStack = new DefaultRouteStack(this, "DefaultRouteStack");

    this.fromWebClientRouteStack = new FromWebClientRouteStack(this, "FromWebClientRouteStack");

    this.toWebClientRouteStack = new ToWebClientRouteStack(this, "ToWebClientRouteStack", {
      webSocketConnectionsTableName: this.dataStack.webSocketConnectionsTable.tableName
    });


    /*** API Stack ***/

    new ApiStack(this, "ApiStack", {
      connectRouteLambda: this.connectRouteStack.connectRouteLambda,
      webSocketAuthorizerLambda: this.connectRouteStack.webSocketAuthorizerLambda,
      disconnectRouteLambda: this.disconnectRouteStack.disconnectRouteLambda,
      defaultRouteLambda: this.defaultRouteStack.defaultRouteLambda,
      fromWebClientRouteLambda: this.fromWebClientRouteStack.fromWebClientRouteLambda,
      toWebClientRouteLambda: this.toWebClientRouteStack.toWebClientRouteLambda
    });
  }
}

module.exports = { WebSocketStack };