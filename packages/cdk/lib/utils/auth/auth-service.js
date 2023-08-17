const { Construct } = require("constructs");
const { CfnOutput } = require("aws-cdk-lib");
const { UserPool, CfnUserPoolGroup } = require("aws-cdk-lib/aws-cognito");

class AuthService extends Construct {
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

    // new CfnUserPoolGroup(this, "C3Admins", {
    //   userPoolId: this.userPool.userPoolId,
    //   groupName: "admins"
    // });


    /*** Outputs ***/

    // Outputs for WebSocket Authorizer Lambda in the WebSocket Stack

    this.userPoolId = userPool.userPoolId;

    this.userPoolClientId = userPoolClient.userPoolClientId;


    // Outputs for 'outputs.json' for React.js Auth service

    new CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
      description: "Cognito user pool ID used by AWS Amplify in the web client's auth service",
      exportName: "CongnitoUserPoolId"
    });

    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
      description: "Cognito user pool client ID used by AWS Amplify in the web client's auth service",
      exportName: "CognitoUserPoolClientId"
    });
  }

}

module.exports = { AuthService };