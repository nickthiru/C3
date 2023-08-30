const { Stack } = require("aws-cdk-lib");
const { Bucket } = require("aws-cdk-lib/aws-s3");

class UiDeployStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const deploymentBucket = new Bucket(this, "UiBucket", {
      bucketName: "C3-frontend"
    });
  }
}

module.exports = { UiDeployStack };