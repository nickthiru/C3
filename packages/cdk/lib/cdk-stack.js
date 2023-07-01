const { Stack, CfnOutput } = require('aws-cdk-lib');
const { WebSocketStack } = require("./common/websocket/stacks/websocket-lambda-stack.js");
const { UserMgmtStack } = require("./user-mgmt/stacks/user-mgmt-stack.js");

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
    // new WebSocketStack(this, "WebSocketStack", {
    //   webSocketLambdaIntegration: lambdaStack.websocketLambdaIntegration
    // });
    // new SnsStack(this, "SnsStack", {});
    // new MonitorStack(this, "MonitorStack", {});
    // new CicdStack(this, "CicdStack", {});

    new UserMgmtStack(this, "UserMgmtStack", {});

    // new CfnOutput(this, 'CdkStackInfo', { value: this.Stack.CdkStack });
  }
}

module.exports = { CdkStack }
