const { Stack, CfnOutput, RemovalPolicy } = require("aws-cdk-lib");
const { Table, AttributeType, BillingMode } = require("aws-cdk-lib/aws-dynamodb");


class DataStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // DDB table to store WebSocket connections. This table needs to be set/accessed
    // in the 'ConnectRoute_WebsocketLambda' (line 20).
    this.webSocketConnectionsTable = new Table(this, "WebSocketConnectionsTable", {
      tableName: "WebSocketConnectionsTable",
      partitionKey: {
        name: "connectionId",
        type: AttributeType.STRING
      },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST
    });

    // For WebSocket Api
    // new CfnOutput(this, "WebSocketConnectionsTableArn", {
    //   value: webSocketConnectionsTable.tableArn,
    //   description: "Table (ARN) to store WebSocket connection IDs",
    //   exportName: "WebSocketConnectionsTableArn"
    // });
  }
}

module.exports = { DataStack };