const { Stack } = require("aws-cdk-lib");
const { AuthStack } = require("./auth-stack.js");

class UserMgmtStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    new AuthStack(this, "AuthStack", {});
  }
}

module.exports = { UserMgmtStack };