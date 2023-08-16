const { Stack } = require("aws-cdk-lib");
const { Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const path = require("path");

class ToWebClientRouteStack extends Stack {
  /**
     * 
     * @param {Construct} scope 
     * @param {string} id 
     * @param {StackProps=} props 
     */
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** Lambdas */

    const toWebClientRouteLambda = new Function(this, "ToWebClientRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
      handler: "toClient-route-handler.handler",
      environment: {
        PRIMARY_KEY: "connectionId",
        DB_NAME: props.webSocketConnectionsTableName
      }
    });


    /*** SQS ***/

    const toClient_WebSocketRoute_Queue = new Queue(this, "ToClient_WebSocketRoute_Queue");


    /*** Patterns ***/

    const toClient_WebSocketRoute_SqsToLambda_Pattern = new SqsToLambda(this, "ToClient_WebSocketRoute_SqsToLambda_Pattern", {
      existingLambdaObj: toClient_WebSocketRoute_Lambda,
      existingQueueObj: toClient_WebSocketRoute_Queue
    });


    /*** Permissions */

    toWebClientRouteLambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ["arn:aws:execute-api:us-east-1:346761569124:m71oz07fyl/dev/POST/@connections"],
      actions: ["execute-api:Invoke"]
    }));
  }
}

module.exports = { ToWebClientRouteStack };