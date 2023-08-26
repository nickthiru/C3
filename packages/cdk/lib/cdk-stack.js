const { Stack } = require('aws-cdk-lib');

const { AuthStack } = require('./util/auth.js');
const { WebSocketStack } = require("./util/websocket/websocket.js");
const { DeviceManagementStack } = require('./domain/device/main.js');

// const { UserMgmtStack } = require("./domain/user/main.js");
// const { MapStack } = require('./domain/map/main.js');

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
