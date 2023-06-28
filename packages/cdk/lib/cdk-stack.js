const { Stack } = require('aws-cdk-lib');
const { WebSocketStack } = require("./common/websocket/stacks/websocket-lambda-stack.js");
const { AuthStack } = require("./user-mgmt/stacks/auth-stack.js");
const { LambdaStack } = require("./common/lambda/stacks/lambda-stack.js");

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // // Common Stacks
    new AuthStack(this, "AuthStack", {});
    const lambdaStack = new LambdaStack(this, "LambdaStack", {});
    new WebSocketStack(this, "WebSocketStack", {
      webSocketLambdaIntegration: lambdaStack.websocketLambdaIntegration
    });
    // new SnsStack(this, "SnsStack", {});
    // new MonitorStack(this, "MonitorStack", {});
    // new CicdStack(this, "CicdStack", {});

    // new UserMgmtStack(this, "UserMgmtStack", {});
  }
}

module.exports = { CdkStack }
