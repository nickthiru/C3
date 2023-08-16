const { CfnOutput, Stack } = require("aws-cdk-lib");
const { UserPool, CfnUserPoolGroup } = require("aws-cdk-lib/aws-cognito");

class UserPoolStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** User Pools ***/

    // const userPool = new UserPool(this, "UserPool", {
    //   selfSignUpEnabled: false,
    //   signInAliases: {
    //     username: true,
    //     email: true
    //   }
    // });

    // const userPoolClient = userPool.addClient("UserPoolClient", {
    //   authFlows: {
    //     adminUserPassword: true,
    //     custom: true,
    //     userPassword: true,
    //     userSrp: true
    //   }
    // });

    this.userPool = new UserPool(this, "UserPool", {
      selfSignUpEnabled: false,
      signInAliases: {
        username: true,
        email: true
      }
    });

    this.userPoolClient = userPool.addClient("UserPoolClient", {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true
      }
    });


    /*** User Pool Groups ***/

    // Admins
    new CfnUserPoolGroup(this, "C3Admins", {
      userPoolId: userPool.userPoolId,
      groupName: "C3Admins"
    });


    /*** Outputs ***/

    // For cdk/lib/utils/websocket/stacks/routes/connect-route-stack/WebSocketAuthorizerLambda
    // this.userPoolId = userPool.userPoolId;

    // this.userPoolClientId = userPoolClient.userPoolClientId;


    // For web/src/services/auth-service
    new CfnOutput(this, "UserPoolId", {
      value: this.userPool.userPoolId
    });

    new CfnOutput(this, "UserPoolClientId", {
      value: this.userPoolClient.userPoolClientId
    });
  }
}

module.exports = { UserPoolStack };