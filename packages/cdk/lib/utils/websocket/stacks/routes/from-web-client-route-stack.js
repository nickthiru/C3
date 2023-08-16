const { Stack } = require("aws-cdk-lib");
const { Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const path = require("path");

class FromWebClientRouteStack extends Stack {
  /**
     * 
     * @param {Construct} scope 
     * @param {string} id 
     * @param {StackProps=} props 
     */
  constructor(scope, id, props) {
    super(scope, id, props);

    const fromWebClientRouteLambda = new Function(this, "FromWebClientRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
      handler: "fromClient-route-handler.handler",
      initialPolicy: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: ["arn:aws:sns:us-east-1:346761569124:Topic/?"],
          actions: ["sns:Publish"]
        }),
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: ["arn:aws:sts::346761569124:assumed-role/*"],
          actions: ["sns:Publish"]
        })
      ]
    });

    // fromClient_WebSocketRoute_Lambda.addToRolePolicy(new PolicyStatement({
    //   effect: Effect.ALLOW,
    //   resources: ["arn:aws:sns:us-east-1:346761569124:Topic:*"],
    //   actions: ["topic:Publish"]
    // }));

  }
}

module.exports = { FromWebClientRouteStack };