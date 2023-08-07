const { CfnOutput, Stack } = require("aws-cdk-lib");
const { UserPool, CfnUserPoolGroup } = require("aws-cdk-lib/aws-cognito");

class AuthStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const userPool = new UserPool(this, "UserPool", {
      selfSignUpEnabled: false,
      signInAliases: {
        username: true,
        email: true
      }
    });

    const userPoolClient = userPool.addClient("UserPoolClient", {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true
      }
    });

    // Outputs to WebSocket Authorizer Lambda in the WebSocket Stack
    this.userPoolId = userPool.userPoolId;
    this.userPoolClientId = userPoolClient.userPoolClientId;

    // new CfnUserPoolGroup(this, "C3Admins", {
    //   userPoolId: this.userPool.userPoolId,
    //   groupName: "admins"
    // });
  }
}

module.exports = { AuthStack };