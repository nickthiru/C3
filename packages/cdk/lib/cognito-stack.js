const { Stack, CfnOutput } = require("aws-cdk-lib");
const { UserPool, CfnUserPoolGroup } = require("aws-cdk-lib/aws-cognito");


class CognitoStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const userPool = new UserPool(this, "UserPool", {
      userPoolName: "UserPool",
      selfSignUpEnabled: false,
      signInAliases: {
        username: true,
        email: true
      }
    });

    const userPoolClient = userPool.addClient("UserPoolClient", {
      userPoolClientName: "UserPoolClient",
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true
      }
    });

    new CfnUserPoolGroup(this, "Admin", {
      groupName: "Admin",
      userPoolId: userPool.userPoolId,
    });


    /*** Outputs ***/

    // For web client Auth service

    new CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
      description: "Cognito user pool ID used by AWS Amplify in the web client's auth service",
      exportName: "UserPoolId"
    });

    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
      description: "Cognito user pool client ID used by AWS Amplify in the web client's auth service",
      exportName: "UserPoolClientId"
    });
  }

}

module.exports = { CognitoStack };