// Later, need to create a DDB table for each type of user e.g. admin.

import { Stack } from "aws-cdk-lib";

class DataStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Need a DDB collection to store websocket connection IDs.
  }

}

module.exports = DataStack;