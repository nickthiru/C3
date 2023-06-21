const { Stack } = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const path = require("path");

class LambdaStack extends Stack {
  /**
   * 
   * @param {Construct} scope 
   * @param {string} id 
   * @param {StackProps=} props 
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    new lambda.Function(this, "HelloLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "hello.main",
      code: lambda.Code.fromAsset(path.join(__dirname, "../..", "services")),
    })
  }
}

module.exports = { LambdaStack };