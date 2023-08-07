const { Stack, CfnOutput, RemovalPolicy } = require("aws-cdk-lib");
const { Function, Code, Runtime } = require("aws-cdk-lib/aws-lambda");
const { WebSocketApi, WebSocketStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const { WebSocketLambdaAuthorizer } = require("@aws-cdk/aws-apigatewayv2-authorizers-alpha");

const path = require("path");
const { Table, AttributeType, BillingMode } = require("aws-cdk-lib/aws-dynamodb");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");

class WebSocketStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // DDB table to store WebSocket connections. This table needs to be set/accessed
    // in the 'ConnectRoute_WebsocketLambda' (line 20).
    const websocketConnectionsTable = new Table(this, "WebsocketConnectionsTable", {
      partitionKey: {
        name: "connectionId",
        type: AttributeType.STRING
      },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST
    });


    // Lambdas
    const connectRoute_WebSocketLambda = new Function(this, "ConnectRoute_WebsocketLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
      handler: "connect-route-handler.handler",
      environment: {
        PRIMARY_KEY: "connectionId",
        DB_NAME: websocketConnectionsTable.tableName
      }
    });

    const disconnectRoute_WebsocketLambda = new Function(this, "DisconnectRoute_WebsocketLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
      handler: "disconnect-route-handler.handler",
      environment: {
        PRIMARY_KEY: "connectionId",
        DB_NAME: websocketConnectionsTable.tableName
      }
    });

    const defaultRoute_WebsocketLambda = new Function(this, "DefaultRoute_WebsocketLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
      handler: "default-route-handler.handler"
    });

    const websocketAuthorizerLambda = new Function(this, "WebsocketAuthorizerLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers")),
      handler: "auth-handler.handler",
      environment: {
        COGNITO_USERPOOL_ID: props.COGNITO_USERPOOL_ID,
        COGNITO_WEB_CLIENT_ID: props.COGNITO_WEB_CLIENT_ID,
      }
    });

    const fromClientRouteWebsocketLambda = new Function(this, "FromClientRouteWebsocketLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
      handler: "fromClient-route-handler.handler"
    });

    const toClientRouteWebsocketLambda = new Function(this, "ToClientRouteWebsocketLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
      handler: "toClient-route-handler.handler",
      environment: {
        PRIMARY_KEY: "connectionId",
        DB_NAME: websocketConnectionsTable.tableName
      }
    });


    // WebSocket API
    const webSocketApi = new WebSocketApi(this, "WebSocketApi", {

      // The route selection expression value will name the Lambda Function that will
      // be invoked (see "WebSocket Custom Routes" section below).
      routeSelectionExpression: "$request.body.action",

      // Built-in Routes
      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "ConnectRoute_WebsocketLambdaIntegration",
          connectRoute_WebSocketLambda
        ),
        authorizer: new WebSocketLambdaAuthorizer(
          "WebsocketLambdaAuthorizer",
          websocketAuthorizerLambda,
          { identitySource: ["route.request.querystring.token"] }
        )
      },
      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DisconnectRoute_WebsocketLambdaIntegration",
          disconnectRoute_WebsocketLambda
        )
      },
      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DefaultRoute_WebsocketLambdaIntegration",
          defaultRoute_WebsocketLambda
        )
      },
    });

    // WebSocket Custom Routes
    webSocketApi.addRoute("fromclient", {
      integration: new WebSocketLambdaIntegration(
        "FromClientWebsocketLambdaIntegration",
        fromClientRouteWebsocketLambda
      )
    });

    webSocketApi.addRoute("toclient", {
      integration: new WebSocketLambdaIntegration(
        "ToClientWebsocketLambdaIntegration",
        toClientRouteWebsocketLambda
      )
    });

    // WebSocket Stages
    const webSocketStage = new WebSocketStage(this, "Dev_WebSocketStage", {
      webSocketApi,
      stageName: "dev",
      autoDeploy: true,
    });


    // Stack Outputs
    new CfnOutput(this, "DevStage_WebSocketApiEndpoint", {
      value: `${webSocketApi.apiEndpoint}/${webSocketStage.stageName}`
    });


    // Permissions
    websocketConnectionsTable.grantReadWriteData(connectRoute_WebSocketLambda);
    websocketConnectionsTable.grantReadWriteData(disconnectRoute_WebsocketLambda);
    websocketConnectionsTable.grantReadWriteData(toClientRouteWebsocketLambda);

    toClientRouteWebsocketLambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ["arn:aws:execute-api:us-east-1:346761569124:m71oz07fyl/dev/POST/@connections"],
      actions: ["execute-api:Invoke"]
    }));
  }
}

module.exports = { WebSocketStack };