const { Stack, CfnOutput, RemovalPolicy } = require("aws-cdk-lib");
const { Table, AttributeType, BillingMode } = require("aws-cdk-lib/aws-dynamodb");


class DataStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // DDB table to store WebSocket connections. This table needs to be set/accessed
    // in the 'ConnectRoute_WebsocketLambda' (line 20).
    this.webSocketConnectionsTable = new Table(this, "WebSocketConnectionsTable", {
      partitionKey: {
        name: "connectionId",
        type: AttributeType.STRING
      },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST
    });

    // new CfnOutput(this, "WebSocketConnectionsTableName", {
    //   value: this.webSocketConnectionsTable.tableName,
    //   exportName: "WebSocketConnectionsTableName"
    // })
  }
}

module.exports = { DataStack };