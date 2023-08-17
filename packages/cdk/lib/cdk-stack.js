const { Stack } = require('aws-cdk-lib');
const { AuthService } = require('./utils/auth/auth-service.js');
const { WebSocketService } = require("./utils/websocket/websocket-service.js");
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

    const authServ = new AuthService(this, "AuthService");

    const wsServ = new WebSocketService(this, "WebSocketService", {
      // Required by connect route lambda authorizer. For cdk/lib/utils/websocket/stacks/routes/connect-route-stack/WebSocketAuthorizerLambda
      cognitoUserPoolId: authServ.userPoolId,
      cognitoUserPoolClientId: authServ.userPoolClientId
    });

    // const deviceManagementService = new DeviceManagementService(this, "DeviceManagementService");

    // const mapService = new MapService(this, "MapService");
  }
}

module.exports = { CdkStack }
