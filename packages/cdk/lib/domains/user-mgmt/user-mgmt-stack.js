const { Stack } = require("aws-cdk-lib");
const { Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const path = require("path");

class UserMgmtStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    new SqsToLambda(this, 'AddUserSqsToLambda', {
      lambdaFunctionProps: {
        runtime: Runtime.NODEJS_18_X,
        code: Code.fromAsset(path.join(__dirname, "../src/handlers")),
        handler: "AddUser.handler"
      }
    });

  }
}

module.exports = { UserMgmtStack };