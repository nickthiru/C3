const { Stack, CfnOutput, RemovalPolicy } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Function, Code, Runtime } = require("aws-cdk-lib/aws-lambda");
const { WebSocketApi, WebSocketStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const { WebSocketLambdaAuthorizer } = require("@aws-cdk/aws-apigatewayv2-authorizers-alpha");
const { Table, AttributeType, BillingMode } = require("aws-cdk-lib/aws-dynamodb");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const path = require("path");

class WebSocketStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** Data Storage ***/

    // DDB table to store WebSocket connections. This table needs to be set/accessed
    // in the 'ConnectRoute_WebsocketLambda' (line 20).
    const webSocketConnectionsTable = new Table(this, "WebSocketConnectionsTable", {
      partitionKey: {
        name: "connectionId",
        type: AttributeType.STRING
      },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST
    });


    /*** Built-In Route Handling Lambdas ***/

    const connectRouteLambda = new Function(this, "ConnectRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "./handlers/routes")),
      handler: "connect-route-handler.handler",
      environment: {
        webSocketConnectionsTableName: webSocketConnectionsTable.tableName
      }
    });

    const disconnectRouteLambda = new Function(this, "DisconnectRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "./handlers/routes")),
      handler: "disconnect-route-handler.handler",
      environment: {
        webSocketConnectionsTableName: webSocketConnectionsTable.tableName
      }
    });

    const defaultRouteLambda = new Function(this, "DefaultRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "./handlers/routes")),
      handler: "default-route-handler.handler"
    });

    // To perform authorization of a websocket connection 
    const webSocketLambdaAuthorizer = new NodejsFunction(this, "WebSocketLambdaAuthorizer", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, "./handlers/lambda-authorizer-handler.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, "../../../../../package-lock.json")),
      environment: {
        cognitoUserPoolId: props.cognitoUserPoolId,
        cognitoUserPoolClientId: props.cognitoUserPoolClientId,
      }
    });


    /*** WebSocket API ***/

    const webSocketApi = new WebSocketApi(this, "WebSocketApi", {

      // The route selection expression value will name the Lambda Function that will
      // be invoked (see "WebSocket Custom Routes" section below).
      routeSelectionExpression: "$request.body.action",


      // Built-in route settings

      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "ConnectRouteWebsocketLambdaIntegration",
          connectRouteLambda
        ),
        authorizer: new WebSocketLambdaAuthorizer(
          "WebSocketLambdaAuthorizer",
          webSocketLambdaAuthorizer,
          { identitySource: ["route.request.querystring.token"] }
        )
      },

      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DisconnectRouteWebsocketLambdaIntegration",
          disconnectRouteLambda
        )
      },

      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DefaultRouteWebsocketLambdaIntegration",
          defaultRouteLambda
        )
      },
    });


    /*** Custom Route Handling Lambdas ***/

    // To receive messages from the web client
    const fromWebClientRouteLambda = new Function(this, "FromWebClientRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "./handlers/routes")),
      handler: "from-web-client-route-handler.handler",
      initialPolicy: [
        // Allow this lambda to publish to all SNS topics
        new PolicyStatement({
          effect: Effect.ALLOW,
          // resources: ["arn:aws:sns:us-east-1:346761569124:topic:*"],
          resources: ["arn:aws:sns:us-east-1:346761569124:*"],
          actions: ["sns:Publish"]
        }),
        // Allow cognito users, with temp STS token, to publish to SNS
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: ["arn:aws:sts::346761569124:assumed-role/*"],
          actions: ["sns:Publish"]
        })
      ]
    });

    // To send messages to the web client
    const toWebClientRouteLambda = new Function(this, "ToWebClientRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "./handlers/routes")),
      handler: "to-web-client-route-handler.handler",
      environment: {
        webSocketConnectionsTableName: webSocketConnectionsTable.tableName,
        webSocketApiEndpoint: webSocketApi.apiEndpoint
      }
    });


    /*** Custom Route Integrations ***/

    webSocketApi.addRoute("fromwebclient", {
      integration: new WebSocketLambdaIntegration(
        "FromWebClientRouteWebsocketLambdaIntegration",
        fromWebClientRouteLambda
      )
    });

    webSocketApi.addRoute("towebclient", {
      integration: new WebSocketLambdaIntegration(
        "ToWebClientRouteWebsocketLambdaIntegration",
        toWebClientRouteLambda
      )
    });


    /*** WebSocket Stages ***/

    const devWebSocketStage = new WebSocketStage(this, "DevWebSocketStage", {
      webSocketApi,
      stageName: "dev",
      autoDeploy: true,
    });


    /*** SQS ***/

    // const toWebClientRouteQueue = new Queue(this, "ToWebClientRouteQueue");


    /*** Patterns ***/

    // const toWebClientRouteSqsToLambdaPattern = new SqsToLambda(this, "ToWebClientRouteSqsToLambdaPattern", {
    //   existingLambdaObj: toWebClientRouteHandlerLambda,
    //   existingQueueObj: toWebClientRouteQueue
    // });


    /*** Permissions ***/

    webSocketConnectionsTable.grantReadWriteData(connectRouteLambda);
    webSocketConnectionsTable.grantReadWriteData(disconnectRouteLambda);
    webSocketConnectionsTable.grantReadWriteData(toWebClientRouteLambda);

    // fromClientRouteWebsocketLambda.addToRolePolicy(new PolicyStatement({
    //   effect: Effect.ALLOW,
    //   resources: ["arn:aws:sns:us-east-1:346761569124:topic:*"],
    //   actions: ["topic:Publish"]
    // }));

    toWebClientRouteLambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ["arn:aws:execute-api:us-east-1:346761569124:m71oz07fyl/dev/POST/@connections"],
      actions: ["execute-api:Invoke"]
    }));


    /*** Stack Outputs ***/

    // For web client

    new CfnOutput(this, "DevStageWebSocketApiEndpoint", {
      value: `${webSocketApi.apiEndpoint}/${devWebSocketStage.stageName}`,
      description: "'dev' stage websocket API endpoint to be used by web client",
      exportName: "DevStageWebSocketApiEndpoint"
    });
  }
}

module.exports = { WebSocketStack };