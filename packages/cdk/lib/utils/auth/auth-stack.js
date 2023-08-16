const { Stack } = require("aws-cdk-lib");
const { UserPoolStack } = require("./stacks/user-pool-stack.js");

class AuthStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // const userPoolStack = new UserPoolStack(this, "UserPoolStack");

    this.userPoolStack = new UserPoolStack(this, "UserPoolStack");



    /*** Outputs ***/

    // For cdk/lib/utils/websocket/stacks/routes/connect-route-stack/WebSocketAuthorizerLambda
    // this.userPoolStack = userPoolStack;
  }
}

module.exports = { AuthStack };