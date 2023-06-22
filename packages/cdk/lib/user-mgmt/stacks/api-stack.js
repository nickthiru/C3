const { Stack } = require("aws-cdk-lib");
const { HttpLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const apigwv2 = require("@aws-cdk/aws-apigatewayv2-alpha");
const lambda = require("aws-cdk-lib/aws-lambda");
const path = require("path");
const ApiHandler = require("../src/api-handler.js");

class ApiStack extends Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    new lambda.Function(this, "ApiHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: ApiHandler.handler,
      code: lambda.Code.fromAsset(path.join(__dirname, "..", "/src")),
    })

    const api = new apigwv2.HttpApi(this, 'Api');

    const integration = new HttpLambdaIntegration('Integration', apiHandler);

    api.addRoutes({
      path: '/user-mnmt',
      methods: [apigwv2.HttpMethod.GET],
      integration,
    });
  }

}

module.exports = { ApiStack };