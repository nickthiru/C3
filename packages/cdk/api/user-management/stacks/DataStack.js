const { Stack } = require("aws-cdk-lib");

class DataStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
  }
}

module.exports = { DataStack };