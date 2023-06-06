const { Stack } = require("aws-cdk-lib");
const apigateway = require("aws-cdk-lib/aws-apigateway");

class ApiStack extends Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    api = new apigateway.RestApi(this, "SpacesApi", {});

    spacesResource = api.root.addResource("spaces");
    spacesResource.addMethod("GET");
  }

}

module.exports = { ApiStack };