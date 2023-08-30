const { Stack } = require('aws-cdk-lib');

const { AuthStack } = require('./util/auth/main.js');
const { WebSocketStack } = require("./util/websocket/main.js");
const { DeviceManagementStack } = require('./domain/device/main.js');
const { MapStack } = require('./domain/map/main.js');

// const { UserMgmtStack } = require("./domain/user/main.js");

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

    // const ws = new WebSocketStack(this, "WebSocketStack", {
    //   // Required by connect route lambda authorizer. For cdk/lib/utils/websocket/stacks/routes/connect-route-stack/WebSocketAuthorizerLambda
    //   cognitoUserPoolId: auth.userPoolId,
    //   cognitoUserPoolClientId: auth.userPoolClientId
    // });

    const ws = new WebSocketStack(this, "WebSocketStack", { auth });


    /*** Business Domains ***/

    const deviceMgmt = new DeviceManagementStack(this, "DeviceManagementStack");

    const map = new MapStack(this, "MapStack", { deviceMgmt });
  }
}

module.exports = { CdkStack }
