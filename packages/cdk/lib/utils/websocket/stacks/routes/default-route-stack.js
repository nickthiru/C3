const { Stack } = require("aws-cdk-lib");
const { Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const path = require("path");

class DefaultRouteStack extends Stack {
  /**
     * 
     * @param {Construct} scope 
     * @param {string} id 
     * @param {StackProps=} props 
     */
  constructor(scope, id, props) {
    super(scope, id, props);

    const defaultRouteLambda = new Function(this, "DefaultRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../handlers/routes")),
      handler: "default-route-handler.handler"
    });
  }
}

module.exports = { DefaultRouteStack };