const { Stack } = require('aws-cdk-lib');
const { WebSocketStack } = require("./common/websocket/stacks/websocket-stack.js");

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    new WebSocketStack(this, "WebSocketStack");
  }
}

module.exports = { CdkStack }
