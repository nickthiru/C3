import { CfnOutput, Stack } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";

class AuthStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.userpool = new UserPool(this, "C3UserPool", {
      selfSignUpEnabled: false,
      signInAliases: {
        username: true,
        email: true
      }
    });

    new CfnOutput(this, "C3UserPoolId", {
      value: this.userPool.userPoolId
    });

    this.userPoolClient = new UserPoolClient(this, "C3UserPoolClient", {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true
      }
    });

    new CfnOutput(this, "C3UserPoolClientId", {
      value: this.userPoolClient.userPoolClientId
    });
  }

}

module.exports = { AuthStack };