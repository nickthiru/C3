const { Stack } = require('aws-cdk-lib');
const { AuthStack } = require('./utils/auth/auth-stack.js');
const { WebSocketStack } = require("./utils/websocket/websocket-stack.js");
// const { DeviceManagementStack } = require('./domain/device-mgmt/device-mgmt-stack.js');

// const { UserMgmtStack } = require("./user-mgmt/stacks/user-mgmt-stack.js");
// const { MapStack } = require('./map/map-stack.js');

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const authStack = new AuthStack(this, "AuthStack");

    const webSocketStack = new WebSocketStack(this, "WebSocketStack", {
      // Required by connect route lambda authorizer
      cognitoUserPoolId: authStack.userPoolStack.userPool.userPoolId,
      cognitoUserPoolClientId: authStack.userPoolStack.userPoolClient.userPoolClientId
    });

    // const deviceManagementStack = new DeviceManagementStack(this, "DeviceManagementStack");

    // const mapStack = new MapStack(this, "MapStack");
  }
}

module.exports = { CdkStack }
