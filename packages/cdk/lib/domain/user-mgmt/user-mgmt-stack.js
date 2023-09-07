const { Stack } = require("aws-cdk-lib");
const { CognitoStack } = require("./cognito-stack");

class UserManagementStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.cognitoStack = new CognitoStack(this, "CognitoStack");

  }
}

module.exports = { UserManagementStack };