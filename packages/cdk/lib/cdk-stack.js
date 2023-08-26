const { Stack } = require('aws-cdk-lib');

const { AuthStack } = require('./utils/auth/auth-stack.js');
const { WebSocketStack } = require("./utils/websocket/websocket-stack.js");
const { DeviceManagementStack } = require('./domains/device-mgmt/device-mgmt-stack.js');

// const { UserMgmtStack } = require("./domains/user-mgmt/user-mgmt-stack.js");
// const { MapStack } = require('./domains/map/map-stack.js');

class CdkStack extends Stack {
  /**
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** Utilities ***/

    const auth = new AuthStack(this, "AuthStack");

    const ws = new WebSocketStack(this, "WebSocketStack", {
      // Required by connect route lambda authorizer. For cdk/lib/utils/websocket/stacks/routes/connect-route-stack/WebSocketAuthorizerLambda
      cognitoUserPoolId: auth.userPoolId,
      cognitoUserPoolClientId: auth.userPoolClientId
    });


    /*** Business Domains ***/

    const deviceMgmt = new DeviceManagementStack(this, "DeviceManagementStack");

    // const map = new MapDomain(this, "MapDomain");
  }
}

module.exports = { CdkStack }
