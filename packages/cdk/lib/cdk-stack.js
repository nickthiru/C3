const { Stack, CfnOutput } = require('aws-cdk-lib');
const { WebSocketStack } = require("./websocket/stacks/websocket-stack.js");
// const { UserMgmtStack } = require("./user-mgmt/stacks/user-mgmt-stack.js");
const { AuthStack } = require('./auth/stacks/auth-stack.js');

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // new SnsStack(this, "SnsStack", {});
    // new MonitorStack(this, "MonitorStack", {});
    // new CicdStack(this, "CicdStack", {});
    // new UserMgmtStack(this, "UserMgmtStack", {});

    new AuthStack(this, "AuthStack");
    new WebSocketStack(this, "WebSocketStack");
  }
}

module.exports = { CdkStack }
