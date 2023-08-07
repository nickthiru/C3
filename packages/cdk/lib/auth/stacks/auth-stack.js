const { CfnOutput, Stack } = require("aws-cdk-lib");
const { UserPool, CfnUserPoolGroup } = require("aws-cdk-lib/aws-cognito");

class AuthStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.userPool = new UserPool(this, "UserPool", {
      selfSignUpEnabled: false,
      signInAliases: {
        username: true,
        email: true
      }
    });

    this.userPoolClient = this.userPool.addClient("UserPoolClient", {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true
      }
    });

    // new CfnUserPoolGroup(this, "C3Admins", {
    //   userPoolId: this.userPool.userPoolId,
    //   groupName: "admins"
    // });

    // Outputs for WebSocket Authorizer Lambda in the WebSocket Stack
    this.userPoolId = this.userPool.userPoolId;
    this.userPoolClientId = this.userPoolClient.userPoolClientId;

    // Outputs for 'outputs.json' for React.js Auth service
    new CfnOutput(this, "UserPoolId", {
      value: this.userPool.userPoolId
    });
    new CfnOutput(this, "UserPoolClientId", {
      value: this.userPoolClient.userPoolClientId
    });
  }

}

module.exports = { AuthStack };