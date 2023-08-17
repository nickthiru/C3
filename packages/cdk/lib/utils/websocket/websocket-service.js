const { Construct } = require("constructs");
const { CfnOutput, RemovalPolicy } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Function, Code, Runtime } = require("aws-cdk-lib/aws-lambda");
const { WebSocketApi, WebSocketStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { WebSocketLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const { WebSocketLambdaAuthorizer } = require("@aws-cdk/aws-apigatewayv2-authorizers-alpha");
const { Table, AttributeType, BillingMode } = require("aws-cdk-lib/aws-dynamodb");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const path = require("path");

class WebSocketService extends Construct {
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

    const connectRouteHandlerLambda = new Function(this, "ConnectRouteHandlerLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "./handlers")),
      handler: "connect-route-handler.handler",
      environment: {
        webSocketConnectionsTableName: webSocketConnectionsTable.tableName
      }
    });

    const disconnectRouteHandlerLambda = new Function(this, "DisconnectRouteHandlerLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "./handlers")),
      handler: "disconnect-route-handler.handler",
      environment: {
        webSocketConnectionsTableName: webSocketConnectionsTable.tableName
      }
    });

    const defaultRouteHandlerLambda = new Function(this, "DefaultRouteHandlerLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "./handlers")),
      handler: "default-route-handler.handler"
    });

    // To perform authorization of a websocket connection 
    const webSocketAuthHandlerLambda = new NodejsFunction(this, "WebSocketAuthHandlerLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, "./handlers/websocket-auth-handler.js")),
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
          connectRouteHandlerLambda
        ),
        authorizer: new WebSocketLambdaAuthorizer(
          "WebSocketLambdaAuthorizer",
          webSocketAuthHandlerLambda,
          { identitySource: ["route.request.querystring.token"] }
        )
      },

      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DisconnectRouteWebsocketLambdaIntegration",
          disconnectRouteHandlerLambda
        )
      },

      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DefaultRouteWebsocketLambdaIntegration",
          defaultRouteHandlerLambda
        )
      },
    });


    /*** Custom Route Handling Lambdas ***/

    // To receive messages from the web client
    const fromWebClientRouteHandlerLambda = new Function(this, "FromWebClientRouteHandlerLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "./handlers")),
      handler: "from-web-client-route-handler.handler",
      initialPolicy: [
        // Allow this lambda to publish to all SNS topics
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: ["arn:aws:sns:us-east-1:346761569124:topic:*"],
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
    const toWebClientRouteHandlerLambda = new Function(this, "ToWebClientRouteHandlerLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "./handlers")),
      handler: "to-web-client-route-handler.handler",
      environment: {
        webSocketConnectionsTableName: webSocketConnectionsTable.tableName,
        webSocketApiEndpoint: webSocketApi.apiEndpoint
      }
    });


    /*** Custom Route Integrations ***/

    webSocketApi.addRoute("fromwebclient", {
      integration: new WebSocketLambdaIntegration(
        "FromWebClientWebsocketLambdaIntegration",
        fromWebClientRouteHandlerLambda
      )
    });

    webSocketApi.addRoute("towebclient", {
      integration: new WebSocketLambdaIntegration(
        "ToWebClientWebsocketLambdaIntegration",
        toWebClientRouteHandlerLambda
      )
    });


    /*** WebSocket Stages ***/

    const webSocketStage = new WebSocketStage(this, "DevWebSocketStage", {
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


    /*** Stack Outputs ***/

    new CfnOutput(this, "DevStageWebSocketApiEndpoint", {
      value: `${webSocketApi.apiEndpoint}/${webSocketStage.stageName}`,
      description: "'dev' stage websocket API endpoint to be used by web client",
      exportName: "DevStageWebSocketApiEndpoint"
    });


    /*** Permissions ***/

    webSocketConnectionsTable.grantReadWriteData(connectRouteHandlerLambda);
    webSocketConnectionsTable.grantReadWriteData(disconnectRouteHandlerLambda);
    webSocketConnectionsTable.grantReadWriteData(toWebClientRouteHandlerLambda);

    // fromClientRouteWebsocketLambda.addToRolePolicy(new PolicyStatement({
    //   effect: Effect.ALLOW,
    //   resources: ["arn:aws:sns:us-east-1:346761569124:topic:*"],
    //   actions: ["topic:Publish"]
    // }));

    toWebClientRouteHandlerLambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ["arn:aws:execute-api:us-east-1:346761569124:m71oz07fyl/dev/POST/@connections"],
      actions: ["execute-api:Invoke"]
    }));
  }
}

module.exports = { WebSocketService };